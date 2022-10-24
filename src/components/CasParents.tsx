import React from 'react';
import Store from '../core/store';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';
import CasHeader from './CasHeader';
import ParentsTable from './tables/ParentsTable';
import Layout from './Layout';

export default function CasParents() {
  const t = useTranslations();
  const store = useStore() as Store;

  const syncParents = () => {
    store.loadParents(true);
  };

  const addParent = () => {
    // TODO open modal
  };

  return (
    <Layout>
      <CasHeader />
      { store.parents && store.ca && store.parents[store.ca]
        && <ParentsTable parents={ store.parents[store.ca] } locale={ store.locale } />
      }
      <button onClick={ addParent }>{ t.caDetails.parentsTab.addParent }</button>
      <button onClick={ syncParents }>{ t.caDetails.syncParents }</button>
    </Layout>
  );
}
