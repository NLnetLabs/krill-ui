import React, { ReactNode } from 'react';
import { useRoute } from 'react-router5';
import { locales } from '../core/config';
import useNavigation from '../hooks/useNavigation';
import useStore from '../hooks/useStore';
import useTranslations from '../hooks/useTranslations';
import useVersion from '../hooks/useVersion';
import logout from '../img/logout.svg?url';
import user from '../img/user.svg?url';
import Loader from './Loader';
import Select from './Select';

interface LayoutProps {
  children: ReactNode,
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigation();
  const { route } = useRoute();
  const info = useVersion();
  const store = useStore();
  const year = new Date().getFullYear();
  const t = useTranslations();

  return (
    <>
      <Loader initial={false} />
      <header>
        <h1 onClick={() => navigate({}, 'cas')}>
          <span>Krill</span>
        </h1>
        <menu>
          <Select
            options={locales}
            value={store.locale}
            onChange={(locale) => navigate({ locale })}
          />
          {store.userDetails && (
            <>
              <button
                className="pop"
              >
                <img src={user} />
                <div>
                  <h5>{t.common.userInfo.title}</h5>
                  <table>
                    <tbody>
                      <tr>
                        <th>{t.common.userInfo.user}:</th>
                        <td>{store.userDetails.id}</td>
                      </tr>
                      {Object.entries(store.userDetails.attributes).map(([key, value]) =>
                        <tr key={key}>
                          <th className='user-attribute'>{key}:</th>
                          <td>{value}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </button>
              <button
                onClick={() => navigate({}, 'logout')}
              >
                <img src={logout} />
              </button>
            </>
          )}
        </menu>
      </header>
      <div className={`content route-${route.name}`}>
        {children}
      </div>
      <footer>
        <span>
          &copy; {year} Stichting NLnet Labs
          {' - '}
          Krill { info?.version}
        </span>
        <span>
          <a href="https://nlnetlabs.nl/services/contracts/" target="_blank" rel="noreferrer">{t.common.supportcontracts}</a>
          {' - '}
          <a href="https://krill.docs.nlnetlabs.nl/" target="_blank" rel="noreferrer">{t.common.readthedocs}</a>
          {' - '}
          <a href="https://github.com/NLnetLabs/krill/issues/new" target="_blank" rel="noreferrer">{t.common.report}</a>
        </span>
      </footer>
    </>
  );
}
