"""Inspect actual encoded MP4 frames; produces visual QA artifacts."""
from pathlib import Path
from PIL import Image, ImageDraw
import subprocess

ROOT=Path(__file__).resolve().parents[1]
FF=ROOT/'node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe'
VIDEO=ROOT/'output/wasla-landscape-reference-27s6.mp4'
OUT=ROOT/'output/landscape-review/encoded'
OUT.mkdir(parents=True,exist_ok=True)
frames=[0,48,115,185,250,340,410,485,565,630,680,750,825,895,975,1060,1145,1205,1260,1325,1400,1475,1530,1590,1655]
for f in frames:
    subprocess.run([str(FF),'-v','error','-y','-ss',str(f/60),'-i',str(VIDEO),'-frames:v','1',str(OUT/f'frame-{f:04}.png')],check=True)
canvas=Image.new('RGB',(1920,7*290),'#ddd')
for i,f in enumerate(frames):
    im=Image.open(OUT/f'frame-{f:04}.png').convert('RGB').resize((480,270))
    x=i%4*480;y=i//4*290
    canvas.paste(im,(x,y));ImageDraw.Draw(canvas).text((x+8,y+274),f'{f/60:.3f}s / frame {f}',fill='black')
canvas.save(ROOT/'output/landscape-final-contact.jpg',quality=94)
preview=Image.new('RGB',(1440,540),'#0C0D0E')
for i,f in enumerate([185,340,485,825,1325,1590]):
    preview.paste(Image.open(OUT/f'frame-{f:04}.png').convert('RGB').resize((480,270)),(i%3*480,i//3*270))
preview.save(ROOT/'output/landscape-preview.jpg',quality=95)
Image.open(OUT/'frame-1590.png').convert('RGB').save(ROOT/'output/landscape-poster.jpg',quality=95)
print(f'Inspected {len(frames)} MP4 frames and saved final contact sheet, preview and poster.')
