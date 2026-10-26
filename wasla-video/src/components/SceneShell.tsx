import type {ReactNode} from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {BackgroundGraphics} from './BackgroundGraphics';
import {BrandLogo} from './BrandLogo';
import {theme} from '../video/theme';

export const SceneShell = ({children, duration, light = false, first = false, last = false, topLogo = true}: {children: ReactNode; duration: number; light?: boolean; first?: boolean; last?: boolean; topLogo?: boolean}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{fontFamily: theme.body, overflow: 'hidden', color: light ? theme.navy : 'white'}}>
    <BackgroundGraphics light={light}/>
    {topLogo && <div style={{position: 'absolute', left: 84, top: 105}}><BrandLogo size={64} dark={light} emblem={false}/></div>}
    {children}
    {!first && frame < 12 && <AbsoluteFill style={{zIndex: 100, background: theme.blue, translate: interpolate(frame, [0, 11], ['0px 0px', '-1080px 0px'], {easing: Easing.bezier(.55, 0, .2, 1), extrapolateRight: 'clamp'})}}/>}
    {!last && frame >= duration - 12 && <AbsoluteFill style={{zIndex: 100, background: theme.blue, translate: interpolate(frame, [duration - 12, duration - 1], ['1080px 0px', '0px 0px'], {easing: Easing.bezier(.55, 0, .2, 1), extrapolateRight: 'clamp'})}}/>}
  </AbsoluteFill>;
};
