import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {FilmShell} from './FilmShell';
import {FilmTitle,FilmEyebrow} from './FilmType';
import {WebPrint} from './Devices';

export const Opening=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <FilmShell duration={4*fps} first index="01" chapter="WASLA INFORMATIKA / KARYA DIGITAL">
    <div style={{position:'absolute',left:84,top:255}}><FilmEyebrow>Setiap bisnis punya cerita.</FilmEyebrow></div>
    <div style={{position:'absolute',left:80,top:350}}><FilmTitle lines={['WEBSITE ADALAH','WAJAH DIGITAL','BISNISMU.']} size={96} accent={2}/></div>
    <div style={{position:'absolute',left:-100,top:900,rotate:'-9deg',translate:interpolate(frame,[0,119],['-40px 60px','20px -30px'])}}><WebPrint src="projects/cimuning.webp" width={650}/></div>
    <div style={{position:'absolute',left:560,top:1010,rotate:'8deg',translate:interpolate(frame,[0,119],['70px 0px','-25px -65px'])}}><WebPrint src="projects/ngajiyuk.webp" width={650}/></div>
    <div style={{position:'absolute',left:84,top:1590,fontSize:44,lineHeight:1.35}}>Karya nyata.<br/>Untuk kebutuhan yang berbeda.</div>
  </FilmShell>;
};
