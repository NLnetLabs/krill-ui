import createRouter, { Router } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import apiMiddleware from './apiMiddleware';
import Store from './store';

const routes = [
  { name: 'home', path: '/' },
  { name: 'cas', path: '/cas/:ca', children: [
    { name: 'add_new', path: '/add' },
    { name: 'add', path: '/add/:id' },
    { name: 'delete', path: '/delete/:id' },
    { name: 'change', path: '/change'},
    { name: 'parents', path: '/parents' },
    { name: 'repository', path: '/repos' },
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
