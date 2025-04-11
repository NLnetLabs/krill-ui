import {
  Aspa,
  AspaField,
  Roa,
  RoaField,
  SortOrder,
  Suggestion,
  SuggestionField,
  SuggestionReason,
  Suggestions,
  TestBedParentResponse,
  TestBedPubResponse,
} from './types.js';
import { DateTime } from 'luxon';

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

export function compareAspa(a: Aspa, b: Aspa, field: AspaField, order: SortOrder) {
  if (a[field] === b[field]) {
    return 0;
  }

  const direction = (a[field] || '') < (b[field] || '') ? -1 : 1;

  return order === SortOrder.asc ? direction : -direction;
}

export function compareSuggestion(
  a: Suggestion,
  b: Suggestion,
  field: SuggestionField,
  order: SortOrder
) {
  if (a[field] === b[field]) {
    return 0;
  }

  const direction = a[field] < b[field] ? -1 : 1;

  return order === SortOrder.asc ? direction : -direction;
}

export function prefixLength(prefix: string | undefined): string {
  if (!prefix) {
    return '';
  }

  const parts = prefix.split(/[/-]/g);
  return parts.length > 1 ? parts[parts.length - 1] : '1';
}

export function formatDate(seconds: number, locale: string) {
  const dt = DateTime.fromSeconds(seconds, { zone: 'UTC' }).setLocale(locale);

  return `${dt.toFormat('dd-MM-yyyy TTT')} (${dt.toRelative()})`;
}

export function isAbsolute(url: string): boolean {
  const r = new RegExp('^(?:[a-z]+:)?//', 'i');

  return r.test(url);
}

export function parseLoginUrl(url: string): boolean {
  return url.includes('withId=true');
}

export function checkXmlParsingSucceeded(doc: Document): string {
  if (doc.getElementsByTagName('parsererror').length > 0) {
    return doc.getElementsByTagName('parsererror')[0].textContent as string;
  }
  return '';
}

export function parentResponseJsonToXml(res: TestBedParentResponse): string {
  return (
    `<parent_response xmlns="http://www.hactrn.net/uris/rpki/rpki-setup/" version="1" parent_handle="${res.parent_handle}" child_handle="${res.child_handle}" service_uri="${res.service_uri}">\n` +
    '  <parent_bpki_ta>\n' +
    `    ${res.id_cert}\n` +
    '  </parent_bpki_ta>\n' +
    '</parent_response>\n'
  );
}

export function publisherResponseJsonToXml(res: TestBedPubResponse): string {
  return (
    `<repository_response xmlns="http://www.hactrn.net/uris/rpki/rpki-setup/" version="1" publisher_handle="${res.publisher_handle}" service_uri="${res.service_uri}" sia_base="${res.repo_info.sia_base}" rrdp_notification_uri="${res.repo_info.rrdp_notification_uri}">\n` +
    '    <repository_bpki_ta>\n' +
    `     ${res.id_cert}\n` +
    '    </repository_bpki_ta>\n' +
    '</repository_response>'
  );
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
        max_length:
          change.current.max_length ||
          parseInt(change.current.prefix.split('/')[1]),
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
