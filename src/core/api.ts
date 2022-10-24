import {
  CaDetails,
  Info,
  LoginMethod,
  KrillLogin,
  OpenIDConnect,
  Parent,
  RepoStatus,
  Roa,
  LoginResponse,
  Route,
  Suggestions, Suggestion
} from './types';
import {generateId, isAbsolute, parseLoginUrl, transformSuggestions} from './utils';

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

  get<ResponseType>(path: string, init?: RequestInit): Promise<ResponseType> {
    return fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        ...(init?.headers || {}),
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json() as ResponseType;
      }

      if (response.status === 401) {
        this.setToken(null);
      }

      return Promise.reject(response);
    });
  }

  post<ResponseType>(path: string, init?: RequestInit): Promise<ResponseType> {
    return this.get(path, {method: 'POST', ...init});
  }

  getCas(): Promise<Array<string>> {
    interface CasResponse {
      cas: Array<{ handle: string }>,
    }

    return this.get<CasResponse>('/api/v1/cas')
      .then(({cas}) => cas.map(({handle}) => handle).reverse());
  }

  getCaDetails(ca: string): Promise<CaDetails> {
    return this.get<CaDetails>(`/api/v1/cas/${ca}`);
  }

  getCaRoas(ca: string): Promise<Roa[]> {
    return this.get<Roa[]>(`/api/v1/cas/${ca}/routes/analysis/full`)
      .then((roas: Roa[]) => roas.map((roa) => ({id: generateId(10), ...roa})));
  }

  getCaSuggestions(ca: string): Promise<Array<Suggestion>> {
    return this.get<Suggestions>(`/api/v1/cas/${ca}/routes/analysis/suggest`)
      .then((suggestions) => transformSuggestions(suggestions))
      .then((suggestions) => suggestions.map((suggestion) => ({id: generateId(10), ...suggestion})));
  }

  getCaParents(ca: string): Promise<Parent[]> {
    return this.get(`/api/v1/cas/${ca}/parents`);
  }

  getCaRepoStatus(ca: string): Promise<RepoStatus> {
    return this.get<RepoStatus>(`/api/v1/cas/${ca}/repo/status`);
  }


  getInfo(): Promise<Info> {
    return this.get('/stats/info');
  }

  getVersion() {
    return fetch(this.VERSION_URL)
      .then((response) => response.json());
  }


  updateRoutes(ca: string, data: { added: Route[], removed: Route[] }) {
    return fetch(`/api/v1/cas/${ca}/routes`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      if (response.status === 401) {
        this.setToken(null);
      }

      return response.status === 200;
    });
  }

  getLoginMethod(): Promise<LoginMethod> {
    return fetch(`${this.baseUrl}/auth/login`).then((response) => {
      if (response.status === 200) {
        // parse the response, as we don't want to configure frontend routes in the backend
        return response.text().then(url => {
          if (isAbsolute(url)) {
            return {redirect_url: url} as OpenIDConnect;
          } else {
            return {with_id: parseLoginUrl(url)} as KrillLogin;
          }
        });
      }

      return Promise.reject(response);
    });
  }

  postLogin(token: string, username?: string): Promise<LoginResponse> {
    let login_url = '/auth/login';

    if (username) {
      login_url += '?' + new URLSearchParams({'id': username});
    }

    this.setToken(token);

    return this.post(login_url);
  }
}
