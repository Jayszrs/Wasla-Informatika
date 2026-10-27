import {AbsoluteFill,CanvasImage,Easing,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {BrandLogo} from '../components/BrandLogo';
import {theme} from '../video/theme';

export const palette={paper:'#FAF7F3',ink:'#171916',blue:'#4055FF',sky:'#729EFF',lilac:'#D5D5FA',red:'#EF554F',rose:'#F8BDBD',green:'#235D38',mint:'#9BD58C',yellow:'#FFCE42',lemon:'#FFF294'};
const ease=Easing.bezier(.16,1,.3,1);

// Original vector motifs, built for this reel; no artwork from the reference.
export const ShapeTile=({kind=0,size=260}:{kind?:number;size?:number})=>{
 const p=palette;
 return <svg width={size} height={size} viewBox="0 0 300 300">
  {kind%4===0&&<><rect width="300" height="300" fill={p.lilac}/><rect x="25" y="25" width="250" height="250" rx="64" fill={p.blue} transform="rotate(-14 150 150)"/><rect x="72" y="72" width="156" height="156" rx="40" fill={p.sky} transform="rotate(-14 150 150)"/><rect x="113" y="113" width="74" height="74" rx="19" fill={p.paper} transform="rotate(-14 150 150)"/></>}
  {kind%4===1&&<><rect width="300" height="300" fill={p.red}/><path d="M0 300V75Q150-75 300 75V300Z" fill={p.rose}/><path d="M40 300V110Q150-20 260 110V300Z" fill={p.red}/><path d="m105 225 45-130 45 130Z" fill={p.rose}/></>}
  {kind%4===2&&<><rect width="300" height="300" fill={p.green}/><path d="M0 0H300V300Q0 300 0 0" fill={p.mint}/><path d="M65 0H300V235Q65 235 65 0" fill={p.green}/><path d="M130 0H300V170Q130 170 130 0" fill={p.mint}/></>}
  {kind%4===3&&<><rect width="300" height="300" fill={p.yellow}/><circle cx="0" cy="300" r="280" fill={p.lemon}/><circle cx="0" cy="300" r="195" fill={p.yellow}/><circle cx="0" cy="300" r="105" fill={p.lemon}/></>}
 </svg>;
};

export const Question=()=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:palette.paper,color:palette.ink,overflow:'hidden'}}>
  {[{x:100,y:260,k:0,r:-12},{x:770,y:390,k:3,r:8},{x:70,y:1290,k:1,r:10},{x:760,y:1420,k:2,r:-9}].map((t,i)=><div key={i} style={{position:'absolute',left:t.x,top:t.y,rotate:`${t.r+frame*.15}deg`,scale:interpolate(frame,[0,22],[.3,1],{extrapolateRight:'clamp',easing:ease}),translate:interpolate(frame,[0,47],[`${i%2?-50:50}px ${i%2?60:-60}px`,'0px 0px'],{extrapolateRight:'clamp'})}}><ShapeTile kind={t.k} size={185}/></div>)}
  <div style={{position:'absolute',left:85,right:85,top:760,textAlign:'center',fontFamily:theme.body,fontSize:96,fontWeight:600,lineHeight:1.15,letterSpacing:'-.065em',scale:interpolate(frame,[0,16],[.9,1],{extrapolateRight:'clamp',easing:ease})}}>Apa yang bikin<br/>bisnismu beda?</div>
 </AbsoluteFill>;
};

export const Keyword=({word,kind,direction='ring'}:{word:string;kind:number;direction?:'ring'|'stack'|'cascade'})=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:palette.paper,color:palette.ink,overflow:'hidden'}}>
  {Array.from({length:7},(_,i)=>{
   const angle=i/7*Math.PI*2;
   const ring=direction==='ring';const stack=direction==='stack';
   const targetX=ring?540+Math.cos(angle)*570:stack?180+i*100:100+i*140;
   const targetY=ring?960+Math.sin(angle)*680:stack?1460-i*95:340+i*230;
   return <div key={i} style={{position:'absolute',left:targetX-160,top:targetY-160,rotate:interpolate(frame,[0,30],[`${i%2?-32:28}deg`,`${i%2?-7:8}deg`],{extrapolateRight:'clamp'}),translate:interpolate(frame,[0,17],[`${(i-3)*110}px ${i%2?-500:500}px`,'0px 0px'],{extrapolateRight:'clamp',easing:ease}),scale:interpolate(frame,[0,15],[.55,1],{extrapolateRight:'clamp',easing:ease})}}><ShapeTile kind={kind+i%2} size={320}/></div>;
  })}
  <div style={{position:'absolute',left:65,right:65,top:815,textAlign:'center',fontFamily:theme.body,fontWeight:650,fontSize:153,letterSpacing:'-.065em',background:palette.paper,padding:'34px 0',scale:interpolate(frame,[0,12],[.86,1],{extrapolateRight:'clamp',easing:ease})}}>{word}</div>
 </AbsoluteFill>;
};

export const ShapeTunnel=()=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:palette.paper,color:palette.ink,overflow:'hidden'}}>
  <div style={{position:'absolute',left:540,top:960,scale:interpolate(frame,[0,40],[1.45,.78],{extrapolateRight:'clamp',easing:ease}),rotate:interpolate(frame,[0,40],['-22deg','8deg'],{extrapolateRight:'clamp',easing:ease})}}>
   {[{s:1800,c:palette.lilac},{s:1420,c:palette.blue},{s:1080,c:palette.sky},{s:790,c:palette.blue},{s:530,c:palette.paper}].map((t,i)=><div key={i} style={{position:'absolute',left:-t.s/2,top:-t.s/2,width:t.s,height:t.s,borderRadius:t.s*.19,background:t.c,rotate:`${i%2?16:-8}deg`}}/>)}
  </div>
  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',fontFamily:theme.body,fontWeight:650,fontSize:88,lineHeight:1.05,letterSpacing:'-.06em',scale:interpolate(frame,[0,16],[.7,1],{extrapolateRight:'clamp',easing:ease})}}>Kami<br/>wujudkan.</div>
 </AbsoluteFill>;
};

export const WorkFlash=()=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:palette.blue,overflow:'hidden'}}>
  {[{id:'cimuning',x:80,y:330,r:-8},{id:'fazmastone',x:190,y:730,r:5},{id:'mahameru-baja',x:60,y:1160,r:-4}].map((t,i)=><div key={t.id} style={{position:'absolute',left:t.x,top:t.y,width:820,borderRadius:12,overflow:'hidden',rotate:`${t.r}deg`,translate:`${interpolate(frame,[0,11],[(i%2?1:-1)*90,0])}px 0px`}}><CanvasImage src={staticFile(`projects/${t.id}.webp`)} style={{width:820,display:'block'}}/></div>)}
 </AbsoluteFill>;
};

export const GeometricClosing=()=>{
 const frame=useCurrentFrame();
 return <AbsoluteFill style={{background:palette.paper,color:palette.ink,overflow:'hidden'}}>
  {[{k:0,x:40,y:190},{k:1,x:270,y:160},{k:3,x:505,y:210},{k:2,x:740,y:170}].map((t,i)=><div key={i} style={{position:'absolute',left:t.x,top:t.y,rotate:`${-9+i*6}deg`,translate:interpolate(frame,[0,20],[`${(i-1.5)*100}px -250px`,'0px 0px'],{extrapolateRight:'clamp',easing:ease})}}><ShapeTile kind={t.k} size={260}/></div>)}
  <div style={{position:'absolute',left:80,right:80,top:645,textAlign:'center',fontFamily:theme.body,fontSize:48,fontWeight:500,letterSpacing:'-.035em'}}>Jasa pembuatan website</div>
  <div style={{position:'absolute',left:205,top:805,scale:interpolate(frame,[0,16],[.86,1],{extrapolateRight:'clamp',easing:ease}),transformOrigin:'center'}}><BrandLogo size={180} dark/></div>
  <div style={{position:'absolute',left:80,right:80,top:1130,textAlign:'center',fontFamily:theme.body,fontSize:87,fontWeight:650,letterSpacing:'-.06em'}}>wasla.my.id</div>
  <div style={{position:'absolute',left:80,right:80,top:1290,textAlign:'center',fontFamily:theme.body,fontSize:46,fontWeight:600,opacity:interpolate(frame,[6,18],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Mulai konsultasi ↗</div>
 </AbsoluteFill>;
};
