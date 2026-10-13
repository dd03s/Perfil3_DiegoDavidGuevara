const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const svgPath = path.join(__dirname, '..', 'assets', 'masterball.svg');
const outDir = path.join(__dirname, '..', 'assets');
const svgBuffer = fs.readFileSync(svgPath);

async function generateIcon() {
  const bg = await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 255, g: 194, b: 14, alpha: 1 },
    },
  }).png().toBuffer();

  const ballResized = await sharp(svgBuffer)
    .resize(820, 820)
    .png()
    .toBuffer();

  await sharp(bg)
    .composite([{ input: ballResized, top: 102, left: 102 }])
    .flatten({ background: { r: 255, g: 194, b: 14 } })
    .removeAlpha()
    .png()
    .toFile(path.join(outDir, 'icon.png'));
}

async function generateAdaptiveIcon() {
  const ballResized = await sharp(svgBuffer)
    .resize(620, 620)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: ballResized, top: 202, left: 202 }])
    .png()
    .toFile(path.join(outDir, 'adaptive-icon.png'));
}

async function generateSplashIcon() {
  await sharp(svgBuffer)
    .resize(1024, 1024)
    .png()
    .toFile(path.join(outDir, 'splash-icon.png'));
}

async function main() {
  await generateIcon();
  await generateAdaptiveIcon();
  await generateSplashIcon();
}

main();
