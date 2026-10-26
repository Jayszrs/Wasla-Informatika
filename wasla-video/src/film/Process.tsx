import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {FilmShell} from './FilmShell';
import {FilmTitle,FilmEyebrow} from './FilmType';
import {theme} from '../video/theme';

const steps=[['Konsultasi','Mulai dari kebutuhan.'],['Desain','Susun pengalaman.'],['Pengembangan','Bangun fungsinya.'],['Peluncuran','Siap digunakan.']];
export const Process=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <FilmShell duration={7*fps} light index="08" chapter="PROSES KERJA / WASLA INFORMATIKA">
    <div style={{position:'absolute',left:84,top:240}}><FilmEyebrow light>Dibangun bersama.</FilmEyebrow></div>
    <div style={{position:'absolute',left:84,top:330}}><FilmTitle lines={['Dari ide,','sampai online.']} size={108} light accent={1}/></div>
    <div style={{position:'absolute',left:110,top:760}}>
      <div style={{position:'absolute',left:49,top:40,width:3,height:interpolate(frame,[22,130],[0,627],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),background:'#397BFF'}}/>
      {steps.map(([name,description],i)=><div key={name} style={{position:'absolute',left:0,top:i*205,width:860,display:'flex',gap:38,opacity:interpolate(frame,[16+i*29,32+i*29],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:interpolate(frame,[16+i*29,42+i*29],['40px 0px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>
        <div style={{width:100,height:100,borderRadius:'50%',background:frame>16+i*29?theme.blue:'#DDE7F6',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:theme.heading,fontSize:36,fontWeight:700,boxShadow:'0 8px 20px #397BFF25',flexShrink:0}}>{String(i+1).padStart(2,'0')}</div>
        <div><div style={{fontSize:52,fontFamily:theme.heading,fontWeight:700,letterSpacing:'-.04em'}}>{name}</div><div style={{fontSize:35,color:'#5B6E88',marginTop:13}}>{description}</div></div>
        <svg width="84" height="84" viewBox="0 0 84 84" fill="none" stroke={theme.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{position:'absolute',right:0,top:5}}>
          {i===0&&<><path d="M10 14h62v41H39L22 70V55H10Z"/><path d="M24 28h34M24 39h20"/></>}
          {i===1&&<><rect x="9" y="12" width="66" height="58" rx="5"/><path d="M9 27h66M33 27v43M44 39h21v20H44Z"/></>}
          {i===2&&<><path d="m27 26-18 16 18 16m30-32 18 16-18 16M48 18 36 66"/></>}
          {i===3&&<><circle cx="42" cy="42" r="31"/><path d="m25 42 12 12 24-27"/></>}
        </svg>
      </div>)}
    </div>
    <div style={{position:'absolute',left:84,top:1653,fontSize:35,color:'#5B6E88',opacity:interpolate(frame,[135,162],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Website • Aplikasi web • Konsultasi IT</div>
  </FilmShell>;
};
