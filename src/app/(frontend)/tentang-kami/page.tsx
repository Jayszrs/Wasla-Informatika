import { getTeam } from '@/lib/cms'
import { PageIntro, TeamSection, Process, CTA } from '@/components/ui'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta('Tentang Kami', 'Kenali pendekatan Wasla Informatika dalam menghubungkan kebutuhan bisnis dengan strategi, desain, dan teknologi.', '/tentang-kami')

export default async function Page() {
  const team = await getTeam()
  return <>
    <PageIntro title="Menghubungkan ide. Menggerakkan bisnis." copy="Wasla Informatika adalah studio solusi IT dan pengembangan digital di Indonesia. Kami mempertemukan cara berpikir kreatif dengan pendekatan teknologi yang terarah."/>
    <section className="wrap about-intro">
      <h2>Presisi dalam teknologi.<br/>Kreativitas di setiap detail.</h2>
      <div><p>Produk digital yang berguna dimulai dari pertanyaan yang tepat. Siapa yang menggunakannya? Pekerjaan apa yang ingin dimudahkan? Nilai apa yang ingin dibangun?</p><p>Melalui strategi, desain, dan pengembangan, kami membantu menerjemahkan pertanyaan itu menjadi pengalaman yang dapat digunakan dan dikelola.</p></div>
    </section>
    <section className="about-principles"><div className="wrap">{[
      ['Tujuan lebih dahulu.', 'Pilihan teknologi mengikuti masalah yang ingin diselesaikan dan konteks penggunanya.'],
      ['Bertumbuh bersama.', 'Percakapan dan tinjauan bersama menjaga setiap tahapan tetap terarah.'],
      ['Detail yang berarti.', 'Kualitas terlihat pada struktur yang jelas, interaksi yang mudah, dan hasil yang dapat dikelola.'],
    ].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <Process/>
    {!!team.docs.length && <TeamSection members={team.docs} showAboutLink={false}/>}
    <CTA/>
  </>
}
