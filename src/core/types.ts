import { Params, StateMeta } from 'router5/dist/types/base';
import { Translations } from './translations';

export enum NotificationType {
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export interface Notification {
  type: NotificationType,
  message: string | undefined,
}

export interface CaDetails {
  handle: string,
  repo_info: {
    sia_base: string,
    rrdp_notification_uri: string,
  },
  resources: {
    asn: string,
    ipv4: string,
    ipv6: string,
  },
}

export interface BgpAnnouncement {
  asn: number,
  prefix: string,
}

export enum RoaState {
  RoaSeen = 'roa_seen',
  RoaUnseen = 'roa_unseen',
  RoaNotHeld = 'roa_not_held',
  RoaNoAnnouncementInfo = 'roa_no_announcement_info',
  RoaTooPermissive = 'roa_too_permissive',
  RoaDisallowing = 'roa_disallowing',
  RoaRedundant = 'roa_redundant',
  RoaAs0 = 'roa_as0',
  RoaAs0Redundant = 'roa_as0_redundant',
  AnnouncementNotFound = 'announcement_not_found',
  AnnouncementInvalidLength = 'announcement_invalid_length',
  AnnouncementInvalidAsn = 'announcement_invalid_asn',
  AnnouncementDisallowedAs0 = 'announcement_disallowed',
}

export enum RoaStateHelp {
  RoaSeenHelp = 'roa_seen_help',
  RoaUnseenHelp = 'roa_unseen_help',
  RoaNotHeldHelp = 'roa_not_held_help',
  RoaTooPermissiveHelp = 'roa_too_permissive_help',
  RoaDisallowingHelp = 'roa_disallowing_help',
  RoaRedundantHelp = 'roa_redundant_help',
  RoaAs0Help = 'roa_as0_help',
  RoaAs0RedundantHelp = 'roa_as0_redundant_help',
  AnnouncementNotFoundHelp = 'announcement_not_found_help',
  AnnouncementInvalidLengthHelp = 'announcement_invalid_length_help',
  AnnouncementInvalidAsnHelp = 'announcement_invalid_asn_help',
  AnnouncementDisallowedAs0 = 'announcement_disallowed_help',
}

export enum RoaField {
  asn = 'asn',
  comment = 'comment',
  prefix = 'prefix',
  state = 'state',
}

export enum AspaField {
  customer = 'customer',
  providers = 'providers',
}

export type RoaTableHeading = Array<{ label: string, accessor: RoaField }>
export type AspaTableHeading = Array<{ label: string, accessor: AspaField }>
export type BgpTableHeading = Array<{ label: string, accessor: SuggestionField }>

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

export interface Filtering<T> {
  search: null | string,
  sort: T,
  order: SortOrder,
  limit: number,
  page: number,
}

export interface Route {
  asn: number,
  comment?: string,
  prefix: string,
  max_length?: number,
}

export interface RouteParams {
  asn: string,
  comment?: string,
  prefix: string,
  max_length: string,
}

export interface ParentParams {
  name: string,
  response: string,
}

export interface Roa extends Route {
  id?: string,
  comment?: string,
  state: RoaState,
  authorizes?: Array<BgpAnnouncement>,
  disallows?: Array<BgpAnnouncement>,
  disallowed_by?: Array<Roa>,
  allowed_by?: Roa,
}

export interface Aspa {
  id?: string,
  customer: number,
  providers: Array<number>,
}

export interface AspaParams {
  customer: string,
  providers: string,
}

export interface Suggestions {
  not_found?: Array<BgpAnnouncement>,
  invalid_asn?: Array<BgpAnnouncement>,
  invalid_length?: Array<BgpAnnouncement>,
  too_permissive?: Array<RoaChange>,
  disallowing?: Array<BgpAnnouncement>,
  stale?: Array<BgpAnnouncement>,
  redundant?: Array<BgpAnnouncement>,
  as0_redundant?: Array<BgpAnnouncement>,
  prefix_removed?: Array<BgpAnnouncement>,
  keep?: Array<BgpAnnouncement>,
}

export enum SuggestionReason {
  notFound = 'not_found',
  invalidAsn = 'invalid_asn',
  invalidLength = 'invalid_length',
  tooPermissive = 'too_permissive',
  disallowing = 'disallowing',
  stale = 'stale',
  redundant = 'redundant',
  as0Redundant = 'as0_redundant',
  specific = 'specific',
}

export enum CheckBoxState {
  unchecked,
  checked,
  intermediate,
}

export enum SuggestionField {
  action = 'action',
  reason = 'reason',
  asn = 'asn',
  maxLength = 'max_length',
  prefix = 'prefix',
}

export interface Suggestion {
  id?: string,
  comment?: string,
  action: 'add' | 'remove',
  reason: SuggestionReason,
  asn: number,
  max_length: number,
  prefix: string,
}

export interface RoaChange {
  current: Roa,
  new: Array<BgpAnnouncement>
}

export interface FailureStatus {
  Failure: {
    msg: string,
  }
}

export interface LastExchange {
  timestamp: number,
  uri: string,
  result: 'Success' | FailureStatus,
}

export interface ParentData {
  last_exchange: LastExchange,
  last_success: number,
  all_resources: {
    asn: string,
    ipv4: string,
    ipv6: string,
  },
}

export interface Parent extends ParentData {
  name: string,
}

export interface RepoStatus {
  last_exchange: LastExchange,
  last_success: number,
}

export interface Info {
  version: string,
  started: number,
}

export interface UserDetails {
  id: string,
  attributes: {
    role: string, // admin, readwrite or readonly
    inc_cas: string, // comma separated list of CAs
    exc_cas: string, // comma separated list of CAs
  }
}

export interface LoginResponse extends UserDetails {
  token: string,
}

export interface ErrorResponseType {
  status: number,
  msg: string | null,
}

export interface PersistedData {
  ca: null | string,
  locale: Locale,
  userDetails: UserDetails | null,
}

export interface SecurePersistedData {
  token: string | null,
}

export interface Data extends PersistedData, SecurePersistedData {
  notification: Notification | null,
  cas: Array<string> | null,
  translations: Translations | null,
  caDetails: Record<string, CaDetails>,
  roas: Record<string, Array<Roa>>,
  parents: Record<string, Array<Parent>>,
  repoStatus: Record<string, RepoStatus>,
  loginMethod: LoginMethod | null,
}

export interface KrillLogin {
  with_id: boolean,
}

export interface OpenIDConnect {
  redirect_url: string,
}

export type LoginMethod = KrillLogin | OpenIDConnect;

export interface TestBedChildRequest {
  handle: string,
  id_cert: string,
}

export interface TestBedParentResponse {
  id_cert: string,
  parent_handle: string,
  child_handle: string,
  service_uri: string,
}

export interface TestBedPublisherRequest {
  publisher_handle: string,
  id_cert: string,
}

export interface TestBedPubResponse {
  id_cert: string,
  publisher_handle: string,
  service_uri: string,
  repo_info: {
    sia_base: string,
    rrdp_notification_uri: string,
  }
}

export interface RouterState {
  name: string;
  params: Params;
  path: string;
  meta?: StateMeta;
}

export type Locale = 'de' | 'en' | 'es' | 'gr' | 'fr' | 'nl' | 'pt';
