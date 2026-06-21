// Generates the social-share (Open Graph / Twitter) card as a real 1200x630
// JPG so shared links render a branded preview instead of a blank grey box.
// Pure-SVG -> JPG via sharp (system fonts: Georgia + Segoe UI on Windows).
//   node tools/og-card.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const W = 1200, H = 630;
const GREEN = '#0b4a38', GREEN_DK = '#07331f', GOLD = '#d4af37', CREAM = '#f6f1e6';

function card({ kicker, title, subtitle, chips }) {
  const chipW = 250, gap = 24, totalW = chips.length * chipW + (chips.length - 1) * gap;
  let x = (W - totalW) / 2;
  const chipSvg = chips.map((c) => {
    const g = `<g transform="translate(${x},470)">
      <rect width="${chipW}" height="92" rx="14" fill="#0e5a44" stroke="${GOLD}" stroke-opacity="0.35"/>
      <text x="${chipW / 2}" y="40" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-weight="700" fill="${GOLD}">${c.big}</text>
      <text x="${chipW / 2}" y="70" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="19" fill="#cfe6dc">${c.small}</text>
    </g>`;
    x += chipW + gap;
    return g;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${GREEN}"/>
        <stop offset="1" stop-color="${GREEN_DK}"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="0" width="${W}" height="8" fill="${GOLD}"/>
    <!-- brand -->
    <g transform="translate(80,72)">
      <circle cx="22" cy="16" r="22" fill="${GOLD}"/>
      <text x="22" y="26" text-anchor="middle" font-family="Georgia, serif" font-size="26" font-weight="700" fill="${GREEN_DK}">J</text>
      <text x="62" y="26" font-family="Georgia, serif" font-size="30" font-weight="700" fill="${CREAM}">Jamia<tspan fill="${GOLD}">Prep</tspan></text>
    </g>
    <text x="80" y="180" font-family="Segoe UI, sans-serif" font-size="22" letter-spacing="3" fill="${GOLD}">${kicker}</text>
    <text x="80" y="262" font-family="Georgia, serif" font-size="62" font-weight="700" fill="${CREAM}">${title[0]}</text>
    <text x="80" y="336" font-family="Georgia, serif" font-size="62" font-weight="700" fill="${CREAM}">${title[1]}</text>
    <text x="80" y="406" font-family="Segoe UI, sans-serif" font-size="27" fill="#cfe6dc">${subtitle}</text>
    ${chipSvg}
    <text x="80" y="600" font-family="Segoe UI, sans-serif" font-size="22" fill="${GOLD}">jamia-prep.vercel.app</text>
    <text x="${W - 80}" y="600" text-anchor="end" font-family="Segoe UI, sans-serif" font-size="22" fill="#9fc4b6">100% free • sign in &amp; practise</text>
  </svg>`;
}

const main = card({
  kicker: 'JAMIA MILLIA ISLAMIA ENTRANCE PREP',
  title: ['Real JMI papers.', 'Timed mocks. Free.'],
  subtitle: 'Previous-year papers for MBA · MCA · BA LLB · B.Sc · B.Com · RCA · PhD &amp; more',
  chips: [
    { big: '50+', small: 'Real JMI papers' },
    { big: '6,000+', small: 'Exam-grade questions' },
    { big: '₹0', small: 'Cost — always free' },
  ],
});

await sharp(Buffer.from(main)).jpeg({ quality: 86 }).toFile('assets/og-card.jpg');
writeFileSync('assets/og-card.svg', main);
console.log('wrote assets/og-card.jpg + assets/og-card.svg');
