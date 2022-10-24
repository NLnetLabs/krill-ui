// @ts-ignore
import scrypt from './hash.js';
import { Roa, RoaField, SortOrder } from './types.js';

function dec2hex(dec: number) {
  return dec.toString(16).padStart(2, '0');
}

export function generateId(len: number): string {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);

  return Array.from(arr, dec2hex).join('');
}

export function compare(a: Roa, b: Roa, field: RoaField, order: SortOrder) {
  if (a[field] === b[field]) {
    return 0;
  }

  const direction = a[field] < b[field] ? -1 : 1;

  return order === SortOrder.asc ? direction : -direction;
}

export function prefixMaxLength(prefix: string | undefined): string {
  if (!prefix) {
    return '';
  }

  const parts = prefix.split(/[/-]/g);

  return parts[parts.length - 1];
}

export function isAbsolute(url: string): boolean {
  const r = new RegExp('^(?:[a-z]+:)?//', 'i');

  return r.test(url);
}

export function parseLoginUrl(url: string): boolean {
  return url.includes('withId=true');
}

export async function krillHash(username: string, password: string): Promise<string> {
  const cost_level = 13;
  const iterations = Math.pow(2, cost_level);
  const var_r = 8;
  const var_p = 1;
  const length = 32;

  const salt = 'krill-lagosta-' + username;
  const pwBuf = password.normalize('NFKC');
  const saltBuf = salt.normalize('NFKC');

  const hash = await scrypt(pwBuf, saltBuf, iterations, var_r, var_p, length);

  return await hash.toString('hex');
}
