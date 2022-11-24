import React, { useState } from 'react';
import Store from '../core/store';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';
import CasHeader from './CasHeader';
import RepoTable from './tables/RepoTable';
import Layout from './Layout';
import useNavigation from '../hooks/useNavigation';
import RepoModal from './forms/RepoModal';
import { useRoute } from 'react-router5';
import NotificationPopup from './NotificationPopup';
import { NotificationType } from '../core/types';

export default function CasRepository() {
  const t = useTranslations();
  const store = useStore() as Store;
  const navigate = useNavigation();
  const { route } = useRoute();
  const [loading, setLoading] = useState(false);

  const syncRepo = () => {
    setLoading(true);
    store.refreshRepo().then(() => {
      setLoading(false);
    });
  };

  if (!store.ca) {
    return null;
  }

  const isset = store.repoStatus && store.ca && store.repoStatus[store.ca]?.last_exchange;

  return (
    <Layout>
      {route.name === 'cas.repository.add' && (
        <RepoModal />
      )}
      {loading && (
        <NotificationPopup
          notification={{ 
            type: NotificationType.success,
            message: t.caDetails.refresh.replace('{handle}', t.caDetails.repo.toLowerCase())
          }}
          onClose={() => setLoading(false)}
        />
      )}
      <CasHeader />
      {isset ? (
        <RepoTable
          repo={store.repoStatus[store.ca]}
          locale={store.locale}
          loading={loading}
        />
      ) : (
        <button className="button" onClick={() => navigate({}, 'cas.repository.add')}>
          {t.caDetails.repoTab.addRepo}
        </button>
      )}
      <button className="button inverted" onClick={syncRepo}>
        {t.caDetails.syncRepo}
      </button>
    </Layout>
  );
}
