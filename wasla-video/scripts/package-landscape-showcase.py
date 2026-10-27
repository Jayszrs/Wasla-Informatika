from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/wasla-landscape-showcase-v2-27s6-project.zip'
include=['src','public','scripts','.agents','package.json','package-lock.json','video-spec.json','remotion.config.ts','tsconfig.json','eslint.config.mjs','.prettierrc','.gitignore','requirements-audio.txt','skills-lock.json','README.md','REEL.md','REEL-QA.md','MOTION-REFERENCE.md','MOTION-QA.md','SALES-15S.md','GEOMETRIC-9S.md','LANDSCAPE-REFERENCE.md','LANDSCAPE-QA.md','SALES-V2.md','SALES-AUDIO-V3.md','LANDSCAPE-SHOWCASE-V2.md','HIGGSFIELD-LANDSCAPE-BRIEF.md','NARASI.md','ASSETS.md','QA.md']
files=[]
for name in include:
 p=ROOT/name
 files.extend([f for f in p.rglob('*') if f.is_file() and '__pycache__' not in f.parts] if p.is_dir() else [p])
with ZipFile(OUT,'w',ZIP_DEFLATED,compresslevel=6) as z:
 for f in files:z.write(f,Path('wasla-video')/f.relative_to(ROOT))
 for name in ['landscape-showcase-v2-preview.jpg','landscape-showcase-v2-poster.jpg','landscape-showcase-v2-verification.json','landscape-showcase-v2-ffprobe.json','landscape-showcase-v2-audio-verification.json','landscape-showcase-v2-audio-preservation.json','landscape-loudness.log','landscape-showcase-v2-playback.png']:
  f=ROOT/'output'/name
  if f.exists():z.write(f,Path('wasla-video/output')/name)
with ZipFile(OUT) as z:
 assert z.testzip() is None
 assert 'wasla-video/src/WaslaLandscapePromo.tsx' in z.namelist()
 assert 'wasla-video/public/audio/reel/user-sound.mp3' in z.namelist()
 assert 'wasla-video/public/audio/reel/music-landscape-27s6.wav' in z.namelist()
 assert not any('pinterest-reference.mp4' in p for p in z.namelist())
print(f'Verified source ZIP: {len(files)} files, {OUT.stat().st_size:,} bytes')
