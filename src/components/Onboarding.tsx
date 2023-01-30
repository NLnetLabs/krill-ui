import React, { FormEvent, useState } from 'react';
import Layout from './Layout';
import welcome from '../img/welcome.svg?url';
import useTranslations from '../hooks/useTranslations';
import useNavigation from '../hooks/useNavigation';

export default function Onboarding() {
  const navigate = useNavigation();
  const [name, setName] = useState('');
  const t = useTranslations();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ name });
  };

  return (
    <Layout>
      <form method="POST" onSubmit={submit} className="center-form">
        <div>
          <img src={welcome} alt={t.common.copy} />
          <h2>{t.onboarding.welcome}</h2>
          <div dangerouslySetInnerHTML={{ __html: t.onboarding.welcomeHtml }} />
        </div>
        <div>
          <label htmlFor="token required">CA {t.caDetails.handle}</label>
          <input
            name="name"
            type="test"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="button">
            {t.onboarding.addCAForm.confirm}
          </button>
        </div>
      </form>
    </Layout>
  );
}
