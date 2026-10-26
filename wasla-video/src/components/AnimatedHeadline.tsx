import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../video/theme';

export const AnimatedHeadline = ({lines, delay = 0, size = 88, highlight = -1, dark = false}: {lines: string[]; delay?: number; size?: number; highlight?: number; dark?: boolean}) => {
  const frame = useCurrentFrame();
  return <div style={{fontFamily: theme.heading, fontWeight: 800, fontSize: size, lineHeight: 1.12, letterSpacing: '-.045em', color: dark ? theme.navy : theme.white}}>
    {lines.map((line, index) => <div key={line} style={{overflow: 'hidden', paddingBottom: 5}}>
      <div style={{color: index === highlight ? theme.blue : undefined,
        opacity: interpolate(frame, [delay + index * 5, delay + index * 5 + 16], [.08, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
        translate: interpolate(frame, [delay + index * 5, delay + index * 5 + 23], ['0px 115px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1)}),
      }}>{line}</div>
    </div>)}
  </div>;
};
