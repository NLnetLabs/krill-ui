import React from 'react';
import Layout from './Layout';
import TestBedHeader from './TestBedHeader';
import TestBedDelPubForm from './forms/TestBedDelPubForm';

export default function TestBedDelPub() {
  return (
    <Layout>
      <TestBedHeader />
      <div className="row">
        <div className="flex-1">
          <TestBedDelPubForm />
        </div>
      </div>
    </Layout>
  );
}

