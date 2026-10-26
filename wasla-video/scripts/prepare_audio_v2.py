"""Indonesian portfolio narration and original 60-second electronic score."""
import asyncio
import json
import subprocess
import sys
import wave
from pathlib import Path
import edge_tts
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
BIN=ROOT/'node_modules/@remotion/compositor-win32-x64-msvc'
OUT=ROOT/'public/audio/v2'
SR=48000
SCENES=[
 (0,4,'Website adalah wajah digital bisnismu.'),
 (4,6,'Wasla Informatika. Inilah karya digital untuk kebutuhan nyata.'),
 (10,8,'Cimuning Digital Hub. E-katalog produk dan profil usaha lokal, yang bisa dijelajahi di desktop maupun ponsel.'),
 (18,8,'Fazma Stone. Website bisnis batu alam, dengan katalog produk yang membantu pelanggan mengenal beragam pilihan.'),
 (26,8,'Mahameru Baja Indonesia. Profil perusahaan dan layanan laser cutting, dengan informasi yang tersusun untuk pelanggan.'),
 (34,8,'Ngaji Yuk. Aplikasi web pendidikan untuk mendukung pencatatan dan pendampingan belajar mengaji, dengan tampilan yang terarah.'),
 (42,4,'Portal organisasi, hingga profil sekolah.'),
 (46,7,'Dari konsultasi sampai peluncuran, Wasla siap membantu.'),
 (53,7,'Giliran bisnismu. Konsultasi di wasla titik my titik id sekarang.'),
]
SHORT={
 2:'Cimuning Digital Hub. E-katalog produk dan profil usaha lokal, di desktop maupun ponsel.',
 3:'Fazma Stone. Website bisnis batu alam, dengan katalog untuk mengenal beragam pilihan produk.',
 4:'Mahameru Baja Indonesia. Profil perusahaan dan layanan laser cutting, dengan informasi untuk pelanggan.',
 5:'Ngaji Yuk. Aplikasi web pendidikan untuk pencatatan dan pendampingan belajar mengaji.',
 7:'Dari konsultasi, desain, pengembangan, sampai peluncuran. Kami siap membantu.',
 8:'Sekarang, giliran bisnismu. Konsultasi dengan Wasla Informatika di wasla titik my titik id.',
}

def duration(p):
 return float(json.loads(subprocess.check_output([str(BIN/'ffprobe.exe'),'-v','error','-show_entries','format=duration','-of','json',str(p)]))['format']['duration'])

async def voices():
 OUT.mkdir(parents=True,exist_ok=True)
 manifest=[]
 cache_file=OUT/'narration-progress.json'
 cache=json.loads(cache_file.read_text(encoding='utf-8')) if cache_file.exists() and '--refresh' not in sys.argv else []
 for i,(start,length,text) in enumerate(SCENES):
  target=length-.5
  file=OUT/f'scene-{i+1:02d}.mp3'
  cached=next((x for x in cache if x['scene']==i+1),None)
  if cached and file.with_suffix('.wav').exists() and cached['durationSeconds']<=target:
   manifest.append(cached);print(f'Reusing measured narration {i+1}',flush=True);continue
  rate=0
  for attempt in range(4):
   await edge_tts.Communicate(text,'id-ID-ArdiNeural',rate=f'+{rate}%',pitch='-2Hz').save(str(file))
   actual=duration(file)
   if actual<=target:break
   if rate<8:rate=8
   elif i in SHORT:text=SHORT[i];rate=0
   else:raise RuntimeError(f'Scene {i+1} too long {actual}s')
  if actual>target:raise RuntimeError(f'Scene {i+1} narration still too long')
  wav=file.with_suffix('.wav')
  subprocess.run([str(BIN/'ffmpeg.exe'),'-v','error','-y','-i',str(file),'-af','loudnorm=I=-18:TP=-2:LRA=9','-ar','48000','-ac','1',str(wav)],check=True)
  record={'scene':i+1,'startFrame':round(start*30)+8,'sceneStartFrame':round(start*30),'sceneFrames':length*30,'durationSeconds':duration(wav),'rate':f'+{rate}%','voice':'id-ID-ArdiNeural','text':text,'file':f'audio/v2/scene-{i+1:02d}.wav'}
  manifest.append(record);print(json.dumps(record,ensure_ascii=False),flush=True)
  cache_file.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 (OUT/'narration.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
 (ROOT/'NARASI.md').write_text('# Narasi revisi — 60 detik\n\nSuara: id-ID-ArdiNeural, pitch -2 Hz.\n\n'+'\n\n'.join(f"{x['scene']}. {x['text']}\nMulai: {x['startFrame']/30:.3f}s; durasi {x['durationSeconds']:.3f}s; tempo {x['rate']}." for x in manifest),encoding='utf-8')

def write(p,a):
 if a.ndim==1:a=np.column_stack([a,a*.98])
 with wave.open(str(p),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR)
  w.writeframes((np.clip(a,-.97,.97)*32767).astype('<i2').tobytes())

def music():
 OUT.mkdir(parents=True,exist_ok=True)
 rng=np.random.default_rng(2701026)
 score=np.zeros(SR*60);fx=np.zeros(SR*60)
 def add(track,a,start):
  at=round(start*SR);length=min(len(a),len(track)-at)
  if length>0:track[at:at+length]+=a[:length]
 def tone(midi,length,gain,attack=.015,decay=2):
  t=np.arange(round(length*SR))/SR;hz=440*2**((midi-69)/12)
  env=np.minimum(t/attack,1)*np.minimum((length-t)/.15,1)*np.exp(-t*decay)
  return (np.sin(2*np.pi*hz*t)+.18*np.sin(2*np.pi*hz*2*t)+.06*np.sin(2*np.pi*hz*3*t))*env*gain
 chords=[[48,55,59,64],[45,52,55,60],[41,48,52,57],[43,50,55,62]]
 for bar in range(15):
  chord=chords[bar%4]
  for note in chord:add(score,tone(note,4.5,.027,attack=.4,decay=.13),bar*4)
  for beat in range(8):
   add(score,tone(chord[[0,2,1,3,2,1,3,2][beat]]+24,.46,.028,decay=8),bar*4+beat*.5)
   if bar>1:add(score,tone(chord[0]-12,.42,.038,decay=5),bar*4+beat*.5)
 for beat in range(120):
  t=np.arange(round(.22*SR))/SR
  add(score,np.sin(2*np.pi*(49*t+3*(1-np.exp(-t*28))))*np.exp(-t*28)*.065,beat*.5)
  if beat>7:
   t=np.arange(round(.04*SR))/SR
   noise=rng.standard_normal(len(t));hat=np.diff(noise,prepend=noise[0])*np.exp(-t*130)*.004
   add(score,hat,beat*.5+.25)
  if beat%2==1:
   t=np.arange(round(.1*SR))/SR
   add(score,rng.standard_normal(len(t))*np.exp(-t*70)*.008,beat*.5)
 for boundary in [0,4,10,18,26,34,42,46,53]:
  t=np.arange(round(.58*SR))/SR;noise=rng.standard_normal(len(t))
  noise=np.convolve(noise,np.ones(9)/9,mode='same')
  add(fx,noise*np.sin(np.pi*t/.58)**2*.075,max(0,boundary-.24))
  add(fx,tone(48,.5,.09,decay=10),boundary)
 for moment in [1,4.8,10.8,12.1,14.2,18.8,20.1,22.2,26.8,28.1,30.2,34.8,36.1,38.2,42.6,43.5,46.6,47.6,48.6,49.6,54.1,55.5]:
  t=np.arange(round(.07*SR))/SR
  add(fx,np.sin(2*np.pi*(1300*t-2500*t*t))*np.exp(-t*95)*.035,moment)
 t=np.arange(len(score))/SR;score*=np.minimum(t/.8,1)*np.minimum((60-t)/1.7,1)
 score*=.11/np.sqrt(np.mean(score*score))
 write(OUT/'score.wav',score);write(OUT/'effects.wav',fx)
 print('Original 60-second score and SFX generated',flush=True)

if __name__=='__main__':
 music();asyncio.run(voices())
