import createRouter, { Router } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import apiMiddleware from './apiMiddleware';
import Store from './store';

const routes = [
  { name: 'home', path: '/' },
  { name: 'cas', path: '/cas/:ca', children: [
    { name: 'add', path: '/add/:id' },
    { name: 'delete', path: '/delete/:id' },
    { name: 'change', path: '/change'},
    { name: 'parents', path: '/parents', children: [
      { name: 'add', path: '/add' }
    ] },
    { name: 'repository', path: '/repos', children: [
      { name: 'add', path: '/add' }
    ] },
    { name: 'analyse', path: '/analyse' },
  ]},
  { name: 'login', path: '/login' },
  { name: 'logout', path: '/logout' },
];

export default function newRouter(store: Store): Router {
  const router = createRouter(routes, {
    allowNotFound: true,
    queryParamsMode: 'loose',
  });
  router.setDependencies({ store });
  router.usePlugin(browserPlugin());
  router.useMiddleware(apiMiddleware);

  return router;
}
