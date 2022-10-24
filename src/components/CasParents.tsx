import React from 'react';
import Store from '../core/store';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';
import CasHeader from './CasHeader';
import Layout from './Layout';
import ParentTableRow from './tables/ParentTableRow';

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
      {store.parents && store.ca && store.parents[store.ca]?.map((parent) => (
        <ParentTableRow
          key={parent.name}
          parent={parent}
        />
      ))}
      <button className="button" onClick={addParent}>{t.caDetails.parentsTab.addParent}</button>
      <button className="button inverted" onClick={syncParents}>{t.caDetails.syncParents}</button>
    </Layout>
  );
}
