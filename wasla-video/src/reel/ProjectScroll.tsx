import {CanvasImage,Easing,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {ReelChrome} from './ReelChrome';
import type {ReelProject} from './data';

const Viewport=({project,width,height,scroll}:{project:ReelProject;width:number;height:number;scroll:number})=>{
  const fullHeight=project.full?(project.sourceHeight??1000)*width/(project.sourceWidth??1440):0;
  const boardHeight=width*1000/1440;
  const stackHeight=(project.boards?.length??0)*(boardHeight+34)-34;
  const maxScroll=project.full?Math.min(Math.max(0,fullHeight-height), (project.scrollPixels??1800)*width/(project.sourceWidth??1440)):Math.max(0,stackHeight-height);
  return <div style={{height,overflow:'hidden',position:'relative',background:project.full?'white':'#0B1424'}}>
    <div style={{translate:`0px ${-maxScroll*scroll}px`}}>
      {project.full?<CanvasImage src={staticFile(project.full)} style={{display:'block',width,height:fullHeight}}/>:project.boards?.map(src=><CanvasImage key={src} src={staticFile(src)} style={{display:'block',width,height:boardHeight,marginBottom:34,borderRadius:7}}/>)}
    </div>
  </div>;
};

export const ProjectScroll=({project,index}:{project:ReelProject;index:number})=>{
  const frame=useCurrentFrame();
  const scroll=interpolate(frame,[0,12,42,57,87,102,137,149],[0,0,.2,.24,.58,.62,1,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.25,.1,.25,1)});
  return <ReelChrome name={project.name} index={index} accent={project.accent}>
    <div style={{position:'absolute',left:54,top:235,perspective:2000}}>
      <div style={{width:972,borderRadius:24,overflow:'hidden',border:'1px solid #526A8F',boxShadow:'0 40px 110px #00000070',opacity:interpolate(frame,[0,9],[.25,1],{extrapolateRight:'clamp'}),translate:interpolate(frame,[0,15,134,149],['0px 95px','0px 0px','0px 0px','0px -65px'],{extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)}),transform:`rotateY(${interpolate(frame,[0,30,149],[index%2===0?5:-5,0,index%2===0?-1.5:1.5],{extrapolateRight:'clamp'})}deg)`,scale:interpolate(frame,[0,149],[.975,1.015],{extrapolateRight:'clamp'})}}>
        <div style={{height:43,background:'#121D30',display:'flex',alignItems:'center',padding:'0 18px',gap:7,borderBottom:'1px solid #314461'}}>{[0,1,2].map(i=><div key={i} style={{height:7,width:7,borderRadius:'50%',background:'#5F789B'}}/>)}<div style={{fontSize:17,marginLeft:22,color:'#B5C5DD'}}>{project.url}</div></div>
        <Viewport project={project} width={972} height={1265} scroll={scroll}/>
      </div>
    </div>
    <div style={{position:'absolute',right:41,top:360,width:3,height:1020,background:'#8199BA20'}}><div style={{height:100,background:project.accent,translate:`0px ${scroll*920}px`}}/></div>
    {frame>141 && <div style={{position:'absolute',inset:0,zIndex:30,background:'#050B18',opacity:interpolate(frame,[141,149],[0,.85],{extrapolateRight:'clamp'})}}/>}
  </ReelChrome>;
};
