import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {FilmShell} from './FilmShell';
import {FilmTitle} from './FilmType';
import {BrandLogo} from '../components/BrandLogo';
import {theme} from '../video/theme';

export const Closing=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <FilmShell duration={7*fps} last index="09" chapter="WASLA.MY.ID / JABODETABEK & INDONESIA">
    <div style={{position:'absolute',left:84,top:300}}><FilmTitle lines={['Bisnismu','selanjutnya.']} size={119} accent={1}/></div>
    <div style={{position:'absolute',left:84,top:674,fontSize:45,lineHeight:1.45,color:theme.muted,opacity:interpolate(frame,[18,40],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Mari wujudkan website<br/>yang sesuai kebutuhanmu.</div>
    <div style={{position:'absolute',left:120,top:945,opacity:interpolate(frame,[24,48],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:interpolate(frame,[24,58],['0px 40px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><BrandLogo size={205}/></div>
    <div style={{position:'absolute',left:84,top:1270,fontFamily:theme.heading,fontWeight:800,fontSize:105,lineHeight:1,letterSpacing:'-.055em',opacity:interpolate(frame,[42,65],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>wasla.my.id</div>
    <div style={{position:'absolute',left:84,top:1412,height:4,width:interpolate(frame,[50,85],[0,880],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),background:theme.blue}}/>
    <div style={{position:'absolute',left:84,top:1495,width:880,height:120,borderRadius:12,background:theme.blue,color:'white',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 42px',boxSizing:'border-box',fontSize:43,fontWeight:800,opacity:interpolate(frame,[58,78],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:interpolate(frame,[58,88],['0px 25px','0px 0px'],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Mulai konsultasi<svg width="44" height="44" viewBox="0 0 44 44" fill="none"><path d="M8 22h28M24 10l12 12-12 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
    <div style={{position:'absolute',left:84,top:1670,fontSize:29,color:theme.muted,opacity:interpolate(frame,[70,95],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>Jasa pembuatan website & konsultasi IT</div>
  </FilmShell>;
};
