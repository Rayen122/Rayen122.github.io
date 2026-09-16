import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = '/Users/rayen/portfillio/public/shots';
mkdirSync(OUT, { recursive: true });

// key, dir (or url), port, path, server type, scroll offsets for the 3 frames
const TARGETS = [
  { key: 'rais-store', dir: '/Users/rayen/site rais',                 port: 4901, scrolls: [0, 900, 2200] },
  { key: 'farhty',     url: 'https://farhty.vercel.app',              scrolls: [0, 800, 1800] },
  { key: 'hydro',      dir: '/Users/rayen/Desktop/HYDR-project/site', port: 4902, php: true, scrolls: [0, 1000, 2400] },
  { key: 'calyrox',    dir: '/Users/rayen/sport',                     port: 4903, scrolls: [0, 900, 2000] },
  { key: 'palvina',    dir: '/Users/rayen/palvina/dist',              port: 4904, scrolls: [0, 900, 2000] },
  { key: 'jiji',       dir: '/Users/rayen/jiji/out/renderer',         port: 4905, scrolls: [0, 0, 0] },
  { key: 'mayastyle',  dir: '/Users/rayen/mayastyle/dist',            port: 4906, scrolls: [0, 1100, 2400] },
  { key: 'sashastyle', dir: '/Users/rayen/sashastyle/dist',           port: 4907, scrolls: [0, 900, 2000] },
  { key: 'parfum',     dir: '/Users/rayen/parfum/out',                port: 4908, scrolls: [0, 900, 2000] },
  { key: 'zouza',      dir: '/Users/rayen/zouza',                     port: 4909, scrolls: [0, 1200, 2600] },
  { key: 'autocar',    dir: '/Users/rayen/autocar',                   port: 4910, scrolls: [0, 1000, 2200] },
  { key: 'resto',      dir: '/Users/rayen/resto',                     port: 4911, scrolls: [0, 900, 2000] },
  { key: 'rodayne',    dir: '/Users/rayen/rodayne',                   port: 4912, path: '/roudayna_redesign.html', scrolls: [0, 1000, 2200] },
  { key: 'isp',        dir: '/Users/rayen/Desktop/isp copie/isp-automation-website', port: 4913, php: true, path: '/index.php', scrolls: [0, 1100, 2600] },
];

function serve(t) {
  if (!t.dir) return null;
  const p = t.php
    ? spawn('/opt/homebrew/bin/php', ['-S', `127.0.0.1:${t.port}`, '-t', t.dir], { stdio: 'ignore' })
    : spawn('python3', ['-m', 'http.server', String(t.port), '--directory', t.dir, '--bind', '127.0.0.1'], { stdio: 'ignore' });
  return p;
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 },
  args: ['--hide-scrollbars', '--disable-gpu', '--autoplay-policy=no-user-gesture-required'],
});

const only = process.env.ONLY
for (const t of TARGETS) {
  if (only && t.key !== only) continue
  const srv = serve(t);
  if (srv) await sleep(1200);
  const url = t.url ?? `http://127.0.0.1:${t.port}${t.path ?? '/'}`;
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {});
    await sleep(2500);
    // dismiss common overlays / language gates
    await page.evaluate(() => {
      for (const b of document.querySelectorAll('button, a, [role=button]')) {
        const s = (b.textContent || '').trim().toLowerCase();
        if (/^(français|francais|fr|accepter|j'accepte|accept|ok|entrer|continuer)$/.test(s)) { b.click(); break; }
      }
    }).catch(() => {});
    await sleep(1500);
    for (let i = 0; i < t.scrolls.length; i++) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), t.scrolls[i]);
      await sleep(1800);
      await page.screenshot({ path: `${OUT}/${t.key}-${i + 1}.png` });
    }
    console.log('OK  ', t.key);
  } catch (e) {
    console.log('FAIL', t.key, e.message);
  }
  await page.close();
  if (srv) srv.kill();
  await sleep(300);
}
await browser.close();
