import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import './video/fonts';
import {AudioManager} from './components/AudioManager';
import {Scene01Opening} from './scenes/Scene01Opening';
import {Scene02BrandIntro} from './scenes/Scene02BrandIntro';
import {Scene03Services} from './scenes/Scene03Services';
import {Scene04Workflow} from './scenes/Scene04Workflow';
import {Scene05Closing} from './scenes/Scene05Closing';

export const WaslaCompanyProfile = () => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background: '#040F21'}}>
    <Sequence name="01 · Wajah digital bisnis" durationInFrames={5 * fps}><Scene01Opening/></Sequence>
    <Sequence name="02 · Wasla Informatika" from={5 * fps} durationInFrames={6 * fps}><Scene02BrandIntro/></Sequence>
    <Sequence name="03 · Layanan website" from={11 * fps} durationInFrames={7 * fps}><Scene03Services/></Sequence>
    <Sequence name="04 · Dari ide jadi nyata" from={18 * fps} durationInFrames={6 * fps}><Scene04Workflow/></Sequence>
    <Sequence name="05 · Konsultasi sekarang" from={24 * fps} durationInFrames={6 * fps}><Scene05Closing/></Sequence>
    <AudioManager/>
  </AbsoluteFill>;
};
