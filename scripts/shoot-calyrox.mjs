import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const OUT = '/Users/rayen/portfillio/public/shots';
const srv = spawn('python3', ['-m', 'http.server', '4941', '--directory', '/Users/rayen/sport', '--bind', '127.0.0.1'], { stdio: 'ignore' });
await sleep(1200);

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 },
  args: ['--hide-scrollbars', '--disable-gpu', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage();
await page.goto('http://127.0.0.1:4941/', { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {});
await sleep(3000);
await page.click('.gate-choice[data-choice="hyrox"]').catch((e) => console.log('click fail', e.message));
await sleep(5000);
const secs = ['#hero', '#disciplines', '#courses'];
for (let i = 0; i < 3; i++) {
  await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'start', behavior: 'instant' }), secs[i]);
  await sleep(2500);
  await page.screenshot({ path: `${OUT}/calyrox-${i + 1}.png` });
}
// jiji: single reliable frame only
await browser.close(); srv.kill();
console.log('done');
