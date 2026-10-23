import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './studio.css'
const font = localFont({ src: [ { path: '../../../public/fonts/Poppins-Regular.ttf', weight: '400' }, { path: '../../../public/fonts/Poppins-Medium.ttf', weight: '500' }, { path: '../../../public/fonts/Poppins-SemiBold.ttf', weight: '600' } ], variable: '--studio-font', display: 'swap' })
export const metadata: Metadata = { title: 'Wasla Studio — Dashboard', robots: { index: false, follow: false }, icons: { icon: '/images/brand/favicon-navy.png' } }
export const dynamic = 'force-dynamic'
export default function StudioLayout({ children }: { children: React.ReactNode }) { return <html lang="id" className={font.variable}><body className="studio-body">{children}</body></html> }
