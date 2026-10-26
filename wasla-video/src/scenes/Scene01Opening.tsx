import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedHeadline} from '../components/AnimatedHeadline';
import {BrowserMockup} from '../components/BrowserMockup';
import {SmartphoneMockup} from '../components/SmartphoneMockup';
import {SceneShell} from '../components/SceneShell';
import {theme} from '../video/theme';

export const Scene01Opening = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const entrance = spring({frame: frame - 20, fps, config: {damping: 200}, durationInFrames: 36});
  return <SceneShell first duration={5 * fps}>
    <div style={{position: 'absolute', left: 84, top: 265, width: 920}}><AnimatedHeadline lines={['WEBSITE ADALAH', 'WAJAH DIGITAL', 'BISNISMU.']} size={83} highlight={2}/></div>
    <div style={{position: 'absolute', left: 90, top: 625, fontSize: 44, lineHeight: 1.4, color: theme.muted, opacity: interpolate(frame, [20, 38], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Bangun kesan pertama<br/>yang meyakinkan.</div>
    <div style={{position: 'absolute', left: 85, top: 905, translate: `0px ${(1 - entrance) * 100 + Math.sin(frame / 44) * 9}px`, scale: .93 + entrance * .07, rotate: '-3deg'}}><BrowserMockup width={880} height={510} src="screens/wasla-desktop.png"/></div>
    <div style={{position: 'absolute', left: 700, top: 1160, scale: entrance, rotate: '5deg'}}><SmartphoneMockup width={245} height={465} src="screens/wasla-mobile.png"/></div>
    <div style={{position: 'absolute', left: 90, top: 1590, fontSize: 32, color: theme.muted}}>wasla.my.id</div>
    <svg width="54" height="62" viewBox="0 0 40 48" style={{position: 'absolute', left: 635, top: 1215, opacity: interpolate(frame, [50, 62], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [50, 80], ['70px 70px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}><path d="M4 3v36l10-9 8 15 8-4-8-14 13-2Z" fill="white" stroke={theme.blue} strokeWidth="2"/></svg>
  </SceneShell>;
};
