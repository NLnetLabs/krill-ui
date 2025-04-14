import createRouter, { Router } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import apiMiddleware from './apiMiddleware';
import Store from './store';

const prefix = '/ui';

const routes = [
  { name: 'home', path: prefix },
  { name: 'onboarding', path: `${prefix}/onboarding` },
  {
    name: 'cas',
    path: `${prefix}/cas/:ca`,
    children: [
      { name: 'add_new', path: '/add' },
      { name: 'add', path: '/add/:id' },
      { name: 'delete', path: '/delete/:id' },
      { name: 'edit', path: '/edit/:id' },
      { name: 'change', path: '/change' },
      {
        name: 'aspas',
        path: '/aspas',
        children: [
          { name: 'add_new', path: '/add' },
          { name: 'add', path: '/add/:id' },
          { name: 'edit', path: '/edit/:id' },
          { name: 'delete', path: '/delete/:id' },
        ],
      },
      {
        name: 'parents',
        path: '/parents',
        children: [{ name: 'add', path: '/add' }],
      },
      {
        name: 'repository',
        path: '/repos',
        children: [{ name: 'add', path: '/add' }],
      },
      { name: 'analyse', path: '/analyse' },
    ],
  },
  {
    name: 'testbed',
    path: `${prefix}/testbed`,
    children: [
      { name: 'del_ca', path: '/remove' },
      { name: 'add_pub', path: '/register-publisher' },
      { name: 'del_pub', path: '/remove-publisher' },
    ],
  },
  { name: 'login', path: `${prefix}/login` },
  { name: 'logout', path: `${prefix}/logout` },
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
