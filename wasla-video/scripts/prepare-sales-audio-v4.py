"""Sparse motion sound design: nine purposeful cues, original music foregrounded."""
from pathlib import Path
import hashlib,json,wave
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/audio/sales-v4';OUT.mkdir(parents=True,exist_ok=True)
SR=48000;FPS=30;DURATION=15
rng=np.random.default_rng(40418)

def read_wav(path):
    with wave.open(str(path),'rb') as w:
        assert w.getframerate()==SR and w.getnchannels()==2 and w.getsampwidth()==2
        return np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').reshape(-1,2).astype(np.float64)/32768

def write_wav(path,data):
    assert np.max(np.abs(data))<1
    with wave.open(str(path),'wb') as w:
        w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR)
        w.writeframes(np.round(data*32767).astype('<i2').tobytes())

def noise(n,lo,hi):
    freq=np.fft.rfftfreq(n,1/SR)
    band=(1-np.exp(-(freq/lo)**4))*np.exp(-(freq/hi)**4)
    return np.fft.irfft(np.fft.rfft(rng.normal(size=n))*band,n)

def sweep(duration):
    t=np.arange(round(duration*SR))/SR;u=t/duration
    low=noise(len(t),180,1200);high=noise(len(t),650,3300)
    x=(low*(1-u)+high*u)*np.sin(np.pi*u)**2.5
    return x/max(np.max(np.abs(x)),1e-9)

def tap(duration=.105):
    t=np.arange(round(duration*SR))/SR
    x=(np.sin(2*np.pi*820*t)+.18*np.sin(2*np.pi*1640*t))*np.exp(-t*58)
    x*=np.minimum(t/.004,1)*np.minimum((duration-t)/.018,1)
    return x/max(np.max(np.abs(x)),1e-9)

effects={'intro-air':sweep(.32),'transition-air':sweep(16/FPS),'cta-click':tap()}
pill=np.zeros(round(.78*SR));single=tap(.095)
for delay,gain in [(0,.68),(9/FPS,.78),(18/FPS,.86)]:
    at=round(delay*SR);pill[at:at+len(single)]+=single*gain
effects['pill-landings']=pill

# Air envelope peaks exactly on the visual cuts, eight frames after its start.
cues=[
 {'frame':0,'kind':'intro-air','gain':.09,'pan':0,'purpose':'Opening title reveal'},
 *[{'frame':cut-8,'targetFrame':cut,'kind':'transition-air','gain':level,'pan':pan,'purpose':purpose} for cut,level,pan,purpose in [
     (56,.18,-.15,'Cut to Website typography'),(92,.14,.15,'Change to Berkelas typography'),
     (128,.18,-.15,'Enter portfolio scroll'),(201,.16,.15,'Enter feature scene'),
     (282,.16,-.12,'Enter launch sphere'),(345,.18,.12,'Enter consultation closing')]],
 {'frame':223,'kind':'pill-landings','gain':.06,'pan':0,'purpose':'Three capsule landings, frames 223 / 232 / 241'},
 {'frame':369,'kind':'cta-click','gain':.065,'pan':.12,'purpose':'Consultation chip settles'}
]
cues.sort(key=lambda c:c['frame'])
sfx=np.zeros((DURATION*SR,2))
for cue in cues:
    x=effects[cue['kind']];at=round(cue['frame']/FPS*SR);n=min(len(x),len(sfx)-at)
    pans=np.linspace(cue['pan'],-cue['pan'],n)
    gains=np.column_stack([np.cos((pans+1)*np.pi/4),np.sin((pans+1)*np.pi/4)])
    sfx[at:at+n]+=x[:n,None]*cue['gain']*gains
    cue['seconds']=round(cue['frame']/FPS,4)
    if 'targetFrame' in cue:cue['envelopePeakFrame']=cue['frame']+8

music=read_wav(ROOT/'public/audio/sales-v2/music-main-v3.wav')
assert len(music)==DURATION*SR
raw=music+sfx
gain=min(1,.80/np.max(np.abs(raw)))
music*=gain;sfx*=gain
write_wav(OUT/'music-main.wav',music)
write_wav(OUT/'sfx-clean.wav',sfx)
write_wav(OUT/'final-mix.wav',music+sfx)
manifest={'version':4,'durationSeconds':15,'voiceOver':False,'originalUserMp3Sha256':hashlib.sha256((ROOT/'public/audio/reel/user-sound.mp3').read_bytes()).hexdigest(),'musicSource':'../sales-v2/music-main-v3.wav','musicForegrounded':True,'previousCueCount':27,'cueCount':len(cues),'cues':cues,'design':'Air transitions peak on cuts; one three-tap group follows capsule landings; one CTA click. No booms, typing clicks or decorative glints.','globalHeadroomGain':float(gain),'samplePeakDbFS':float(20*np.log10(np.max(np.abs(music+sfx))))}
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(f'Prepared {len(cues)} purposeful cues (previously 27). Music preserved; peak {manifest["samplePeakDbFS"]:.2f} dBFS.')
