import { getServices, getFAQs } from '@/lib/cms'
import { PageIntro, ServiceRow, CTA, FAQSection } from '@/components/ui'
import { pageMeta } from '@/lib/seo'
export const metadata = pageMeta('Layanan', 'Website, aplikasi web, software, UI/UX, konsultasi, dan infrastruktur IT untuk kebutuhan bisnis Anda.', '/layanan')
export default async function Page() { const [{ docs }, faqs] = await Promise.all([getServices(), getFAQs()]); return <><PageIntro title="Satu kebutuhan. Banyak kemungkinan." copy="Kami membantu memilih arah, merancang pengalaman, dan membangun teknologi yang sesuai dengan cara bisnis Anda bekerja."/><section className="wrap page-content page-service-list" aria-label="Daftar layanan">{docs.map((s, i) => <ServiceRow key={s.id} service={s} index={i}/>)}{!docs.length && <p>Layanan sedang diperbarui. Silakan hubungi kami untuk membahas kebutuhan Anda.</p>}</section>{!!faqs.docs.length && <FAQSection items={faqs.docs}/>}<CTA/></> }
