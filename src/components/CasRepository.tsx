import React from 'react';
import Store from '../core/store';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';
import CasHeader from './CasHeader';
import Layout from './Layout';

export default function CasRepository() {
  const t = useTranslations();
  const store = useStore() as Store;

  const refreshRepo = () => {
    store.loadRepoStatus(true);
  };

  if (!store.ca) {
    return null;
  }

  // TODO format time, build icon and parse result to display correct icon
  return (
    <Layout>
      <CasHeader />
      <table className="parents-table">
        <tbody>
          <tr>
            <td>{ t.caDetails.parents }</td>
            <td>{ store.repoStatus[store.ca].last_exchange.uri }</td>
          </tr>
          <tr>
            <td>{ t.caDetails.lastExchange }</td>
            <td>
              { store.repoStatus[store.ca].last_exchange.timestamp }
              <span>ICON HERE</span>
              { JSON.stringify(store.repoStatus[store.ca].last_exchange.result) }
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={refreshRepo}>{ t.caDetails.syncRepo }</button>
    </Layout>
  );
}

