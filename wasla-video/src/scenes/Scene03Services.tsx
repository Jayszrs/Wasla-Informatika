import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedHeadline} from '../components/AnimatedHeadline';
import {BrowserMockup, ConceptWebsite, type WebsiteKind} from '../components/BrowserMockup';
import {SmartphoneMockup} from '../components/SmartphoneMockup';
import {SceneShell} from '../components/SceneShell';
import {theme} from '../video/theme';

const kinds: {kind: WebsiteKind; label: string}[] = [
  {kind: 'company', label: 'Company Profile'}, {kind: 'landing', label: 'Landing Page'},
  {kind: 'business', label: 'Website Bisnis'}, {kind: 'custom', label: 'Website Custom'},
];

export const Scene03Services = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const index = Math.min(3, Math.floor(Math.max(0, frame - 6) / 51));
  const local = Math.max(0, frame - 6 - index * 51);
  const active = kinds[index];
  return <SceneShell light duration={7 * fps}>
    <div style={{position: 'absolute', left: 84, top: 245}}><AnimatedHeadline lines={['LAYANAN', 'PEMBUATAN', 'WEBSITE.']} size={91} dark highlight={2} delay={6}/></div>
    <div style={{position: 'absolute', left: 90, top: 625, color: theme.royal, fontFamily: theme.heading, fontSize: 49, fontWeight: 700, opacity: interpolate(local, [0, 8], [.3, 1], {extrapolateRight: 'clamp'}), translate: interpolate(local, [0, 16], ['30px 0px', '0px 0px'], {extrapolateRight: 'clamp'})}}>{active.label}</div>
    <div style={{position: 'absolute', left: 75, top: 780, rotate: `${interpolate(local, [0, 48], [-3, -1], {extrapolateRight: 'clamp'})}deg`, translate: interpolate(local, [0, 20], ['90px 35px', '0px 0px'], {extrapolateRight: 'clamp'}), scale: interpolate(local, [0, 30], [.94, 1], {extrapolateRight: 'clamp'})}}><BrowserMockup width={910} height={590}><ConceptWebsite kind={active.kind}/></BrowserMockup></div>
    <div style={{position: 'absolute', left: 720, top: 1170, rotate: '5deg', translate: interpolate(local, [0, 24], ['40px 65px', '0px 0px'], {extrapolateRight: 'clamp'})}}><SmartphoneMockup kind={active.kind} width={240} height={455}/></div>
    <div style={{position: 'absolute', left: 90, top: 1500, fontSize: 28, color: '#536B8B'}}>Ilustrasi antarmuka</div>
  </SceneShell>;
};
