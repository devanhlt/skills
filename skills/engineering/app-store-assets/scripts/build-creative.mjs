#!/usr/bin/env node
/**
 * Builds the App Store product page creative assets: the Header and the Search Results asset.
 *
 *   node build-creative.mjs <config.mjs>            # writes <outDir>/header.png, search-results.png
 *   node build-creative.mjs <config.mjs> --guides   # also writes *-guides.png with the safe area outlined
 *
 * Header:  universal 16:9, 5244x2950 PNG (fills the header and, if you like, search too)
 *          or set header.size to [3840, 1646] for the dedicated 21:9 header.
 * Search:  3:2, 3840x2560 (anything from 1920x1280 up is accepted).
 * Safe areas default to rectangles measured from Apple's templates (Oct 2026); confirm in the
 * App Store Connect Preview tool. Same render path as build-screenshots.mjs: Chrome, then an
 * ImageMagick flatten to RGB with no alpha.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const MAGICK = process.env.MAGICK || 'magick';
const GUIDES = process.argv.includes('--guides');
const configArg = process.argv.slice(2).find((a) => !a.startsWith('--'));
if (!configArg) {
  console.error('usage: node build-creative.mjs <config.mjs> [--guides]');
  process.exit(1);
}
const configPath = resolve(configArg);
const ROOT = dirname(configPath);
const { default: cfg } = await import(pathToFileURL(configPath).href);
const T = { bg: '#121219', bgDeep: '#0B0B11', text: '#F6F3EE', accent: '#F2B86B', displayFont: 'Georgia, serif', ...cfg.theme };
const OUT = resolve(ROOT, cfg.creativeDir ?? 'creative');
const url = (p) => pathToFileURL(resolve(ROOT, p)).href;
const fontFaces = (cfg.fonts ?? [])
  .map((f) => `@font-face{font-family:'${f.family}';src:url(${url(f.src)});font-weight:${f.weight ?? 400};font-style:${f.style ?? 'normal'}}`)
  .join('\n');

const SAFE = {
  '5244x2950': [1402, 962, 1921, 660],
  '3840x2560': [2168, 1030, 836, 765],
};

const img = (a) =>
  `<img class="art${a.glow ? ' glow' : ''}" src="${url(a.src)}" style="left:${a.x}px;top:${a.y}px;width:${a.w}px;transform:rotate(${a.rot ?? 0}deg);z-index:${a.z ?? 2}">`;

function page(w, h, body, safe, css = '') {
  const guide = GUIDES && safe ? `<div class="guide" style="width:${safe[0]}px;height:${safe[1]}px;left:${safe[2]}px;top:${safe[3]}px"></div>` : '';
  return `<!doctype html><html><head><meta charset="utf-8"><style>${fontFaces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${w}px;height:${h}px;overflow:hidden;background:${T.bg}}
.canvas{position:relative;width:${w}px;height:${h}px;overflow:hidden;background:
  radial-gradient(${Math.round(w * 0.3)}px ${Math.round(h * 0.4)}px at 50% 50%, ${T.accent}40, transparent 70%),
  linear-gradient(180deg, ${T.bg} 0%, ${T.bg} 55%, ${T.bgDeep} 100%)}
.art{position:absolute;filter:drop-shadow(0 40px 60px rgba(0,0,0,.55))}
.art.glow{filter:drop-shadow(0 0 140px ${T.accent}80)}
.guide{position:absolute;z-index:99;border:8px dashed #ff3b6b}
${css}</style></head><body><div class="canvas">${body}${guide}</div></body></html>`;
}

function header() {
  const [W, H] = cfg.header.size ?? [5244, 2950];
  const safe = cfg.header.safe ?? SAFE[`${W}x${H}`] ?? [Math.round(W * 0.5), Math.round(H * 0.6), Math.round(W * 0.25), Math.round(H * 0.2)];
  return { name: 'header', W, H, html: page(W, H, (cfg.header.art ?? []).map(img).join('\n'), safe) };
}

function search() {
  const [W, H] = cfg.search.size ?? [3840, 2560];
  const safe = cfg.search.safe ?? SAFE[`${W}x${H}`];
  const sw = cfg.search.phoneWidth ?? 760;
  const sh = Math.round((sw * 2868) / 1320);
  const bez = 20;
  const r = Math.round(sw * 0.135);
  const n = cfg.search.screens.length;
  const gap = cfg.search.gap ?? 900;
  const phones = cfg.search.screens
    .map((raw, i) => {
      const off = (i - (n - 1) / 2) * gap;
      const rot = n > 1 ? (i - (n - 1) / 2) * 6 : 0;
      const centre = i === Math.floor(n / 2);
      return `<div class="phone" style="left:${W / 2 - (sw + bez * 2) / 2 + off}px;top:${cfg.search.phoneTop ?? (centre ? 1060 : 1140)}px;transform:rotate(${rot}deg);z-index:${centre ? 4 : 3}"><div class="screen"><img src="${url(raw)}"></div></div>`;
    })
    .join('\n');
  const css = `
.head{position:absolute;left:0;right:0;top:${cfg.search.headTop ?? 770}px;text-align:center;z-index:5}
h1{font-family:${T.displayFont};font-weight:600;font-size:200px;line-height:1;letter-spacing:-5px;color:${T.text}}
h1 em{font-style:italic;color:${T.accent}}
.phone{position:absolute;width:${sw + bez * 2}px;height:${sh + bez * 2}px;border-radius:${r + bez}px;background:#07070A;transform-origin:50% 30%;
  box-shadow:0 0 0 4px #3B3A45,0 0 0 7px #1A1A21,0 90px 180px rgba(0,0,0,.7)}
.screen{position:absolute;left:${bez}px;top:${bez}px;width:${sw}px;height:${sh}px;border-radius:${r}px;overflow:hidden}
.screen img{width:100%;height:100%;display:block}`;
  const body = `<div class="head"><h1>${cfg.search.title}</h1></div>${(cfg.search.art ?? []).map(img).join('\n')}${phones}`;
  return { name: 'search-results', W, H, html: page(W, H, body, safe, css) };
}

mkdirSync(OUT, { recursive: true });
const jobs = [cfg.header && header(), cfg.search && search()].filter(Boolean);
for (const a of jobs) {
  const file = join(OUT, `.${a.name}.html`);
  writeFileSync(file, a.html);
  const tmp = join(OUT, `.${a.name}.render.png`);
  execFileSync(CHROME, ['--headless=new', '--hide-scrollbars', '--allow-file-access-from-files', '--force-device-scale-factor=1',
    `--window-size=${a.W},${a.H}`, '--virtual-time-budget=5000', `--screenshot=${tmp}`, pathToFileURL(file).href], { stdio: 'ignore' });
  const out = join(OUT, `${a.name}${GUIDES ? '-guides' : ''}.png`);
  execFileSync(MAGICK, [tmp, '-crop', `${a.W}x${a.H}+0+0`, '+repage', '-background', T.bg, '-alpha', 'remove', '-alpha', 'off',
    '-colorspace', 'sRGB', '-depth', '8', `PNG24:${out}`]);
  rmSync(tmp);
  rmSync(file);
  console.log('wrote', out);
}
