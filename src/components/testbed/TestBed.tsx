import React from 'react';
import TestBedAddCaForm from './forms/TestBedAddCaForm';
import { useRoute } from 'react-router5';
import Store from '../../core/store';
import useStore from '../../hooks/useStore';
import TestBedDelPubForm from './forms/TestBedDelPubForm';
import TestBedDelCaForm from './forms/TestBedDelCaForm';
import TestBedAddPubForm from './forms/TestBedAddPubForm';
import TestBedLayout from './TestBedLayout';

export default function TestBed() {
  const { route } = useRoute();
  const store = useStore() as Store;

  if (!store.testBedEnabled) {
    // return <Error />;
  }

  if (route.name == 'testbed.del_ca') {
    return (
      <TestBedLayout>
        <TestBedDelCaForm />
      </TestBedLayout>
    );
  }

  if (route.name == 'testbed.add_pub') {
    return (
      <TestBedLayout>
        <TestBedAddPubForm />
      </TestBedLayout>
    );
  }

  if (route.name == 'testbed.del_pub') {
    return (
      <TestBedLayout>
        <TestBedDelPubForm />
      </TestBedLayout>
    );
  }

  return (
    <TestBedLayout>
      <TestBedAddCaForm />
    </TestBedLayout>
  );
}
