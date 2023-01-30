import React from 'react';
import Layout from './Layout';
import TestBedHeader from './TestBedHeader';
import TestBedDelCaForm from './forms/TestBedDelCaForm';

export default function TestBedDelCa() {
  return (
    <Layout>
      <div className="testbed">
        <TestBedHeader />
        <TestBedDelCaForm />
      </div>
    </Layout>
  );
}
