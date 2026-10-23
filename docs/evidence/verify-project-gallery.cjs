const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../..');
(async () => {
  const entries = JSON.parse(fs.readFileSync(path.join(__dirname, 'project-gallery-2026-10-23.json'), 'utf8'));
  const hashes = new Set();
  for (const entry of entries) {
    const file = path.join(root, 'public', entry.src);
    const metadata = await sharp(file).metadata();
    if (metadata.width !== entry.viewport.width || metadata.height !== entry.viewport.height) throw new Error(`Wrong dimensions ${file}`);
    if (hashes.has(entry.source_original_sha256)) throw new Error(`Duplicate original ${file}`);
    hashes.add(entry.source_original_sha256);
    for (const suffix of ['.json', '.source.json']) if (!fs.existsSync(file + suffix)) throw new Error(`Missing sidecar ${file + suffix}`);
  }
  if (entries.length !== 21) throw new Error('Expected 21 assets');
  console.log(JSON.stringify({ assets: entries.length, uniqueOriginals: hashes.size, decodedDimensions: true, sidecars: true }));
})();
