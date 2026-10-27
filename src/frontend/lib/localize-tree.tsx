import { Children, cloneElement, isValidElement, type ReactNode, type ReactElement } from 'react'
import { localizedPath, translate, type Locale } from '@/shared/i18n'
import { Translation } from '@/frontend/components/locale-provider'

export function localizeTree(node: ReactNode, locale: Locale): ReactNode {
  if (locale === 'id') return node
  return Children.map(node, item => {
    if (typeof item === 'string') return translate(item, locale)
    if (!isValidElement(item)) return item
    const element = item as ReactElement<Record<string, unknown>>
    const props: Record<string, unknown> = {}
    for (const key of ['title', 'copy', 'description', 'alt', 'placeholder', 'aria-label']) if (typeof element.props[key] === 'string') props[key] = translate(element.props[key] as string, locale)
    if (typeof element.props.href === 'string' && !element.props.hrefLang) props.href = localizedPath(element.props.href, locale)
    if (element.props.children !== undefined) props.children = localizeTree(element.props.children as ReactNode, locale)
    return cloneElement(element, props)
  })
}

export function withTranslation<P extends object>(render: (props: P & { locale?: Locale }) => ReactNode) {
  return function LocalizedComponent(props: P & { locale?: Locale }) {
    return <Translation>{render(props)}</Translation>
  }
}
