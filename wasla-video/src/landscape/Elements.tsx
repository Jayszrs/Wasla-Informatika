import {AbsoluteFill,CanvasImage,Easing,interpolate,staticFile,useCurrentFrame} from 'remotion';
import type {ReactNode} from 'react';
import {theme} from '../video/theme';

export const ease=Easing.bezier(.16,1,.3,1);
export const dark='#0C0D0E';
export const textStyle={fontFamily:theme.body,fontWeight:650,letterSpacing:'-.045em'} as const;
export const Backdrop=({children,light=false}:{children?:ReactNode;light?:boolean})=><AbsoluteFill style={{background:light?'#EEEEEC':dark,color:light?dark:'#F7F7F3',overflow:'hidden',fontFamily:theme.body}}>
 {!light&&<div style={{position:'absolute',left:250,right:250,bottom:-240,height:460,background:'radial-gradient(ellipse,#25748365,transparent 65%)',filter:'blur(55px)'}}/>}{children}
</AbsoluteFill>;

export const WorkCard=({id,width=420,height=280,src}:{id?:string;width?:number;height?:number;src?:string})=><div style={{width,height,borderRadius:28,overflow:'hidden',background:'#F4F4F0',boxShadow:'0 12px 45px #00000035',border:'1px solid #FFFFFF28'}}><CanvasImage src={staticFile(src||`projects/${id}.webp`)} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block'}}/></div>;

export const Cursor=({x=960,y=540,scale=1}:{x?:number;y?:number;scale?:number})=><svg width={64*scale} height={82*scale} viewBox="0 0 64 82" style={{position:'absolute',left:x,top:y,filter:'drop-shadow(0 4px 7px #0008)',zIndex:5}}><path d="M5 4v60l15-14 15 26 13-8-15-26 23-3Z" fill="white" stroke="#171717" strokeWidth="3"/></svg>;

export const Icon=({kind=0,size=70}:{kind?:number;size?:number})=><svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
 {kind===0?<><path d="M7 40Q40 2 73 40Q40 78 7 40Z"/><circle cx="40" cy="40" r="12"/></>:kind===1?<><path d="m22 58 7-22 26-26 15 15-26 26Z"/><path d="m29 36 15 15M20 62l-3 3"/></>:<><path d="m27 20-20 20 20 20m26-40 20 20-20 20M46 12 34 68"/></>}
</svg>;

export const Reveal=({children,delay=0}:{children:ReactNode;delay?:number})=>{
 const frame=useCurrentFrame();
 return <div style={{opacity:interpolate(frame,[delay,delay+18],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:interpolate(frame,[delay,delay+28],['0px 35px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}}>{children}</div>;
};
