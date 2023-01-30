import React from 'react';
import Layout from './Layout';
import TestBedHeader from './TestBedHeader';
import TestBedDelPubForm from './forms/TestBedDelPubForm';

export default function TestBedDelPub() {
  return (
    <Layout>
      <div className="testbed">
        <TestBedHeader />
        <TestBedDelPubForm />
      </div>
    </Layout>
  );
}
