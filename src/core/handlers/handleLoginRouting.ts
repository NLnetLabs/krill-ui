import { State } from 'router5';
import Store from '../store';

export default async function handleLoginRouting(toState: State, store: Store) {
  if (
    toState.name.startsWith('testbed') &&
    (await store.loadTestBedEnabled())
  ) {
    return Promise.resolve();
  }

  // login form is submitted, username is optional
  if (toState.params.password) {
    await store.tryLogin(toState.params.password, toState.params.username);
    delete toState.params.username;
    delete toState.params.password;
  }

  // logout (set token to null) and redirect to login
  if (toState.name === 'logout') {
    store.setToken(null);
    store.setUserDetails(null);
    store.storePersistedData();
    return Promise.reject({ redirect: { name: 'login' } });
  }

  // no login needed for testbed, if enabled
  if (store.token === null) {
    // redirect after succesfull openidconnect login
    if (toState.params.token) {
      store.tryLogin(toState.params.token);
      return Promise.reject({ redirect: { name: 'home' } });
    }
    // if no token is set, find the login method
    const loginMethod = await store.loadLoginMethod();
    if (loginMethod && 'redirect_url' in loginMethod) {
      // append id and token query params from current location
      window.location.assign(loginMethod.redirect_url);
    }
    // else, redirect to login
    if (toState.name !== 'login') {
      return Promise.reject({ redirect: { name: 'login' } });
    }
  } else {
    if (store.userDetails === null) {
      store.setToken(null);
      return Promise.reject({ redirect: { name: 'login' } });
    }

    // redirect to home when token is set and navigation to login
    if (toState.name === 'login') {
      return Promise.reject({ redirect: { name: 'home' } });
    }
  }

  return Promise.resolve();
}
