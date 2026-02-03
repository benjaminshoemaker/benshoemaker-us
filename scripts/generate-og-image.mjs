import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, '..', 'public', 'og-default.png');

// SVG with site's warm stone/amber palette
const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#faf8f5"/>
      <stop offset="100%" style="stop-color:#f0ebe3"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Subtle decorative accent -->
  <rect x="0" y="580" width="1200" height="50" fill="#d97706" opacity="0.9"/>

  <!-- Main text -->
  <text
    x="600"
    y="260"
    font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="72"
    font-weight="700"
    fill="#1c1917"
    text-anchor="middle"
  >Ben Shoemaker</text>

  <!-- Subtitle -->
  <text
    x="600"
    y="340"
    font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="36"
    font-weight="400"
    fill="#57534e"
    text-anchor="middle"
  >AI-Assisted Development</text>

  <!-- Website URL -->
  <text
    x="600"
    y="400"
    font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="24"
    font-weight="400"
    fill="#a8a29e"
    text-anchor="middle"
  >benshoemaker.us</text>
</svg>
`;

async function generateOgImage() {
  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log(`✓ OG image generated at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating OG image:', error);
    process.exit(1);
  }
}

generateOgImage();
