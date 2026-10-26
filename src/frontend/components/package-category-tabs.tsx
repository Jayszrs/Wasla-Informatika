'use client'

import { useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from 'react'
import styles from './website-packages.module.css'

type Category = { id: string; label: string; content: ReactNode }
const subscribe = () => () => {}
const clientSnapshot = () => true
const serverSnapshot = () => false

export function PackageCategoryTabs({ categories, label }: { categories: Category[]; label: string }) {
  const instance = useId()
  const interactive = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)
  const [selected, setSelected] = useState(categories[0]?.id)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const active = categories.some(category => category.id === selected) ? selected : categories[0]?.id

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % categories.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + categories.length) % categories.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = categories.length - 1
    else return
    event.preventDefault()
    setSelected(categories[next].id)
    buttons.current[next]?.focus()
  }

  return <div className={styles.categories} data-ready={interactive}>
    <div className={styles.tabs} role="tablist" aria-label={label}>
      {categories.map((category, index) => <button key={category.id}
        ref={element => { buttons.current[index] = element }} type="button" role="tab" disabled={!interactive}
        id={`${instance}-tab-${category.id}`} aria-controls={`${instance}-panel-${category.id}`}
        aria-selected={active === category.id} tabIndex={active === category.id ? 0 : -1}
        onClick={() => setSelected(category.id)} onKeyDown={event => navigate(event, index)}
      >{category.label}</button>)}
    </div>
    {categories.map(category => <section className={styles.panel} key={category.id} role="tabpanel"
      id={`${instance}-panel-${category.id}`} aria-labelledby={`${instance}-tab-${category.id}`}
      tabIndex={0} hidden={interactive && active !== category.id}
    >{category.content}</section>)}
  </div>
}
