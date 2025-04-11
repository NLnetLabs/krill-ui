import {
  CaDetails,
  Info,
  LoginMethod,
  KrillLogin,
  OpenIDConnect,
  Parent,
  ParentData,
  RepoStatus,
  Roa,
  LoginResponse,
  Route,
  Suggestions,
  Suggestion,
  ErrorResponseType,
  Aspa,
} from './types';
import {
  generateId,
  isAbsolute,
  parseLoginUrl,
  transformSuggestions,
} from './utils';

export default class Api {
  /** API base url - by default the domain the frontend is served on */
  baseUrl: string;

  /** github version info URL */
  VERSION_URL = 'https://api.github.com/repos/nlnetlabs/krill/releases/latest';

  /** API bearer token */
  token: string | null;

  constructor() {
    this.baseUrl = window.location.origin;
    this.token = null;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  async get<ResponseType>(
    path: string,
    init?: RequestInit
  ): Promise<ResponseType> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.token}`,
        ...(init?.headers || {}),
      },
    });

    if (response.status === 401 || response.status === 403) {
      this.setToken(null);
    }

    const isJson = response.headers.get('Content-Type') === 'application/json';

    if (!isJson) {
      const text = await response.text();

      if (response.status === 200) {
        return text as ResponseType;
      }

      throw {
        status: response.status,
        msg: text,
      } as ErrorResponseType;
    }

    const json = await response.json();

    if (response.status === 200) {
      return json as ResponseType;
    }

    throw {
      status: response.status,
      msg: json.msg || null,
    } as ErrorResponseType;
  }

  post<ResponseType>(path: string, init?: RequestInit): Promise<ResponseType> {
    return this.get(path, { method: 'POST', ...init });
  }

  postCas(handle: string) {
    return this.post('/api/v1/cas', {
      body: JSON.stringify({ handle }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getCas(): Promise<Array<string>> {
    interface CasResponse {
      cas: Array<{ handle: string }>;
    }

    return this.get<CasResponse>('/api/v1/cas').then(({ cas }) =>
      cas.map(({ handle }) => handle).reverse()
    );
  }

  getCaDetails(ca: string): Promise<CaDetails> {
    return this.get<CaDetails>(`/api/v1/cas/${ca}`);
  }

  getCaRoas(ca: string): Promise<Roa[]> {
    return this.get<Roa[]>(`/api/v1/cas/${ca}/routes/analysis/full`).then(
      (roas: Roa[]) => roas.map((roa) => ({ id: generateId(10), ...roa }))
    );
  }

  getCaAspas(ca: string): Promise<Aspa[]> {
    return this.get<Aspa[]>(`/api/v1/cas/${ca}/aspas`).then(
      (aspas: Aspa[]) => aspas.map((aspa) => ({ id: generateId(10), ...aspa }))
    );
  }

  getCaSuggestions(ca: string): Promise<Array<Suggestion>> {
    return this.get<Suggestions>(`/api/v1/cas/${ca}/routes/analysis/suggest`)
      .then((suggestions) => transformSuggestions(suggestions))
      .then((suggestions) =>
        suggestions.map((suggestion) => ({ id: generateId(10), ...suggestion }))
      );
  }

  refreshCaParents(): Promise<void> {
    return this.post('/api/v1/bulk/cas/sync/parent');
  }

  getCaParents(ca: string): Promise<Parent[]> {
    return this.get<Record<string, ParentData>>(
      `/api/v1/cas/${ca}/parents`
    ).then((data) =>
      Object.entries(data).map(([name, parent]) => ({ name, ...parent }))
    );
  }

  refreshCaRepo(): Promise<void> {
    return this.post('/api/v1/bulk/cas/sync/repo');
  }

  getCaRepoStatus(ca: string): Promise<RepoStatus> {
    return this.get<RepoStatus>(`/api/v1/cas/${ca}/repo/status`);
  }

  getInfo(): Promise<Info> {
    return this.get('/stats/info');
  }

  getVersion() {
    return fetch(this.VERSION_URL).then((response) => response.json());
  }

  getChildRequest(ca: string): Promise<string> {
    return this.get<string>(`/api/v1/cas/${ca}/id/child_request.xml`);
  }

  getPublisherRequest(ca: string): Promise<string> {
    return this.get<string>(`/api/v1/cas/${ca}/id/publisher_request.xml`);
  }

  postParent(ca: string, name: string, text: string) {
    return this.post(`/api/v1/cas/${ca}/parents/${name}`, {
      body: text,
    });
  }

  postRepository(ca: string, name: string, text: string) {
    return this.post(`/api/v1/cas/${ca}/repo`, {
      body: text,
    });
  }

  updateRoutes(ca: string, data: { added: Route[]; removed: Route[] }) {
    return this.get(`/api/v1/cas/${ca}/routes`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  updateAspas(ca: string, data: { add_or_replace: Aspa[]; remove: number[] }) {
    return this.get(`/api/v1/cas/${ca}/aspas`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getLoginMethod(): Promise<LoginMethod> {
    return fetch(`${this.baseUrl}/auth/login`).then((response) => {
      if (response.status === 200) {
        // parse the response, as we don't want to configure frontend routes in the backend
        return response.text().then((url) => {
          if (isAbsolute(url)) {
            return { redirect_url: url } as OpenIDConnect;
          } else {
            return { with_id: parseLoginUrl(url) } as KrillLogin;
          }
        });
      }

      return Promise.reject(response);
    });
  }

  postLogin(tokenOrPassword: string, username?: string): Promise<LoginResponse> {
    const login_url = '/auth/login';

    if (username) {
      this.setToken(null);
      const encoded = btoa(`${username}:${tokenOrPassword}`);
      return this.post(login_url, {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
      });
    }

    this.setToken(tokenOrPassword);
    return this.post(login_url);
  }

  checkToken(token: string): Promise<LoginResponse> {
    this.setToken(token);
    return this.get('/api/v1/authorized');
  }

  getTestBedEnabled(): Promise<boolean> {
    return fetch('/testbed/enabled').then((response) => {
      if (response.status === 200) {
        return true;
      } else if (response.status === 400) {
        return false;
      }

      return Promise.reject(response);
    });
  }
}
