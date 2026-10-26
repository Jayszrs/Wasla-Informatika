import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';
import {BrandLogo} from '../components/BrandLogo';
import {GalleryWall} from './GalleryWall';
import {theme} from '../video/theme';

export const ReelOpening=()=>{
  const frame=useCurrentFrame();
  return <AbsoluteFill style={{overflow:'hidden',background:theme.deep,color:'white'}}>
    <GalleryWall speed={4}/>
    <AbsoluteFill style={{background:'linear-gradient(180deg,#040B1890,#040B1870 30%,#040B18B0 75%,#040B18)'}}/>
    <div style={{position:'absolute',left:132,top:740,scale:interpolate(frame,[0,35],[.94,1],{extrapolateRight:'clamp'}),opacity:interpolate(frame,[0,10],[.7,1],{extrapolateRight:'clamp'})}}><BrandLogo size={208}/></div>
    <div style={{position:'absolute',left:138,top:1020,fontFamily:theme.body,fontSize:32,letterSpacing:'.18em',fontWeight:700}}>KARYA DIGITAL WASLA</div>
  </AbsoluteFill>;
};

export const ReelClosing=()=>{
  const frame=useCurrentFrame();
  return <AbsoluteFill style={{overflow:'hidden',background:theme.deep,color:'white'}}>
    <GalleryWall speed={3}/>
    <AbsoluteFill style={{background:'#040B18DE'}}/>
    <div style={{position:'absolute',left:132,top:690,translate:interpolate(frame,[0,24],['0px 40px','0px 0px'],{extrapolateRight:'clamp'}),opacity:interpolate(frame,[0,18],[0,1],{extrapolateRight:'clamp'})}}><BrandLogo size={208}/></div>
    <div style={{position:'absolute',left:130,top:1070,fontFamily:theme.heading,fontWeight:800,fontSize:105,letterSpacing:'-.055em',opacity:interpolate(frame,[10,30],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>wasla.my.id</div>
    <div style={{position:'absolute',left:138,top:1230,height:3,width:interpolate(frame,[15,45],[0,790],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),background:theme.blue}}/>
  </AbsoluteFill>;
};
