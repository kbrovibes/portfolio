// Drives scrapeEvent() against a synthetic portal served locally, to prove the card-finding,
// roster and signup-count heuristics work on realistic markup without touching the real site.
import http from 'node:http';
import { chromium } from 'playwright-core';
import { scrapeEvent } from './portal.mjs';

const LIST = `<html><body><div class="container">
  <h1>Badminton Events</h1>
  <div class="event-card"><h3>Tuesday Open Play</h3><p>Bellevue Badminton Club</p>
    <p>Tue, Aug 18, 2026 · 7:00 PM</p><a href="/badminton_events/11">Details</a></div>
  <div class="event-card"><h3>Thursday Advanced</h3><p>NWBC — Northwest Badminton Club</p>
    <p>Thu, Aug 20, 2026 · 7:30 PM</p><a href="/badminton_events/12">Details</a></div>
  <div class="event-card"><h3>Saturday Doubles</h3><p>NWBC</p>
    <p>Sat, Aug 22, 2026 · 9:00 AM</p><a href="/badminton_events/13">Details</a></div>
</div></body></html>`;

const detail = (players, open) => `<html><body><div class="wrap">
  <h2>Thursday Advanced</h2><p>NWBC — Northwest Badminton Club</p>
  <p>Thu, Aug 20, 2026 · 7:30 PM</p>
  <p>${players.length} players registered</p>
  ${open ? '<button id="reg">Register</button>' : '<p>Registration closed</p>'}
  <ul class="roster">${players.map((p) => `<li>${p}</li>`).join('')}</ul>
</div></body></html>`;

let ROSTER = [], OPEN = true;
const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(req.url.includes('/badminton_events/12') ? detail(ROSTER, OPEN)
        : req.url.includes('/badminton_events/') ? '<html><body>other event</body></html>' : LIST);
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

const cfg = {
  ...JSON.parse((await import('node:fs')).readFileSync('./config.json', 'utf8')),
  portalUrl: `${base}/badminton_events`,
};

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage();
const quiet = () => {};
let failures = 0;
const check = (label, cond, extra = '') => {
  console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${label}${cond ? '' : ' :: ' + extra}`);
  if (!cond) failures++;
};

// --- case 1: open, only Kiran in ---
ROSTER = ['Arjun Rao', 'Kiran Iyer', 'Meera Nair', 'Sanjay Gupta'];
OPEN = true;
let ev = await scrapeEvent(page, cfg, quiet);
console.log('case 1: open, 4 signups, Kiran only');
check('found the event', ev.found);
check('picked the Thursday card, not Tue/Sat', ev.key === '2026-08-20', ev.key);
check('followed the detail link', ev.url.includes('/badminton_events/12'), ev.url);
check('registration reads open', ev.isOpen === true);
check('signup count = 4', ev.count === 4, `got ${ev.count} via ${ev.countSource}`);
check('Kiran Iyer detected', ev.names['Kiran Iyer'] === true);
check('Vasu Chimmad correctly absent', ev.names['Vasu Chimmad'] === false);

// --- case 2: both in ---
ROSTER = ['Arjun Rao', 'Kiran Iyer', 'Meera Nair', 'Vasu Chimmad', 'Sanjay Gupta'];
ev = await scrapeEvent(page, cfg, quiet);
console.log('case 2: both watched players registered');
check('count = 5', ev.count === 5, `got ${ev.count}`);
check('Kiran Iyer detected', ev.names['Kiran Iyer'] === true);
check('Vasu Chimmad detected', ev.names['Vasu Chimmad'] === true);

// --- case 3: closed ---
OPEN = false;
ev = await scrapeEvent(page, cfg, quiet);
console.log('case 3: registration closed');
check('isOpen is false', ev.isOpen === false);
check('closed flag set', ev.closed === true);

// --- case 4: nobody signed up yet ---
ROSTER = []; OPEN = true;
ev = await scrapeEvent(page, cfg, quiet);
console.log('case 4: empty roster');
check('count = 0', ev.count === 0, `got ${ev.count} via ${ev.countSource}`);
check('neither player matched', !ev.names['Kiran Iyer'] && !ev.names['Vasu Chimmad']);

// --- case 5: venue absent entirely ---
ROSTER = ['Arjun Rao'];
const ev5 = await scrapeEvent(page, { ...cfg, venueMatch: 'ZZZ Club' }, quiet);
console.log('case 5: venue not listed');
check('reports not found rather than guessing', ev5.found === false);

await browser.close();
server.close();
console.log(failures ? `\n${failures} FAILURE(S)` : '\nall fixture checks passed');
process.exit(failures ? 1 : 0);
