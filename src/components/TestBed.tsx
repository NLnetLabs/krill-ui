import React from 'react';
import Layout from './Layout';
import TestBedHeader from './TestBedHeader';
import TestBedAddCaForm from './forms/TestBedAddCaForm';

export default function TestBed() {
  return (
    <Layout>
      <TestBedHeader />
      <div className="row">
        <div className="flex-1">
          <TestBedAddCaForm />
        </div>
      </div>
    </Layout>
  );
}

