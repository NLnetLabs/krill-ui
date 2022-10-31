import React from 'react';
import Layout from './Layout';
import TestBedHeader from './TestBedHeader';
import TestBedDelCaForm from './forms/TestBedDelCaForm';

export default function TestBedDelCa() {
  return (
    <Layout>
      <TestBedHeader />
      <div className="row">
        <div className="flex-1">
          <TestBedDelCaForm />
        </div>
      </div>
    </Layout>
  );
}

