import React from 'react';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';
import Select from './Select';
import { Link } from 'react-router5';
import useNavigation from '../hooks/useNavigation';

export default function CasHeader() {
  const store = useStore();
  const t = useTranslations();
  const navigate = useNavigation();
  const noParents = !store.ca || store.parents[store.ca].length === 0;

  return (
    <>
      <div className="space-between border-bottom row">
        <h2>
          {t.cas.ca}
          {' '}
          <strong>{store.ca}</strong>
        </h2>
        <div>
          <label htmlFor="ca">{t.caDetails.current}</label>
          <Select
            options={store.cas?.reduce((acc, ca) => ({...acc, [ca]: [ca]}), {}) || {}}
            value={store.ca || ''}
            onChange={(ca) => navigate({ca}, 'cas')}
          />
        </div>
      </div>
      {noParents && (
        <div className="notification error">
          {t.caDetails.onboardingWarning}
        </div>
      )}
      <div>
        <ul className="tabs">
          <li>
            <Link routeName="cas" activeStrict routeParams={{ ca: store.ca }}>
              {t.caDetails.roas}
            </Link>
          </li>
          <li>
            <Link routeName="cas.parents" routeParams={{ ca: store.ca }}>
              {t.caDetails.parents}
            </Link>
          </li>
          <li>
            <Link routeName="cas.repository" routeParams={{ ca: store.ca }}>
              {t.caDetails.repo}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
