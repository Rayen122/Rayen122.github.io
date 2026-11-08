import puppeteer from 'puppeteer-core';
import { setTimeout as sleep } from 'node:timers/promises';

// Glowy is shot from production: salons, reviews and slots come from its MongoDB, a static copy shows nothing.
const OUT = '/Users/rayen/portfillio/public/shots';
const BASE = 'https://glowy-beta.vercel.app';
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 },
  args: ['--hide-scrollbars', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setUserAgent((await browser.userAgent()).replace('HeadlessChrome', 'Chrome'));
// Keep the "Installer Glowy" PWA prompt out of the frames (same key its close button sets).
await page.evaluateOnNewDocument(() => localStorage.setItem('bh-install-dismissed', '1'));

const shots = [
  ['glowy-1', '/'],
  ['glowy-2', '/salons'],
  ['glowy-3', '/salons/maison-elyssa-carthage'],
  ['glowy-4', '/analyse-beaute'],
  ['glowy-5', '/essai-couleur'],
  ['glowy-6', '/pro'],
];
for (const [name, path] of shots) {
  await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
  // Let the GSAP entrances and the map tiles settle before the frame.
  await sleep(4000);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(name);
}

await browser.close();
console.log('done');
