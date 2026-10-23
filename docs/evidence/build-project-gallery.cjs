const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');

const root = path.resolve(__dirname, '../..');
const evidenceDir = path.join(__dirname, 'project-gallery-2026-10-23');
const assetsDir = path.join(root, 'public/images/projects/gallery');
fs.mkdirSync(evidenceDir, { recursive: true });
fs.mkdirSync(assetsDir, { recursive: true });
const bundle = JSON.parse(fs.readFileSync(path.join(__dirname, 'project-gallery-2026-10-23-rea.json'), 'utf8'));
const projects = [
  ['ngajiyuk', 'Ngaji Yuk!', 'https://ngajiyuk.sdilbanisalehsetu.com/'],
  ['ipnubekasi', 'IPNU IPPNU Kota Bekasi', 'https://ipnubekasi.my.id/'],
  ['batu-alam-supplier', 'Batu Alam Supplier', 'https://www.batualamsupplier.com/'],
  ['fazmastone', 'Fazmastone', 'https://www.fazmastone.com/'],
  ['cimuning', 'Cimuning Digital Hub', 'https://cimuning.com/'],
  ['mahameru-baja', 'Mahameru Baja Indonesia', 'https://mahamerubaja.vercel.app/'],
  ['sit-permatahati', 'SIT Permata Hati Bekasi', 'https://sitpermatahati.up.railway.app/'],
];
const hash = b => crypto.createHash('sha256').update(b).digest('hex');

(async () => {
  const manifest = [];
  for (const [slug, title, url] of projects) {
    for (const variant of ['detail-1', 'detail-2', 'mobile']) {
      const mobile = variant === 'mobile';
      const record = bundle.records.filter(r => r.parameters?.start_url?.url === url && r.parameters.environment.viewport.width === (mobile ? 390 : 1440) && r.normalized_result.steps.some(s => s.step_id === (mobile ? 'mobile-root' : variant))).sort((a,b) => b.parameters.actions.length - a.parameters.actions.length)[0];
      if (!record) throw new Error(`Missing REA record: ${slug} ${variant}`);
      const step = record.normalized_result.steps.find(s => s.step_id === (mobile ? 'mobile-root' : variant));
      if (!step || step.status !== 'completed' || step.artifacts.screenshot.state !== 'captured') throw new Error(`Missing screenshot ${slug} ${variant}`);
      const artifact = step.artifacts.screenshot.value;
      const png = Buffer.from(artifact.data_base64, 'base64');
      if (hash(png) !== artifact.sha256) throw new Error(`PNG digest mismatch ${slug} ${variant}`);
      const file = `${slug}-${variant}`;
      fs.writeFileSync(path.join(evidenceDir, `${file}.png`), png);
      await sharp(png).webp({ quality: 90, effort: 5 }).toFile(path.join(assetsDir, `${file}.webp`));
      const entry = {
        slug, title, variant,
        caption: mobile ? `Tampilan beranda ${title} di perangkat mobile.` : `Bagian beranda ${title}, tampilan desktop ${variant.endsWith('1') ? 'pertama' : 'kedua'}.`,
        src: `/images/projects/gallery/${file}.webp`,
        source_url: url,
        actual_url: step.after_url.url,
        asset_type: 'actual-public-website-screenshot',
        generated: false,
        captured_date: '2026-10-23',
        capture_provider: 'REA controlled browser scenario (Chromium / Playwright)',
        evidence_id: record.evidence_id,
        evidence_bundle: 'docs/evidence/project-gallery-2026-10-23-rea.json',
        evidence_step: step.step_id,
        source_original: `docs/evidence/project-gallery-2026-10-23/${file}.png`,
        source_original_sha256: artifact.sha256,
        viewport: record.parameters.environment.viewport,
        capture_scope: mobile ? 'Public root at mobile viewport after ordinary visible overlay dismissal where applicable.' : 'Public root lower section reached with ordinary PageDown keys. No DOM/style edits.',
        actions: record.parameters.actions.filter(a => record.parameters.actions.findIndex(x => x.step_id === a.step_id) <= record.parameters.actions.findIndex(x => x.step_id === step.step_id)),
        transformations: ['PNG screenshot converted to WebP; unchanged viewport composition'],
        permission_basis: 'User states ownership of this website and authorizes actual public screenshot use for their portfolio.',
        limitations: ['Public page only. No authentication, private dashboards, or form submission.', 'Fixed settling wait is not proof every remote asset loaded.', 'Technology stack and third-party asset licensing were not independently verified.'],
      };
      manifest.push(entry);
      fs.writeFileSync(path.join(assetsDir, `${file}.webp.source.json`), JSON.stringify(entry, null, 2) + '\n');
    }
  }
  fs.writeFileSync(path.join(__dirname, 'project-gallery-2026-10-23.json'), JSON.stringify(manifest, null, 2) + '\n');
  fs.writeFileSync(path.join(assetsDir, 'provenance.json'), JSON.stringify(manifest, null, 2) + '\n');
  for (let i = 0; i < projects.length; i++) {
    const group = manifest.filter(x => x.slug === projects[i][0]);
    const tiles = [];
    let x = 0;
    for (const entry of group) {
      const data = await sharp(path.join(root, 'public', entry.src)).resize({ width: entry.variant === 'mobile' ? 234 : 576 }).toBuffer();
      tiles.push({ input: data, left: x, top: 0 });
      x += entry.variant === 'mobile' ? 234 : 576;
    }
    await sharp({ create: { width: 1386, height: 600, channels: 3, background: '#dddddd' } }).composite(tiles).png().toFile(path.join(evidenceDir, `${projects[i][0]}-review.png`));
  }
  console.log(JSON.stringify({ assets: manifest.length, manifest: 'docs/evidence/project-gallery-2026-10-23.json', projects: projects.map(p => p[0]) }));
})();
