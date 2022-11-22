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

  async get<ResponseType>(path: string, init?: RequestInit): Promise<ResponseType> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        ...(init?.headers || {}),
      },
    });

    if (response.headers.get('Content-Type') !== 'application/json'){
      return await response.text() as ResponseType;
    }

    const json = await response.json();

    if (response.status === 200) {
      return json as ResponseType;
    }

    if (response.status === 401 || response.status === 403) {
      this.setToken(null);
    }

    throw {
      status: response.status,
      msg: json.msg || null,
    } as ErrorResponseType;
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
    return this.get<Record<string, ParentData>>(`/api/v1/cas/${ca}/parents`)
      .then((data) => Object.entries(data).map(([name, parent]) => ({ name, ...parent })));
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

  getChildRequest(ca: string): Promise<string> {
    return this.get<string>(`/api/v1/cas/${ca}/id/child_request.xml`);
  }

  getPublisherRequest(ca: string): Promise<string> {
    return this.get<string>(`/api/v1/cas/${ca}/id/publisher_request.xml`);
  }

  postParent(ca: string, name: string, text: string) {
    return this.post(`/api/v1/cas/${ca}/parents/${name}`, {
      body: text
    });
  }

  postRepository(ca: string, name: string, text: string) {
    return this.post(`/api/v1/cas/${ca}/repo`, {
      body: text
    });
  }

  updateRoutes(ca: string, data: { added: Route[], removed: Route[] }) {
    return this.get(`/api/v1/cas/${ca}/routes`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
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
