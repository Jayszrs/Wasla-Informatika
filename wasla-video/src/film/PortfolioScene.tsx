import {interpolate,useCurrentFrame,useVideoConfig,Easing} from 'remotion';
import {FilmShell} from './FilmShell';
import {FilmEyebrow,FilmTitle} from './FilmType';
import {Laptop,Phone} from './Devices';
import type {PortfolioProject} from './portfolio';
import {theme} from '../video/theme';

export const PortfolioScene=({project,index}:{project:PortfolioProject;index:string})=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <FilmShell duration={8*fps} light={project.light} index={index} chapter={`KARYA WASLA / ${project.category.toUpperCase()}`}>
    <div style={{position:'absolute',left:84,top:235}}><FilmEyebrow light={project.light}>PORTOFOLIO / {project.number}</FilmEyebrow></div>
    <div style={{position:'absolute',right:62,top:184,fontFamily:theme.heading,fontWeight:800,fontSize:240,lineHeight:1,letterSpacing:'-.08em',opacity:project.light?.045:.06}}>{project.number}</div>
    <div style={{position:'absolute',left:80,top:302,width:920}}><FilmTitle lines={project.name} light={project.light} size={project.id==='mahameru-baja'?91:106} accent={project.name.length-1} delay={5}/></div>
    <div style={{position:'absolute',left:84,top:project.name.length===1?455:565,fontSize:32,color:project.light?'#5B6E88':'#ADC1DE',opacity:interpolate(frame,[18,35],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>{project.category}</div>
    <div style={{position:'absolute',left:91,top:project.name.length===1?600:700,perspective:1800}}>
      <div style={{translate:interpolate(frame,[8,46],['0px 140px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)}),opacity:interpolate(frame,[8,30],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),transform:`rotateY(${interpolate(frame,[8,65,210],[-9,-4,2],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}deg) rotateX(3deg)`,rotate:interpolate(frame,[8,210],['-3deg','-1deg'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),scale:interpolate(frame,[40,210],[.97,1.015],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><Laptop width={880} src={project.image} detail={project.detail} url={project.url}/></div>
    </div>
    <div style={{position:'absolute',left:700,top:1070,perspective:1200}}><div style={{translate:interpolate(frame,[45,82],['90px 210px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)}),opacity:interpolate(frame,[45,65],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),rotate:interpolate(frame,[45,150],['9deg','4deg'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),transform:'rotateY(-9deg)',scale:interpolate(frame,[75,220],[.96,1.015],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><Phone src={project.mobile} width={270} sourceWidth={project.mobileWidth}/></div></div>
    <div style={{position:'absolute',left:84,top:1492,width:570,fontSize:44,lineHeight:1.4,color:project.light?theme.navy:theme.ice,opacity:interpolate(frame,[68,90],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:interpolate(frame,[68,100],['0px 25px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>{project.caption[0]}<br/>{project.caption[1]}</div>
    <div style={{position:'absolute',left:84,top:1697,fontSize:24,fontWeight:700,color:project.light?'#5B6E88':'#ADC1DE',opacity:interpolate(frame,[90,110],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Tampilan desktop & mobile asli</div>
  </FilmShell>;
};
