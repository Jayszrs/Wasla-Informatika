import {CanvasImage, staticFile} from 'remotion';
import {ConceptWebsite, type WebsiteKind} from './BrowserMockup';

export const SmartphoneMockup = ({width = 260, height = 500, src, kind = 'company'}: {width?: number; height?: number; src?: string; kind?: WebsiteKind}) => <div style={{position: 'relative', width, height, border: '9px solid #172C48', borderRadius: 38, overflow: 'hidden', background: '#F8FAFD', boxShadow: '0 26px 45px #00000040'}}>
  {src ? <CanvasImage src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top'}}/> : <ConceptWebsite kind={kind} mobile/>}
  <div style={{position: 'absolute', top: 9, left: '50%', translate: '-50% 0', width: width * .36, height: 15, background: '#172C48', borderRadius: 12}}/>
  <div style={{position: 'absolute', bottom: 9, left: '50%', translate: '-50% 0', width: width * .33, height: 4, background: '#BDC7D7', borderRadius: 3}}/>
</div>;
