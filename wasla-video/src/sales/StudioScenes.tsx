import {AbsoluteFill,CanvasImage,interpolate,staticFile,useCurrentFrame} from 'remotion';
import type {ReactNode} from 'react';
import {BrandLogo} from '../components/BrandLogo';
import {Cursor,ease,Icon} from '../landscape/Elements';
import {projects} from '../motion/data';
import {theme} from '../video/theme';

const ink='#0C0D0E';
const type={fontFamily:theme.body,fontWeight:650,letterSpacing:'-.055em'} as const;
const SalesStage=({children,light=false}:{children:ReactNode;light?:boolean})=><AbsoluteFill style={{background:light?'#EEEFEA':ink,color:light?ink:'#F7F8F4',overflow:'hidden',fontFamily:theme.body}}>
 {!light&&<><div style={{position:'absolute',left:-180,right:-180,bottom:-140,height:650,background:'radial-gradient(ellipse,#226A765E,transparent 65%)',filter:'blur(65px)'}}/><div style={{position:'absolute',left:100,right:100,top:-400,height:680,background:'radial-gradient(ellipse,#536B8B22,transparent 68%)',filter:'blur(60px)'}}/></>}{children}
</AbsoluteFill>;

const MaskedLines=({lines,top=500,size=112}:{lines:string[];top?:number;size?:number})=>{
 const f=useCurrentFrame();
 return <div style={{position:'absolute',left:85,right:85,top,...type,fontSize:size,lineHeight:1.07}}>{lines.map((line,i)=><div key={line} style={{overflow:'hidden',paddingBottom:15}}><div style={{translate:interpolate(f,[i*4,i*4+15],['0px 160px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}}>{line}</div></div>)}</div>;
};

export const StudioHook=()=>{
 const f=useCurrentFrame();
 return <SalesStage>
  <div style={{position:'absolute',left:90,top:260,...type,fontSize:44,fontWeight:500,color:'#BBC9D3'}}>Jasa pembuatan website</div>
  <MaskedLines lines={['Bisnismu layak','tampil','meyakinkan.']} top={505} size={109}/>
  <div style={{position:'absolute',left:300,top:1150,width:510,height:310,borderRadius:70,border:'2px solid #D5ECFD55',background:'linear-gradient(145deg,#263B4990,#0D161A)',transform:`perspective(1000px) rotateY(${interpolate(f,[0,56],[-24,14])}deg) rotateX(15deg)`,rotate:interpolate(f,[0,56],['-14deg','5deg']),translate:interpolate(f,[0,24],['0px 280px','0px 0px'],{extrapolateRight:'clamp',easing:ease}),boxShadow:'inset 0 2px 8px #FFF2,0 25px 80px #0008',display:'flex',alignItems:'center',justifyContent:'center',color:'#C8F0FA'}}><Icon kind={2} size={165}/><div style={{position:'absolute',left:interpolate(f,[0,56],[-20,500]),top:0,width:75,height:3,background:'#C6F6FF',filter:'blur(3px)',boxShadow:'0 0 24px #85E0FE'}}/></div>
 </SalesStage>;
};

export const KineticOffer=()=>{
 const f=useCurrentFrame();const second=f>=36;const local=f%36;
 const word=second?'Berkelas.':'Website.';
 return <AbsoluteFill style={{background:second?'#062F35':'#F3313C',color:second?'#C0F5FA':'#FFF8F4',overflow:'hidden',...type}}>
  {[-1,0,1,2,3].map((row)=><div key={row} style={{position:'absolute',left:-250,top:320+row*320,fontSize:205,whiteSpace:'nowrap',opacity:.17,translate:`${interpolate(local,[0,36],[row%2?-180:180,row%2?180:-180])}px 0px`}}>{word} {word}</div>)}
  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:158,scale:interpolate(local,[0,10,36],[.83,1,1.04],{extrapolateRight:'clamp',easing:ease})}}>{word}</div>
 </AbsoluteFill>;
};

// These screenshots occur in one scene only; no project introduction or titles.
export const PortfolioScroll=()=>{
 const f=useCurrentFrame();
 return <SalesStage>
  <div style={{position:'absolute',left:-145,top:-320,width:1370,height:3700,transform:'perspective(1700px) rotateX(6deg) rotateZ(-9deg)',scale:1.04}}>
   {[0,1].map(col=><div key={col} style={{position:'absolute',left:col*665,top:0,width:620,translate:`0px ${interpolate(f,[0,73],col===0?[-40,-810]:[-800,-30],{extrapolateRight:'clamp'})}px`}}>
    {Array.from({length:7},(_,row)=>{const p=projects[(row*2+col)%6];return <div key={row} style={{position:'absolute',top:row*475,width:620,height:430,borderRadius:31,overflow:'hidden',border:'2px solid #D3DFE529',boxShadow:'0 15px 40px #0005'}}><CanvasImage src={staticFile(`projects/${p.id}.webp`)} style={{display:'block',width:620,height:430,objectFit:'cover'}}/></div>;})}
   </div>)}
  </div>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(#0C0D0E90,transparent 18%,transparent 80%,#0C0D0EB0)'}}/>
  <Cursor x={interpolate(f,[0,73],[820,650])} y={interpolate(f,[0,73],[1350,1050])} scale={.85}/>
 </SalesStage>;
};

export const FeaturePills=()=>{
 const f=useCurrentFrame();
 return <SalesStage light>
  <MaskedLines lines={['Dirancang','untuk bisnismu.']} top={300} size={107}/>
  {['Desain custom','Responsif','Siap online'].map((label,i)=><div key={label} style={{position:'absolute',left:i===1?150:100,top:840+i*205,width:780,height:155,borderRadius:90,background:'#272A28',color:'#F9FAF5',border:'2px solid #535A52',boxShadow:'0 12px 35px #0002',display:'flex',alignItems:'center',gap:22,padding:'18px 28px',boxSizing:'border-box',...type,fontSize:60,translate:interpolate(f,[8+i*9,8+i*9+20],[`${i%2?440:-440}px 100px`,'0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease}),opacity:interpolate(f,[8+i*9,17+i*9],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><div style={{width:113,height:113,flexShrink:0,borderRadius:'50%',background:'#F7F8ED',color:'#272A28',display:'flex',alignItems:'center',justifyContent:'center',order:i===1?2:0}}><Icon kind={[1,0,2][i]} size={72}/></div><span style={{textAlign:'center',flex:1}}>{label}</span></div>)}
  <div style={{position:'absolute',left:105,top:850,width:140,height:140,borderRadius:'50%',background:'#30C3DC',filter:'blur(55px)',opacity:interpolate(f,[0,22,55,81],[0,.4,.1,0],{extrapolateRight:'clamp'})}}/>
 </SalesStage>;
};

export const LaunchMoment=()=>{
 const f=useCurrentFrame();
 return <SalesStage>
  <MaskedLines lines={['Dari ide,','sampai online.']} top={300} size={116}/>
  <div style={{position:'absolute',left:235,top:870,width:610,height:610,borderRadius:'50%',background:'radial-gradient(circle at 25% 20%,#3C464D,#171B1E 43%,#090B0D 75%)',boxShadow:'-18px 5px 45px #FFFFFF12,inset -10px -12px 22px #FFFFFF15',scale:interpolate(f,[0,25],[.58,1],{extrapolateRight:'clamp',easing:ease}),display:'flex',alignItems:'center',justifyContent:'center'}}>
   <div style={{position:'absolute',inset:56,border:'2px solid #91C3D138',borderRadius:'50%',transform:'rotateX(62deg) rotateZ(-25deg)',scale:interpolate(f,[0,63],[1.05,1.45])}}/>
   <svg width="180" height="180" viewBox="0 0 180 180" fill="none" stroke="#C1EEF6" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" style={{translate:interpolate(f,[0,30],['-60px 60px','0px 0px'],{extrapolateRight:'clamp',easing:ease})}}><path d="m45 135 90-90H62m73 0v73"/></svg>
  </div>
 </SalesStage>;
};

export const StudioClosing=()=>{
 const f=useCurrentFrame();
 return <SalesStage>
  <div style={{position:'absolute',left:95,top:235,opacity:interpolate(f,[0,12],[0,1],{extrapolateRight:'clamp'})}}><BrandLogo size={148}/></div>
  <MaskedLines lines={['Waktunya','punya website.']} top={665} size={113}/>
  <div style={{position:'absolute',left:85,top:1125,width:910,height:148,borderRadius:90,padding:'0 28px 0 38px',boxSizing:'border-box',border:'2px solid #C1D7E35E',background:'linear-gradient(135deg,#2A3035,#0E1316)',boxShadow:'inset 0 2px 4px #FFFFFF35,0 10px 35px #0005',display:'flex',alignItems:'center',justifyContent:'space-between',...type,fontSize:51,translate:interpolate(f,[7,27],['0px 100px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease}),opacity:interpolate(f,[7,19],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><span>Konsultasi sekarang</span><div style={{width:100,height:100,borderRadius:'50%',background:'radial-gradient(circle at 30% 30%,#A5D0E9,#184459 55%,#07131B)',border:'2px solid #D2F0FF70',display:'flex',alignItems:'center',justifyContent:'center',fontSize:63}}>↗</div><div style={{position:'absolute',left:interpolate(f,[8,90],[-10,900]),top:0,width:45,height:3,background:'#E9FAFF',filter:'blur(3px)',boxShadow:'0 0 20px 3px #C9FAFF80'}}/></div>
  <div style={{position:'absolute',left:95,top:1400,...type,fontSize:85,opacity:interpolate(f,[14,28],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>wasla.my.id</div>
 </SalesStage>;
};
