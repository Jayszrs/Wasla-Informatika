import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {BrandLogo} from '../components/BrandLogo';
import {BigType,DesktopCard,ease,MotionPhone,Spark} from '../motion/Elements';
import {colors,projects} from '../motion/data';
import {theme} from '../video/theme';

export const SalesHook=()=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:colors.ink,color:'white',overflow:'hidden'}}>
  <div style={{position:'absolute',left:90,top:340,fontFamily:theme.body,fontSize:46,fontWeight:600,translate:interpolate(frame,[0,12],['0px 35px','0px 0px'],{extrapolateRight:'clamp',easing:ease})}}>Bisnis udah jalan.</div>
  <BigType lines={['Websitenya','udah ada?']} top={540} left={80} size={136}/>
  <div style={{position:'absolute',left:90,top:875,height:18,width:interpolate(frame,[8,26],[0,790],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease}),background:colors.pink,rotate:'-2deg'}}/>
  <div style={{position:'absolute',right:120,top:1120,rotate:interpolate(frame,[0,56],['-25deg','35deg']),scale:interpolate(frame,[0,20],[.2,1],{extrapolateRight:'clamp',easing:ease})}}><Spark color={colors.pink} size={200}/></div>
 </AbsoluteFill>;
};

export const SalesOffer=()=>{
 const frame=useCurrentFrame();const{fps}=useVideoConfig();
 return <AbsoluteFill style={{background:colors.blue,overflow:'hidden'}}>
  <BigType lines={['Bikin website.','Bikin dilirik.']} left={80} top={220} size={122}/>
  <div style={{position:'absolute',left:325,top:675,perspective:1800,translate:interpolate(frame,[0,25],['0px 480px','0px 0px'],{extrapolateRight:'clamp',easing:ease}),rotate:interpolate(frame,[0,72],['-13deg','4deg']),scale:.9+.1*spring({frame,fps,config:{damping:180}}),transform:'rotateY(-12deg)'}}><MotionPhone project={projects[0]} width={460}/></div>
  <div style={{position:'absolute',left:90,top:1130,rotate:'-8deg',translate:interpolate(frame,[8,30],['-750px 100px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}}><DesktopCard id="cimuning" width={630}/></div>
  <div style={{position:'absolute',right:110,top:670,rotate:`${frame}deg`}}><Spark color={colors.yellow} size={105}/></div>
 </AbsoluteFill>;
};

export const ResponsiveBenefit=()=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:colors.green,overflow:'hidden'}}>
  <BigType lines={['Rapi di laptop.','Nyaman di HP.']} top={260} left={80} size={108} light={false}/>
  <div style={{position:'absolute',left:80,top:760,rotate:interpolate(frame,[0,61],['-6deg','-2deg']),translate:interpolate(frame,[0,18],['-500px 80px','0px 0px'],{extrapolateRight:'clamp',easing:ease})}}><DesktopCard id="fazmastone" width={800}/></div>
  <div style={{position:'absolute',left:640,top:1010,rotate:interpolate(frame,[0,61],['15deg','6deg']),translate:interpolate(frame,[4,24],['500px 150px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}}><MotionPhone project={projects[1]} width={300}/></div>
 </AbsoluteFill>;
};

export const CustomOffer=()=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:colors.pink,overflow:'hidden',color:colors.ink}}>
  <div style={{position:'absolute',left:85,top:245,fontFamily:theme.body,fontSize:44,fontWeight:600}}>Jasa pembuatan website custom</div>
  <BigType lines={['Sesuai','bisnismu.']} top={375} left={80} size={156} light={false}/>
  <div style={{position:'absolute',left:165,top:900,rotate:interpolate(frame,[0,93],['-9deg','3deg']),translate:interpolate(frame,[0,24],['0px 430px','0px 0px'],{extrapolateRight:'clamp',easing:ease}),scale:interpolate(frame,[0,93],[.92,1.06],{extrapolateRight:'clamp'})}}><DesktopCard id="mahameru-baja" width={760}/></div>
  <div style={{position:'absolute',left:80,top:1485,fontFamily:theme.body,fontSize:44,fontWeight:600,opacity:interpolate(frame,[10,24],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Dari ide sampai siap online.</div>
  <div style={{position:'absolute',right:110,top:745,rotate:`${frame*.7}deg`}}><Spark color={colors.blue} size={105}/></div>
 </AbsoluteFill>;
};

export const SalesClosing=()=>{
 const frame=useCurrentFrame();const{fps}=useVideoConfig();
 return <AbsoluteFill style={{background:colors.blue,color:'white',overflow:'hidden'}}>
  <div style={{position:'absolute',left:90,top:265,translate:interpolate(frame,[0,18],['0px 50px','0px 0px'],{extrapolateRight:'clamp',easing:ease}),opacity:interpolate(frame,[0,9],[0,1],{extrapolateRight:'clamp'})}}><BrandLogo size={155}/></div>
  <BigType lines={['Yuk, bikin','websitemu.']} left={80} top={635} size={139}/>
  <div style={{position:'absolute',left:90,top:1080,width:850,height:126,background:colors.yellow,color:colors.ink,borderRadius:70,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 48px',boxSizing:'border-box',fontFamily:theme.body,fontWeight:700,fontSize:44,scale:spring({frame:frame-9,fps,config:{damping:190,stiffness:200},durationInFrames:24}),transformOrigin:'left center'}}><span>Konsultasi sekarang</span><span style={{fontSize:64}}>↗</span></div>
  <div style={{position:'absolute',left:90,top:1300,fontFamily:theme.heading,fontWeight:800,fontSize:92,letterSpacing:'-.05em',opacity:interpolate(frame,[12,25],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>wasla.my.id</div>
 </AbsoluteFill>;
};
