import {AbsoluteFill,Sequence,staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import './video/fonts';
import {dark} from './landscape/Elements';
import {FloatingPortfolio,PortfolioRibbons,SplitIdeas,TiltedPortfolio,WebsiteShowcase} from './landscape/Portfolio';
import {CityConnection,ContactClosing,CorePills,CoreStatement,KineticManifesto,NetworkConnection,StudioOpening,WowMoment} from './landscape/BrandStory';

// The reference's 27.6-second sequence is rebuilt at 1920x1080 / 60fps.
export const WaslaLandscapePromo=()=> <AbsoluteFill style={{background:dark}}>
 <Sequence name="01 Studio oleh Wasla" durationInFrames={84}><StudioOpening/></Sequence>
 <Sequence name="02 Tempat ide jadi nyata - split panel" from={84} durationInFrames={138}><SplitIdeas/></Sequence>
 <Sequence name="03 Deretan karya - ribbon wall" from={222} durationInFrames={156}><PortfolioRibbons/></Sequence>
 <Sequence name="04 Dibuat untuk bisnismu - floating cards" from={378} durationInFrames={144}><FloatingPortfolio/></Sequence>
 <Sequence name="05 Karya kami - diagonal grid" from={522} durationInFrames={132}><TiltedPortfolio/></Sequence>
 <Sequence name="06 Cara kami bekerja" from={654} durationInFrames={54}><CoreStatement/></Sequence>
 <Sequence name="07 Ide, desain, teknologi - pills" from={708} durationInFrames={162}><CorePills/></Sequence>
 <Sequence name="08 Bikin orang bilang wah" from={870} durationInFrames={60}><WowMoment/></Sequence>
 <Sequence name="09 Website Wasla - perspective showcase" from={930} durationInFrames={186}><WebsiteShowcase/></Sequence>
 <Sequence name="10 Ide kreatif, desain berani, solusi digital" from={1116} durationInFrames={174}><KineticManifesto/></Sequence>
 <Sequence name="11 Bawa bisnis ke dunia digital" from={1290} durationInFrames={84}><CityConnection/></Sequence>
 <Sequence name="12 Koneksi karya - globe" from={1374} durationInFrames={132}><NetworkConnection/></Sequence>
 <Sequence name="13 Mulai konsultasi - wasla.my.id" from={1506} durationInFrames={150}><ContactClosing/></Sequence>
 <Audio name="Musik pengguna - tanpa voice-over" src={staticFile('audio/reel/music-landscape-27s6.wav')}/>
</AbsoluteFill>;
