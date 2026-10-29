import { ServerTranslation } from '@/frontend/components/server-translation'
import { getTeam, getSettings } from '@/backend/cms'
import { PageIntro, TeamSection, Process, CTA, MediaImage } from '@/frontend/components/ui'
import { localizedPageMeta } from '@/frontend/lib/seo'
import styles from './about-surface.module.css'

export async function generateMetadata() { return localizedPageMeta('Tentang Kami', 'Kenali pendekatan Wasla Informatika dalam menghubungkan kebutuhan bisnis dengan strategi, desain, dan teknologi.', '/tentang-kami') }

export default async function Page() {
  const [team, settings] = await Promise.all([getTeam(), getSettings()])
  return <ServerTranslation>{<>
    <PageIntro title="Tentang Wasla" copy="Menghubungkan kebutuhan bisnis dengan strategi, desain, dan teknologi."/>
    <div className={styles.surface}>
    <section className={`wrap about-intro ${styles.intro}`}>
      <div className={`about-image ${styles.visual}`}>
        <svg className={styles.visualPaths} viewBox="0 0 640 560" fill="none" aria-hidden="true"><path d="M-80 415C92 603 441 506 534 318S491-14 289 13" stroke="#cad8e6" strokeWidth="1.4"/><path d="M-80 455C122 658 507 516 591 309S516-67 282-39" stroke="#d7e2ec" strokeWidth="1.4"/><path d="M-103 351C73 540 354 491 454 316S446 47 310 51" stroke="#b5c9dc" strokeWidth="1.4"/></svg>
        <MediaImage media={settings.featureImage} sizes="(max-width: 767px) 100vw, 40vw" />
      </div>
      <div className={styles.copy}>
      <h2>Presisi dalam teknologi.<br/>Kreativitas di setiap detail.</h2>
      <p>Wasla Informatika adalah studio solusi IT dan pengembangan digital di Indonesia. Kami mempertemukan cara berpikir kreatif dengan pendekatan teknologi yang terarah.</p><p>Produk digital yang berguna dimulai dari pertanyaan yang tepat. Siapa yang menggunakannya? Pekerjaan apa yang ingin dimudahkan? Nilai apa yang ingin dibangun?</p><p>Melalui strategi, desain, dan pengembangan, kami membantu menerjemahkan pertanyaan itu menjadi pengalaman yang dapat digunakan dan dikelola.</p>
      </div>
    </section>
    <section className={`about-principles ${styles.principles}`}><div className="wrap">{[
      ['Tujuan lebih dahulu.', 'Pilihan teknologi mengikuti masalah yang ingin diselesaikan dan konteks penggunanya.'],
      ['Bertumbuh bersama.', 'Percakapan dan tinjauan bersama menjaga setiap tahapan tetap terarah.'],
      ['Detail yang berarti.', 'Kualitas terlihat pada struktur yang jelas, interaksi yang mudah, dan hasil yang dapat dikelola.'],
    ].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <Process/>
    {!!team.docs.length && <div className={styles.teamSurface}>
      <svg className={styles.teamPaths} viewBox="0 0 1440 1050" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M1210-80c-181 158-212 322-45 429s258 197 137 402-305 218-338 354" stroke="#d1deea" strokeWidth="1.3"/><path d="M1260-80c-181 158-212 322-45 429s258 197 137 402-305 218-338 354" stroke="#e0e8f0" strokeWidth="1.3"/><path d="M-70 402c181-55 278 27 229 170S-65 816 52 970" stroke="#d8e3ed" strokeWidth="1.3"/></svg>
      <TeamSection members={team.docs} showAboutLink={false}/>
    </div>}
    </div>
    <CTA/>
  </>}</ServerTranslation>
}
