import {AbsoluteFill,Sequence,staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import './video/fonts';
import {GeometricClosing,Keyword,palette,Question,ShapeTunnel,WorkFlash} from './geometric/Scenes';

export const WaslaGeometricReel=()=> <AbsoluteFill style={{background:palette.paper}}>
 <Sequence name="01 Apa yang bikin bisnismu beda?" durationInFrames={47}><Question/></Sequence>
 <Sequence name="02 Idemu - graphic ring" from={47} durationInFrames={33}><Keyword word="Idemu." kind={3}/></Sequence>
 <Sequence name="03 Gayamu - card stack" from={80} durationInFrames={27}><Keyword word="Gayamu." kind={1} direction="stack"/></Sequence>
 <Sequence name="04 Websitemu - geometric cascade" from={107} durationInFrames={39}><Keyword word="Websitemu." kind={0} direction="cascade"/></Sequence>
 <Sequence name="05 Kami wujudkan - square tunnel" from={146} durationInFrames={40}><ShapeTunnel/></Sequence>
 <Sequence name="06 Kilasan website asli" from={186} durationInFrames={11}><WorkFlash/></Sequence>
 <Sequence name="07 Wasla - mulai konsultasi" from={197} durationInFrames={73}><GeometricClosing/></Sequence>
 <Audio name="Sound pengguna - tanpa VO" src={staticFile('audio/reel/music-9s.wav')}/>
</AbsoluteFill>;
