import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {theme} from '../video/theme';

export const BackgroundGraphics = ({light = false}: {light?: boolean}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{overflow: 'hidden', background: light ? theme.ice : theme.deep}}>
    <AbsoluteFill style={{background: light ? 'radial-gradient(ellipse at 80% 15%, #ffffff 0%, #EAF1FB 65%)' : 'radial-gradient(ellipse at 92% 60%, #163B73 0%, #071A33 42%, #040F21 84%)'}}/>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position: 'absolute', opacity: light ? .09 : .075}}>
      {Array.from({length: 10}, (_, i) => <path key={`v${i}`} d={`M${i * 120} 0V1920`} stroke={light ? theme.royal : theme.ice} strokeWidth="1"/>)}
      {Array.from({length: 17}, (_, i) => <path key={`h${i}`} d={`M0 ${i * 120}H1080`} stroke={light ? theme.royal : theme.ice} strokeWidth="1"/>)}
    </svg>
    <div style={{position: 'absolute', width: 840, height: 840, border: `1px solid ${light ? '#163B7320' : '#6E9BEF24'}`, borderRadius: '50%', right: -340, top: 690, translate: `0px ${Math.sin(frame / 65) * 18}px`}}/>
    <div style={{position: 'absolute', width: 560, height: 560, border: `1px solid ${light ? '#163B7320' : '#6E9BEF24'}`, borderRadius: '50%', right: -190, top: 830, translate: `0px ${Math.sin(frame / 65) * 18}px`}}/>
  </AbsoluteFill>;
};
