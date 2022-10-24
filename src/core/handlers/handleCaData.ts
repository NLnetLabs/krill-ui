import { State } from 'router5';
import Store from '../store';
import { RouteParams } from '../types';

export default async function handleCaData(toState: State, store: Store) {
  // store ca from route to state
  if (toState.params.ca) {
    store.setCa(toState.params.ca);
  }

  // delete routes
  if (toState.name === 'cas.delete' && toState.params.asn) {
    await store.deleteRoute(toState.params as RouteParams);
    return Promise.reject({ redirect: {name: 'cas', params: { ca: store.ca }} });
  }

  // add routes
  if (toState.name === 'cas.add' && toState.params.asn) {
    await store.addRoute(toState.params as RouteParams);
    return Promise.reject({ redirect: {name: 'cas', params: { ca: store.ca }} });
  }

  // load a list of available ca's
  await store.loadCas();

  // navigate to specific ca page
  if (toState.name === 'home' && store.ca) {
    return Promise.reject({ redirect: {name: 'cas', params: { ca: store.ca }} });
  }

  // only fetch details on cas route
  if (toState.name.startsWith('cas')) {
    // load ca details and roa's
    await store.loadCa();
    await store.loadRepoStatus();
    await store.loadParents();
  }
}
