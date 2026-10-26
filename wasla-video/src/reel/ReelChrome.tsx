import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';
import {BrandLogo} from '../components/BrandLogo';
import {theme} from '../video/theme';
import type {ReactNode} from 'react';

export const ReelChrome=({children,index,name,accent='#397BFF'}:{children:ReactNode;index?:number;name?:string;accent?:string})=>{
  const frame=useCurrentFrame();
  return <AbsoluteFill style={{overflow:'hidden',background:'#050B18',color:'white',fontFamily:theme.body}}>
    <AbsoluteFill style={{background:`radial-gradient(ellipse at 95% 65%,${accent}22,transparent 62%)`}}/>
    <div style={{position:'absolute',left:62,top:104,zIndex:10}}><BrandLogo size={67} emblem={false}/></div>
    <div style={{position:'absolute',right:64,top:117,fontSize:24,letterSpacing:'.14em',fontWeight:600,color:'#A0B3CD',zIndex:10}}>KARYA WASLA</div>
    {children}
    {name && <div style={{position:'absolute',left:74,top:1650,right:74,display:'flex',justifyContent:'space-between',alignItems:'center',gap:25}}><div style={{fontFamily:theme.heading,fontWeight:700,fontSize:46,letterSpacing:'-.035em'}}>{name}</div><span style={{fontSize:26,color:'#A0B3CD',flexShrink:0}}>{String(index).padStart(2,'0')} / 06</span></div>}
    <div style={{position:'absolute',left:74,right:74,top:1755,height:2,background:'#14243B'}}><div style={{width:`${interpolate(frame,[0,149],[0,100],{extrapolateRight:'clamp'})}%`,height:2,background:accent}}/></div>
  </AbsoluteFill>;
};
