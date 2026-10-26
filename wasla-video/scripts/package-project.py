"""Bundle only project sources and public assets, without dependencies or secrets."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

ROOT=Path(__file__).resolve().parents[1]
OUTPUT=ROOT/'output/wasla-video-portfolio-60s-project.zip'
INCLUDE=['src','public','scripts','.agents','package.json','package-lock.json','video-spec.json','remotion.config.ts','tsconfig.json','eslint.config.mjs','.prettierrc','.gitignore','requirements-audio.txt','skills-lock.json','README.md','NARASI.md','ASSETS.md','QA.md']
files=[]
for item in INCLUDE:
 p=ROOT/item
 files.extend([f for f in p.rglob('*') if f.is_file() and '__pycache__' not in f.parts] if p.is_dir() else [p])
with ZipFile(OUTPUT,'w',ZIP_DEFLATED,compresslevel=6) as archive:
 for file in files:archive.write(file,Path('wasla-video')/file.relative_to(ROOT))
 for item in ['verification.json','ffprobe.json','audio-mix-60s.json','poster-60s.jpg','preview-portfolio-60s.jpg','playback-60s.png']:
  file=ROOT/'output'/item
  if file.exists():archive.write(file,Path('wasla-video/output')/item)
with ZipFile(OUTPUT) as archive:
 assert archive.testzip() is None
 assert 'wasla-video/src/film/PortfolioScene.tsx' in archive.namelist()
 assert 'wasla-video/public/audio/v2/scene-09.wav' in archive.namelist()
 assert 'wasla-video/video-spec.json' in archive.namelist()
print(f'Verified ZIP: {len(files)} files, {OUTPUT.stat().st_size:,} bytes')
