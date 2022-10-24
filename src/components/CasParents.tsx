import React from 'react';
import Store from '../core/store';
import useNavigation from '../hooks/useNavigation';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';
import CasHeader from './CasHeader';
import ParentModal from './forms/ParentModal';
import ParentsTable from './tables/ParentsTable';
import Layout from './Layout';

export default function CasParents() {
  const t = useTranslations();
  const store = useStore() as Store;
  const navigate = useNavigation();

  const syncParents = () => {
    store.loadParents(true);
  };

  return (
    <Layout>
      <ParentModal />
      <CasHeader />
      { store.parents && store.ca && store.parents[store.ca]
        && <ParentsTable parents={ store.parents[store.ca] } locale={ store.locale } />
      }
      <button onClick={() => navigate({}, 'cas.parents.add')}>{ t.caDetails.parentsTab.addParent }</button>
      <button onClick={ syncParents }>{ t.caDetails.syncParents }</button>
    </Layout>
  );
}
