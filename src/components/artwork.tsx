export function ConnectionArt({ className = '' }: { className?: string }) {
  return <svg className={`connection-art ${className}`} viewBox="0 0 640 560" fill="none" role="img" aria-label="Diagram orisinal: jalur ide yang saling terhubung menjadi satu solusi">
    <defs><linearGradient id="path-shade" x1="50" y1="20" x2="580" y2="550" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#7198c7" /></linearGradient></defs>
    <g stroke="#315175" strokeWidth="1"><ellipse cx="325" cy="300" rx="270" ry="212" transform="rotate(-28 325 300)"/><ellipse cx="325" cy="300" rx="226" ry="177" transform="rotate(-28 325 300)"/><path d="M40 420 590 130M90 490 565 225"/></g>
    <path d="M147 390V190c0-61 49-110 110-110s110 49 110 110v173c0 40 32 72 72 72s72-32 72-72V166" stroke="#143A66" strokeWidth="60"/>
    <path d="M133 373V173c0-61 49-110 110-110s110 49 110 110v173c0 40 32 72 72 72s72-32 72-72V149" stroke="url(#path-shade)" strokeWidth="40"/>
    <path d="M133 373V173c0-61 49-110 110-110s110 49 110 110v173" stroke="white" strokeOpacity=".5" strokeWidth="1" transform="translate(-12 -5)"/>
    <g fill="#071A33" stroke="#DCEAFF"><circle cx="133" cy="373" r="8"/><circle cx="497" cy="149" r="8"/></g><circle cx="353" cy="267" r="8" fill="#397BFF"/>
    <g fill="#DCEAFF" fontFamily="sans-serif" fontSize="13"><text x="70" y="432">IDE &amp; STRATEGI</text><text x="456" y="110">SOLUSI DIGITAL</text></g>
    <path d="M87 400h91m277-275h74" stroke="#7697bc"/>
  </svg>
}

export function ServiceArt({ variant = 0 }: { variant?: number }) {
  return <svg className="service-art" width="112" height="92" viewBox="0 0 112 92" fill="none" aria-hidden="true">{variant % 3 === 0 ? <g stroke="currentColor"><rect x="16" y="11" width="76" height="53" rx="3"/><path d="M16 25h76M26 18h2m5 0h2m5 0h2M27 36h31v17H27zM66 36h15M66 43h15M66 50h9M31 75h66"/><rect x="75" y="45" width="23" height="37" rx="3" fill="var(--surface, #fff)"/><path d="M81 53h11M81 59h11M81 65h6"/></g> : variant % 3 === 1 ? <g stroke="currentColor"><path d="m13 29 43-20 43 20-43 20zM13 45l43 20 43-20M13 61l43 20 43-20"/><path d="M56 49v32M24 35v18M88 35v18" strokeDasharray="3 4"/></g> : <g stroke="currentColor"><rect x="9" y="30" width="30" height="30" rx="3"/><rect x="73" y="8" width="30" height="30" rx="3"/><rect x="73" y="56" width="30" height="30" rx="3"/><path d="M39 45h17V23h17M56 45v26h17"/><circle cx="56" cy="45" r="4" fill="var(--surface, #fff)"/></g>}</svg>
}

export function ConceptVisual({ variant = 'commerce', compact = false }: { variant?: string | null; compact?: boolean }) {
  return <div className={`concept-visual concept-${variant} ${compact ? 'compact' : ''}`} role="img" aria-label="Mockup antarmuka konsep eksplorasi, bukan proyek klien">
    <div className="concept-window"><div className="window-top"><span className="window-dots"><i/><i/><i/></span><span>Eksplorasi antarmuka · Wasla Studio</span><span>↗</span></div>
      {variant === 'platform' ? <div className="mock-app"><aside><b>alur.</b><span>Ruang kerja</span><span>Proyek</span><span>Dokumen</span><span>Tim</span></aside><div className="mock-app-main"><div className="mock-app-top">Ruang kerja / Proyek <span>+ Proyek baru</span></div><h4>Setiap ide,<br/>menemukan alurnya.</h4><div className="mock-boards">{['Direncanakan', 'Dikerjakan', 'Ditinjau'].map((l, i) => <div key={l}><b>{l}</b><article><small>DEMONSTRASI</small><strong>{['Riset kebutuhan', 'Desain antarmuka', 'Struktur konten'][i]}</strong><span>Tim proyek</span></article><article><small>DEMONSTRASI</small><strong>{['Pemetaan proses', 'Pengembangan', 'Tinjauan bersama'][i]}</strong><span>Ruang diskusi</span></article></div>)}</div></div></div>
      : variant === 'editorial' ? <div className="mock-editorial"><header><b>sela</b><span>Cerita / Perspektif / Tentang</span></header><small>JURNAL DIGITAL · KONSEP DESAIN</small><h4>Ruang untuk<br/><em>melihat kembali.</em></h4><div className="editorial-shape"><span/><span/><span/></div><footer>Menemukan sudut pandang baru dalam hal-hal sehari-hari.</footer></div>
      : <div className="mock-commerce"><header><b>ruang.</b><span>Koleksi / Cerita / Keranjang</span></header><div className="mock-commerce-content"><div><small>BENDA DENGAN MAKNA</small><h4>Sederhana.<br/>Sepenuhnya<br/><em>berarti.</em></h4><p>Benda pilihan untuk ruang dan keseharian.</p><span className="mock-link">Jelajahi koleksi ↗</span></div><div className="object-scene"><div className="object-circle"/><div className="object-vase"/><div className="object-shelf"/></div></div><footer><span>01 / Ruang sehari-hari</span><span>Konsep visual, bukan toko aktif</span></footer></div>}
    </div>
  </div>
}
