#!/usr/bin/env node
/**
 * Builds App Store screenshots from real simulator captures.
 *
 *   node build-screenshots.mjs <config.mjs>        # every shot
 *   node build-screenshots.mjs <config.mjs> 3      # only shot 3
 *
 * Each shot is an HTML page (headline, phone frame around a raw capture, floating art, chips)
 * rendered by headless Chrome at the exact canvas size, then flattened by ImageMagick to
 * 8-bit sRGB PNG with no alpha channel, which App Store Connect requires.
 * Paths in the config are relative to the config file. See examples/screenshots.config.mjs.
 *
 * Needs: Node 18+, Google Chrome (or CHROME=/path), ImageMagick 7 (or MAGICK=/path).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const MAGICK = process.env.MAGICK || 'magick';

const [configArg, onlyArg] = process.argv.slice(2);
if (!configArg) {
  console.error('usage: node build-screenshots.mjs <config.mjs> [shot number]');
  process.exit(1);
}
const configPath = resolve(configArg);
const ROOT = dirname(configPath);
const { default: cfg } = await import(pathToFileURL(configPath).href);

const W = cfg.width ?? 1320; // iPhone 6.9" portrait
const H = cfg.height ?? 2868;
const T = {
  bg: '#121219', bgDeep: '#0B0B11', text: '#F6F3EE', dim: '#A9A7B3', accent: '#F2B86B',
  displayFont: 'Georgia, serif', textFont: '-apple-system, Helvetica, sans-serif',
  ...cfg.theme,
};
const OUT = resolve(ROOT, cfg.outDir ?? 'screenshots');
const TEMPLATES = resolve(ROOT, cfg.templatesDir ?? 'templates');
const url = (p) => pathToFileURL(resolve(ROOT, p)).href;

const fontFaces = (cfg.fonts ?? [])
  .map((f) => `@font-face{font-family:'${f.family}';src:url(${url(f.src)});font-weight:${f.weight ?? 400};font-style:${f.style ?? 'normal'}}`)
  .join('\n');

function chip(c) {
  const dot = c.dot ? `<span class="dot" style="background:${c.dot}"></span>` : '';
  return `<div class="chip" style="left:${c.x}px;top:${c.y}px;transform:rotate(${c.rot ?? 0}deg)">${dot}<span>${c.text}</span></div>`;
}

function art(a) {
  const cls = ['art', a.front ? 'front' : 'back', a.glow ? 'glow' : ''].filter(Boolean).join(' ');
  return `<img class="${cls}" src="${url(a.src)}" style="left:${a.x}px;top:${a.y}px;width:${a.w}px;transform:rotate(${a.rot ?? 0}deg)">`;
}

function html(shot) {
  const phone = { w: 1040, top: 690, x: 0, rot: 0, ...shot.phone };
  const sw = phone.w;
  const sh = Math.round((sw * (cfg.captureHeight ?? H)) / (cfg.captureWidth ?? W));
  const bezel = Math.round(sw * 0.023);
  const fw = sw + bezel * 2;
  const left = Math.round((W - fw) / 2 + phone.x);
  const radius = Math.round(sw * 0.135);
  const glow = shot.glow ?? ['50% 30%', `${T.accent}33`];
  return `<!doctype html><html><head><meta charset="utf-8"><title>${shot.id}</title><style>
${fontFaces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${T.bg}}
.canvas{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:
  radial-gradient(1100px 900px at ${glow[0]}, ${glow[1]}, transparent 70%),
  linear-gradient(180deg, ${T.bg} 0%, ${T.bg} 45%, ${T.bgDeep} 100%)}
.head{position:absolute;left:0;right:0;top:${cfg.headTop ?? 170}px;text-align:center;z-index:5;padding:0 80px}
h1{font-family:${T.displayFont};font-weight:600;font-size:${cfg.titleSize ?? 136}px;line-height:1.0;letter-spacing:-3px;color:${T.text}}
h1 em{font-style:italic;color:${T.accent}}
p.sub{margin-top:34px;font-family:${T.textFont};font-weight:500;font-size:${cfg.subSize ?? 50}px;line-height:1.25;color:${T.dim}}
.phone{position:absolute;left:${left}px;top:${phone.top}px;width:${fw}px;height:${sh + bezel * 2}px;border-radius:${radius + bezel}px;
  background:#07070A;z-index:3;transform:rotate(${phone.rot}deg);transform-origin:50% 30%;
  box-shadow:0 0 0 3px #3B3A45,0 0 0 5px #1A1A21,inset 0 0 0 2px rgba(255,255,255,.10),0 80px 160px rgba(0,0,0,.6)}
.screen{position:absolute;left:${bezel}px;top:${bezel}px;width:${sw}px;height:${sh}px;border-radius:${radius}px;overflow:hidden;background:#000}
.screen img{width:100%;height:100%;display:block}
.art{position:absolute;filter:drop-shadow(0 30px 40px rgba(0,0,0,.5))}
.art.back{z-index:2}.art.front{z-index:6}
.art.glow{filter:drop-shadow(0 0 60px ${T.accent}59) drop-shadow(0 30px 40px rgba(0,0,0,.5))}
.chip{position:absolute;z-index:7;display:inline-flex;align-items:center;gap:20px;white-space:nowrap;padding:30px 46px;border-radius:999px;
  background:linear-gradient(180deg,rgba(58,57,72,.88),rgba(30,30,40,.88));border:2px solid rgba(255,255,255,.2);
  box-shadow:inset 0 2px 0 rgba(255,255,255,.18),0 30px 60px rgba(0,0,0,.5);
  font-family:${T.textFont};font-weight:600;font-size:52px;color:${T.text}}
.chip .dot{width:26px;height:26px;border-radius:50%}
</style></head><body><div class="canvas">
<div class="head"><h1>${shot.title}</h1>${shot.sub ? `<p class="sub">${shot.sub}</p>` : ''}</div>
${(shot.art ?? []).map(art).join('\n')}
<div class="phone"><div class="screen"><img src="${url(shot.raw)}"></div></div>
${(shot.chips ?? []).map(chip).join('\n')}
</div></body></html>`;
}

function render(page, out, w, h, bg) {
  const tmp = `${out}.render.png`;
  execFileSync(CHROME, ['--headless=new', '--hide-scrollbars', '--allow-file-access-from-files', '--force-device-scale-factor=1',
    `--window-size=${w},${h}`, '--virtual-time-budget=4000', `--screenshot=${tmp}`, pathToFileURL(page).href], { stdio: 'ignore' });
  // Exact size, flattened onto the page colour, 8-bit sRGB, no alpha channel.
  execFileSync(MAGICK, [tmp, '-crop', `${w}x${h}+0+0`, '+repage', '-background', bg, '-alpha', 'remove', '-alpha', 'off',
    '-colorspace', 'sRGB', '-depth', '8', `PNG24:${out}`]);
  rmSync(tmp);
}

mkdirSync(OUT, { recursive: true });
mkdirSync(TEMPLATES, { recursive: true });
const only = onlyArg ? Number(onlyArg) : null;
cfg.shots.forEach((shot, i) => {
  if (only && only !== i + 1) return;
  const page = join(TEMPLATES, `${shot.id}.html`);
  writeFileSync(page, html(shot));
  const out = join(OUT, `${shot.id}.png`);
  render(page, out, W, H, T.bg);
  console.log('wrote', out);
});

// Contact sheet, four per row.
const files = cfg.shots.map((s) => join(OUT, `${s.id}.png`));
if (files.every(existsSync)) {
  const rows = [];
  for (let i = 0; i < files.length; i += 4) {
    rows.push('(', ...files.slice(i, i + 4).flatMap((f) => ['(', f, '-resize', '440x', ')']), '+append', ')');
  }
  execFileSync(MAGICK, [...rows, '-background', T.bgDeep, '-append', '-bordercolor', T.bgDeep, '-border', '20', '-quality', '88', join(OUT, 'sheet.jpg')]);
  console.log('wrote', join(OUT, 'sheet.jpg'));
}
