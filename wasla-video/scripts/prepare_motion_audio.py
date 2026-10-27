"""Loop the supplied recording with equal-power overlaps; no generated narration."""
from pathlib import Path
import subprocess,wave,json,hashlib
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
FFMPEG=ROOT/'node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe'
OUT=ROOT/'public/audio/reel'
SOURCE=OUT/'user-sound.mp3'
subprocess.run([str(FFMPEG),'-v','error','-y','-i',str(SOURCE),'-ar','48000','-ac','2','-c:a','pcm_s16le',str(OUT/'source-decoded.wav')],check=True)
with wave.open(str(OUT/'source-decoded.wav'),'rb') as w:
 sr=w.getframerate();audio=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(np.float64).reshape(-1,2)/32768
duration=30
period=14.0
output=np.zeros((duration*sr,2))
overlap=len(audio)-round(period*sr)
for repeat,at in enumerate([0,round(period*sr),round(period*2*sr)]):
 clip=audio.copy();gain=np.ones(len(clip))
 if repeat>0:gain[:overlap]=np.sin(np.linspace(0,np.pi/2,overlap))
 if at+len(clip)<len(output):gain[-overlap:]=np.cos(np.linspace(0,np.pi/2,overlap))
 n=min(len(clip),len(output)-at)
 output[at:at+n]+=clip[:n]*gain[:n,None]
time=np.arange(len(output))/sr
output*=np.minimum(time/.012,1)[:,None]*np.minimum((duration-time)/.45,1)[:,None]
peak=np.max(np.abs(output));output*=min(1,.82/peak)
with wave.open(str(OUT/'music-loop-raw.wav'),'wb') as w:
 w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((output*32767).astype('<i2').tobytes())
subprocess.run([str(FFMPEG),'-v','error','-y','-i',str(OUT/'music-loop-raw.wav'),'-af','loudnorm=I=-16:TP=-1.5:LRA=7','-ar','48000','-ac','2','-c:a','pcm_s16le',str(OUT/'music-30s.wav')],check=True)
manifest={'source':'user-sound.mp3','sourceSha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'sourceDecodedSeconds':len(audio)/sr,'outputSeconds':30,'loopPeriodSeconds':14,'overlapSeconds':overlap/sr,'method':'Equal-power crossfades at 14s and 28s; 12ms fade-in, 450ms end fade; source peak limited before loudness normalization','normalization':'FFmpeg loudnorm target I=-16 LUFS, TP=-1.5 dBTP, LRA=7','voiceOver':False}
(OUT/'music-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps(manifest,indent=2))
