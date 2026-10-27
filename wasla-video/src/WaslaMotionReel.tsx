import {AbsoluteFill,Sequence,staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import './video/fonts';
import {colors,projects} from './motion/data';
import {FloatingUI,HeroPhone,IntroWord,LogoPunch,ScrollBands,WorkTiles} from './motion/Scenes';

export const WaslaMotionReel=()=> <AbsoluteFill style={{background:colors.white}}>
 <Sequence name="01 Kenalin" durationInFrames={25}><IntroWord/></Sequence>
 <Sequence name="02 Logo punch" from={25} durationInFrames={30}><LogoPunch/></Sequence>
 <Sequence name="03 Cimuning phone reveal" from={55} durationInFrames={41}><HeroPhone project={projects[0]} background={colors.pink} duration={41}/></Sequence>
 <Sequence name="04 Cimuning floating UI" from={96} durationInFrames={30}><FloatingUI project={projects[0]}/></Sequence>
 <Sequence name="05 Cimuning close-up" from={126} durationInFrames={30}><HeroPhone project={projects[0]} background={colors.pink} zoom/></Sequence>
 <Sequence name="06 Karya website" from={156} durationInFrames={30}><HeroPhone project={projects[1]} background={colors.blue} headline={['Karya','website.']}/></Sequence>
 <Sequence name="07 Fazma UI explode" from={186} durationInFrames={30}><FloatingUI project={projects[1]}/></Sequence>
 <Sequence name="08 Fazma phone" from={216} durationInFrames={30}><HeroPhone project={projects[1]} background={colors.pink}/></Sequence>
 <Sequence name="09 Website bisnis" from={246} durationInFrames={41}><HeroPhone project={projects[2]} background={colors.blue} headline={['Website','bisnis.']} duration={41}/></Sequence>
 <Sequence name="10 Mahameru UI" from={287} durationInFrames={30}><FloatingUI project={projects[2]}/></Sequence>
 <Sequence name="11 Sesuai kebutuhan" from={317} durationInFrames={30}><HeroPhone project={projects[3]} background={colors.green} headline={['Sesuai','kebutuhan.']}/></Sequence>
 <Sequence name="12 Ngaji Yuk phone" from={347} durationInFrames={30}><HeroPhone project={projects[3]} background={colors.white}/></Sequence>
 <Sequence name="13 Website card choreography" from={377} durationInFrames={43}><WorkTiles/></Sequence>
 <Sequence name="14 Brand beat" from={420} durationInFrames={25}><LogoPunch background={colors.ink}/></Sequence>
 <Sequence name="15 Portal organisasi" from={445} durationInFrames={29}><HeroPhone project={projects[4]} background={colors.blue} headline={['Karya','digital.']} duration={29}/></Sequence>
 <Sequence name="16 IPNU phone" from={474} durationInFrames={42}><HeroPhone project={projects[4]} background={colors.white} duration={42}/></Sequence>
 <Sequence name="17 IPNU close-up" from={516} durationInFrames={30}><HeroPhone project={projects[4]} background={colors.pink} zoom/></Sequence>
 <Sequence name="18 SIT typography" from={546} durationInFrames={30}><HeroPhone project={projects[5]} background={colors.green} headline={['Tampil','berbeda.']}/></Sequence>
 <Sequence name="19 SIT phone" from={576} durationInFrames={30}><HeroPhone project={projects[5]} background={colors.white}/></Sequence>
 <Sequence name="20 SIT UI explode" from={606} durationInFrames={30}><FloatingUI project={projects[5]}/></Sequence>
 <Sequence name="21 Scroll gallery" from={636} durationInFrames={30}><ScrollBands/></Sequence>
 <Sequence name="22 Grid karya" from={666} durationInFrames={41}><WorkTiles background={colors.pink}/></Sequence>
 <Sequence name="23 Website untukmu" from={707} durationInFrames={30}><HeroPhone project={projects[0]} background={colors.blue} headline={['Untuk','bisnismu.']}/></Sequence>
 <Sequence name="24 Phone fan" from={737} durationInFrames={30}><WorkTiles background={colors.white} fan/></Sequence>
 <Sequence name="25 Responsive close-up" from={767} durationInFrames={30}><HeroPhone project={projects[3]} background={colors.green} zoom/></Sequence>
 <Sequence name="26 Gallery sweep" from={797} durationInFrames={43}><ScrollBands/></Sequence>
 <Sequence name="27 Wasla closing" from={840} durationInFrames={60}><LogoPunch background={colors.blue} closing/></Sequence>
 <Audio name="Sound kiriman pengguna / tanpa VO" src={staticFile('audio/reel/music-30s.wav')}/>
</AbsoluteFill>;
