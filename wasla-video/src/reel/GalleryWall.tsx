import {CanvasImage,staticFile,useCurrentFrame} from 'remotion';

const left=['cimuning','ngajiyuk','sit-permatahati','cimuning'];
const right=['mahameru-baja','fazmastone','ipnubekasi','mahameru-baja'];
export const GalleryWall=({speed=2}:{speed?:number})=>{
  const frame=useCurrentFrame();
  return <div style={{position:'absolute',inset:-100,rotate:'-9deg',scale:1.07,opacity:.8}}>
    {[left,right].map((items,column)=><div key={column} style={{position:'absolute',left:column*645-70,top:column===0?-80:-400,width:610,translate:`0px ${-frame*speed*(column===0?1:1.3)}px`}}>{items.map((name,i)=><div key={`${name}-${i}`} style={{background:'white',paddingTop:20,borderRadius:14,overflow:'hidden',marginBottom:34,boxShadow:'0 25px 60px #00000050'}}><CanvasImage src={staticFile(`projects/${name}.webp`)} style={{display:'block',width:610,height:610*1000/1440}}/></div>)}</div>)}
  </div>;
};
