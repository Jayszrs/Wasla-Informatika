import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BrandLogo} from '../components/BrandLogo';
import {AnimatedHeadline} from '../components/AnimatedHeadline';
import {BrowserMockup} from '../components/BrowserMockup';
import {SceneShell} from '../components/SceneShell';
import {theme} from '../video/theme';

export const Scene02BrandIntro = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <SceneShell duration={6 * fps} topLogo={false}>
    <div style={{position: 'absolute', left: 108, top: 240, scale: spring({frame: frame - 8, fps, config: {damping: 160}}), transformOrigin: 'left center'}}><BrandLogo size={204}/></div>
    <div style={{position: 'absolute', left: 90, top: 590}}><AnimatedHeadline lines={['Partner digital', 'untuk website', 'profesional.']} delay={15} size={82} highlight={2}/></div>
    <div style={{position: 'absolute', left: 95, top: 955, display: 'flex', gap: 42}}>{['Modern', 'Profesional', 'Responsif'].map((label, i) => <div key={label} style={{fontSize: 33, borderBottom: `3px solid ${theme.blue}`, paddingBottom: 13, opacity: interpolate(frame, [30 + i * 8, 46 + i * 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [30 + i * 8, 50 + i * 8], ['0px 24px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>{label}</div>)}</div>
    <div style={{position: 'absolute', left: 95, top: 1155, rotate: '-3deg', translate: `0px ${Math.sin(frame / 45) * 10}px`, opacity: interpolate(frame, [35, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}><BrowserMockup width={890} height={470} src="screens/wasla-desktop.png" laptop/></div>
  </SceneShell>;
};
