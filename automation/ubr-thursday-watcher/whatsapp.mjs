// Posts a message to a WhatsApp Web group in the user's already-signed-in Chrome.
//
// WhatsApp Web's DOM is volatile, so every lookup tries a list of candidates and falls back
// to a structural rule (the composer is the contenteditable inside <footer>, the search box
// is the one outside #main). Nothing is ever typed until the open chat's header title is an
// exact match for the configured group -- posting into the wrong group is not undoable.

export class WhatsAppError extends Error {}

const SEARCH_SELECTORS = [
  'div[contenteditable="true"][data-tab="3"]',
  '[aria-label="Search input textbox"]',
  '#side div[contenteditable="true"]',
];

export async function getWhatsAppPage(browser, log) {
  for (const ctx of browser.contexts()) {
    for (const p of ctx.pages()) {
      if (p.url().includes('web.whatsapp.com')) {
        log('whatsapp: reusing existing tab');
        await p.bringToFront().catch(() => {});
        return p;
      }
    }
  }
  const ctx = browser.contexts()[0];
  if (!ctx) throw new WhatsAppError('Chrome exposed no browser context over CDP.');
  log('whatsapp: opening a new tab');
  const page = await ctx.newPage();
  await page.goto('https://web.whatsapp.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  return page;
}

export async function ensureLoggedIn(page) {
  await page.waitForSelector('#pane-side, canvas[aria-label*="scan"], canvas', { timeout: 60000 }).catch(() => {});
  const state = await page.evaluate(() => {
    if (document.querySelector('#pane-side')) return 'ready';
    const t = (document.body.innerText || '').toLowerCase();
    if (t.includes('log into whatsapp') || t.includes('scan the qr') || t.includes('link a device')) return 'qr';
    return 'unknown';
  });
  if (state !== 'ready') {
    throw new WhatsAppError(
      'WhatsApp Web is not logged in in this Chrome profile (QR/link-device screen). ' +
      'Link it once by hand, then re-run.'
    );
  }
}

export async function openChat(page, group, log) {
  // Direct hit in the sidebar first -- avoids disturbing the search box entirely.
  const direct = page.locator(`#pane-side span[title="${group.replace(/"/g, '\\"')}"]`).first();
  if (await direct.count().catch(() => 0)) {
    await direct.click({ timeout: 10000 });
  } else {
    log('whatsapp: chat not visible in sidebar, searching');
    let search = null;
    for (const sel of SEARCH_SELECTORS) {
      const loc = page.locator(sel).first();
      if (await loc.count().catch(() => 0)) { search = loc; break; }
    }
    if (!search) throw new WhatsAppError('Could not locate the WhatsApp search box.');
    await search.click({ timeout: 10000 });
    await page.keyboard.press('Control+A').catch(() => {});
    await search.fill?.('').catch(() => {});
    await page.keyboard.type(group, { delay: 40 });
    await page.waitForTimeout(1500);
    const hit = page.locator(`#pane-side span[title="${group.replace(/"/g, '\\"')}"]`).first();
    await hit.waitFor({ state: 'visible', timeout: 10000 });
    await hit.click();
  }
  await page.waitForSelector('#main', { timeout: 15000 });
  await page.waitForTimeout(800);

  const title = await page.evaluate(() => {
    const el = document.querySelector('#main header span[title]');
    return el ? el.getAttribute('title') : null;
  });
  if (!title || title.trim() !== group.trim()) {
    throw new WhatsAppError(`Refusing to send: open chat is "${title}", expected "${group}".`);
  }
  log(`whatsapp: chat "${title}" open and verified`);
}

async function typeAndSend(page, message) {
  const composer = page.locator('#main footer div[contenteditable="true"]').first();
  await composer.waitFor({ state: 'visible', timeout: 15000 });
  await composer.click();

  // Enter sends, so newlines have to go in as Shift+Enter.
  const lines = message.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (i) await page.keyboard.press('Shift+Enter');
    if (lines[i]) await page.keyboard.type(lines[i], { delay: 12 });
  }
  await page.waitForTimeout(300);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2500);

  const probe = lines.find((l) => l.trim().length > 12)?.trim().slice(0, 40);
  if (!probe) return true;
  const landed = await page.evaluate((needle) => {
    const rows = [...document.querySelectorAll('#main div[role="row"]')].slice(-6);
    return rows.some((r) => (r.innerText || '').includes(needle));
  }, probe);
  if (!landed) throw new WhatsAppError('Sent the message but could not confirm it in the chat transcript.');
  return true;
}

export async function postToGroup(browser, cfg, message, { dryRun }, log) {
  if (dryRun) {
    log('DRY RUN -- message not sent:\n' + message);
    return { sent: false, dryRun: true };
  }
  const page = await getWhatsAppPage(browser, log);
  await ensureLoggedIn(page);
  await openChat(page, cfg.whatsappGroup, log);
  await typeAndSend(page, message);
  log(`whatsapp: posted to "${cfg.whatsappGroup}"`);
  return { sent: true };
}
