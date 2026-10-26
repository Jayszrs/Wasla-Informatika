import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {FilmShell} from './FilmShell';
import {FilmTitle,FilmEyebrow} from './FilmType';
import {WebPrint} from './Devices';

export const MoreWork=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <FilmShell duration={4*fps} index="07" chapter="PORTOFOLIO / ORGANISASI & PENDIDIKAN">
    <div style={{position:'absolute',left:84,top:240}}><FilmEyebrow>Lebih banyak karya.</FilmEyebrow></div>
    <div style={{position:'absolute',left:84,top:325}}><FilmTitle lines={['Beragam bidang.','Satu perhatian.']} size={91} accent={1}/></div>
    <div style={{position:'absolute',left:84,top:640,rotate:'-2deg',opacity:interpolate(frame,[10,28],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:interpolate(frame,[10,38],['-70px 30px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><WebPrint width={600} src="projects/ipnubekasi.webp"/><div style={{fontSize:39,fontWeight:700,marginTop:22}}>IPNU Kota Bekasi</div></div>
    <div style={{position:'absolute',left:310,top:1175,rotate:'3deg',opacity:interpolate(frame,[30,48],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:interpolate(frame,[30,60],['70px 50px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><WebPrint width={640} src="projects/sit-permatahati.webp"/><div style={{fontSize:39,fontWeight:700,marginTop:20}}>SIT Permata Hati Bekasi</div></div>
  </FilmShell>;
};
