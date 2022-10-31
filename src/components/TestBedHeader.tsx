import React from 'react';
import useTranslations from '../hooks/useTranslations';
import { Link } from 'react-router5';

export default function TestBedHeader() {
  const t = useTranslations();

  return (
    <>
      <div className="space-between border-bottom row">
        <h2>
          {t.testbed.welcome}
        </h2>
      </div>
      <div>
        <h3>{t.testbed.disclaimer.heading}</h3>
        <div dangerouslySetInnerHTML={{__html: t.testbed.disclaimer.body}}></div>
        <h3>{t.testbed.rpconfighelp.heading}</h3>
        <div dangerouslySetInnerHTML={{__html: t.testbed.rpconfighelp.body.replace('{tallink}', '/ta/ta.tal')}}></div>
        <h3>{t.testbed.regunreg.heading}</h3>
        <div dangerouslySetInnerHTML={{__html: t.testbed.regunreg.body}}></div>
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
    </>
  );
}
