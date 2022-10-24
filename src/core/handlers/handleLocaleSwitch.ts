import { State } from 'router5';
import Store from '../store';

export default async function handleLocaleSwitch(toState: State, store: Store) {
  // load new locale when locale selct box is changed
  if (toState.params.locale) {
    await store.setLocale(toState.params.locale);
    delete toState.params.locale;
  }
}
