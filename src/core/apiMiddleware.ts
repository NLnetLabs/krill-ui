import {Router, State} from 'router5';
import handleLoginRouting from './handlers/handleLoginRouting';
import handleCaData from './handlers/handleCaData';
import Store from './store';
import handleLocaleSwitch from './handlers/handleLocaleSwitch';

export default function apiMiddleware(router: Router) {
  return async (toState: State) => {
    const store: Store = router.getDependencies().store;

    try {
      // switch locale
      await handleLocaleSwitch(toState, store);

      // initially retrieve translations
      if (store.translations === null) {
        await store.loadTranslations();
      }

      // handle login token and redirect to home or login
      await handleLoginRouting(toState, store);

      // set selected ca and load ca details
      await handleCaData(toState, store);
    } catch (e) {
      return Promise.reject(e);
    }

    store.storePersistedData();

    return toState;
  };
}
