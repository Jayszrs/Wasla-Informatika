import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../video/theme';

export const FilmTitle = ({lines,size=100,delay=0,light=false,accent=-1}: {lines:string[];size?:number;delay?:number;light?:boolean;accent?:number}) => {
  const frame=useCurrentFrame();
  return <div style={{fontFamily:theme.heading,fontWeight:800,fontSize:size,lineHeight:1.08,letterSpacing:'-.055em',color:light?theme.navy:'white'}}>
    {lines.map((line,i)=><div key={line} style={{overflow:'hidden',paddingBottom:9}}><div style={{color:accent===i?theme.blue:undefined,
      translate:interpolate(frame,[delay+i*5,delay+i*5+25],['0px 125px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)}),
      opacity:interpolate(frame,[delay+i*5,delay+i*5+15],[.2,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),
    }}>{line}</div></div>)}
  </div>;
};

export const FilmEyebrow = ({children,light=false}: {children:React.ReactNode;light?:boolean}) => <div style={{display:'flex',alignItems:'center',gap:18,color:light?theme.royal:'#ADC1DE',fontFamily:theme.body,fontSize:28,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase'}}><span style={{height:3,width:42,background:theme.blue}}/>{children}</div>;
