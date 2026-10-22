import type { Access, FieldAccess } from 'payload'

export const staff: Access = ({ req }) => Boolean(req.user && ['admin', 'editor'].includes(req.user.role))
export const admin: Access = ({ req }) => req.user?.role === 'admin'
export const adminField: FieldAccess = ({ req }) => req.user?.role === 'admin'
export const published: Access = ({ req }) => req.user && ['admin', 'editor'].includes(req.user.role) ? true : { _status: { equals: 'published' } }
export const nobody: Access = () => false

export const safeLink = (value: unknown) => typeof value === 'string' && (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\') || /^https:\/\//.test(value))
