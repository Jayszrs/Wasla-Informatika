import {existsSync, readdirSync} from 'node:fs';
import path from 'node:path';

export function binary(name) {
  const configured = process.env[`${name.toUpperCase()}_PATH`];
  if (configured) return configured;
  const packages = path.resolve('node_modules/@remotion');
  for (const directory of readdirSync(packages).filter(item => item.startsWith('compositor-'))) {
    const candidate = path.join(packages, directory, name + (process.platform === 'win32' ? '.exe' : ''));
    if (existsSync(candidate)) return candidate;
  }
  return name;
}
