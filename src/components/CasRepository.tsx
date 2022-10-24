import React from 'react';
import Store from '../core/store';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';
import CasHeader from './CasHeader';
import Layout from './Layout';

export default function CasRepository() {
  const t = useTranslations();
  const store = useStore() as Store;

  const formatDate = (seconds: number) =>
    new Date(seconds * 1000).toLocaleString(store.locale,  { dateStyle: 'long', timeStyle: 'medium' });

  const refreshRepo = () => {
    store.loadRepoStatus(true);
  };

  if (!store.ca) {
    return null;
  }

  // TODO add icon
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
              { formatDate(store.repoStatus[store.ca].last_exchange.timestamp) }
              { store.repoStatus[store.ca].last_exchange.result.Failure
                ? ( <span className='failure'>FAILURE ICON{ store.repoStatus[store.ca].last_exchange.result.Failure.msg }</span> )
                : ( <span className='success'>SUCCES ICON</span> )
              }
            </td>
          </tr>
          { store.repoStatus[store.ca].last_exchange.result.Failure
            && <tr>
              <td>{ t.caDetails.lastSuccess }</td>
              <td>{ formatDate(store.repoStatus[store.ca].last_success) }</td>
            </tr>
          }
        </tbody>
      </table>
      <button onClick={refreshRepo}>{ t.caDetails.syncRepo }</button>
    </Layout>
  );
}

