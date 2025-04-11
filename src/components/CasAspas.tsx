import React from 'react';
import useStore from '../hooks/useStore';
import Layout from './Layout';
import CaDetailsTable from './tables/CaDetailsTable';
import AspaModal from './forms/AspaModal';
import CasHeader from './CasHeader';
import Store from '../core/store';
import { useRoute } from 'react-router5';
import { AspaField, Filtering, RoaField, SortOrder } from '../core/types';
import useNavigation from '../hooks/useNavigation';
import useTranslations from '../hooks/useTranslations';
import AspaSearch from './AspaSearch';
import AspaTable from './tables/AspaTable';
import AspaPagination from './tables/AspaPagination';

export default function CasAspas() {
  const t = useTranslations();
  const store = useStore() as Store;
  const { route } = useRoute();
  const navigate = useNavigation();
  const params = route.params;

  const filtering: Filtering<AspaField> = {
    search: params.search || null,
    sort: params.sort || AspaField.customer,
    order: params.order || SortOrder.asc,
    limit: parseInt(params.limit, 10) || 25,
    page: parseInt(params.page, 10) || 1,
  };

  return (
    <Layout>
      <AspaModal />
      <CasHeader />
      <div className="row">
        <div className="flex-1">
          <AspaSearch filtering={filtering} />
          <AspaTable filtering={filtering} />
          <AspaPagination filtering={filtering} />
          <div className="roa-actions">
            <div>
              <button className="button" onClick={() => navigate({}, 'cas.aspas.add_new')}>
                {t.caDetails.addAspa}
              </button>
            </div>
            <div>
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
