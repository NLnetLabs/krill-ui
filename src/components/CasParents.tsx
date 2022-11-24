import React, { useState } from 'react';
import { useRoute } from 'react-router5';
import Store from '../core/store';
import { NotificationType } from '../core/types';
import useNavigation from '../hooks/useNavigation';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';
import CasHeader from './CasHeader';
import ParentModal from './forms/ParentModal';
import Layout from './Layout';
import NotificationPopup from './NotificationPopup';
import ParentTableRow from './tables/ParentTableRow';

export default function CasParents() {
  const t = useTranslations();
  const { route } = useRoute();
  const store = useStore() as Store;
  const navigate = useNavigation();
  const [loading, setLoading] = useState(false);

  const syncParents = () => {
    setLoading(true);
    store.refreshParents().then(() => {
      setLoading(false);
    });
  };

  return (
    <Layout>
      {route.name === 'cas.parents.add' && (
        <ParentModal />
      )}
      {loading && (
        <NotificationPopup
          notification={{ 
            type: NotificationType.success,
            message: t.caDetails.refresh.replace('{handle}', t.caDetails.parents.toLowerCase())
          }}
          onClose={() => setLoading(false)}
        />
      )}
      <CasHeader />
      {store.parents && store.ca && store.parents[store.ca]?.map((parent) => (
        <ParentTableRow
          key={parent.name}
          parent={parent}
          loading={loading}
        />
      ))}
      <button className="button" onClick={() => navigate({}, 'cas.parents.add')}>
        {t.caDetails.parentsTab.addParent}
      </button>
      <button className="button inverted" onClick={syncParents}>
        {t.caDetails.syncParents}
      </button>
    </Layout>
  );
}
