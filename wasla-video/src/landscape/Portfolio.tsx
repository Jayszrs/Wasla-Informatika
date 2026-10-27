import {CanvasImage,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {projects} from '../motion/data';
import {Backdrop,Cursor,ease,textStyle,WorkCard} from './Elements';

export const SplitIdeas=()=>{
 const f=useCurrentFrame();
 return <Backdrop>
  <div style={{position:'absolute',left:90,top:75,width:720,height:930,perspective:1700,translate:interpolate(f,[0,35],['-520px 0px','0px 0px'],{extrapolateRight:'clamp',easing:ease})}}><div style={{rotate:interpolate(f,[0,138],['-8deg','3deg']),transform:'rotateY(8deg)',filter:'drop-shadow(0 0 25px #87E8FF45)'}}><WorkCard id="cimuning" width={720} height={930}/></div></div>
  <div style={{position:'absolute',left:1000,top:380,width:790,...textStyle,fontSize:116,lineHeight:1.05}}>{f<65?<><div>Tempat ide</div><div style={{opacity:interpolate(f,[12,34],[0,1],{extrapolateRight:'clamp'})}}>bermula<span style={{fontWeight:300,opacity:f%36<22?1:0}}>|</span></div></>:<><div>jadi</div><div>nyata.</div></>}</div>
  <div style={{position:'absolute',left:75,top:365,width:760,height:280,border:'24px solid #FFFFFFCA',borderRadius:'50%',transform:'perspective(1100px) rotateX(69deg) rotateZ(-12deg)',opacity:interpolate(f,[45,65,115,137],[0,.8,.8,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),filter:'blur(1px)'}}/>
 </Backdrop>;
};

const ribbonColors=['#F7CF3C','#DCCBBE','#38CE70','#F87152','#90D7FA','#FA7283','#D7D6CC','#C8E84D'];
export const PortfolioRibbons=()=>{
 const f=useCurrentFrame();
 return <Backdrop light>
  <div style={{position:'absolute',inset:0,perspective:2000,scale:interpolate(f,[0,156],[.85,1.19],{extrapolateRight:'clamp'}),transform:`rotateY(${interpolate(f,[0,156],[-8,6])}deg) rotateX(4deg)`,translate:`${interpolate(f,[0,156],[110,-75])}px 0px`}}>
   {Array.from({length:8},(_,i)=>{const p=projects[i%projects.length];return <div key={i} style={{position:'absolute',left:55+i*235,top:70+(i%3)*47,width:250,height:870,background:ribbonColors[i],overflow:'hidden',translate:interpolate(f,[i*3,i*3+34],['0px 650px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease}),rotate:`${i%2?2:-2}deg`,boxShadow:'0 15px 30px #0002'}}><div style={{height:145,padding:'30px 24px',boxSizing:'border-box',color:'#151515',...textStyle,fontSize:31,lineHeight:1.1}}>{['Website','Desain','Bisnis','Digital','Custom','Responsif','Kreatif','Solusi'][i]}<br/><span style={{fontSize:20,fontWeight:500}}>oleh Wasla</span></div><CanvasImage src={staticFile(p.mobile)} style={{width:250,height:730,objectFit:'cover',objectPosition:'top',display:'block'}}/></div>;})}
  </div>
  <div style={{position:'absolute',left:0,right:0,bottom:0,height:100,background:'linear-gradient(transparent,#ECECEAE8)',filter:'blur(8px)'}}/>
 </Backdrop>;
};

export const FloatingPortfolio=()=>{
 const f=useCurrentFrame();
 const pos=[{x:125,y:100,r:-10},{x:735,y:65,r:6},{x:1380,y:145,r:-5},{x:225,y:660,r:3},{x:830,y:735,r:-8},{x:1370,y:650,r:8}];
 return <Backdrop>
  {projects.map((p,i)=>{const t=pos[i];return <div key={p.id} style={{position:'absolute',left:t.x,top:t.y,rotate:`${t.r+Math.sin(f/60+i)*2}deg`,translate:interpolate(f,[0,36],[`${(i%3-1)*270}px ${i<3?-200:200}px`,'0px 0px'],{extrapolateRight:'clamp',easing:ease}),scale:interpolate(f,[0,144],[.83,1.04],{extrapolateRight:'clamp'})}}><div style={{position:'absolute',inset:15,background:['#7FA0FF','#C187FF','#FFD065','#A4E094','#F2707B','#36A9CF'][i],filter:'blur(65px)',opacity:.26}}/><div style={{position:'relative'}}><WorkCard id={p.id} width={410} height={260}/></div></div>;})}
  <div style={{position:'absolute',left:480,right:480,top:460,textAlign:'center',...textStyle,fontSize:77,lineHeight:1.1,opacity:interpolate(f,[15,37],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Dibuat untuk<br/>bisnismu.</div>
  <Cursor x={interpolate(f,[0,144],[1450,1180])} y={interpolate(f,[0,144],[750,600])} scale={.7}/>
 </Backdrop>;
};

export const TiltedPortfolio=()=>{
 const f=useCurrentFrame();
 return <Backdrop>
  <div style={{position:'absolute',left:-500,top:-600,width:2900,height:2250,transform:'perspective(2000px) rotateX(28deg) rotateZ(-19deg)',scale:1.12,translate:`${interpolate(f,[0,132],[0,-180])}px ${interpolate(f,[0,132],[-80,150])}px`}}>
   {Array.from({length:12},(_,i)=><div key={i} style={{position:'absolute',left:i%4*725,top:Math.floor(i/4)*700}}><WorkCard id={projects[i%6].id} width={660} height={460}/></div>)}
  </div>
  <div style={{position:'absolute',inset:0,background:'#0708114A'}}/>
  <div style={{position:'absolute',left:0,right:0,top:420,textAlign:'center',fontSize:121,fontStyle:'italic',...textStyle,textShadow:'0 5px 30px #000'}}>{f<66?'Website.':'Untuk bisnismu.'}</div>
  <div style={{position:'absolute',left:840,top:355,...textStyle,fontSize:33}}>Karya kami</div>
  <Cursor x={interpolate(f,[0,132],[780,1220])} y={540}/>
 </Backdrop>;
};

export const WebsiteShowcase=()=>{
 const f=useCurrentFrame();
 return <Backdrop>
  <div style={{position:'absolute',left:230,top:95,width:1460,boxSizing:'border-box',padding:10,borderRadius:32,background:'#101B23',border:'1px solid #91AAB966',boxShadow:'0 20px 90px #3B93B72A,0 35px 65px #0008',scale:interpolate(f,[0,38,186],[.92,1,1.012],{extrapolateRight:'clamp',easing:ease}),translate:interpolate(f,[0,32],['0px 40px','0px 0px'],{extrapolateRight:'clamp',easing:ease}),transform:`perspective(2600px) rotateY(${interpolate(f,[0,70,186],[-6,-1,1.6],{extrapolateRight:'clamp',easing:ease})}deg) rotateX(${interpolate(f,[0,70],[3,0],{extrapolateRight:'clamp',easing:ease})}deg)`,opacity:interpolate(f,[0,14],[.5,1],{extrapolateRight:'clamp'})}}>
   <div style={{position:'relative',height:42,display:'flex',alignItems:'center',gap:8,paddingLeft:17,color:'#B3C1CC',fontSize:21,letterSpacing:'.015em',marginBottom:8}}>
    {[0,1,2].map(i=><span key={i} style={{width:9,height:9,borderRadius:'50%',background:'#6C7D88'}}/>)}
    <span style={{position:'absolute',left:0,right:0,textAlign:'center'}}>wasla.my.id</span>
   </div>
   {/* Keep the exact 1844:814 asset ratio: no blank band and no cropped hero. */}
   <div style={{position:'relative',width:'100%',aspectRatio:'1844 / 814',borderRadius:20,overflow:'hidden',background:'#06121C'}}>
    <CanvasImage src={staticFile('screens/wasla-desktop.png')} style={{display:'block',width:'100%',height:'100%',objectFit:'contain'}}/>
   </div>
  </div>
  <div style={{position:'absolute',left:274,top:840,display:'flex',gap:26}}>
   {['cimuning','fazmastone','mahameru-baja'].map((id,i)=><div key={id} style={{width:440,height:180,overflow:'hidden',borderRadius:23,border:'1px solid #A6C1D34D',background:'#101B23',boxShadow:'0 15px 35px #0006',boxSizing:'border-box',translate:interpolate(f,[42+i*8,69+i*8],['0px 90px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease}),opacity:interpolate(f,[42+i*8,58+i*8],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),scale:interpolate(f,[42+i*8,80+i*8],[.95,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}}>
    <CanvasImage src={staticFile(`projects/${id}.webp`)} style={{display:'block',width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}}/>
   </div>)}
  </div>
  <div style={{position:'absolute',inset:0,opacity:interpolate(f,[0,15,120,158],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>
   <Cursor x={interpolate(f,[0,70,158],[1690,1510,1390],{extrapolateRight:'clamp',easing:ease})} y={interpolate(f,[0,70,158],[200,350,790],{extrapolateRight:'clamp',easing:ease})} scale={.65}/>
  </div>
 </Backdrop>;
};
