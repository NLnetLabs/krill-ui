import Api from './api';
import { defaultLocale } from './config';
import loadLocale, { Translations } from './translations';
import {
  Aspa,
  AspaField,
  AspaParams,
  CaDetails,
  Data,
  ErrorResponseType,
  Filtering,
  Locale,
  LoginMethod,
  Notification,
  NotificationType,
  Parent,
  ParentParams,
  PersistedData,
  RepoStatus,
  Roa,
  RoaField,
  Route,
  RouteParams,
  Suggestion,
  SuggestionField,
  UserDetails,
} from './types';
import { compareAspa, compareRoa, compareSuggestion } from './utils';

export default class Store implements Data {
  // general purpose notification message
  notification: Notification | null = null;

  // list of certificate authorities
  cas: string[] | null = null;

  // currently selected certificate authority
  ca: string | null = null;

  // currently selected locale
  locale: Locale = defaultLocale;

  // API access token
  token: string | null = null;

  // translation object
  translations: Translations | null = null;

  // details of a certain certificate authority
  caDetails: Record<string, CaDetails> = {};

  // list of ROA's / announcements for a certain certificate authority
  roas: Record<string, Roa[]> = {};

  // list of ASPAs for a certain certificate authority
  aspas: Record<string, Aspa[]> = {};

  // list of suggestions for a certain certificate authority
  suggestions: Record<string, Suggestion[]> = {};

  // repository status for a certain certificate authority
  repoStatus: Record<string, RepoStatus> = {};

  // list of parents for a certain certificate authority
  parents: Record<string, Parent[]> = {};

  // details of logged in user
  userDetails: UserDetails | null = null;

  // which login method to use
  loginMethod: LoginMethod | null = null;

  // is the testbed enabled
  testBedEnabled = false;

  // internal references
  api: Api;

  // load initial store data
  constructor() {
    this.api = new Api();
    this.loadPersistedState();
  }

  getAspas(filtering?: Filtering<AspaField>): Aspa[] {
    let aspas = (this.aspas && this.ca && this.aspas[this.ca]) || [];

    if (filtering) {
      // apply filtering
      if (filtering.search) {
        const parts = filtering.search.toLowerCase().split(/\s/);
        aspas = aspas.filter(
          (a: Aspa) =>
            parts.some((p) => a.customer.toString().includes(p)) ||
            parts.some((p) => a.providers.toString().includes(p))
        );
      }
      // apply sorting
      aspas = aspas
        .slice()
        .sort((a, b) => compareAspa(a, b, filtering.sort, filtering.order));
      // apply pagination
      const offset = (filtering.page - 1) * filtering.limit;
      aspas = aspas.slice(offset, offset + filtering.limit);
    }

    return aspas;
  }

  getRoas(filtering?: Filtering<RoaField>): Roa[] {
    let roas = (this.roas && this.ca && this.roas[this.ca]) || [];
    roas = roas.filter((roa) => !roa.allowed_by);

    if (filtering) {
      // apply filtering
      if (filtering.search) {
        const parts = filtering.search.toLowerCase().split(/\s/);
        roas = roas.filter(
          (r: Roa) =>
            parts.some((p) => r.asn.toString().includes(p)) ||
            parts.some((p) => r.prefix.includes(p)) ||
            parts.some(
              (p) =>
                r.state &&
                (r.state.includes(p) ||
                  this.translations?.announcements.state[r.state]
                    .toLowerCase()
                    .includes(p))
            )
        );
      }
      // apply sorting
      roas = roas
        .slice()
        .sort((a, b) => compareRoa(a, b, filtering.sort, filtering.order));
      // apply pagination
      const offset = (filtering.page - 1) * filtering.limit;
      roas = roas.slice(offset, offset + filtering.limit);
    }

    return roas;
  }

  getSuggestions(filtering?: Filtering<SuggestionField>): Array<Suggestion> {
    let suggestions =
      (this.suggestions && this.ca && this.suggestions[this.ca]) || [];
    if (filtering) {
      suggestions = suggestions
        .slice()
        .sort((a, b) =>
          compareSuggestion(a, b, filtering.sort, filtering.order)
        );
    }
    return suggestions;
  }

  // try load data and
  async handleError<T>(callback: () => Promise<T>) {
    try {
      return await callback();
    } catch (e) {
      const error = e as ErrorResponseType;
      if (error.status === 401 || error.status === 403) {
        this.setToken(null);
      }

      this.setNotification({
        type: NotificationType.error,
        message: error.msg || 'Error',
      });
      return false;
    }
  }

  // load persisted state from localStorage en sessionStorage
  loadPersistedState() {
    const data: string | null = window.localStorage.getItem('krill');
    this.setToken(window.sessionStorage.getItem('krillToken'));

    if (data !== null) {
      try {
        const persistedData: PersistedData = JSON.parse(data);

        this.ca = persistedData.ca;
        this.locale = persistedData.locale;
        this.userDetails = persistedData.userDetails;
      } catch (e) {
        console.error(e);
      }
    }
  }

  // store persisted state in localStorage en sessionStorage
  storePersistedData() {
    if (this.token) {
      window.sessionStorage.setItem('krillToken', this.token);
    } else {
      window.sessionStorage.removeItem('krillToken');
    }

    window.localStorage.setItem(
      'krill',
      JSON.stringify({
        ca: this.ca,
        locale: this.locale,
        userDetails: this.userDetails,
      })
    );
  }

  // update the locale and load translations
  setLocale(locale: Locale) {
    this.locale = locale;
    return this.loadTranslations();
  }

  // load translations given a locale
  async loadTranslations() {
    this.translations = await loadLocale(this.locale);
  }

  async loadLoginMethod() {
    if (!this.loginMethod) {
      await this.handleError(async () => {
        this.loginMethod = await this.api.getLoginMethod();
      });
    }

    return this.loginMethod;
  }

  async loadTestBedEnabled() {
    if (!this.testBedEnabled) {
      await this.handleError(async () => {
        this.testBedEnabled = await this.api.getTestBedEnabled();
      });
    }

    return this.testBedEnabled;
  }

  async tryLogin(password: string, username?: string) {
    try {
      const details = await this.api.postLogin(password, username);
      this.setNotification(null);
      this.setToken(details.token);
      this.setUserDetails({
        id: details.id,
        attributes: details.attributes,
      });
    } catch (e) {
      this.setUserDetails(null);
      this.setNotification({
        type: NotificationType.error,
        message: this.translations?.login.error,
      });
    }
  }

  async checkToken() {
    if (this.token) {
      try {
        this.setNotification(null);
        await this.api.checkToken(this.token);
      } catch (e) {
        this.setToken(null);
        this.setUserDetails(null);
        this.storePersistedData();
        this.setNotification({
          type: NotificationType.error,
          message: this.translations?.login.error,
        });
      }
    }
  }

  // load available certificate authorities and select the first one if none is selected
  async loadCas(force = false) {
    if ((this.cas !== null || !this.token) && !force) {
      return;
    }

    await this.handleError(async () => {
      this.cas = await this.api.getCas();

      if (!this.ca && this.cas.length > 0) {
        this.ca = this.cas[0];
      }
    });
  }

  async addCa(handle: string): Promise<boolean> {
    return await this.handleError(async () => {
      await this.api.postCas(handle);
      await this.loadCas(true);
      await this.loadCa(true);
      return true;
    });
  }

  // load certificate authority details and ROA's
  async loadCa(force?: boolean) {
    if (
      !this.ca ||
      (this.ca &&
        this.caDetails[this.ca] &&
        this.roas[this.ca] &&
        force !== true)
    ) {
      return;
    }

    await this.handleError(async () => {
      if (this.ca !== null) {
        const [caDetails, roas, aspas] = await Promise.all([
          this.api.getCaDetails(this.ca),
          this.api.getCaRoas(this.ca),
          this.api.getCaAspas(this.ca),
        ]);

        this.caDetails[this.ca] = caDetails;
        this.roas[this.ca] = roas;
        this.aspas[this.ca] = aspas;
      }
    });
  }

  async loadSuggestions(force?: boolean) {
    if (!this.ca || (this.ca && this.suggestions[this.ca] && force !== true)) {
      return;
    }

    await this.handleError(async () => {
      if (this.ca !== null) {
        this.suggestions[this.ca] = await this.api.getCaSuggestions(this.ca);
      }
    });
  }

  async refreshParents() {
    if (!this.ca) {
      return;
    }

    const ca: string = this.ca;
    await this.api.refreshCaParents();

    // poll every 5 seconds for an update
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        this.api.getCaParents(ca).then((parents) => {
          if (JSON.stringify(parents) !== JSON.stringify(this.parents[ca])) {
            this.parents[ca] = parents;
            clearInterval(interval);
            resolve(parents);
          }
        });
      }, 5 * 1000);
    });
  }

  async loadParents(force?: boolean) {
    if (!this.ca || (this.ca && this.parents[this.ca] && force !== true)) {
      return;
    }

    await this.handleError(async () => {
      if (this.ca !== null) {
        this.parents[this.ca] = await this.api.getCaParents(this.ca);
      }
    });
  }

  async loadRepoStatus(force?: boolean) {
    if (!this.ca || (this.ca && this.repoStatus[this.ca] && force !== true)) {
      return;
    }

    await this.handleError(async () => {
      if (this.ca !== null) {
        this.repoStatus[this.ca] = await this.api.getCaRepoStatus(this.ca);
      }
    });
  }

  async refreshRepo() {
    if (!this.ca) {
      return;
    }

    const ca: string = this.ca;
    await this.api.refreshCaRepo();

    // poll every 5 seconds for an update
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        this.api.getCaRepoStatus(ca).then((status) => {
          if (JSON.stringify(status) !== JSON.stringify(this.repoStatus[ca])) {
            this.repoStatus[ca] = status;
            clearInterval(interval);
            resolve(status);
          }
        });
      }, 5 * 1000);
    });
  }

  async changeRoutes(
    add: Suggestion[],
    remove: Suggestion[]
  ): Promise<boolean> {
    if (this.ca === null) {
      return false;
    }

    return await this.handleError(async () => {
      await this.api.updateRoutes(this.ca as string, {
        added: add,
        removed: remove,
      });
      await this.loadCa(true);
      await this.loadSuggestions(true);
      this.setNotification({
        type: NotificationType.success,
        message: this.translations?.common.success,
      });
      return true;
    });
  }

  async editRoute(id: string, comment: string): Promise<boolean> {
    if (this.ca === null || !this.roas[this.ca]) {
      return false;
    }

    const route = this.roas[this.ca].find((r) => r.id === id);

    if (!route) {
      return false;
    }

    const updatedRoute: Route = {
      ...route,
      comment,
    };

    return await this.handleError(async () => {
      await this.api.updateRoutes(this.ca as string, {
        added: [updatedRoute],
        removed: [],
      });
      await this.loadCa(true);
      this.setNotification({
        type: NotificationType.success,
        message:
          this.translations?.caDetails.confirmation.commentUpdatedSuccess,
      });
      return true;
    });
  }

  async addRoute(params: RouteParams): Promise<boolean> {
    if (this.ca === null) {
      return false;
    }

    const route: Route = {
      asn: parseInt(params.asn, 10),
      prefix: params.prefix,
      comment: params.comment,
      max_length: parseInt(params.max_length, 10),
    };

    return await this.handleError(async () => {
      await this.api.updateRoutes(this.ca as string, {
        added: [route],
        removed: [],
      });
      await this.loadCa(true);
      this.setNotification({
        type: NotificationType.success,
        message: this.translations?.caDetails.confirmation.addedSuccess,
      });
      return true;
    });
  }

  async deleteRoute(params: RouteParams): Promise<boolean> {
    if (this.ca === null) {
      return false;
    }

    const route: Route = {
      asn: parseInt(params.asn, 10),
      prefix: params.prefix,
      max_length: parseInt(params.max_length, 10),
    };

    return await this.handleError(async () => {
      await this.api.updateRoutes(this.ca as string, {
        added: [],
        removed: [route],
      });
      await this.loadCa(true);
      this.setNotification({
        type: NotificationType.success,
        message: this.translations?.caDetails.confirmation.retiredSuccess,
      });
      return true;
    });
  }

  async addAspa(params: AspaParams): Promise<boolean> {
    if (this.ca === null) {
      return false;
    }

    const aspa: Aspa = {
      customer: Number(params.customer),
      providers: params.providers.split(",").map(x => Number(x)),
    };

    return await this.handleError(async () => {
      await this.api.updateAspas(this.ca as string, {
        add_or_replace: [aspa],
        remove: [],
      });
      await this.loadCa(true);
      this.setNotification({
        type: NotificationType.success,
        message: this.translations?.aspas.confirmation.addedSuccess,
      });
      return true;
    });
  }

  async deleteAspa(aspa: Aspa): Promise<boolean> {
    if (this.ca === null) {
      return false;
    }

    return await this.handleError(async () => {
      await this.api.updateAspas(this.ca as string, {
        add_or_replace: [],
        remove: [Number(aspa.customer)],
      });
      await this.loadCa(true);
      this.setNotification({
        type: NotificationType.success,
        message: this.translations?.aspas.confirmation.retiredSuccess,
      });
      return true;
    });
  }

  async addParent(params: ParentParams) {
    if (this.ca === null) {
      return;
    }

    return await this.handleError(async () => {
      await this.api.postParent(
        this.ca as string,
        params.name,
        params.response || ''
      );
      await this.loadParents(true);
      return true;
    });
  }

  async addRepository(params: ParentParams) {
    if (this.ca === null) {
      return;
    }

    return await this.handleError(async () => {
      await this.api.postRepository(
        this.ca as string,
        params.name,
        params.response || ''
      );
      await this.loadRepoStatus(true);
      return true;
    });
  }

  // update notification
  setNotification(notification: Notification | null) {
    this.notification = notification;
  }

  // update the user details
  setUserDetails(userDetails: UserDetails | null) {
    this.userDetails = userDetails;
  }

  // update to CA
  setCa(ca: string) {
    this.ca = ca;
  }

  // update API access token
  setToken(token: string | null) {
    this.token = token;
    this.api.setToken(token);
  }
}
