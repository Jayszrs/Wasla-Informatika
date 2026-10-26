import {Audio} from '@remotion/media';
import {staticFile, useVideoConfig} from 'remotion';

export const AudioManager = () => {
  const {fps} = useVideoConfig();
  return <>
    <Audio name="Musik orisinal" src={staticFile('audio/wasla-original-score.wav')} volume={.12}/>
    <Audio name="Efek transisi" src={staticFile('audio/wasla-original-effects.wav')} volume={.72}/>
    <Audio name="Narasi pembuka" from={5} src={staticFile('audio/voice/scene-01.wav')}/>
    <Audio name="Narasi brand" from={5 * fps + 5} src={staticFile('audio/voice/scene-02.wav')}/>
    <Audio name="Narasi layanan" from={11 * fps + 5} src={staticFile('audio/voice/scene-03.wav')}/>
    <Audio name="Narasi proses" from={18 * fps + 5} src={staticFile('audio/voice/scene-04.wav')}/>
    <Audio name="Narasi penutup" from={24 * fps + 5} src={staticFile('audio/voice/scene-05.wav')}/>
  </>;
};
