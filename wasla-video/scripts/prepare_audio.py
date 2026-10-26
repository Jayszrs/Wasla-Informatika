"""Generate the supplied Indonesian narration and an original deterministic score."""
import asyncio
import json
import math
import subprocess
import wave
from pathlib import Path

import edge_tts
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
AUDIO = ROOT / 'public' / 'audio'
VOICE = AUDIO / 'voice'
BIN = ROOT / 'node_modules' / '@remotion' / 'compositor-win32-x64-msvc'
FPS = 30
SAMPLE_RATE = 48000
SCENES = [
    (0, 150, 'Di era digital, kesan pertama bisnis dimulai dari website.'),
    (150, 180, 'Kenalan dengan Wasla Informatika, partner pembuatan website modern, profesional, dan responsif.'),
    (330, 210, 'Kami melayani company profile, landing page, website bisnis, hingga website custom sesuai kebutuhan.'),
    (540, 180, 'Dari konsultasi dan desain, sampai pengembangan dan peluncuran, kami siap membantu.'),
    (720, 180, 'Saatnya wujudkan website untuk bisnismu. Kunjungi wasla titik my titik id sekarang.'),
]
SHORT = {
    1: 'Wasla Informatika, partner website modern, profesional, dan responsif.',
    2: 'Company profile, landing page, website bisnis, hingga website custom sesuai kebutuhan.',
    4: 'Wujudkan website bisnismu. Kunjungi wasla titik my titik id sekarang.',
}


def probe(path):
    result = subprocess.check_output([str(BIN / 'ffprobe.exe'), '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', str(path)])
    return float(json.loads(result)['format']['duration'])


async def narration():
    VOICE.mkdir(parents=True, exist_ok=True)
    available = await edge_tts.list_voices()
    voices = {voice['ShortName'] for voice in available if voice.get('Locale') == 'id-ID'}
    name = 'id-ID-ArdiNeural' if 'id-ID-ArdiNeural' in voices else 'id-ID-GadisNeural'
    if name not in voices:
        raise RuntimeError('No Indonesian voice is available; do not render a silent substitute.')
    manifest = []
    for index, (start, frames, supplied) in enumerate(SCENES):
        path = VOICE / f'scene-{index + 1:02d}.mp3'
        text = supplied
        rate = 0
        target = frames / FPS - 0.36
        for attempt in range(4):
            await edge_tts.Communicate(text, name, rate=f'+{rate}%', pitch='-2Hz').save(str(path))
            duration = probe(path)
            if duration <= target:
                break
            if rate < 14:
                rate = min(14, math.ceil((duration / target * (1 + rate / 100) - 1) * 100) + 1)
            elif index in SHORT:
                text, rate = SHORT[index], 4
            else:
                raise RuntimeError(f'Scene {index + 1} narration is too long: {duration:.3f}s')
        if duration > target:
            raise RuntimeError(f'Scene {index + 1} still exceeds its scene. Revise before rendering.')
        wav = path.with_suffix('.wav')
        subprocess.run([str(BIN / 'ffmpeg.exe'), '-v', 'error', '-y', '-i', str(path), '-af', 'loudnorm=I=-18:TP=-2:LRA=9', '-ar', str(SAMPLE_RATE), '-ac', '1', str(wav)], check=True)
        duration = probe(wav)
        item = {'scene': index + 1, 'startFrame': start + 5, 'sceneFrames': frames, 'durationSeconds': round(duration, 4), 'rate': f'+{rate}%', 'voice': name, 'text': text, 'file': f'audio/voice/scene-{index + 1:02d}.wav'}
        manifest.append(item)
        print(json.dumps(item, ensure_ascii=False), flush=True)
    (AUDIO / 'narration.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    (ROOT / 'NARASI.md').write_text('# Narasi final bahasa Indonesia\n\nSuara sintetis: ' + name + '.\n\n' + '\n\n'.join(f"{item['scene']}. {item['text']}\nDurasi audio: {item['durationSeconds']} detik; tempo {item['rate']}." for item in manifest), encoding='utf-8')


def write_wav(path, audio):
    stereo = np.column_stack([audio, audio * 0.98]) if audio.ndim == 1 else audio
    with wave.open(str(path), 'wb') as output:
        output.setnchannels(2)
        output.setsampwidth(2)
        output.setframerate(SAMPLE_RATE)
        output.writeframes((np.clip(stereo, -0.97, 0.97) * 32767).astype('<i2').tobytes())


def score():
    AUDIO.mkdir(parents=True, exist_ok=True)
    rng = np.random.default_rng(20261026)
    count = SAMPLE_RATE * 30
    music = np.zeros(count)
    effects = np.zeros(count)

    def add(track, sound, at):
        begin = round(at * SAMPLE_RATE)
        length = min(len(sound), len(track) - begin)
        if length > 0:
            track[begin:begin + length] += sound[:length]

    def note(midi, duration, gain, attack=0.035):
        t = np.arange(round(duration * SAMPLE_RATE)) / SAMPLE_RATE
        hz = 440 * 2 ** ((midi - 69) / 12)
        env = np.minimum(t / attack, 1) * np.minimum((duration - t) / 0.22, 1)
        return gain * env * (np.sin(2 * np.pi * hz * t) + .2 * np.sin(2 * np.pi * hz * 2.003 * t))

    chords = [[48, 55, 59, 64], [45, 52, 55, 60], [41, 48, 52, 57], [43, 50, 55, 62]]
    for bar in range(8):
        chord = chords[bar % 4]
        for midi in chord:
            add(music, note(midi, 4.4, .025, .28), bar * 4)
        for beat in range(8):
            sound = note(chord[[0, 2, 1, 3][beat % 4]] + 24, .42, .018) * np.exp(-np.arange(round(.42 * SAMPLE_RATE)) / SAMPLE_RATE * 7)
            add(music, sound, bar * 4 + beat * .5)
    for beat in range(60):
        t = np.arange(round(.17 * SAMPLE_RATE)) / SAMPLE_RATE
        kick = np.sin(2 * np.pi * (49 * t + 12 * (1 - np.exp(-t * 25)) / 25)) * np.exp(-t * 28) * .07
        add(music, kick, beat * .5)
        hat_time = np.arange(round(.045 * SAMPLE_RATE)) / SAMPLE_RATE
        noise = rng.standard_normal(len(hat_time))
        add(music, np.diff(noise, prepend=noise[0]) * np.exp(-hat_time * 110) * .005, beat * .5 + .25)
    for boundary in [0, 5, 11, 18, 24]:
        t = np.arange(round(.48 * SAMPLE_RATE)) / SAMPLE_RATE
        noise = rng.standard_normal(len(t))
        noise = np.convolve(noise, np.ones(7) / 7, mode='same')
        swoosh = noise * np.sin(np.pi * t / .48) ** 2 * .09
        add(effects, swoosh, max(0, boundary - .16))
        add(effects, note(48, .4, .06) * np.exp(-np.arange(round(.4 * SAMPLE_RATE)) / SAMPLE_RATE * 13), boundary)
    for moment in [1.15, 6.3, 8.6, 11.7, 13.3, 14.9, 16.5, 18.5, 19.8, 21.1, 22.4, 25.1, 27.3]:
        t = np.arange(round(.055 * SAMPLE_RATE)) / SAMPLE_RATE
        add(effects, np.sin(2 * np.pi * (1100 * t - 2800 * t * t)) * np.exp(-t * 90) * .05, moment)
    time = np.arange(count) / SAMPLE_RATE
    fade = np.clip(time / .6, 0, 1) * np.clip((30 - time) / 1.2, 0, 1)
    music *= fade
    music *= .11 / max(np.sqrt(np.mean(music ** 2)), .001)
    write_wav(AUDIO / 'wasla-original-score.wav', music)
    write_wav(AUDIO / 'wasla-original-effects.wav', effects)
    print('Original 120 BPM score and transition effects prepared.', flush=True)


if __name__ == '__main__':
    score()
    asyncio.run(narration())
