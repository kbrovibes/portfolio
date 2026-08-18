#!/usr/bin/env node
// UBR Thursday @ NWBC watcher.
//
//   node watch.mjs              one poll cycle, obeying the saved state machine
//   node watch.mjs --dry-run    poll and print the message, send nothing
//   node watch.mjs --force      poll and notify now, ignoring pause + already-notified
//   node watch.mjs --calibrate  dump the portal's markup so selectors can be pinned down
//   node watch.mjs --status     print saved state and exit
//
// The cron keeps firing on its fixed interval; "pausing" is this script returning early
// while state.phase === 'PAUSED'. That is deliberate -- nothing has to re-arm a scheduler.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { scrapeEvent, NotLoggedIn } from './portal.mjs';
import { postToGroup, WhatsAppError } from './whatsapp.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const argv = new Set(process.argv.slice(2));
const DRY = argv.has('--dry-run');
const FORCE = argv.has('--force');
const CALIBRATE = argv.has('--calibrate');

const cfg = JSON.parse(readFileSync(resolve(HERE, 'config.json'), 'utf8'));
const STATE_PATH = resolve(HERE, cfg.stateFile);

const stamp = () => new Date().toISOString().replace('T', ' ').slice(0, 19);
const log = (m) => console.log(`[${stamp()}] ${m}`);

const DEFAULT_STATE = {
  phase: 'WATCHING', eventKey: null, openNotifiedFor: null,
  bothSignedNotifiedFor: null, pausedUntil: null, lastCheck: null, lastError: null,
};

function loadState() {
  if (!existsSync(STATE_PATH)) return { ...DEFAULT_STATE };
  try { return { ...DEFAULT_STATE, ...JSON.parse(readFileSync(STATE_PATH, 'utf8')) }; }
  catch { log('state file unreadable, starting fresh'); return { ...DEFAULT_STATE }; }
}
function saveState(s) {
  mkdirSync(dirname(STATE_PATH), { recursive: true });
  writeFileSync(STATE_PATH, JSON.stringify(s, null, 2) + '\n');
}

// Next occurrence of `weekday` strictly after today, at local midnight.
function nextWeekdayStart(from, weekday) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  do { d.setDate(d.getDate() + 1); } while (d.getDay() !== weekday);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatCount(ev) {
  if (ev.count == null) return 'Signups: unknown — check the portal';
  const approx = ev.countSource === 'roster-heuristic' ? '~' : '';
  return `Signups: ${approx}${ev.count}`;
}

function buildOpenMessage(ev, cfg) {
  const when = ev.date
    ? ev.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    : 'Thursday';
  const lines = [
    `🏸 Thursday badminton @ ${cfg.venueMatch} — registration is OPEN`,
    `📅 ${when}`,
    `👥 ${formatCount(ev)}`,
    '',
  ];
  for (const n of cfg.watchNames) lines.push(`${ev.names[n] ? '✅' : '⬜'} ${n} — ${ev.names[n] ? 'registered' : 'not yet'}`);
  lines.push('', `🔗 ${ev.url}`);
  return lines.join('\n');
}

function buildBothSignedMessage(ev, cfg) {
  return [
    `✅ ${cfg.watchNames.join(' and ')} are both in for Thursday @ ${cfg.venueMatch}.`,
    `👥 ${formatCount(ev)}`,
    `🔗 ${ev.url}`,
  ].join('\n');
}

async function calibrate(page) {
  const outDir = resolve(HERE, 'calibration');
  mkdirSync(outDir, { recursive: true });
  await page.goto(cfg.portalUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  writeFileSync(resolve(outDir, 'events.html'), await page.content());
  writeFileSync(resolve(outDir, 'events.txt'), await page.evaluate(() => document.body.innerText || ''));
  const hits = await page.evaluate((venue) => {
    const path = (el) => {
      const parts = [];
      for (let e = el; e && e.tagName && parts.length < 6; e = e.parentElement) {
        parts.unshift(e.tagName.toLowerCase() + (e.className && typeof e.className === 'string'
          ? '.' + e.className.trim().split(/\s+/).slice(0, 3).join('.') : ''));
      }
      return parts.join(' > ');
    };
    return [...document.querySelectorAll('body *')]
      .filter((el) => el.children.length === 0 && (el.textContent || '').toLowerCase().includes(venue.toLowerCase()))
      .slice(0, 25)
      .map((el) => ({ text: (el.textContent || '').trim().slice(0, 120), path: path(el) }));
  }, cfg.venueMatch);
  writeFileSync(resolve(outDir, 'venue-hits.json'), JSON.stringify(hits, null, 2));
  log(`calibration written to ${outDir} (events.html, events.txt, venue-hits.json)`);
  log('Pin config.json > selectors from these, then re-run --dry-run.');
}

async function main() {
  const state = loadState();

  if (argv.has('--status')) { console.log(JSON.stringify(state, null, 2)); return; }

  const now = new Date();
  if (!FORCE && !CALIBRATE && state.phase === 'PAUSED' && state.pausedUntil) {
    if (now < new Date(state.pausedUntil)) {
      log(`paused until ${state.pausedUntil} — skipping`);
      return;
    }
    log('pause expired — resuming polling');
    Object.assign(state, {
      phase: 'WATCHING', pausedUntil: null, eventKey: null,
      openNotifiedFor: null, bothSignedNotifiedFor: null,
    });
  }

  let browser;
  try {
    browser = await chromium.connectOverCDP(cfg.cdpUrl, { timeout: 15000 });
  } catch (e) {
    log(`ERROR: cannot attach to Chrome at ${cfg.cdpUrl} — is it running with --remote-debugging-port? (${e.message})`);
    state.lastError = `cdp: ${e.message}`;
    saveState(state);
    process.exitCode = 1;
    return;
  }

  const ctx = browser.contexts()[0];
  const page = await ctx.newPage();

  try {
    if (CALIBRATE) { await calibrate(page); return; }

    const ev = await scrapeEvent(page, cfg, log);
    state.lastCheck = now.toISOString();
    state.lastError = null;

    if (!ev.found) { log(`no upcoming Thursday ${cfg.venueMatch} event listed`); return; }
    log(`event ${ev.key} | open=${ev.isOpen} | count=${ev.count} (${ev.countSource}) | ` +
        cfg.watchNames.map((n) => `${n}=${ev.names[n]}`).join(' '));

    if (ev.key !== state.eventKey) {
      state.eventKey = ev.key;
      state.openNotifiedFor = state.openNotifiedFor === ev.key ? ev.key : null;
      state.bothSignedNotifiedFor = null;
      state.phase = 'WATCHING';
    }

    if (!ev.isOpen && !FORCE) { log('registration not open yet'); return; }

    if (FORCE || state.openNotifiedFor !== ev.key) {
      await postToGroup(browser, cfg, buildOpenMessage(ev, cfg), { dryRun: DRY }, log);
      if (!DRY) { state.openNotifiedFor = ev.key; state.phase = 'TRACKING'; }
    } else {
      log('open notice already sent for this event');
    }

    const bothIn = cfg.watchNames.every((n) => ev.names[n]);
    const eventPassed = ev.date && now > new Date(ev.date.getFullYear(), ev.date.getMonth(), ev.date.getDate(), 23, 59);

    if (bothIn && !DRY) {
      if (cfg.notifyOnBothSigned && state.bothSignedNotifiedFor !== ev.key && state.openNotifiedFor === ev.key) {
        await postToGroup(browser, cfg, buildBothSignedMessage(ev, cfg), { dryRun: DRY }, log);
        state.bothSignedNotifiedFor = ev.key;
      }
      state.phase = 'PAUSED';
      state.pausedUntil = nextWeekdayStart(now, cfg.resumeWeekday).toISOString();
      log(`both watched players are in — pausing until ${state.pausedUntil}`);
    } else if (eventPassed && !DRY) {
      state.phase = 'PAUSED';
      state.pausedUntil = nextWeekdayStart(now, cfg.resumeWeekday).toISOString();
      log(`event day has passed — pausing until ${state.pausedUntil}`);
    } else if (!bothIn) {
      log('still waiting on: ' + cfg.watchNames.filter((n) => !ev.names[n]).join(', '));
    }
  } catch (e) {
    const tag = e instanceof NotLoggedIn ? 'PORTAL LOGIN' : e instanceof WhatsAppError ? 'WHATSAPP' : 'ERROR';
    log(`${tag}: ${e.message}`);
    state.lastError = `${tag}: ${e.message}`;
    process.exitCode = 1;
  } finally {
    if (!CALIBRATE) saveState(state);
    await page.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isMain) main();

export { nextWeekdayStart, buildOpenMessage, buildBothSignedMessage, formatCount };
