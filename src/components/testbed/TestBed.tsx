import React from 'react';
import { useRoute } from 'react-router5';
import Error from '../Error';
import Store from '../../core/store';
import TestBedAddCaForm from './forms/TestBedAddCaForm';
import TestBedAddPubForm from './forms/TestBedAddPubForm';
import TestBedDelCaForm from './forms/TestBedDelCaForm';
import TestBedDelPubForm from './forms/TestBedDelPubForm';
import TestBedLayout from './TestBedLayout';
import useStore from '../../hooks/useStore';

export default function TestBed() {
  const { route } = useRoute();
  const store = useStore() as Store;

  if (!store.testBedEnabled) {
    return <Error />;
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
