import { State } from 'router5';
import Store from '../store';
import { Aspa, AspaParams, ParentParams, RouteParams, Suggestion } from '../types';

export default async function handleCaData(toState: State, store: Store) {
  if (toState.name.startsWith('testbed')) {
    return;
  }

  // store ca from route to state
  if (toState.params.ca) {
    store.setCa(toState.params.ca);
  }

  // delete routes
  if (toState.name === 'cas.delete' && toState.params.asn) {
    if (await store.deleteRoute(toState.params as RouteParams)) {
      return Promise.reject({
        redirect: { name: 'cas', params: { ca: store.ca } },
      });
    }
  }

  // add routes
  if (toState.name === 'cas.add' && toState.params.asn) {
    if (await store.addRoute(toState.params as RouteParams)) {
      return Promise.reject({
        redirect: { name: 'cas', params: { ca: store.ca } },
      });
    }
  }

  // edit routes
  if (
    toState.name === 'cas.edit' &&
    toState.params.id &&
    toState.params.comment !== undefined
  ) {
    if (await store.editRoute(toState.params.id, toState.params.comment)) {
      return Promise.reject({
        redirect: { name: 'cas', params: { ca: store.ca } },
      });
    } else {
      return Promise.reject({
        redirect: {
          name: toState.name,
          params: {
            ca: store.ca,
            id: toState.params.id,
          },
        },
      });
    }
  }

  // add routes
  if (
    (toState.name === 'cas.add' || toState.name === 'cas.add_new') &&
    toState.params.asn
  ) {
    if (await store.addRoute(toState.params as RouteParams)) {
      return Promise.reject({
        redirect: { name: 'cas', params: { ca: store.ca } },
      });
    } else {
      return Promise.reject({
        redirect: {
          name: toState.name,
          params: {
            ca: store.ca,
            id: toState.params.id,
          },
        },
      });
    }
  }

  if (toState.name === 'cas.analyse') {
    await store.loadSuggestions(true);
  }

  if (toState.name === 'cas.change' && toState.params.ids) {
    const ids: string[] = JSON.parse(toState.params.ids);
    const suggestions = store
      .getSuggestions()
      .filter((suggestion) => ids.includes(suggestion.id || ''));
    const add: Suggestion[] = suggestions.filter((s) => s.action === 'add');
    const remove: Suggestion[] = suggestions.filter(
      (s) => s.action === 'remove'
    );
    await store.changeRoutes(add, remove);

    return Promise.reject({
      redirect: { name: 'cas', params: { ca: store.ca } },
    });
  }

  if (
    (
      toState.name === 'cas.aspas.add' || 
      toState.name === 'cas.aspas.add_new' ||
      toState.name === 'cas.aspas.edit'
    ) &&
    toState.params.customer
  ) {
    if (await store.addAspa(toState.params as AspaParams)) {
      return Promise.reject({
        redirect: { name: 'cas.aspas', params: { ca: store.ca } },
      });
    } else {
      return Promise.reject({
        redirect: {
          name: toState.name,
          params: {
            ca: store.ca,
            id: toState.params.id,
          },
        },
      });
    }
  }

  if (toState.name === 'cas.aspas.delete' && toState.params.customer) {
    if (await store.deleteAspa(toState.params as Aspa)) {
      return Promise.reject({
        redirect: { name: 'cas.aspas', params: { ca: store.ca } },
      });
    }
  }

  // add parent
  if (toState.name === 'cas.parents.add' && toState.params.name) {
    if (await store.addParent(toState.params as ParentParams)) {
      return Promise.reject({
        redirect: { name: 'cas.parents', params: { ca: store.ca } },
      });
    }
  }

  // add repo
  if (toState.name === 'cas.repository.add' && toState.params.response) {
    if (await store.addRepository(toState.params as ParentParams)) {
      return Promise.reject({
        redirect: { name: 'cas.repository', params: { ca: store.ca } },
      });
    }
  }

  // load a list of available ca's
  await store.loadCas();

  // show onboarding screen
  if (store.cas?.length === 0 && toState.name !== 'onboarding') {
    return Promise.reject({
      redirect: { name: 'onboarding' },
    });
  }

  /// create an initial ca
  if (toState.name === 'onboarding' && toState.params.name) {
    if (await store.addCa(toState.params.name)) {
      return Promise.reject({
        redirect: { name: 'cas.repository', params: { ca: store.ca } },
      });
    }
  }

  // redirect if current ca is not in cas
  if (store.ca && store.cas?.length && !store.cas?.includes(store.ca)) {
    return Promise.reject({
      redirect: { name: 'cas', params: { ca: store.cas[0] } },
    });
  }

  if (toState.name === 'home' && store.ca) {
    // navigate to specific ca page
    return Promise.reject({
      redirect: { name: 'cas', params: { ca: store.ca } },
    });
  }

  // only fetch details on cas route
  if (toState.name.startsWith('cas')) {
    // load ca details and roa's
    await Promise.all([
      store.loadCa(),
      store.loadParents(),
      store.loadRepoStatus(),
    ]);
  }
}
