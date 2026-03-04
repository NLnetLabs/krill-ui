import React from 'react';
import useStore from '../hooks/useStore';
import Layout from './Layout';
import CaDetailsTable from './tables/CaDetailsTable';
import AspaModal from './forms/AspaModal';
import CasHeader from './CasHeader';
import Store from '../core/store';
import { useRoute, useRouter } from 'react-router5';
import { AspaField, Filtering, RoaField, SortOrder } from '../core/types';
import useNavigation from '../hooks/useNavigation';
import useTranslations from '../hooks/useTranslations';
import AspaAdd from './forms/AspaAdd';
import { parseAsns } from '../core/utils';

export default function CasAspas() {
  const t = useTranslations();
  const router = useRouter();
  const store = useStore() as Store;
  const { route } = useRoute();
  const navigate = useNavigation();
  const params = route.params;

  const aspas = store.getAspas();

  const asns = store.ca && parseAsns(store.caDetails[store.ca].resources.asn);

  const onClose = () => {
    router.navigate('cas.aspas', { ca: params.ca });
  };

  return (
    <Layout>
      <AspaModal />
      <CasHeader />
      <div className="row">
        <div className="aspa-list">
            {asns && asns.map((asn) => {
              const aspa = aspas.find((x) => "AS" + x.customer === asn);

              return (
                  <AspaAdd
                    key={asn}
                    onClose={onClose}
                    asn={asn}
                    aspas={aspas}
                    aspa={aspa}
                    edit={Boolean(aspa)}
                  />
              );
            })}
            {(!asns || asns.length == 0) && (
              <div className='aspa-card card aspa-new'>
                <div className='aspa-form'>
                  <em>{t.aspas.no_aspas}</em>
                </div>
              </div>
            )}
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
