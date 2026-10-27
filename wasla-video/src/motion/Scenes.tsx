import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
import {BrandLogo} from '../components/BrandLogo';
import {BigType,DesktopCard,ease,MotionPhone,PhonePose,Spark} from './Elements';
import {colors,projects,type MotionProject} from './data';
import {theme} from '../video/theme';

export const IntroWord=()=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:colors.ink,color:colors.pink,alignItems:'center',justifyContent:'center',fontFamily:theme.heading,fontWeight:800,fontSize:92,letterSpacing:'-.06em'}}><div style={{scale:interpolate(frame,[0,12,24],[.65,1.05,.9],{extrapolateRight:'clamp'}),translate:interpolate(frame,[0,10],['0px 35px','0px 0px'],{extrapolateRight:'clamp'})}}>Kenalin.</div></AbsoluteFill>;
};

export const LogoPunch=({background=colors.white,closing=false}:{background?:string;closing?:boolean})=>{
 const frame=useCurrentFrame();const{fps}=useVideoConfig();const dark=background===colors.white||background===colors.ice||background===colors.green;
 return <AbsoluteFill style={{background,color:dark?colors.navy:'white'}}>
   <div style={{position:'absolute',left:170,top:closing?720:800,scale:spring({frame,fps,config:{damping:170,stiffness:180},durationInFrames:22}),transformOrigin:'center'}}><BrandLogo size={195} dark={dark}/></div>
   {closing&&<div style={{position:'absolute',left:170,top:1070,fontFamily:theme.heading,fontWeight:800,fontSize:91,letterSpacing:'-.05em',opacity:interpolate(frame,[6,19],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:interpolate(frame,[6,24],['0px 24px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>wasla.my.id</div>}
   {!closing&&<div style={{position:'absolute',left:710,top:1020,rotate:interpolate(frame,[0,24],['-30deg','20deg'],{extrapolateRight:'clamp'})}}><Spark color={colors.blue} size={98}/></div>}
 </AbsoluteFill>;
};

export const HeroPhone=({project,background=colors.white,duration=30,zoom=false,headline}:{project:MotionProject;background?:string;duration?:number;zoom?:boolean;headline?:string[]})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const dark=background===colors.white||background===colors.ice||background===colors.green||background===colors.yellow;
 return <AbsoluteFill style={{background,overflow:'hidden'}}>
   {headline&&<BigType lines={headline} light={!dark} top={235} size={145}/>}
   {!headline&&!zoom&&<div style={{position:'absolute',left:100,top:160,fontFamily:theme.body,fontSize:29,fontWeight:700,color:dark?colors.navy:'white',opacity:interpolate(frame,[0,9],[0,1],{extrapolateRight:'clamp'})}}>{project.name}</div>}
   <div style={headline?{position:'absolute',inset:0,translate:'50px 260px'}:{position:'absolute',inset:0}}><PhonePose project={project} duration={duration} mode={zoom?'zoom':'full'}/></div>
   {!zoom&&!headline&&<div style={{position:'absolute',left:70,top:1070,rotate:'-6deg',translate:interpolate(frame,[8,26],['-500px 65px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease}),scale:.86+.14*spring({frame:frame-8,fps,config:{damping:190}})}}><DesktopCard id={project.id} width={590}/></div>}
   {!zoom&&<div style={{position:'absolute',right:95,top:headline?680:310,rotate:`${frame*1.5}deg`,scale:interpolate(frame,[0,20],[.3,1],{extrapolateRight:'clamp'})}}><Spark color={dark?colors.blue:colors.yellow} size={72}/></div>}
 </AbsoluteFill>;
};

export const FloatingUI=({project,background=colors.white}:{project:MotionProject;background?:string})=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background,overflow:'hidden'}}>
   <div style={{position:'absolute',left:320,top:310,scale:.78,transform:'perspective(1800px) rotateY(-15deg)',rotate:'-5deg',opacity:.98}}><MotionPhone project={project} width={500}/></div>
   {[0,1,2].map((i)=><div key={i} style={{position:'absolute',left:i===1?340:90,top:390+i*430,rotate:interpolate(frame,[0,30],[i%2===0?'-14deg':'12deg',i%2===0?'-5deg':'5deg'],{extrapolateRight:'clamp'}),translate:interpolate(frame,[i*3,i*3+22],[`${i%2===0?-650:650}px 50px`,'0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}}><DesktopCard id={i===0?project.id:`${project.id}-detail-${i}`} width={650}/></div>)}
 </AbsoluteFill>;
};

export const WorkTiles=({background=colors.white,fan=false}:{background?:string;fan?:boolean})=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background,overflow:'hidden'}}>
   {projects.map((p,i)=><div key={p.id} style={{position:'absolute',left:fan?40+i*110:(i%2)*570-60,top:fan?420+(i%2)*110:170+Math.floor(i/2)*520,rotate:fan?`${-18+i*7}deg`:`${i%2===0?-6:7}deg`,translate:interpolate(frame,[i*2,i*2+20],[`${i%2===0?-180:180}px 250px`,'0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease}),scale:fan?.87:1}}>{fan?<MotionPhone project={p} width={365}/>:<DesktopCard id={p.id} width={610}/>}</div>)}
 </AbsoluteFill>;
};

export const ScrollBands=()=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:colors.blue,overflow:'hidden'}}>
   {[0,1,2].map((row)=><div key={row} style={{position:'absolute',top:110+row*580,left:-100,display:'flex',gap:24,rotate:'-6deg',translate:`${-frame*(row%2===0?5:-5)-(row%2===0?0:500)}px 0px`}}>{[...projects,...projects].map((p,i)=><DesktopCard key={`${p.id}-${i}`} id={p.id} width={710}/>)}</div>)}
 </AbsoluteFill>;
};
