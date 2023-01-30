import { State } from 'router5';
import Store from '../store';

export default async function handleLoginRouting(toState: State, store: Store) {
  // login form is submitted, username is optional
  if (toState.params.password) {
    await store.tryLogin(toState.params.password, toState.params.username);
    delete toState.params.username;
    delete toState.params.password;
  }

  // logout (set token to null) and redirect to login
  if (toState.name === 'logout') {
    store.setToken(null);
    store.storePersistedData();
    return Promise.reject({ redirect: { name: 'login' }});
  }

  // no login needed for testbed, if enabled
  if (store.token === null && !(toState.name.startsWith('testbed') && store.loadTestBedEnabled())) {
    // if no token is set, find the login method
    const loginMethod = await store.loadLoginMethod();
    if (loginMethod && 'redirect_url' in loginMethod) {
      // TODO redirect to redirect_url for OpenIDConnect
    }
    // else, redirect to login
    if (toState.name !== 'login') {
      return Promise.reject({ redirect: { name: 'login' }});
    }
  } else {
    if (store.userDetails === null) {
      store.setToken(null);
      return Promise.reject({ redirect: { name: 'login' }});
    }

    // redirect to home when token is set and navigation to login
    if (toState.name === 'login') {
      return Promise.reject({ redirect: { name: 'home' }});
    }
  }

  return Promise.resolve();
}
