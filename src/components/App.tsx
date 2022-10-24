import React from 'react';
import { useRoute } from 'react-router5';
import Cas from './Cas';
import CasParents from './CasParents';
import CasRepository from './CasRepository';
import Loader from './Loader';
import Login from './Login';

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

  return null;
}

