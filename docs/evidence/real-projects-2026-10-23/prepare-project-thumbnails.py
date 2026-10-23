"""Extract authorized public screenshot assets; never fetch site source/assets."""
import base64
import hashlib
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent
PUBLIC = ROOT / 'public/images/projects'
SITES = {
    'https://ngajiyuk.sdilbanisalehsetu.com/': ('ngajiyuk', 'Ngaji Yuk! · SD Islam Labschool Bani Saleh', 'Platform pendampingan Tahsin & Tahfidz'),
    'https://ipnubekasi.my.id/': ('ipnubekasi', 'IPNU IPPNU Kota Bekasi', 'Portal organisasi dan berita'),
    'https://www.batualamsupplier.com/': ('batu-alam-supplier', 'Fazmastone / Batu Alam Supplier', 'Profil pemasok dan katalog batu alam'),
    'https://www.fazmastone.com/': ('fazmastone', 'Fazmastone Supplier Batu Alam', 'Katalog dan toko batu alam'),
    'https://cimuning.com/': ('cimuning', 'Cimuning Digital Hub', 'Direktori UMKM dan katalog produk'),
    'https://mahamerubaja.vercel.app/': ('mahameru-baja', 'MBI Laser Cutting · Mahameru Baja Indonesia', 'Profil perusahaan dan jasa industri'),
    'https://sitpermatahati.up.railway.app/': ('sit-permatahati', 'SIT Permata Hati Bekasi', 'Profil sekolah Islam terpadu'),
}
bundle = json.loads((OUT / 'rea-evidence-bundle.json').read_text(encoding='utf8'))
selected = {}
for record in bundle['records']:
    url = record['parameters']['start_url']['url']
    if url not in SITES and url != 'https://jayszrs.my.id/':
        continue
    steps = record['normalized_result']['steps']
    artifact = steps[-1]['artifacts']['screenshot']['value']
    clean = any(step['step_id'] == 'dismiss-public-first-visit-overlay' for step in steps)
    slug = SITES[url][0] if url in SITES else 'jayszrs-footer'
    source = OUT / f'{slug}{"-clean" if clean else ""}.png'
    source.write_bytes(base64.b64decode(artifact['data_base64']))
    current = selected.get(url)
    if current and current['clean'] and not clean:
        continue
    selected[url] = {'record': record, 'source': source, 'clean': clean}

manifest = []
for url, (slug, title, kind) in SITES.items():
    chosen = selected.get(url)
    if chosen:
        record = chosen['record']
        original = chosen['source']
        evidence_id = record['evidence_id']
        provider = 'REA controlled browser scenario (Chromium / Playwright)'
        actual_url = record['normalized_result']['steps'][-1]['after_url']['url']
        actions = [a['step_id'] for a in record['parameters']['actions']]
        observation = 'Normal public landing, after visible first-visit overlay dismissal.' if chosen['clean'] else 'Normal public landing; no interactions or forms.'
    else:
        fallback = json.loads((OUT / 'ngajiyuk-fallback.json').read_text(encoding='utf8'))
        if slug != 'ngajiyuk' or fallback['result'] != 'captured':
            raise RuntimeError(f'No permitted screenshot for {url}')
        original = OUT / fallback['screenshot']
        evidence_id = 'fallback-ngajiyuk-2026-10-23T02:05:18.365Z'
        provider = fallback['provider']
        actual_url = fallback['actualUrl']
        actions = fallback['actions']
        observation = 'Public marketing landing captured by fallback after REA initial navigation failure; no login or student records.'
    dest = PUBLIC / f'{slug}.webp'
    Image.open(original).convert('RGB').save(dest, 'WEBP', quality=91, method=6)
    sidecar = {
        'asset_type': 'actual-public-website-screenshot',
        'generated': False,
        'source_original': str(original.relative_to(ROOT)).replace('\\', '/'),
        'source_original_sha256': hashlib.sha256(original.read_bytes()).hexdigest(),
        'source_url': url,
        'actual_url': actual_url,
        'observed_name': title,
        'observed_type': kind,
        'captured_date': '2026-10-23',
        'capture_provider': provider,
        'evidence_id': evidence_id,
        'viewport': {'width': 1440, 'height': 1000, 'device_scale_factor': 1},
        'capture_scope': observation,
        'actions': actions,
        'permission_basis': 'User states ownership of this website and authorizes actual public screenshot use for their portfolio.',
        'attribution': f'Website screenshot from {url}; website ownership asserted by the user. This provenance record does not independently verify ownership or third-party asset licenses.',
        'transformations': ['PNG screenshot converted to WebP; unchanged 1440x1000 viewport composition'],
        'technology_verified': [],
        'technology_unverified': ['Framework', 'CMS', 'Database', 'Hosting configuration', 'Authentication implementation'],
    }
    dest.with_suffix('.webp.source.json').write_text(json.dumps(sidecar, ensure_ascii=False, indent=2), encoding='utf8')
    manifest.append({**sidecar, 'slug': slug, 'thumbnail_path': '/images/projects/' + dest.name, 'status': 'available'})

(OUT / 'project-screenshots.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf8')
print(json.dumps([{'slug': p['slug'], 'path': p['thumbnail_path'], 'evidence_id': p['evidence_id']} for p in manifest], indent=2))
