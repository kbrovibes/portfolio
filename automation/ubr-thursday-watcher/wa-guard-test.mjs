// Verifies the two WhatsApp safeguards: refuse to type into the wrong chat, and refuse
// to proceed when the profile is not linked. Both are the difference between a mis-posted
// group message and a clean no-op.
import { chromium } from 'playwright-core';
import { openChat, ensureLoggedIn, WhatsAppError } from './whatsapp.mjs';

const shell = (sidebarTitle, headerTitle) => `<html><body>
  <div id="pane-side"><div><span title="${sidebarTitle}">${sidebarTitle}</span></div></div>
  <div id="main"><header><span title="${headerTitle}">${headerTitle}</span></header>
    <footer><div contenteditable="true"></div></footer></div>
</body></html>`;

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage();
const quiet = () => {};
let failures = 0;
const check = (label, cond, extra = '') => {
  console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${label}${cond ? '' : ' :: ' + extra}`);
  if (!cond) failures++;
};

await page.setContent(shell('JSB', 'JSB'));
let err = null;
try { await openChat(page, 'JSB', quiet); } catch (e) { err = e; }
check('opens the correctly-titled chat', err === null, err?.message);

// Sidebar entry matches, but the chat that actually opened is a different one.
await page.setContent(shell('JSB', 'JSB Badminton Seniors'));
err = null;
try { await openChat(page, 'JSB', quiet); } catch (e) { err = e; }
check('refuses a near-miss chat title', err instanceof WhatsAppError, String(err));
check('names both chats in the error', /open chat is "JSB Badminton Seniors", expected "JSB"/.test(err?.message || ''), err?.message);

await page.setContent('<html><body><div>Log into WhatsApp<br>Scan the QR code</div></body></html>');
err = null;
try { await ensureLoggedIn(page); } catch (e) { err = e; }
check('refuses when the profile is not linked', err instanceof WhatsAppError, String(err));

await browser.close();
console.log(failures ? `\n${failures} FAILURE(S)` : '\nall guard checks passed');
process.exit(failures ? 1 : 0);
