import type {ReactNode} from 'react';
import {CanvasImage, staticFile} from 'remotion';
import {theme} from '../video/theme';

export type WebsiteKind = 'company' | 'landing' | 'business' | 'custom';
const conceptCopy: Record<WebsiteKind, {name: string; title: string; color: string}> = {
  company: {name: 'Profil Perusahaan', title: 'Bisnis yang\nterus bergerak.', color: '#163B73'},
  landing: {name: 'Penawaran Produk', title: 'Satu ide.\nBanyak peluang.', color: '#397BFF'},
  business: {name: 'Layanan Bisnis', title: 'Temukan solusi\nuntuk usahamu.', color: '#163B73'},
  custom: {name: 'Aplikasi Custom', title: 'Alur kerja,\nsatu tempat.', color: '#397BFF'},
};

const ConceptIllustration = ({kind, color}: {kind: WebsiteKind; color: string}) => <svg width="212" height="170" viewBox="0 0 212 170" fill="none">
  {kind === 'company' ? <>
    <path d="M12 150h190" stroke={color} strokeWidth="3"/>
    <path d="M30 150V52l62-30v128M95 150V70l60-23v103M157 150V96h30v54" fill="white" stroke={color} strokeWidth="3"/>
    {[0,1,2,3].map(row => <g key={row}>{[0,1].map(col => <rect key={col} x={44+col*24} y={61+row*22} width="9" height="9" fill={color}/>)}</g>)}
    <path d="M109 88h30m-30 22h30m-30 22h30" stroke={color} strokeWidth="5"/>
  </> : kind === 'landing' ? <>
    <circle cx="108" cy="83" r="74" fill={`${color}18`}/>
    <ellipse cx="109" cy="151" rx="72" ry="9" fill={`${color}25`}/>
    <path d="M62 55l44-24 50 26-48 27Z" fill="white" stroke={color} strokeWidth="3"/>
    <path d="M62 55v70l46 26V84Z" fill={color}/><path d="M108 84l48-27v70l-48 24Z" fill="#91B5FF"/>
    <path d="M83 43l49 27v24" stroke={color} strokeWidth="7"/>
    <path d="M175 23v20m-10-10h20M32 92v14m-7-7h14" stroke={color} strokeWidth="3"/>
  </> : <>
    <rect x="15" y="23" width="182" height="130" rx="12" fill="white" stroke={color} strokeWidth="2"/>
    <path d="M35 128h142" stroke="#C3CEE0" strokeWidth="2"/>
    <rect x="40" y="98" width="22" height="30" rx="3" fill="#BCD1FF"/><rect x="78" y="77" width="22" height="51" rx="3" fill="#91B5FF"/>
    <rect x="116" y="58" width="22" height="70" rx="3" fill={color}/><path d="M39 81l45-27 40-10 40-20m-18 0h18v18" stroke="#397BFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </>}
</svg>;

export const ConceptWebsite = ({kind, mobile = false}: {kind: WebsiteKind; mobile?: boolean}) => {
  const content = conceptCopy[kind];
  return <div style={{height: '100%', padding: mobile ? 22 : 38, background: '#F8FAFD', color: theme.navy, fontFamily: theme.body, overflow: 'hidden'}}>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: mobile ? 22 : 32, borderBottom: '1px solid #DCE3ED', fontSize: mobile ? 14 : 19, fontWeight: 800}}><span>{content.name}</span><span style={{fontSize: 13}}>Menu</span></div>
    {kind === 'custom' ? <>
      <div style={{fontFamily: theme.heading, fontWeight: 700, fontSize: mobile ? 29 : 48, lineHeight: 1.15, marginTop: 28, letterSpacing: '-.04em'}}>Alur kerja,<br/>satu tempat.</div>
      <div style={{display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: 14, marginTop: 28}}>
        {['Permintaan', 'Dalam proses', 'Selesai'].map((label,i) => <div key={label} style={{flex: 1, padding: mobile ? 13 : 18, background: '#EAF1FB', borderRadius: 10}}>
          <div style={{fontSize: mobile ? 13 : 18, fontWeight: 800, color: content.color}}>{label}</div>
          {[0,1].map(n => <div key={n} style={{padding: 13, background: 'white', borderRadius: 7, marginTop: 12, borderLeft: `3px solid ${i===2 ? '#163B73' : content.color}`}}><div style={{height: 6, width: '80%', background: '#BCCDE5'}}/><div style={{height: 5, width: '55%', background: '#DBE4F1', marginTop: 10}}/></div>)}
        </div>)}
      </div>
    </> : <><div style={{display: 'flex', gap: 24, alignItems: 'center', marginTop: mobile ? 28 : 38}}>
      <div style={{flex: 1}}><div style={{fontFamily: theme.heading, fontWeight: 700, whiteSpace: 'pre-line', fontSize: mobile ? 30 : 52, lineHeight: 1.15, letterSpacing: '-.04em'}}>{content.title}</div><div style={{width: '87%', height: 7, marginTop: 20, background: '#C3CEE0', borderRadius: 3}}/><div style={{width: '65%', height: 7, marginTop: 9, background: '#D9E0EB', borderRadius: 3}}/><div style={{display: 'inline-flex', background: content.color, color: 'white', padding: mobile ? '12px 15px' : '15px 24px', marginTop: 23, borderRadius: 7, fontSize: mobile ? 12 : 18, fontWeight: 700}}>Hubungi kami</div></div>
      {!mobile && <div style={{width: 260, height: 220, background: `${content.color}12`, borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 13, padding: 24, justifyContent: 'center'}}>
        <ConceptIllustration kind={kind} color={content.color}/>
      </div>}
    </div>
    <div style={{display: 'flex', gap: 12, marginTop: mobile ? 32 : 40}}>{[0, 1, 2].map(i => <div key={i} style={{flex: 1, height: mobile ? 76 : 95, background: 'white', border: '1px solid #DCE3ED', borderRadius: 9, padding: 14}}><div style={{height: 9, width: '45%', background: content.color, borderRadius: 3}}/><div style={{height: 5, width: '90%', background: '#DCE3ED', marginTop: 14}}/><div style={{height: 5, width: '70%', background: '#DCE3ED', marginTop: 8}}/></div>)}</div></>}
  </div>;
};

export const BrowserMockup = ({width = 900, height = 520, src, children, laptop = false}: {width?: number; height?: number; src?: string; children?: ReactNode; laptop?: boolean}) => <div style={{width, position: 'relative'}}>
  <div style={{height, border: `${laptop ? 12 : 2}px solid ${laptop ? '#243B58' : '#9EACC2'}`, borderRadius: laptop ? 28 : 22, overflow: 'hidden', background: theme.deep, boxShadow: '0 38px 70px #00000035'}}>
    {!laptop && <div style={{height: 42, background: '#EAF0F8', display: 'flex', alignItems: 'center', padding: '0 18px', gap: 7}}>{[0, 1, 2].map(i => <span key={i} style={{width: 9, height: 9, borderRadius: '50%', background: ['#8291A7', '#A6B3C5', '#C8D0DC'][i]}}/>)}<div style={{height: 22, background: 'white', borderRadius: 5, width: '65%', marginLeft: 18, color: '#72829A', fontSize: 13, padding: '2px 10px'}}>wasla.my.id</div></div>}
    <div style={{height: laptop ? '100%' : height - 46, overflow: 'hidden'}}>{src ? <CanvasImage src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top'}}/> : children}</div>
  </div>
  {laptop && <div style={{height: 28, width: width + 70, marginLeft: -35, borderRadius: '3px 3px 30px 30px', background: 'linear-gradient(#AAB8CA, #677B95)', boxShadow: '0 25px 35px #00000030'}}><div style={{width: 150, height: 8, margin: '0 auto', background: '#485C78', borderRadius: '0 0 9px 9px'}}/></div>}
</div>;
