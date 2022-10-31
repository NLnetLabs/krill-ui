import React from 'react';
import { useRoute } from 'react-router5';
import Cas from './Cas';
import CasParents from './CasParents';
import CasRepository from './CasRepository';
import Loader from './Loader';
import Login from './Login';
import TestBed from './TestBed';
import TestBedDelCa from './TestBedDelCa';
import TestBedAddPub from './TestBedAddPub';
import TestBedDelPub from './TestBedDelPub';

export default function App() {
  const { route } = useRoute();

  if (!route) {
    return <Loader initial={true} />;
  }

  if (route.name === 'login') {
    return <Login />;
  }

  if (route.name.startsWith('cas.parents')) {
    return <CasParents />;
  }

  if (route.name.startsWith('cas.repository')) {
    return <CasRepository />;
  }

  if (route.name.startsWith('cas')) {
    return <Cas />;
  }

  if (route.name == 'testbed.del_ca') {
    return <TestBedDelCa />;
  }

  if (route.name == 'testbed.add_pub') {
    return <TestBedAddPub />;
  }

  if (route.name == 'testbed.del_pub') {
    return <TestBedDelPub />;
  }

  if (route.name.startsWith('testbed')) {
    return <TestBed />;
  }

  return null;
}

