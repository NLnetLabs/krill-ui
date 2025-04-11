import React from 'react';
import { useRoute } from 'react-router5';
import Cas from './Cas';
import CasAspas from './CasAspas';
import CasParents from './CasParents';
import CasRepository from './CasRepository';
import Loader from './Loader';
import Error from './Error';
import Login from './Login';
import TestBed from './testbed/TestBed';
import Onboarding from './Onboarding';

export default function App() {
  const { route } = useRoute();

  if (!route || route.name === 'loading') {
    return <Loader initial={true} />;
  }

  if (route.name === 'login') {
    return <Login />;
  }

  if (route.name === 'onboarding') {
    return <Onboarding />;
  }

  if (route.name.startsWith('cas.parents')) {
    return <CasParents />;
  }

  if (route.name.startsWith('cas.repository')) {
    return <CasRepository />;
  }

  if (route.name.startsWith('cas.aspas')) {
    return <CasAspas />;
  }

  if (route.name.startsWith('cas')) {
    return <Cas />;
  }

  if (route.name.startsWith('testbed')) {
    return <TestBed />;
  }

  return <Error />;
}
