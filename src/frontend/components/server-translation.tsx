import type { ReactNode } from 'react'
import { getLocale } from '@/frontend/lib/locale'
import { localizeTree } from '@/frontend/lib/localize-tree'

export async function ServerTranslation({ children }: { children: ReactNode }) { return localizeTree(children, await getLocale()) }
