'use client'
import { createContext, useContext, type ReactNode } from 'react'
import { translate, type Locale } from '@/shared/i18n'
import { localizeTree } from '@/frontend/lib/localize-tree'

const LocaleContext = createContext<Locale>('id')
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) { return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider> }
export const useLocale = () => useContext(LocaleContext)
export function useTranslation() { const locale = useLocale(); return (text: string) => translate(text, locale) }
export function Translation({ children }: { children: ReactNode }) { return localizeTree(children, useLocale()) }
