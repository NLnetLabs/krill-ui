import React from 'react';
import Store from '../core/store';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';
import CasHeader from './CasHeader';
import Layout from './Layout';

export default function CasParents() {
  const t = useTranslations();
  const store = useStore() as Store;

  const refreshParents = () => {
    store.loadParents(true);
  };

  return (
    <Layout>
      <CasHeader />
      <button onClick={refreshParents}>{ t.caDetails.syncParents }</button>
    </Layout>
  );
}

