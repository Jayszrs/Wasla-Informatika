import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  { rules: { '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }] } },
  globalIgnores(['.next/**', '.local/**', 'media/**', 'wasla-video/**', 'src/payload-types.ts', 'src/migrations/**', 'src/app/(payload)/admin/importMap.js']),
])
