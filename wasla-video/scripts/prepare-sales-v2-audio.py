"""Original, deterministic motion SFX; music and SFX stems plus a reviewable mix."""
from pathlib import Path
import hashlib,json,wave
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/audio/sales-v2';OUT.mkdir(parents=True,exist_ok=True)
SR=48000;DURATION=15;FPS=30
rng=np.random.default_rng(72831)

def read_wav(path):
    with wave.open(str(path),'rb') as f:
        assert f.getframerate()==SR and f.getnchannels()==2 and f.getsampwidth()==2
        return np.frombuffer(f.readframes(f.getnframes()),dtype='<i2').reshape(-1,2).astype(np.float64)/32768

def write_wav(path,a):
    assert np.max(np.abs(a))<1
    with wave.open(str(path),'wb') as f:
        f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR)
        f.writeframes(np.round(a*32767).astype('<i2').tobytes())

def band_noise(n,lo,hi):
    x=rng.normal(size=n);freq=np.fft.rfftfreq(n,1/SR)
    band=(1-np.exp(-(freq/lo)**4))*np.exp(-(freq/hi)**4)
    return np.fft.irfft(np.fft.rfft(x)*band,n)

def effect(kind):
    duration={'whoosh':.54,'reverse':.5,'scroll':.62,'impact':.36,'click':.13,'tap':.18,'glint':.64}[kind]
    t=np.arange(round(duration*SR))/SR;n=len(t);u=t/duration
    if kind in ['whoosh','reverse','scroll']:
        env=np.sin(np.pi*u)**2.2
        if kind=='reverse':env=np.flip(env*np.exp(-u))
        noise=band_noise(n,260 if kind=='scroll' else 500,3800)
        carrier=np.sin(2*np.pi*(190*t+550*t*t))*.07
        x=(noise+carrier)*env
    elif kind=='impact':
        phase=2*np.pi*(42*t+55*.055*(1-np.exp(-t/.055)))
        x=.85*np.sin(phase)*np.exp(-t*18)+.08*band_noise(n,600,2700)*np.exp(-t*65)
    elif kind=='click':
        x=(np.sin(2*np.pi*1980*t)+.35*np.sin(2*np.pi*3130*t))*np.exp(-t*75)+.10*band_noise(n,1300,6500)*np.exp(-t*110)
    elif kind=='tap':
        x=(np.sin(2*np.pi*610*t)+.25*np.sin(2*np.pi*1390*t))*np.exp(-t*37)
    else:
        x=np.zeros(n)
        for i,freq in enumerate([1320,1980,2640]):
            at=i*.025;dt=np.maximum(0,t-at);x+=np.where(t>=at,np.sin(2*np.pi*freq*dt)*np.exp(-dt*12)*(1-dt/duration)*(.65**i),0)
    x*=np.minimum(t/.003,1)*np.minimum((duration-t)/.025,1)
    x/=max(np.max(np.abs(x)),1e-9)
    return x

effects={k:effect(k) for k in ['whoosh','reverse','scroll','impact','click','tap','glint']}
for kind,x in effects.items():write_wav(OUT/f'{kind}.wav',np.column_stack([x,x])*.65)

# Frame, type, level and pan. Match cut, typography, scroll and capsule landings.
cues=[
 (0,'whoosh',.10,-.25),(7,'click',.035,-.1),(12,'click',.03,.05),(18,'click',.03,.2),(39,'glint',.04,.25),
 (52,'whoosh',.095,-.4),(56,'impact',.13,0),(89,'whoosh',.07,.3),(92,'impact',.10,0),
 (124,'whoosh',.11,-.4),(128,'tap',.065,.1),(145,'scroll',.065,-.55),(167,'scroll',.055,.55),
 (196,'reverse',.08,.25),(201,'impact',.09,0),(209,'tap',.065,-.3),(218,'tap',.065,.25),(227,'tap',.07,-.1),(252,'glint',.04,.35),
 (278,'whoosh',.085,-.4),(282,'impact',.125,0),(295,'glint',.06,.3),
 (337,'reverse',.09,-.3),(345,'impact',.11,0),(356,'click',.055,.35),(368,'glint',.08,.3),(413,'glint',.025,-.1)
]
sfx=np.zeros((DURATION*SR,2))
for frame,kind,gain,pan in cues:
    x=effects[kind];at=round(frame/FPS*SR);n=min(len(x),len(sfx)-at)
    # A slight moving stereo field for sweeps; solid center for impacts.
    pans=np.linspace(pan,-pan,n) if kind in ['whoosh','reverse','scroll'] else np.full(n,pan)
    stereo=np.column_stack([np.cos((pans+1)*np.pi/4),np.sin((pans+1)*np.pi/4)])
    sfx[at:at+n]+=x[:n,None]*stereo*gain

source=read_wav(ROOT/'public/audio/reel/music-15s.wav')
assert len(source)==DURATION*SR
times=np.arange(len(source))/SR
duck=np.ones(len(source))
for frame in [56,92,128,201,282,345]:duck*=1-.21*np.exp(-((times-frame/FPS)/.12)**2)
music=source*.78*duck[:,None]
tail=np.minimum((DURATION-times)/.35,1)
sfx*=2.2*tail[:,None]
raw=music+sfx
headroom=min(1,.72/np.max(np.abs(raw)))
music*=headroom;sfx*=headroom
write_wav(OUT/'music-bed.wav',music)
write_wav(OUT/'sfx-stem.wav',sfx)
write_wav(OUT/'final-mix.wav',music+sfx)
manifest={'durationSeconds':15,'sampleRate':SR,'channels':2,'voiceOver':False,'musicSource':'../reel/music-15s.wav','musicSourceSha256':hashlib.sha256((ROOT/'public/audio/reel/music-15s.wav').read_bytes()).hexdigest(),'sfxSource':'Original procedural synthesis, deterministic seed 72831; no external recordings','cueCount':len(cues),'cues':[{'frame':f,'seconds':round(f/FPS,4),'kind':k,'level':g,'pan':p} for f,k,g,p in cues],'headroomScale':float(headroom),'sfxMasterGain':2.2,'musicGain':.78,'duckOnMajorCuts':True,'fadeOutSeconds':.35,'samplePeakDbFS':float(20*np.log10(np.max(np.abs(music+sfx))))}
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(f'Prepared music, {len(cues)} original SFX cues and a 15-second stereo mix. Peak {manifest["samplePeakDbFS"]:.2f} dBFS.')
