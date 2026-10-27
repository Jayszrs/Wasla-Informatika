import {CanvasImage,Easing,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Phone} from '../film/Devices';
import {theme} from '../video/theme';
import type {MotionProject} from './data';

export const ease=Easing.bezier(.16,1,.3,1);

export const MotionPhone=({project,width=480}:{project:MotionProject;width?:number})=><div style={{width:300,scale:width/300,transformOrigin:'top left'}}><Phone width={300} src={project.mobile} sourceWidth={project.sourceWidth}/></div>;

export const PhonePose=({project,mode='full',duration=30}:{project:MotionProject;mode?:'full'|'zoom'|'sweep';duration?:number})=>{
 const frame=useCurrentFrame();const{fps}=useVideoConfig();
 const enter=spring({frame,fps,config:{damping:180,stiffness:170},durationInFrames:22});
 const width=mode==='zoom'?780:mode==='sweep'?570:460;
 return <div style={{position:'absolute',left:mode==='zoom'?145:mode==='sweep'?280:310,top:mode==='zoom'?560:mode==='sweep'?290:390,perspective:1900}}>
   <div style={{translate:`${mode==='sweep'?(1-enter)*330:0}px ${(1-enter)*190}px`,scale:mode==='zoom'?interpolate(frame,[0,duration],[.83,1.13],{extrapolateRight:'clamp'}):.9+enter*.1,transform:`rotateY(${interpolate(frame,[0,duration],[-17,9],{extrapolateRight:'clamp'})}deg) rotateX(${mode==='zoom'?8:3}deg)`,rotate:interpolate(frame,[0,duration],[mode==='sweep'?'13deg':'-8deg',mode==='sweep'?'-4deg':'4deg'],{extrapolateRight:'clamp'}),transformOrigin:'center 45%'}}><MotionPhone project={project} width={width}/></div>
 </div>;
};

export const DesktopCard=({id,width=640}:{id:string;width?:number})=><div style={{width,borderRadius:20,overflow:'hidden',background:'white',border:'1px solid #1C31532A',boxShadow:'0 24px 44px #00000020'}}><div style={{height:25,background:'#E6EBF2',display:'flex',alignItems:'center',gap:5,paddingLeft:12}}>{[0,1,2].map(i=><span key={i} style={{width:6,height:6,borderRadius:'50%',background:'#8799B2'}}/>)}</div><CanvasImage src={staticFile(`projects/${id}.webp`)} style={{width,height:width*1000/1440,display:'block'}}/></div>;

export const ScreenFragment=({project,width=590,height=225,offset=80}:{project:MotionProject;width?:number;height?:number;offset?:number})=><div style={{width,height,overflow:'hidden',borderRadius:22,background:'white',boxShadow:'0 24px 45px #00000025',border:'1px solid #11213B18'}}><CanvasImage src={staticFile(project.mobile)} style={{display:'block',width,height:width*844/project.sourceWidth,translate:`0px ${-offset}px`}}/></div>;

export const BigType=({lines,light=true,top=260,size=143,left=70}:{lines:string[];light?:boolean;top?:number;size?:number;left?:number})=>{
 const frame=useCurrentFrame();
 return <div style={{position:'absolute',left,top,color:light?'white':'#101010',fontFamily:theme.heading,fontSize:size,fontWeight:800,lineHeight:1.01,letterSpacing:'-.065em',zIndex:3}}>{lines.map((line,i)=><div key={line} style={{overflow:'hidden',paddingBottom:14}}><div style={{translate:interpolate(frame,[i*3,i*3+14],['0px 150px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}}>{line}</div></div>)}</div>;
};

export const Spark=({color='#164BF5',size=100}:{color?:string;size?:number})=><svg width={size} height={size} viewBox="0 0 100 100" fill="none"><path d="M50 3c1 31 16 46 47 47-31 1-46 16-47 47C49 66 34 51 3 50 34 49 49 34 50 3Z" fill={color}/></svg>;
