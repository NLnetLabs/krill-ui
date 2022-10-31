import React from 'react';
import Layout from './Layout';
import TestBedHeader from './TestBedHeader';
import TestBedAddPubForm from './forms/TestBedAddPubForm';

export default function TestBedAddPub() {
  return (
    <Layout>
      <TestBedHeader />
      <div className="row">
        <div className="flex-1">
          <TestBedAddPubForm />
        </div>
      </div>
    </Layout>
  );
}

