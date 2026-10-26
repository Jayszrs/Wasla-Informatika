import {AbsoluteFill,Easing,interpolate,useCurrentFrame} from 'remotion';
import type {ReactNode} from 'react';
import {BrandLogo} from '../components/BrandLogo';
import {theme} from '../video/theme';

export const FilmShell=({children,duration,light=false,first=false,last=false,chapter='PORTOFOLIO WASLA',index='01'}:{children:ReactNode;duration:number;light?:boolean;first?:boolean;last?:boolean;chapter?:string;index?:string})=>{
  const frame=useCurrentFrame();
  return <AbsoluteFill style={{overflow:'hidden',background:light?'#F1F5FB':theme.deep,color:light?theme.navy:'white',fontFamily:theme.body}}>
    <AbsoluteFill style={{background:light?'radial-gradient(ellipse at 90% 65%,#DBE7FB00,#F8FAFE 80%)':'radial-gradient(ellipse at 100% 62%,#163B73 0%,#071A33 44%,#040F21 85%)'}}/>
    <svg width="1080" height="1920" style={{position:'absolute',opacity:light?.075:.09}} fill="none" stroke={light?theme.navy:'#91B5FF'}>
      <path d="M-150 1460 1080 650M-120 1510 1080 700M-120 1560 1080 750M-120 1610 1080 800"/>
      <path d="M810 0v1920M84 0v1920" strokeDasharray="2 22"/>
      <circle cx="1040" cy="1120" r="570"/><circle cx="1040" cy="1120" r="490"/>
    </svg>
    <div style={{position:'absolute',height:850,width:3,top:interpolate(frame,[0,duration],[-850,1920]),left:810,background:'linear-gradient(transparent,#397BFF80,transparent)'}}/>
    <div style={{position:'absolute',left:84,top:103}}><BrandLogo size={66} dark={light} emblem={false}/></div>
    <div style={{position:'absolute',right:84,top:112,fontSize:25,fontWeight:600,color:light?'#526782':'#ADC1DE',letterSpacing:'.09em'}}>{index} / 09</div>
    {children}
    <div style={{position:'absolute',left:84,right:84,top:1772,height:1,background:light?'#BBCBE3':'#456085'}}><div style={{height:2,width:`${interpolate(frame,[0,duration-1],[0,100])}%`,background:theme.blue}}/></div>
    <div style={{position:'absolute',left:84,top:1800,fontSize:21,fontWeight:600,letterSpacing:'.12em',color:light?'#5F738E':'#8CA6CC'}}>{chapter}</div>
    {!first && frame<16 && <div style={{position:'absolute',inset:-4,zIndex:99,background:theme.blue,translate:interpolate(frame,[0,15],['0px 0px','-1170px 0px'],{easing:Easing.bezier(.76,0,.24,1),extrapolateRight:'clamp'}),borderRight:'10px solid #B6D0FF'}}/>}
    {!last && frame>=duration-16 && <div style={{position:'absolute',inset:-4,zIndex:99,background:theme.blue,translate:interpolate(frame,[duration-16,duration-1],['1170px 0px','0px 0px'],{easing:Easing.bezier(.76,0,.24,1),extrapolateRight:'clamp'}),borderLeft:'10px solid #B6D0FF'}}/>}
  </AbsoluteFill>;
};
