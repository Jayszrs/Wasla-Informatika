import { ServerTranslation } from '@/frontend/components/server-translation'
import { getProjects, getVideoLibrary } from '@/backend/cms'
import { PageIntro, CTA } from '@/frontend/components/ui'
import { ProjectListing } from '@/frontend/components/listings'
import { localizedPageMeta } from '@/frontend/lib/seo'
import { PortfolioNavigation, VideoPortfolio } from '@/frontend/components/video-portfolio'
export async function generateMetadata() { return localizedPageMeta('Project', 'Website, aplikasi, video, dan karya kreatif Wasla Informatika untuk bisnis, organisasi, dan pendidikan.', '/portofolio') }
export default async function Page() { const [{ docs }, videos] = await Promise.all([getProjects(), getVideoLibrary()]); return <ServerTranslation>{<><PageIntro title="Project" copy="Website, aplikasi, video, dan karya kreatif. Jelajahi project dan tonton hasil pengerjaannya."/><PortfolioNavigation/><section id="website-portfolio" className="wrap page-content"><ProjectListing projects={docs}/></section><VideoPortfolio items={videos}/><CTA/></>}</ServerTranslation> }
