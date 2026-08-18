// Offline checks for the pure logic: date parsing, name matching, pause scheduling,
// and message rendering. Browser-dependent paths are not covered here -- see README.
import assert from 'node:assert/strict';
import { parseEventDate, dateKey, nameMatches } from './portal.mjs';
import { nextWeekdayStart, buildOpenMessage, formatCount } from './watch.mjs';

const NOW = new Date(2026, 7, 18); // Tue 18 Aug 2026
let pass = 0;
const t = (name, fn) => { fn(); pass++; console.log(`  ok  ${name}`); };

console.log('date parsing');
for (const [input, expect] of [
  ['Thursday, August 20, 2026 7:00 PM', '2026-08-20'],
  ['Thu, Aug 20', '2026-08-20'],
  ['20 Aug 2026', '2026-08-20'],
  ['2026-08-20', '2026-08-20'],
  ['8/20/2026', '2026-08-20'],
  ['8/20', '2026-08-20'],
  ['Thu Aug 20th', '2026-08-20'],
]) t(`${input} -> ${expect}`, () => assert.equal(dateKey(parseEventDate(input, NOW)), expect));

t('a bare date already past rolls to next year', () =>
  assert.equal(dateKey(parseEventDate('Jan 7', NOW)), '2027-01-07'));
t('parsed Thursday really is a Thursday', () =>
  assert.equal(parseEventDate('Aug 20 2026', NOW).getDay(), 4));
t('unparseable text yields null', () =>
  assert.equal(parseEventDate('open gym, all levels', NOW), null));

console.log('name matching');
t('exact', () => assert.ok(nameMatches('Kiran Iyer', 'Kiran Iyer')));
t('case + spacing', () => assert.ok(nameMatches('Kiran Iyer', '  kiran   iyer ')));
t('reversed with middle initial', () => assert.ok(nameMatches('Kiran Iyer', 'Iyer, Kiran K')));
t('row with extra columns', () => assert.ok(nameMatches('Vasu Chimmad', '3. Vasu Chimmad (4.2)')));
t('partial surname is not a match', () => assert.ok(!nameMatches('Kiran Iyer', 'Kiran Patel')));
t('different person is not a match', () => assert.ok(!nameMatches('Vasu Chimmad', 'Vasudha Rao')));
t('empty roster entry', () => assert.ok(!nameMatches('Kiran Iyer', '')));

console.log('pause scheduling (resume Saturday)');
t('Tue -> upcoming Sat', () => assert.equal(dateKey(nextWeekdayStart(new Date(2026, 7, 18), 6)), '2026-08-22'));
t('Fri -> next day Sat', () => assert.equal(dateKey(nextWeekdayStart(new Date(2026, 7, 21), 6)), '2026-08-22'));
t('Sat -> following Sat, never same day', () => assert.equal(dateKey(nextWeekdayStart(new Date(2026, 7, 22), 6)), '2026-08-29'));
t('resume time is local midnight', () => assert.equal(nextWeekdayStart(new Date(2026, 7, 18), 6).getHours(), 0));

console.log('count rendering');
t('known count', () => assert.equal(formatCount({ count: 12, countSource: 'text-pattern' }), 'Signups: 12'));
t('heuristic count is marked approximate', () => assert.equal(formatCount({ count: 12, countSource: 'roster-heuristic' }), 'Signups: ~12'));
t('unknown count never invents a number', () => {
  const s = formatCount({ count: null, countSource: null });
  assert.ok(s.includes('unknown') && !/\d/.test(s));
});

console.log('message rendering');
const msg = buildOpenMessage({
  date: new Date(2026, 7, 20), url: 'https://example.test/e/1',
  count: 12, countSource: 'text-pattern',
  names: { 'Kiran Iyer': true, 'Vasu Chimmad': false },
}, { venueMatch: 'NWBC', watchNames: ['Kiran Iyer', 'Vasu Chimmad'] });
t('names both listed with distinct status', () => {
  assert.match(msg, /✅ Kiran Iyer — registered/);
  assert.match(msg, /⬜ Vasu Chimmad — not yet/);
});
t('count and link present', () => {
  assert.match(msg, /Signups: 12/);
  assert.match(msg, /https:\/\/example\.test\/e\/1/);
});
console.log('\n--- sample message ---\n' + msg + '\n----------------------');
console.log(`\n${pass} checks passed`);
