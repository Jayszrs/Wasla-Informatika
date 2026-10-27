from pathlib import Path
from PIL import Image,ImageDraw
import subprocess

ROOT=Path(__file__).resolve().parents[1]
FF=ROOT/'node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe'
VIDEO=ROOT/'output/wasla-landscape-showcase-v2-27s6.mp4'
OUT=ROOT/'output/landscape-showcase-v2-review/encoded';OUT.mkdir(parents=True,exist_ok=True)
frames=[929,930,945,970,995,1020,1050,1080,1115,1116,1655]
for f in frames:
    subprocess.run([str(FF),'-v','error','-y','-ss',str(f/60),'-i',str(VIDEO),'-frames:v','1',str(OUT/f'frame-{f:04}.png')],check=True)
canvas=Image.new('RGB',(1920,3*290),'#ddd')
for i,f in enumerate(frames):
    im=Image.open(OUT/f'frame-{f:04}.png').convert('RGB').resize((480,270));x=i%4*480;y=i//4*290
    canvas.paste(im,(x,y));ImageDraw.Draw(canvas).text((x+6,y+274),f'{f/60:.3f}s / {f}',fill='black')
canvas.save(ROOT/'output/landscape-showcase-v2-final-contact.jpg',quality=94)
poster=Image.open(OUT/'frame-1050.png').convert('RGB')
poster.save(ROOT/'output/landscape-showcase-v2-poster.jpg',quality=95)
poster.resize((1280,720)).save(ROOT/'output/landscape-showcase-v2-preview.jpg',quality=95)
subprocess.run([str(FF),'-v','error','-y','-ss','15.5','-i',str(VIDEO),'-t','3.1','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-use_editlist','1','-movflags','+faststart',str(ROOT/'output/wasla-landscape-showcase-v2-scene-3s1.mp4')],check=True)
print('Verified scene entry, middle, exit and adjacent frames; saved scene preview clip and poster.')
