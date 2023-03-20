import React from 'react';
import useTranslations from '../hooks/useTranslations';
import Layout from './Layout';

export default function Error() {
  const t = useTranslations();

  return (
    <Layout>
      <h1>{t.common.error}</h1>
      <pre>{window.location.pathname}</pre>
    </Layout>
  );
}
