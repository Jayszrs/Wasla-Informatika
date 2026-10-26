import { ImageResponse } from 'next/og'
export const alt = 'Wasla Informatika: jasa pembuatan website dan IT consultant Jabodetabek'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function Image() { return new ImageResponse(<div style={{ width: '100%', height: '100%', background: '#071A33', color: 'white', display: 'flex', padding: 70, flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'sans-serif' }}><div style={{ fontSize: 42 }}>wasla informatika.</div><div style={{ display: 'flex', fontSize: 76, lineHeight: 1.1, maxWidth: 1000 }}>Jasa Pembuatan Website & IT Consultant</div><div style={{ fontSize: 22, color: '#DCEAFF' }}>Jakarta / Bogor / Depok / Tangerang / Bekasi</div></div>, size) }
