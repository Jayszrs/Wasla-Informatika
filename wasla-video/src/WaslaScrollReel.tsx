import {AbsoluteFill,Sequence,useVideoConfig} from 'remotion';
import './video/fonts';
import {ProjectScroll} from './reel/ProjectScroll';
import {ReelOpening,ReelClosing} from './reel/ReelBookends';
import {reelProjects} from './reel/data';

export const WaslaScrollReel=()=>{
  const {fps}=useVideoConfig();
  return <AbsoluteFill
    style={{
      background: '#050B18',
      translate: '115.4px 43.9px'
    }}
  >
    <Sequence name="Pembuka karya" durationInFrames={2*fps}><ReelOpening/></Sequence>
    <Sequence name="Scroll Cimuning" from={2*fps} durationInFrames={5*fps}><ProjectScroll project={reelProjects[0]} index={1}/></Sequence>
    <Sequence name="Scroll Fazma Stone" from={7*fps} durationInFrames={5*fps}><ProjectScroll project={reelProjects[1]} index={2}/></Sequence>
    <Sequence name="Scroll karya Mahameru" from={12*fps} durationInFrames={5*fps}><ProjectScroll project={reelProjects[2]} index={3}/></Sequence>
    <Sequence name="Scroll Ngaji Yuk" from={17*fps} durationInFrames={5*fps}><ProjectScroll project={reelProjects[3]} index={4}/></Sequence>
    <Sequence name="Scroll IPNU" from={22*fps} durationInFrames={5*fps}><ProjectScroll project={reelProjects[4]} index={5}/></Sequence>
    <Sequence name="Scroll karya SIT Permata Hati" from={27*fps} durationInFrames={5*fps}><ProjectScroll project={reelProjects[5]} index={6}/></Sequence>
    <Sequence name="Wasla / URL" from={32*fps} durationInFrames={3*fps}><ReelClosing/></Sequence>
  </AbsoluteFill>;
};
