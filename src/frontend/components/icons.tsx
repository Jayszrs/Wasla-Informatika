export function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
export function Plus() { return <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg> }

export function LinkedInIcon() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="7.5" cy="8" r="1" fill="currentColor"/><path d="M7.5 11v6M11.5 17v-6m0 2.5c0-3.5 5-3.5 5 0V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
