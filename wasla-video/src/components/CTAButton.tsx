import {interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../video/theme';

export const CTAButton = () => {
  const frame = useCurrentFrame();
  return <div style={{width: 840, height: 112, borderRadius: 20, display: 'flex', gap: 30, justifyContent: 'center', alignItems: 'center', background: theme.blue, color: theme.white, fontFamily: theme.body, fontSize: 43, fontWeight: 700, opacity: interpolate(frame, [43, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [43, 70], ['0px 35px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Konsultasi sekarang<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
};
