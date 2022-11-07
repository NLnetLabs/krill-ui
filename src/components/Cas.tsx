import React from 'react';
import useStore from '../hooks/useStore';
import Layout from './Layout';
import RoaTable from './tables/RoaTable';
import CaDetailsTable from './tables/CaDetailsTable';
import CaModal from './forms/CaModal';
import CasHeader from './CasHeader';
import Store from '../core/store';
import { useRoute } from 'react-router5';
import { Filtering, RoaField, SortOrder } from '../core/types';
import Pagination from './tables/Pagination';
import useNavigation from '../hooks/useNavigation';
import useTranslations from '../hooks/useTranslations';
import AnalyseModal from './forms/AnalyseModal';
import RoaSearch from './RoaSearch';

export default function Cas() {
  const t = useTranslations();
  const store = useStore() as Store;
  const { route } = useRoute();
  const navigate = useNavigation();
  const params = route.params;

  const filtering: Filtering<RoaField> = {
    search: params.search || null,
    sort: params.sort || RoaField.asn,
    order: params.order || SortOrder.asc,
    limit: parseInt(params.limit, 10) || 25,
    page: parseInt(params.page, 10) || 1,
  };

  return (
    <Layout>
      <CaModal />
      {route.name === 'cas.analyse' && (
        <AnalyseModal/>
      )}
      <CasHeader />
      <div className="row">
        <div className="flex-1">
          <RoaSearch filtering={filtering} />
          <RoaTable filtering={filtering} />
          <Pagination filtering={filtering} />
          <div className="roa-actions">
            <div>
              <button className="button" onClick={() => navigate({}, 'cas.add_new')}>
                {t.caDetails.addRoa}
              </button>
            </div>
            <div>
              <button className="button inverted" onClick={() => navigate({}, 'cas.analyse')}>
                {t.caDetails.analyseThis}
              </button>
            </div>
          </div>
        </div>
        {store.ca && (
          <CaDetailsTable
            details={store.caDetails[store.ca]}
          />
        )}
      </div>
    </Layout>
  );
}
