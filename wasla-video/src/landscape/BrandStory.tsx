import {CanvasImage,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {BrandLogo} from '../components/BrandLogo';
import {projects} from '../motion/data';
import {Backdrop,dark,ease,Icon,Reveal,textStyle} from './Elements';

export const StudioOpening=()=>{
 const f=useCurrentFrame();
 return <Backdrop><div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',gap:60,...textStyle,fontSize:65}}><Reveal delay={0}>Studio</Reveal><Reveal delay={13}>oleh</Reveal><Reveal delay={26}><BrandLogo size={90}/></Reveal></div><div style={{position:'absolute',left:interpolate(f,[0,84],[300,1580]),bottom:70,width:90,height:2,background:'#A7EBFF',filter:'blur(1px)',opacity:.25}}/></Backdrop>;
};

export const CoreStatement=()=>{
 const f=useCurrentFrame();
 return <Backdrop><div style={{position:'absolute',left:0,right:0,top:420,textAlign:'center',...textStyle,fontSize:113,whiteSpace:'nowrap',scale:interpolate(f,[0,54],[1.3,1],{extrapolateRight:'clamp',easing:ease}),translate:interpolate(f,[0,24],['370px 0px','0px 0px'],{extrapolateRight:'clamp',easing:ease})}}>Cara kami bekerja.</div></Backdrop>;
};

export const CorePills=()=>{
 const f=useCurrentFrame();
 return <Backdrop light>
  <div style={{position:'absolute',left:740,top:250,scale:interpolate(f,[0,25],[.6,1],{extrapolateRight:'clamp',easing:ease})}}>
   {['Ide','Desain','Teknologi'].map((label,i)=><div key={label} style={{position:'absolute',left:i===1?25:0,top:i*165,width:440,height:132,borderRadius:78,background:'#262927',color:'#F8F8F3',border:'2px solid #575B51',boxShadow:'0 10px 25px #0002',display:'flex',alignItems:'center',gap:28,boxSizing:'border-box',padding:18,...textStyle,fontSize:49,translate:interpolate(f,[i*31,i*31+30],[`${i%2?170:-170}px 100px`,'0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease}),opacity:interpolate(f,[i*31,i*31+14],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>
    <div style={{width:96,height:96,borderRadius:'50%',background:'#F3F4EC',color:'#252823',display:'flex',alignItems:'center',justifyContent:'center',order:i===1?2:0}}><Icon kind={i} size={62}/></div><span style={{flex:1,textAlign:'center'}}>{label}</span>
   </div>)}
  </div>
  <div style={{position:'absolute',left:725,top:275,width:120,height:120,borderRadius:'50%',background:'#43C4D5',filter:'blur(45px)',opacity:interpolate(f,[0,40,80,162],[.6,.6,0,0],{extrapolateRight:'clamp'})}}/>
 </Backdrop>;
};

export const WowMoment=()=>{
 const f=useCurrentFrame();
 return <Backdrop><div style={{position:'absolute',left:690,top:270,width:540,height:540,borderRadius:'50%',background:'radial-gradient(circle at 25% 20%,#45474B,#151515 45%,#080809 72%)',boxShadow:'-16px 6px 35px #FFFFFF20,inset -10px -14px 25px #FFFFFF15',scale:interpolate(f,[0,60],[.6,1.06],{extrapolateRight:'clamp',easing:ease}),display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',...textStyle,fontSize:58,lineHeight:1.15}}><div>Bikin orang bilang<br/><strong style={{fontSize:110}}>“wah”.</strong></div></div></Backdrop>;
};

export const KineticManifesto=()=>{
 const f=useCurrentFrame();const segment=Math.min(2,Math.floor(f/58));const local=f%58;
 const words=['Ide kreatif.','Desain berani.','Solusi digital.'];const bg=['#F72C37','#062C32',dark][segment];const color=['#FFFFFF','#C0F5FA','#A867FF'][segment];
 return <div style={{position:'absolute',inset:0,overflow:'hidden',background:bg,color,...textStyle}}>
  {[-1,0,1,2].map((n)=><div key={n} style={{position:'absolute',left:-150,top:100+n*310,fontSize:245,lineHeight:1,whiteSpace:'nowrap',opacity:.19,translate:`${interpolate(local,[0,58],[n%2?-220:220,n%2?220:-220])}px 0px`}}>{words[segment]} {words[segment]}</div>)}
  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:155,scale:interpolate(local,[0,14,58],[.85,1,1.05],{extrapolateRight:'clamp',easing:ease})}}>{words[segment]}</div>
 </div>;
};

export const CityConnection=()=>{
 const f=useCurrentFrame();
 return <Backdrop>
  <div style={{position:'absolute',left:85,right:85,top:70,bottom:70,borderRadius:45,overflow:'hidden',scale:interpolate(f,[0,84],[.82,1.02],{extrapolateRight:'clamp',easing:ease})}}><CanvasImage src={staticFile('landscape/jakarta-twilight.png')} style={{width:'100%',height:'100%',objectFit:'cover',scale:interpolate(f,[0,84],[1.02,1.1])}}/><div style={{position:'absolute',inset:0,background:'linear-gradient(transparent 30%,#0009)'}}/>
   <div style={{position:'absolute',right:80,bottom:85,padding:'28px 40px',borderRadius:80,background:'#FCFCF4',color:'#171717',fontSize:44,...textStyle,translate:interpolate(f,[14,40],['300px 0px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}}>Bawa bisnismu ke dunia digital.</div>
  </div>
 </Backdrop>;
};

const Globe=()=> <svg width="290" height="290" viewBox="0 0 300 300"><defs><radialGradient id="earth"><stop stopColor="#487DD3"/><stop offset="1" stopColor="#17396E"/></radialGradient><clipPath id="earth-clip"><circle cx="150" cy="150" r="137"/></clipPath></defs><circle cx="150" cy="150" r="140" fill="url(#earth)" stroke="#76A6D15A" strokeWidth="3"/><g clipPath="url(#earth-clip)" fill="#6F9D73"><path d="m75 40 30-8 15 25-8 21 27 18-5 18-35 10-5 35-20 20-12-36-28-9-5-44Z"/><path d="m109 152 40 20 10 40-17 25-14 31-15-21 1-36-22-37Z"/><path d="m162 56 34-22 49 15 35 45-17 28-35-1-14 17-14-18-33-2-15-35Z"/><path d="m178 126 32 11 13 36-19 43-20-15-14-38Z"/><path d="m228 215 32-4 20 20-9 19-44-4Z"/></g><ellipse cx="150" cy="150" rx="72" ry="137" fill="none" stroke="#C0E5FF22" strokeWidth="2"/><ellipse cx="150" cy="150" rx="137" ry="50" fill="none" stroke="#C0E5FF22" strokeWidth="2"/></svg>;

export const NetworkConnection=()=>{
 const f=useCurrentFrame();
 return <Backdrop><div style={{position:'absolute',inset:0,scale:interpolate(f,[0,132],[1.45,.92],{extrapolateRight:'clamp',easing:ease}),rotate:interpolate(f,[0,132],['-12deg','8deg'])}}>
  {[460,740,1010].map(size=><div key={size} style={{position:'absolute',left:960-size/2,top:540-size/2,width:size,height:size,border:'2px solid #E5E7EB37',borderRadius:'50%'}}/>)}
  <div style={{position:'absolute',left:815,top:395,filter:'drop-shadow(0 0 35px #6297FF30)'}}><Globe/></div>
  {projects.map((p,i)=>{const angle=i*Math.PI/3+f/500;const radius=i%2?370:490;return <div key={p.id} style={{position:'absolute',left:960+Math.cos(angle)*radius-58,top:540+Math.sin(angle)*radius-58,width:116,height:116,borderRadius:'50%',overflow:'hidden',padding:7,boxSizing:'border-box',background:['#C4B7ED','#7BA8F0','#D5B270','#B4D1AF','#EBABAB','#D5D3E8'][i],boxShadow:'0 0 25px #FFFFFF25',scale:interpolate(f,[i*6,i*6+26],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}}><CanvasImage src={staticFile(`projects/${p.id}.webp`)} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}}/></div>;})}
 </div></Backdrop>;
};

export const ContactClosing=()=>{
 const f=useCurrentFrame();
 return <Backdrop>
  <div style={{position:'absolute',left:590,top:455,width:740,height:128,borderRadius:70,padding:'0 24px 0 45px',boxSizing:'border-box',border:'2px solid #A5B6C15E',background:'linear-gradient(135deg,#252729,#0E1011)',boxShadow:'inset 0 2px 3px #FFFFFF30,0 8px 30px #000',display:'flex',alignItems:'center',justifyContent:'space-between',...textStyle,fontSize:52,scale:interpolate(f,[0,22],[.6,1],{extrapolateRight:'clamp',easing:ease})}}><span>{f<53?'Mulai konsultasi':'wasla.my.id'}</span><div style={{width:83,height:83,borderRadius:'50%',background:'radial-gradient(circle at 30% 30%,#9BC3ED,#143962 55%,#050D19)',border:'2px solid #BAD5E755',display:'flex',alignItems:'center',justifyContent:'center',fontSize:47}}>↗</div><div style={{position:'absolute',left:interpolate(f,[0,150],[-40,780]),top:-2,width:14,height:8,background:'#FFF',borderRadius:20,filter:'blur(5px)',boxShadow:'0 0 15px 8px #FFFFFFA0'}}/></div>
  <div style={{position:'absolute',left:768,top:660,opacity:interpolate(f,[68,90],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><BrandLogo size={80}/></div>
 </Backdrop>;
};
