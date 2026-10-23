'use client'
import { useLinkStatus } from 'next/link'
export function LinkProgress() { const { pending } = useLinkStatus(); return pending ? <span className="nav-loading" role="status">Memuat…</span> : null }
