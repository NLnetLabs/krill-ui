import React from 'react';
import Layout from './Layout';
import TestBedHeader from './TestBedHeader';
import TestBedAddCaForm from './forms/TestBedAddCaForm';

export default function TestBed() {
  return (
    <Layout>
      <div className="testbed">
        <TestBedHeader />
        <TestBedAddCaForm />
      </div>
    </Layout>
  );
}
