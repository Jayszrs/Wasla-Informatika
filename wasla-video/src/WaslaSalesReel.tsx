import {AbsoluteFill,Html5Audio,Sequence,staticFile} from 'remotion';
import './video/fonts';
import {FeaturePills,KineticOffer,LaunchMoment,PortfolioScroll,StudioClosing,StudioHook} from './sales/StudioScenes';

// Sales v2: portrait, 15 seconds. Portfolio is confined to one scrolling scene.
export const WaslaSalesReel=()=> <AbsoluteFill style={{background:'#0C0D0E'}}>
 <Sequence name="01 Bisnismu layak tampil meyakinkan" durationInFrames={56}><StudioHook/></Sequence>
 <Sequence name="02 Website berkelas - kinetic typography" from={56} durationInFrames={72}><KineticOffer/></Sequence>
 <Sequence name="03 Portofolio - satu scene scroll" from={128} durationInFrames={73}><PortfolioScroll/></Sequence>
 <Sequence name="04 Dirancang untuk bisnismu - feature pills" from={201} durationInFrames={81}><FeaturePills/></Sequence>
 <Sequence name="05 Dari ide sampai online - motion sphere" from={282} durationInFrames={63}><LaunchMoment/></Sequence>
 <Sequence name="06 Waktunya punya website - konsultasi" from={345} durationInFrames={105}><StudioClosing/></Sequence>
 {/* Native playback makes both audio tracks directly inspectable in Studio. */}
 <Html5Audio name="SOUND ASLI KIRIMAN - camrift - musik utama" src={staticFile('audio/sales-v4/music-main.wav')} volume={1} useWebAudioApi={false}/>
 <Html5Audio name="SFX rapi - 9 cue utama sesuai gerakan" src={staticFile('audio/sales-v4/sfx-clean.wav')} volume={1} useWebAudioApi={false}/>
</AbsoluteFill>;
