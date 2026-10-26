import {interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {FilmShell} from './FilmShell';
import {FilmTitle} from './FilmType';
import {BrandLogo} from '../components/BrandLogo';
import {WebPrint} from './Devices';
import {theme} from '../video/theme';

export const BrandIntro=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <FilmShell duration={6*fps} index="02" chapter="STRATEGI / DESAIN / PENGEMBANGAN">
    <div style={{position:'absolute',left:122,top:300,scale:spring({frame:frame-7,fps,config:{damping:200},durationInFrames:38}),transformOrigin:'left center'}}><BrandLogo size={220}/></div>
    <div style={{position:'absolute',left:84,top:680}}><FilmTitle lines={['Dari kebutuhan,','menjadi karya.']} size={98} accent={1} delay={18}/></div>
    <div style={{position:'absolute',left:88,top:987,fontSize:44,lineHeight:1.45,color:theme.muted,opacity:interpolate(frame,[36,55],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Dirancang untuk bisnis.<br/>Nyaman di berbagai layar.</div>
    <div style={{position:'absolute',left:102,top:1240,rotate:'-5deg',translate:interpolate(frame,[42,88],['-50px 100px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[42,65],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><WebPrint src="projects/mahameru-baja.webp" width={580}/></div>
    <div style={{position:'absolute',left:535,top:1330,rotate:'6deg',translate:interpolate(frame,[52,98],['90px 120px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[52,75],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><WebPrint src="projects/fazmastone.webp" width={480}/></div>
    <div style={{position:'absolute',left:84,top:1765,height:20,right:84,background:theme.deep}}/>
  </FilmShell>;
};
