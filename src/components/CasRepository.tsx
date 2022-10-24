import React from 'react';
import Store from '../core/store';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';
import CasHeader from './CasHeader';
import RepoTable from './tables/RepoTable';
import Layout from './Layout';

export default function CasRepository() {
  const t = useTranslations();
  const store = useStore() as Store;

  const syncRepo = () => {
    store.loadRepoStatus(true);
  };

  if (!store.ca) {
    return null;
  }

  // TODO add icon
  return (
    <Layout>
      <CasHeader />
      { store.repoStatus && store.ca && store.repoStatus[store.ca]
        && <RepoTable repo={ store.repoStatus[store.ca] } locale={ store.locale } />
      }
      <button onClick={ syncRepo }>{ t.caDetails.syncRepo }</button>
    </Layout>
  );
}

