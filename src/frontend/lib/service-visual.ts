export type ServiceVisual = 'website' | 'application' | 'software' | 'commerce' | 'design' | 'consultation' | 'infrastructure' | 'maintenance' | 'integration' | 'database' | 'photography' | 'video' | 'creative'

const visuals: Record<string, ServiceVisual> = {
  'website-development': 'website', 'web-application': 'application',
  'custom-software': 'software', 'e-commerce': 'commerce', 'ui-ux-design': 'design',
  'it-consultation': 'consultation', 'it-infrastructure': 'infrastructure',
  'it-infrastructure-support': 'infrastructure', 'maintenance-support': 'maintenance',
  'systems-integration': 'integration', 'database-digital-solutions': 'database',
  photography: 'photography', fotografi: 'photography', 'photography-events': 'photography',
  'photography-documentation': 'photography', 'fotografi-dokumentasi': 'photography',
  'video-editing': 'video', videography: 'video', 'videography-editing': 'video',
  'creative-editing': 'creative', 'graphic-design': 'creative', 'desain-grafis': 'creative',
  'graphic-photo-editing': 'creative', 'design-photo-editing': 'creative', 'photo-editing': 'creative',
}

/** Stable service identity: changing the list order never changes a service's visual. */
export function getServiceVisual(slug = ''): ServiceVisual {
  if (visuals[slug]) return visuals[slug]
  if (/photo|foto|wedding|wisuda/.test(slug)) return 'photography'
  if (/video|film/.test(slug)) return 'video'
  if (/graphic|grafis|creative|editing/.test(slug)) return 'creative'
  return 'website'
}

export const serviceVisualLabels: Record<ServiceVisual, string> = {
  website: 'Website responsif pada monitor dan ponsel', application: 'Aplikasi web dengan alur kerja dan panel kendali',
  software: 'Modul perangkat lunak yang saling terhubung', commerce: 'Tas belanja dengan etalase dan pembayaran',
  design: 'Artboard antarmuka dan alat desain', consultation: 'Papan strategi dan percakapan konsultasi',
  infrastructure: 'Perangkat server dan jaringan', maintenance: 'Peralatan perawatan sistem',
  integration: 'Hub penghubung antar sistem', database: 'Penyimpanan database bertingkat',
  photography: 'Kamera fotografi dan lensa', video: 'Monitor penyuntingan video dan timeline',
  creative: 'Pena digital, artboard, dan pilihan warna',
}

/** Small geometric icons remain legible while WebGL loads or when it is unavailable. */
export const serviceVisualPaths: Record<ServiceVisual, string> = {
  website: 'M4 5h16v12H4z M8 21h8 M12 17v4 M4 8h16',
  application: 'M3 4h18v16H3z M3 8h18 M7 12h4v4H7z M15 12h3 M15 16h3',
  software: 'm8 7-5 5 5 5 m8-10 5 5-5 5 m-3-13-2 16',
  commerce: 'M5 8h14l1 13H4z M8 8V6a4 4 0 0 1 8 0v2',
  design: 'M4 3h16v18H4z M8 7h8 M8 11h3v5H8z M14 11h2 M14 15h2',
  consultation: 'M3 4h18v12h-7l-4 4v-4H3z M7 8h10 M7 12h6',
  infrastructure: 'M4 3h16v7H4z M4 14h16v7H4z M8 6h.1 M8 17h.1 M12 6h5 M12 17h5 M12 10v4',
  maintenance: 'm14 4 3 3 4-1a6 6 0 0 1-7 7L7 20a2 2 0 0 1-3-3l7-7a6 6 0 0 1 3-6z',
  integration: 'M9 9h6v6H9z M3 3h4v4H3z M17 3h4v4h-4z M3 17h4v4H3z M17 17h4v4h-4z M7 7l2 2 M15 9l2-2 M7 17l2-2 M15 15l2 2',
  database: 'M4 6c0-5 16-5 16 0s-16 5-16 0v12c0 5 16 5 16 0V6 M4 12c0 5 16 5 16 0',
  photography: 'M3 7h4l2-3h6l2 3h4v13H3z M16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  video: 'M3 3h18v13H3z m7 3 5 3-5 3z M3 21h18 M7 19v4 M16 19v4',
  creative: 'M3 3h14v18H3z m6 13 10-13 3 3-10 13-4 2z M7 7h3 M7 11h2',
}
