import puppeteer from 'puppeteer-core';
import { setTimeout as sleep } from 'node:timers/promises';

// Rais Store is shot from production: the catalogue lives behind its API, so a static copy shows an empty shop.
const OUT = '/Users/rayen/portfillio/public/shots';
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 },
  args: ['--hide-scrollbars', '--disable-gpu', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage();
// Present as regular Chrome: the host's firewall blocked this machine after a headless run.
await page.setUserAgent((await browser.userAgent()).replace('HeadlessChrome', 'Chrome'));
await page.goto('https://raisstore.tn/', { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
await page.waitForSelector('#shop .product-card', { timeout: 30000 });
await sleep(2500);
// Leave the admin's test listing out of the frames.
const hideTest = () => page.evaluate(() => {
  for (const c of document.querySelectorAll('.product-card, .promo-card, .related-card'))
    if (/(^|\n)test(\n|$)/i.test(c.innerText)) c.remove();
});
await hideTest();

await page.screenshot({ path: `${OUT}/rais-store-1.png` });

await page.evaluate(() => document.getElementById('shop').scrollIntoView({ block: 'start', behavior: 'instant' }));
await sleep(2500);
await page.screenshot({ path: `${OUT}/rais-store-2.png` });

await page.evaluate(() => [...document.querySelectorAll('#shop .product-card')].find((c) => /Dunk Low/.test(c.innerText))?.querySelector('img')?.click());
await page.waitForSelector('.detail-modal', { visible: true, timeout: 10000 });
await sleep(2000);
await hideTest();
await page.screenshot({ path: `${OUT}/rais-store-3.png` });

await browser.close();
console.log('done');
