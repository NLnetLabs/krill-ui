import React from 'react';
import Layout from './Layout';
import TestBedHeader from './TestBedHeader';
import TestBedAddPubForm from './forms/TestBedAddPubForm';

export default function TestBedAddPub() {
  return (
    <Layout>
      <div className="testbed">
        <TestBedHeader />
        <TestBedAddPubForm />
      </div>
    </Layout>
  );
}
