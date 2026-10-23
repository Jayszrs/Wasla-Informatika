'use client'
import { useState } from 'react'
import type { Project, Post } from '@/shared/content-types'
import { ProjectCard, PostCard } from './ui'

export function ProjectListing({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState('Semua')
  const categories = ['Semua', ...new Set(projects.map(p => p.category))]
  const shown = category === 'Semua' ? projects : projects.filter(p => p.category === category)
  return <><div className="filters portfolio-filters" aria-label="Filter kategori project">{categories.map(c => <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c}>{c}</button>)}</div><p className="filter-count" role="status">{shown.length} project ditampilkan</p><div className="project-grid">{shown.map(p => <ProjectCard key={p.id} project={p}/>)}</div>{!shown.length && <p>Belum ada project di kategori ini. Pilih kategori lain atau hubungi kami untuk berdiskusi.</p>}</>
}
export function PostListing({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState('Semua')
  const categories = ['Semua', ...new Set(posts.map(p => p.category))]
  const shown = category === 'Semua' ? posts : posts.filter(p => p.category === category)
  return <><div className="filters" aria-label="Filter kategori artikel">{categories.map(c => <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c}>{c}</button>)}</div><div className="post-grid" aria-live="polite">{shown.map((p, i) => <PostCard key={p.id} post={p} index={i}/>)}</div>{!shown.length && <p>Artikel sedang disiapkan. Silakan kembali atau diskusikan kebutuhan Anda melalui halaman kontak.</p>}</>
}
