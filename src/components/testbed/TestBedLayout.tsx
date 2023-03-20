import React, { ReactNode } from 'react';
import welcome from '../../img/welcome.svg?url';
import useTranslations from '../../hooks/useTranslations';
import { Link } from 'react-router5';
import Layout from '../Layout';

interface LayoutProps {
  children: ReactNode;
}

export default function TestBedLayout({ children }: LayoutProps) {
  const t = useTranslations();

  return (
    <Layout>
      <div className="testbed">
        <div>
          <img src={welcome} className="hero" alt={t.common.copy} />
          <h2>{t.testbed.welcome}</h2>
        </div>
        <div>
          <h3>{t.testbed.disclaimer.heading}</h3>
          <p
            dangerouslySetInnerHTML={{ __html: t.testbed.disclaimer.body }}
          ></p>
          <h3>{t.testbed.rpconfighelp.heading}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: t.testbed.rpconfighelp.body.replace(
                '{tallink}',
                '/ta/ta.tal'
              ),
            }}
          ></p>
          <h3>{t.testbed.regunreg.heading}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.testbed.regunreg.body }}></p>
        </div>
        <div>
          <ul className="tabs">
            <li>
              <Link routeName="testbed" activeStrict>
                {t.testbed.addChild.heading}
              </Link>
            </li>
            <li>
              <Link routeName="testbed.del_ca">
                {t.testbed.removeChild.heading}
              </Link>
            </li>
            <li>
              <Link routeName="testbed.add_pub">
                {t.testbed.addPublisher.heading}
              </Link>
            </li>
            <li>
              <Link routeName="testbed.del_pub">
                {t.testbed.removePublisher.heading}
              </Link>
            </li>
          </ul>
        </div>
        {children}
      </div>
    </Layout>
  );
}
