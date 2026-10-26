import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedHeadline} from '../components/AnimatedHeadline';
import {BrowserMockup} from '../components/BrowserMockup';
import {SmartphoneMockup} from '../components/SmartphoneMockup';
import {SceneShell} from '../components/SceneShell';
import {theme} from '../video/theme';

const steps = [
  ['Konsultasi', 'Pahami kebutuhan'], ['Desain', 'Rancang pengalaman'],
  ['Pengembangan', 'Bangun solusinya'], ['Peluncuran', 'Siap digunakan'],
];

const WorkflowGlyph = ({step}: {step: number}) => <svg width="104" height="86" viewBox="0 0 104 86" fill="none" stroke={theme.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
  {step === 0 && <><path d="M16 15h70v43H48L30 73V58H16Z"/><path d="M31 30h40M31 42h25"/></>}
  {step === 1 && <><rect x="10" y="12" width="83" height="62" rx="6"/><path d="M10 27h83M42 27v47"/><path d="M21 40h10m-10 12h10M53 39h29v23H53Z"/></>}
  {step === 2 && <><rect x="10" y="12" width="83" height="62" rx="6"/><path d="M10 27h83M36 40l-13 10 13 10m32-20 13 10-13 10m-12-23-9 28"/></>}
  {step === 3 && <><circle cx="52" cy="43" r="30"/><path d="m37 43 11 11 23-25M19 13l-7-7m73 7 7-7"/></>}
</svg>;

export const Scene04Workflow = () => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  return <SceneShell duration={6 * fps}>
    <div style={{position: 'absolute', left: 84, top: 245}}><AnimatedHeadline lines={['DARI IDE', 'JADI WEBSITE', 'NYATA.']} size={90} highlight={2} delay={5}/></div>
    <div style={{position: 'absolute', left: 110, top: 715, width: 860, height: 650, opacity: interpolate(frame, [125, 147], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
      <div style={{position: 'absolute', top: 28, left: 34, width: 2, height: interpolate(frame, [20, 114], [0, 490], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), background: theme.blue}}/>
      {steps.map(([name, sub], i) => <div key={name} style={{position: 'absolute', left: 0, top: i * 150, width: 860, display: 'flex', gap: 38, alignItems: 'flex-start', opacity: interpolate(frame, [15 + i * 27, 27 + i * 27], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [15 + i * 27, 35 + i * 27], ['30px 0px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
        <div style={{width: 70, height: 70, borderRadius: '50%', background: theme.royal, border: `2px solid ${theme.blue}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700}}>{String(i + 1).padStart(2, '0')}</div>
        <div><div style={{fontFamily: theme.heading, fontSize: 49, fontWeight: 700, lineHeight: 1.2}}>{name}</div><div style={{fontSize: 33, marginTop: 10, color: theme.muted}}>{sub}</div></div>
        <div style={{position: 'absolute', right: 22, top: 0}}><WorkflowGlyph step={i}/></div>
      </div>)}
    </div>
    <div style={{position: 'absolute', left: 95, top: 810, opacity: interpolate(frame, [135, 151], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), scale: interpolate(frame, [135, 172], [.85, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), rotate: '2deg'}}><BrowserMockup width={890} height={500} src="screens/wasla-desktop.png" laptop/></div>
    <div style={{position: 'absolute', left: 730, top: 1060, opacity: interpolate(frame, [143, 159], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), translate: interpolate(frame, [143, 170], ['30px 35px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), rotate: '5deg'}}><SmartphoneMockup width={210} height={385} src="screens/wasla-mobile.png"/></div>
    <div style={{position: 'absolute', left: 95, top: 1470, color: theme.muted, fontSize: 44, lineHeight: 1.35}}>Dirancang untuk<br/>kebutuhan bisnismu.</div>
  </SceneShell>;
};
