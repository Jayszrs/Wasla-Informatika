import {Audio} from '@remotion/media';
import {staticFile, useVideoConfig} from 'remotion';

export const AudioManager = () => {
  const {fps} = useVideoConfig();
  return <>
    <Audio name="Musik orisinal 60 detik" src={staticFile('audio/v2/score.wav')} volume={.12}/>
    <Audio name="Transisi dan UI" src={staticFile('audio/v2/effects.wav')} volume={.72}/>
    <Audio name="Narasi pembuka" from={8} src={staticFile('audio/v2/scene-01.wav')}/>
    <Audio name="Narasi Wasla" from={4 * fps + 8} src={staticFile('audio/v2/scene-02.wav')}/>
    <Audio name="Narasi Cimuning" from={10 * fps + 8} src={staticFile('audio/v2/scene-03.wav')}/>
    <Audio name="Narasi Fazma Stone" from={18 * fps + 8} src={staticFile('audio/v2/scene-04.wav')}/>
    <Audio name="Narasi Mahameru Baja" from={26 * fps + 8} src={staticFile('audio/v2/scene-05.wav')}/>
    <Audio name="Narasi Ngaji Yuk" from={34 * fps + 8} src={staticFile('audio/v2/scene-06.wav')}/>
    <Audio name="Narasi karya lainnya" from={42 * fps + 8} src={staticFile('audio/v2/scene-07.wav')}/>
    <Audio name="Narasi proses" from={46 * fps + 8} src={staticFile('audio/v2/scene-08.wav')}/>
    <Audio name="Narasi konsultasi" from={53 * fps + 8} src={staticFile('audio/v2/scene-09.wav')}/>
  </>;
};
