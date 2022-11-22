// @ts-ignore
import scrypt from './hash.js';
import {Roa, RoaField, SortOrder, Suggestion, SuggestionField, SuggestionReason, Suggestions, TestBedChildRequest, TestBedPublisherRequest} from './types.js';

function dec2hex(dec: number) {
  return dec.toString(16).padStart(2, '0');
}

export function generateId(len: number): string {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);

  return Array.from(arr, dec2hex).join('');
}

export function compareRoa(a: Roa, b: Roa, field: RoaField, order: SortOrder) {
  if (a[field] === b[field]) {
    return 0;
  }

  const direction = (a[field] || '') < (b[field] || '') ? -1 : 1;

  return order === SortOrder.asc ? direction : -direction;
}

// TODO duplicated code
export function compareSuggestion(a: Suggestion, b: Suggestion, field: SuggestionField, order: SortOrder) {
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

export function formatDate(seconds: number, locale: string) {
  return new Date(seconds * 1000).toLocaleString(locale,  { dateStyle: 'long', timeStyle: 'medium' });
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

export function parseChildXML(xml: string): TestBedChildRequest {
  const doc = new window.DOMParser().parseFromString(xml, 'text/xml');
  return {
    // @ts-ignore
    handle: doc.getElementsByTagName('child_request')[0].attributes['child_handle'].value,
    id_cert: (doc.getElementsByTagName('child_bpki_ta')[0].childNodes[0].nodeValue as string).trim(),
  };
}

export function parsePublisherXML(xml: string): TestBedPublisherRequest {
  const doc = new window.DOMParser().parseFromString(xml, 'text/xml');
  return {
    // @ts-ignore
    publisher_handle: doc.getElementsByTagName('publisher_request')[0].attributes['publisher_handle'].value,
    id_cert: (doc.getElementsByTagName('publisher_bpki_ta')[0].childNodes[0].nodeValue as string).trim(),
  };
}

export function transformSuggestions(input: Suggestions): Array<Suggestion> {
  const result: Array<Suggestion> = [];
  if (input.too_permissive) {
    for (const change of input.too_permissive) {
      result.push({
        action: 'remove',
        reason: SuggestionReason.tooPermissive,
        prefix: change.current.prefix,
        asn: change.current.asn,
        max_length: change.current.max_length || parseInt(change.current.prefix.split('/')[1]),
      });
      for (const newRoa of change.new) {
        result.push({
          action: 'remove',
          reason: SuggestionReason.specific,
          prefix: newRoa.prefix,
          asn: newRoa.asn,
          max_length: parseInt(newRoa.prefix.split('/')[1]),
        });
      }
    }
  }
  if (input.not_found) {
    for (const announcement of input.not_found) {
      result.push({
        action: 'add',
        reason: SuggestionReason.notFound,
        prefix: announcement.prefix,
        asn: announcement.asn,
        max_length: parseInt(announcement.prefix.split('/')[1]),
      });
    }
  }
  if (input.invalid_length) {
    for (const announcement of input.invalid_length) {
      result.push({
        action: 'add',
        reason: SuggestionReason.invalidLength,
        prefix: announcement.prefix,
        asn: announcement.asn,
        max_length: parseInt(announcement.prefix.split('/')[1]),
      });
    }
  }
  if (input.redundant) {
    for (const announcement of input.redundant) {
      result.push({
        action: 'remove',
        reason: SuggestionReason.redundant,
        prefix: announcement.prefix,
        asn: announcement.asn,
        max_length: parseInt(announcement.prefix.split('/')[1]),
      });
    }
  }
  if (input.stale) {
    for (const announcement of input.stale) {
      result.push({
        action: 'remove',
        reason: SuggestionReason.stale,
        prefix: announcement.prefix,
        asn: announcement.asn,
        max_length: parseInt(announcement.prefix.split('/')[1]),
      });
    }
  }
  if (input.invalid_asn) {
    for (const announcement of input.invalid_asn) {
      result.push({
        action: 'remove',
        reason: SuggestionReason.invalidAsn,
        prefix: announcement.prefix,
        asn: announcement.asn,
        max_length: parseInt(announcement.prefix.split('/')[1]),
      });
    }
  }
  if (input.as0_redundant) {
    for (const announcement of input.as0_redundant) {
      result.push({
        action: 'remove',
        reason: SuggestionReason.as0Redundant,
        prefix: announcement.prefix,
        asn: announcement.asn,
        max_length: parseInt(announcement.prefix.split('/')[1]),
      });
    }
  }
  if (input.disallowing) {
    for (const announcement of input.disallowing) {
      result.push({
        action: 'remove',
        reason: SuggestionReason.disallowing,
        prefix: announcement.prefix,
        asn: announcement.asn,
        max_length: parseInt(announcement.prefix.split('/')[1]),
      });
    }
  }
  return result;

}
