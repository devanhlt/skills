// Example config for build-screenshots.mjs and build-creative.mjs.
// Copy it into your project (e.g. store/screenshots.config.mjs) next to your raw captures and art.
// Paths are relative to this file. Coordinates are px on the 1320x2868 canvas (top-left corner).

export default {
  width: 1320, // iPhone 6.9" portrait. Use 2064 x 2752 for iPad 13".
  height: 2868,
  outDir: 'screenshots',
  templatesDir: 'templates',
  creativeDir: 'creative',

  // Your app's own tokens and fonts, so the store art matches the product.
  theme: {
    bg: '#121219',
    bgDeep: '#0B0B11',
    text: '#F6F3EE',
    dim: '#A9A7B3',
    accent: '#F2B86B',
    displayFont: "'Display'",
    textFont: "'Text'",
  },
  fonts: [
    { family: 'Display', src: 'fonts/Display-SemiBold.ttf', weight: 600 },
    { family: 'Display', src: 'fonts/Display-SemiBoldItalic.ttf', weight: 600, style: 'italic' },
    { family: 'Text', src: 'fonts/Text-Medium.ttf', weight: 500 },
    { family: 'Text', src: 'fonts/Text-SemiBold.ttf', weight: 600 },
  ],

  // Up to 10, in story order. The first 3 also appear in search results.
  shots: [
    {
      id: '01-home',
      raw: 'raw/home.png', // a real simulator capture, 1320x2868
      title: 'Your one-line<br><em>promise</em>', // <em> takes the accent colour and italic
      sub: 'The benefit, in plain words',
      glow: ['50% 30%', 'rgba(242,184,107,0.20)'],
      phone: { w: 1040, top: 690, rot: 0 },
      art: [{ src: 'art/mascot.webp', x: -80, y: 1080, w: 440, rot: -8, front: true }],
      chips: [{ text: 'Real feature name', x: 770, y: 1960, rot: 6 }],
    },
    {
      id: '02-feature',
      raw: 'raw/feature.png',
      title: 'Second<br><em>strongest</em> feature',
      phone: { w: 1000, top: 700, x: 40, rot: 2 },
    },
  ],

  // build-creative.mjs
  header: {
    size: [5244, 2950], // universal 16:9 PNG; or [3840, 1646] for a header-only 21:9 asset
    // One clear idea inside the safe area (1402x962 at 1921,660); decoration toward the edges.
    art: [
      { src: 'art/hero-object.webp', x: 2182, y: 600, w: 880, glow: true },
      { src: 'art/mascot.webp', x: 2322, y: 1160, w: 600, rot: -4, z: 3 },
    ],
  },
  search: {
    size: [3840, 2560],
    title: 'Your app in <em>four words</em>',
    screens: ['raw/feature.png', 'raw/home.png', 'raw/other.png'], // the middle one sits in front
  },
};
