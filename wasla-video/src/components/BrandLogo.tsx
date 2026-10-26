import {CanvasImage, staticFile} from 'remotion';
import {theme} from '../video/theme';

export const BrandLogo = ({size = 90, dark = false, emblem = true}: {size?: number; dark?: boolean; emblem?: boolean}) => (
  <div style={{display: 'flex', gap: size * .24, alignItems: 'center', color: dark ? theme.navy : theme.white}}>
    {emblem && <CanvasImage src={staticFile('brand/wasla-emblem-navy.webp')} style={{width: size, height: size, objectFit: 'contain', ...(dark ? {} : {filter: 'grayscale(1) invert(1)', mixBlendMode: 'screen' as const})}}/>}
    <div style={{fontFamily: 'Wasla Wordmark', fontWeight: 600, lineHeight: .98, letterSpacing: '-.055em'}}>
      <div style={{fontSize: size * .76}}>wasla</div>
      <div style={{fontSize: size * .24, letterSpacing: '.08em', marginTop: size * .11}}>informatika</div>
    </div>
  </div>
);
