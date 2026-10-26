import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedHeadline} from '../components/AnimatedHeadline';
import {BrandLogo} from '../components/BrandLogo';
import {BrowserMockup} from '../components/BrowserMockup';
import {SmartphoneMockup} from '../components/SmartphoneMockup';
import {CTAButton} from '../components/CTAButton';
import {SceneShell} from '../components/SceneShell';
import {theme} from '../video/theme';

export const Scene05Closing = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <SceneShell duration={6 * fps} last topLogo={false}>
    <div style={{position: 'absolute', left: 84, top: 220}}><AnimatedHeadline lines={['SIAP PUNYA', 'WEBSITE', 'PROFESIONAL?']} delay={5} size={84} highlight={1}/></div>
    <div style={{position: 'absolute', left: 110, top: 730, opacity: interpolate(frame, [28, 50], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), scale: interpolate(frame, [0, 50], [.88, 1], {extrapolateRight: 'clamp'})}}><BrowserMockup width={850} height={460} src="screens/wasla-desktop.png" laptop/><div style={{position: 'absolute', left: 650, top: 210}}><SmartphoneMockup width={215} height={405} src="screens/wasla-mobile.png"/></div></div>
    <div style={{position: 'absolute', left: 190, top: 680, opacity: interpolate(frame, [32, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [32, 60], ['0px 30px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}><BrandLogo size={190}/></div>
    <div style={{position: 'absolute', left: 120, top: 930, fontSize: 44, lineHeight: 1.4, color: theme.muted, opacity: interpolate(frame, [42, 61], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Wujudkan bersama<br/>Wasla Informatika.</div>
    <div style={{position: 'absolute', left: 120, top: 1120}}><CTAButton/></div>
    <div style={{position: 'absolute', left: 120, top: 1340, opacity: interpolate(frame, [51, 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <div style={{fontFamily: theme.heading, fontWeight: 800, fontSize: 76, letterSpacing: '-.04em'}}>wasla.my.id</div>
      <div style={{height: 4, marginTop: 18, background: theme.blue, width: interpolate(frame, [62, 94], [0, 590], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}/>
    </div>
    <div style={{position: 'absolute', left: 120, top: 1510, fontSize: 30, color: theme.muted, opacity: interpolate(frame, [68, 85], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Jasa pembuatan website · Jabodetabek</div>
  </SceneShell>;
};
