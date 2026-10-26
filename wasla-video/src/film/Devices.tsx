import {CanvasImage,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {theme} from '../video/theme';

// All desktop assets are 1440×1000. The viewport keeps that exact ratio.
export const Laptop = ({src,detail,width=880,url='wasla.my.id',detailAt=118}:{src:string;detail?:string;width?:number;url?:string;detailAt?:number})=>{
  const frame=useCurrentFrame();const screenWidth=width-32;const screenHeight=screenWidth*1000/1440;
  return <div style={{width,position:'relative'}}>
    <div style={{borderRadius:25,padding:'14px 14px 18px',background:'linear-gradient(145deg,#96A5B9,#16263D 8%,#071122 88%,#71829A)',border:'2px solid #7990AF',boxShadow:'0 35px 70px #00000050',position:'relative'}}>
      <div style={{height:17,display:'flex',justifyContent:'center',alignItems:'center',marginBottom:5}}><span style={{width:5,height:5,background:'#526989',borderRadius:'50%'}}/></div>
      <div style={{height:screenHeight,position:'relative',overflow:'hidden',borderRadius:5,background:'#F2F5FA'}}>
        <CanvasImage src={staticFile(src)} style={{width:'100%',height:'100%',objectFit:'contain',display:'block'}}/>
        {detail && <CanvasImage src={staticFile(detail)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'contain',opacity:interpolate(frame,[detailAt,detailAt+24],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:interpolate(frame,[detailAt,detailAt+28],['0px 24px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}/>}
        {detail && frame>detailAt-27 && frame<detailAt+8 && <svg width="38" height="44" viewBox="0 0 38 44" style={{position:'absolute',left:screenWidth*.66,top:screenHeight*.6,translate:interpolate(frame,[detailAt-27,detailAt-4],['42px 55px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),opacity:interpolate(frame,[detailAt-27,detailAt-18,detailAt,detailAt+8],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><path d="M4 3v31l8-8 8 14 7-4-8-13 12-2Z" fill="white" stroke="#397BFF" strokeWidth="2"/></svg>}
        {detail && frame>detailAt-4 && frame<detailAt+16 && <div style={{position:'absolute',left:screenWidth*.66+5,top:screenHeight*.6+5,width:42,height:42,borderRadius:'50%',border:'2px solid #397BFF',scale:interpolate(frame,[detailAt-4,detailAt+16],[.2,2],{extrapolateRight:'clamp'}),opacity:interpolate(frame,[detailAt-4,detailAt+16],[.8,0],{extrapolateRight:'clamp'})}}/>}
      </div>
    </div>
    <div style={{height:26,width:width+54,marginLeft:-27,background:'linear-gradient(#D6DDE8,#8F9CAD 38%,#65758C)',borderRadius:'2px 2px 40px 40px',border:'1px solid #AEBBCD',boxShadow:'0 20px 24px #00000025',position:'relative'}}><div style={{position:'absolute',width:150,height:8,left:'50%',translate:'-50% 0',background:'#566980',borderRadius:'0 0 12px 12px'}}/></div>
    <div style={{textAlign:'center',fontSize:22,color:'#8FA7CA',fontFamily:theme.body,marginTop:23,letterSpacing:'.02em'}}>{url}</div>
  </div>;
};

// Camera/status and bottom bars are outside the screenshot viewport.
export const Phone = ({src,width=270,dark=false,sourceWidth=390}:{src:string;width?:number;dark?:boolean;sourceWidth?:number})=>{
  const screenWidth=width-20;const screenshotHeight=screenWidth*844/sourceWidth;
  return <div style={{width,boxSizing:'border-box',borderRadius:43,padding:8,background:'linear-gradient(115deg,#B6C1D1,#17263C 12%,#050B15 88%,#8A9CB5)',border:'2px solid #8A9AB0',position:'relative',boxShadow:'0 30px 50px #00000045'}}>
    <div style={{borderRadius:33,overflow:'hidden',background:dark?'#071122':'#F8FAFD'}}>
      <div style={{height:35,position:'relative',color:dark?'white':'#14243D',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 18px',fontSize:12,fontWeight:800}}><span>9:41</span><div style={{width:62,height:16,background:'#070F1D',borderRadius:20,position:'absolute',left:'50%',translate:'-50% 0',top:7}}/><span style={{display:'flex',alignItems:'center',gap:3}}><svg width="12" height="11" viewBox="0 0 12 11"><path d="M1 10V7m3 3V5m3 5V3m3 7V1" stroke="currentColor" strokeWidth="2"/></svg><span style={{width:17,height:8,border:'1px solid currentColor',borderRadius:2,display:'block'}}/></span></div>
      <CanvasImage src={staticFile(src)} style={{width:'100%',height:screenshotHeight,display:'block',objectFit:'contain'}}/>
      <div style={{height:24,display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{height:4,width:80,borderRadius:4,background:dark?'#F8FAFD':'#14243D'}}/></div>
    </div>
    <div style={{position:'absolute',left:-4,top:118,width:3,height:39,background:'#A3B0C2',borderRadius:2}}/><div style={{position:'absolute',right:-4,top:140,width:3,height:54,background:'#A3B0C2',borderRadius:2}}/>
  </div>;
};

export const WebPrint=({src,width=620}:{src:string;width?:number})=><div style={{width,borderRadius:16,overflow:'hidden',background:'white',border:'1px solid #8097B340',boxShadow:'0 30px 60px #00000030'}}><div style={{height:30,background:'#E5ECF6',display:'flex',gap:5,alignItems:'center',paddingLeft:12}}>{[0,1,2].map(i=><span key={i} style={{width:6,height:6,background:'#91A5C2',borderRadius:'50%'}}/>)}</div><CanvasImage src={staticFile(src)} style={{display:'block',width:'100%',aspectRatio:'1440 / 1000'}}/></div>;
