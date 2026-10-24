import puppeteer from 'puppeteer-core';
import { setTimeout as sleep } from 'node:timers/promises';

// Rais Store back-office, shot from the local stack (`./start.sh` in the shop's repo) on its seed admin:
// production holds real customers. Usage: RAIS_ADMIN_PASSWORD=… node scripts/shoot-rais-admin.mjs
const OUT = '/Users/rayen/portfillio/public/shots';
const ADMIN = 'http://localhost:8123/admin/';
const password = process.env.RAIS_ADMIN_PASSWORD;
if (!password) { console.error('RAIS_ADMIN_PASSWORD is not set'); process.exit(1); }

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 },
  args: ['--hide-scrollbars', '--disable-gpu'],
});
const page = await browser.newPage();
await page.goto(ADMIN, { waitUntil: 'networkidle2' });
await page.type('#login-password', password);
await page.click('#login-form [type=submit]');
await page.waitForSelector('#login-view', { hidden: true, timeout: 15000 });
await sleep(2500);

const show = async (view) => {
  await page.click(`aside a[href="#${view}"]`);
  await sleep(2500);
};
const shot = (n) => page.screenshot({ path: `${OUT}/raisstore-admin-${n}.png` });

await shot(1); // dashboard

await show('products');
// Leave the seed's test listing out of the frame.
await page.evaluate(() => { for (const r of document.querySelectorAll('tr')) if (/^\s*testproduit/i.test(r.innerText)) r.remove(); });
await shot(2);

await page.evaluate(() => {
  const row = [...document.querySelectorAll('tr')].find((r) => /Dunk Low/.test(r.innerText));
  [...row.querySelectorAll('button')].find((b) => /Modifier/.test(b.innerText)).click();
});
await page.waitForSelector('#product-modal', { visible: true });
await sleep(1500);
await shot(3);
await page.click('#close-product-modal');

// Customer details are test fixtures and the owner's own: blur those columns.
const blurColumns = (pattern) => page.evaluate((source) => {
  const re = new RegExp(source, 'i');
  for (const table of document.querySelectorAll('table')) {
    [...table.querySelectorAll('th')].forEach((th, col) => {
      if (!re.test(th.innerText)) return;
      for (const td of table.querySelectorAll(`td:nth-child(${col + 1})`)) td.style.filter = 'blur(6px)';
    });
  }
}, pattern.source);

await show('orders');
await blurColumns(/^client$/);
await shot(4);

await show('promos');
await shot(5);

await show('customers');
await blurColumns(/^(nom|téléphone|email)$/);
await shot(6);

await show('reviews');
await blurColumns(/^client$/);
await shot(7);

await show('settings');
await page.evaluate(() => {
  for (const label of document.querySelectorAll('label'))
    if (/whatsapp/i.test(label.innerText)) {
      // The label's example is the owner's own number too.
      label.innerHTML = label.innerHTML.replace(/\d{8,}/, '<span style="filter: blur(5px)">$&</span>');
      label.parentElement.querySelector('input').style.filter = 'blur(6px)';
    }
});
await shot(8);

await browser.close();
console.log('done');
