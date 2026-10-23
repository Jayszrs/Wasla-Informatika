import { getServices, getFAQs } from '@/lib/cms'
import { PageIntro, ServiceRow, CTA, FAQSection } from '@/components/ui'
import { pageMeta } from '@/lib/seo'
export const metadata = pageMeta('Layanan', 'Website, aplikasi, UI/UX, solusi IT, fotografi wedding dan wisuda, video editing, serta desain grafis.', '/layanan')
export default async function Page() { const [{ docs }, faqs] = await Promise.all([getServices(), getFAQs()]); return <><PageIntro title="Layanan" copy="Dari website dan aplikasi hingga fotografi, video, dan desain. Pilih layanan untuk kebutuhan bisnis atau momen yang ingin Anda ceritakan."/><section className="wrap page-content page-service-list" aria-label="Daftar layanan">{docs.map((s, i) => <ServiceRow key={s.id} service={s} index={i}/>)}{!docs.length && <p>Layanan sedang diperbarui. Silakan hubungi kami untuk membahas kebutuhan Anda.</p>}</section>{!!faqs.docs.length && <FAQSection items={faqs.docs}/>}<CTA/></> }
