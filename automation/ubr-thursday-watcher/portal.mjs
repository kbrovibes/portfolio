// Scrapes the UBR events portal for the weekly Thursday event at the configured venue.
//
// The portal's markup was never visible from the machine this was written on, so every
// extraction below is layered: an explicit selector from config.json wins, then a set of
// text patterns, then a structural heuristic. Anything that cannot be resolved comes back
// as null and is reported as unknown -- a blank is obviously unfinished, a wrong number
// quietly misinforms the group. Run `npm run calibrate` once to pin the selectors down.

export class NotLoggedIn extends Error {}

const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

// "Kiran Iyer" matches "Iyer, Kiran K" -- every token of the target must appear.
export function nameMatches(target, candidate) {
  const hay = norm(candidate);
  if (!hay) return false;
  const tokens = norm(target).split(' ').filter((t) => t.length > 1);
  if (!tokens.length) return false;
  return tokens.every((t) => new RegExp(`\\b${t}`).test(hay));
}

function looksLikeThursday(text, weekday) {
  const names = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const full = names[weekday];
  const abbr = full.slice(0, 3);
  return new RegExp(`\\b(${full}|${abbr})\\b`, 'i').test(text);
}

// Pulls a date out of free text. Several formats are tried because the portal's is unknown.
export function parseEventDate(text, now = new Date()) {
  const months = 'jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec';
  const patterns = [
    /\b(\d{4})-(\d{2})-(\d{2})\b/,
    new RegExp(`\\b(${months})[a-z]*\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:,?\\s+(\\d{4}))?\\b`, 'i'),
    new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+(${months})[a-z]*\\.?(?:,?\\s+(\\d{4}))?\\b`, 'i'),
    /\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/,
  ];
  const monthIdx = (m) => months.split('|').indexOf(m.slice(0, 3).toLowerCase());

  for (const [i, re] of patterns.entries()) {
    const m = text.match(re);
    if (!m) continue;
    let y, mo, d;
    if (i === 0) { y = +m[1]; mo = +m[2] - 1; d = +m[3]; }
    else if (i === 1) { mo = monthIdx(m[1]); d = +m[2]; y = m[3] ? +m[3] : null; }
    else if (i === 2) { d = +m[1]; mo = monthIdx(m[2]); y = m[3] ? +m[3] : null; }
    else { mo = +m[1] - 1; d = +m[2]; y = m[3] ? (+m[3] < 100 ? 2000 + +m[3] : +m[3]) : null; }
    if (mo < 0 || mo > 11 || d < 1 || d > 31) continue;

    if (y == null) {
      // No year printed: pick the reading that is nearest to now, allowing a few days back.
      const cand = new Date(now.getFullYear(), mo, d);
      const cutoff = new Date(now.getTime() - 3 * 864e5);
      if (cand < cutoff) cand.setFullYear(now.getFullYear() + 1);
      return cand;
    }
    const dt = new Date(y, mo, d);
    return isNaN(dt) ? null : dt;
  }
  return null;
}

export const dateKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Finds the smallest sensible "card" wrapping each mention of the venue.
function collectCards([venue, explicitSelector]) {
  const out = [];
  if (explicitSelector) {
    document.querySelectorAll(explicitSelector).forEach((el) => {
      const a = el.querySelector('a[href]');
      out.push({ text: (el.innerText || '').trim(), href: a ? a.href : null });
    });
    return out;
  }
  const needle = venue.toLowerCase();
  const leaves = [...document.querySelectorAll('body *')].filter(
    (el) => el.children.length === 0 && (el.textContent || '').toLowerCase().includes(needle)
  );
  const seen = new Set();
  for (const leaf of leaves) {
    let el = leaf;
    for (let up = 0; up < 7 && el.parentElement; up++) {
      const t = (el.innerText || '').trim();
      if (t.length >= 40 && (el.querySelector('a[href]') || el.children.length >= 2)) break;
      el = el.parentElement;
    }
    if (seen.has(el)) continue;
    seen.add(el);
    const a = el.querySelector('a[href]');
    out.push({ text: (el.innerText || '').trim(), href: a ? a.href : null });
  }
  return out;
}

// Reads roster names + a signup count off an event detail (or card) root.
function extractRoster([rosterRowSel, countSel]) {
  const result = { entries: [], count: null, countSource: null };

  if (countSel) {
    const el = document.querySelector(countSel);
    const n = el && (el.innerText || '').match(/\d+/);
    if (n) { result.count = +n[0]; result.countSource = 'config-selector'; }
  }

  if (rosterRowSel) {
    result.entries = [...document.querySelectorAll(rosterRowSel)]
      .map((el) => (el.innerText || '').trim()).filter(Boolean);
  } else {
    // Heuristic: the container holding the most person-name-shaped siblings is the roster.
    const nameish = (s) => /^[A-Z][a-z'`-]+(?:\s+[A-Z][a-z'`.-]+){1,2}$/.test(s.trim()) && s.trim().length <= 40;
    let best = null;
    for (const parent of document.querySelectorAll('ul, ol, tbody, div')) {
      const kids = [...parent.children];
      if (kids.length < 2) continue;
      const hits = kids.filter((k) => nameish((k.innerText || '').split('\n')[0] || ''));
      if (hits.length >= 2 && (!best || hits.length > best.hits.length)) best = { hits };
    }
    if (best) result.entries = best.hits.map((k) => (k.innerText || '').split('\n')[0].trim());
  }

  if (result.count == null) {
    const text = document.body.innerText || '';
    const patterns = [
      /\b(\d+)\s*\/\s*\d+\s*(?:players|spots|slots|signed|registered)?\b/i,
      /\b(\d+)\s+(?:players?|sign[- ]?ups?|signed up|registered|participants?|attendees?)\b/i,
      /\b(?:players?|sign[- ]?ups?|registered|participants?|attendees?)\s*[:\-]?\s*(\d+)\b/i,
    ];
    for (const re of patterns) {
      const m = text.match(re);
      if (m) { result.count = +m[1]; result.countSource = 'text-pattern'; break; }
    }
  }
  if (result.count == null && result.entries.length) {
    result.count = result.entries.length;
    result.countSource = 'roster-heuristic';
  }
  return result;
}

export async function scrapeEvent(page, cfg, log) {
  await page.goto(cfg.portalUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});

  const loginWall = await page.evaluate(() => {
    const t = (document.body.innerText || '').toLowerCase();
    return !!document.querySelector('input[type="password"]') &&
      (t.includes('sign in') || t.includes('log in') || t.includes('login'));
  });
  if (loginWall) throw new NotLoggedIn('UBR portal is showing a login page in this Chrome profile.');

  const cards = await page.evaluate(collectCards, [cfg.venueMatch, cfg.selectors.eventCard]);
  log(`portal: ${cards.length} card(s) mentioning "${cfg.venueMatch}"`);

  const now = new Date();
  const candidates = cards
    .map((c) => ({ ...c, date: parseEventDate(c.text, now) }))
    .filter((c) => (c.date && c.date.getDay() === cfg.eventWeekday) || looksLikeThursday(c.text, cfg.eventWeekday))
    .filter((c) => !c.date || c.date >= new Date(now.getFullYear(), now.getMonth(), now.getDate()))
    .sort((a, b) => (a.date?.getTime() ?? Infinity) - (b.date?.getTime() ?? Infinity));

  if (!candidates.length) return { found: false };

  const card = candidates[0];
  let detailText = card.text;
  let roster = { entries: [], count: null, countSource: null };

  if (card.href) {
    await page.goto(card.href, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
    detailText = await page.evaluate(() => document.body.innerText || '');
  }
  roster = await page.evaluate(extractRoster, [cfg.selectors.rosterRow, cfg.selectors.signupCount]);

  const hay = detailText.toLowerCase();
  const closed = cfg.closedKeywords.some((k) => hay.includes(k.toLowerCase()));
  let openSignal = cfg.openKeywords.some((k) => hay.includes(k.toLowerCase()));
  if (cfg.selectors.registerButton) {
    openSignal = await page.evaluate((s) => {
      const el = document.querySelector(s);
      return !!el && !el.disabled && el.getAttribute('aria-disabled') !== 'true';
    }, cfg.selectors.registerButton);
  }

  const names = {};
  for (const n of cfg.watchNames) {
    names[n] = roster.entries.length
      ? roster.entries.some((e) => nameMatches(n, e))
      : nameMatches(n, detailText);
  }

  return {
    found: true,
    isOpen: openSignal && !closed,
    closed,
    date: card.date,
    key: card.date ? dateKey(card.date) : 'unknown-date',
    url: card.href || cfg.portalUrl,
    count: roster.count,
    countSource: roster.countSource,
    rosterSize: roster.entries.length,
    names,
    text: detailText.slice(0, 4000),
  };
}
