import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import './video/fonts';
import {AudioManager} from './components/AudioManager';
import {Opening} from './film/Opening';
import {BrandIntro} from './film/BrandIntro';
import {PortfolioScene} from './film/PortfolioScene';
import {MoreWork} from './film/MoreWork';
import {Process} from './film/Process';
import {Closing} from './film/Closing';
import {portfolio} from './film/portfolio';

export const WaslaCompanyProfile = () => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background: '#040F21'}}>
    <Sequence name="01 · Wajah digital bisnis" durationInFrames={4 * fps}><Opening/></Sequence>
    <Sequence name="02 · Wasla Informatika" from={4 * fps} durationInFrames={6 * fps}><BrandIntro/></Sequence>
    <Sequence name="03 · Cimuning Digital Hub" from={10 * fps} durationInFrames={8 * fps}><PortfolioScene project={portfolio[0]} index="03"/></Sequence>
    <Sequence name="04 · Fazma Stone" from={18 * fps} durationInFrames={8 * fps}><PortfolioScene project={portfolio[1]} index="04"/></Sequence>
    <Sequence name="05 · Mahameru Baja Indonesia" from={26 * fps} durationInFrames={8 * fps}><PortfolioScene project={portfolio[2]} index="05"/></Sequence>
    <Sequence name="06 · Ngaji Yuk" from={34 * fps} durationInFrames={8 * fps}><PortfolioScene project={portfolio[3]} index="06"/></Sequence>
    <Sequence name="07 · Karya organisasi dan sekolah" from={42 * fps} durationInFrames={4 * fps}><MoreWork/></Sequence>
    <Sequence name="08 · Proses kerja" from={46 * fps} durationInFrames={7 * fps}><Process/></Sequence>
    <Sequence name="09 · Konsultasi sekarang" from={53 * fps} durationInFrames={7 * fps}><Closing/></Sequence>
    <AudioManager/>
  </AbsoluteFill>;
};
