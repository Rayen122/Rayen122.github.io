import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const OUT = '/private/tmp/claude-501/-Users-rayen-portfillio/86bc221b-1275-4511-90af-2f2c7629eed7/scratchpad/review';
const { mkdirSync } = await import('node:fs');
mkdirSync(OUT, { recursive: true });

const srv = spawn('python3', ['-m', 'http.server', '4990', '--directory', '/Users/rayen/portfillio/dist', '--bind', '127.0.0.1'], { stdio: 'ignore' });
await sleep(1200);

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
  args: ['--hide-scrollbars', '--disable-gpu'],
});
const page = await browser.newPage();
const errs = [];
page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
page.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message));
page.on('requestfailed', (r) => errs.push('404? ' + r.url()));

await page.goto('http://127.0.0.1:4990/', { waitUntil: 'networkidle2' });
await sleep(2500);

const height = await page.evaluate(() => document.body.scrollHeight);
console.log('page height', height);

const stops = [0, 900, 1800, 2700, 3600, 4600, 5600, 6600, 7600, 8800, 10000, 11200, 12400, 13600, 14800];
for (let i = 0; i < stops.length; i++) {
  if (stops[i] > height) break;
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), stops[i]);
  await sleep(1200);
  await page.screenshot({ path: `${OUT}/d-${String(i).padStart(2, '0')}.png` });
}

// mobile pass
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.reload({ waitUntil: 'networkidle2' });
await sleep(2500);
const mh = await page.evaluate(() => document.body.scrollHeight);
console.log('mobile height', mh);
const mstops = [0, 800, 1700, 2900, 4200, 5600, 7200, 9000, 11000, 13000];
for (let i = 0; i < mstops.length; i++) {
  if (mstops[i] > mh) break;
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), mstops[i]);
  await sleep(1000);
  await page.screenshot({ path: `${OUT}/m-${String(i).padStart(2, '0')}.png` });
}

console.log('--- console/network issues ---');
console.log([...new Set(errs)].slice(0, 20).join('\n') || 'none');
await browser.close(); srv.kill();
