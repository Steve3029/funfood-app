import {
  DefaultPage,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'home',
      name: 'home',
      component: DefaultPage,
      isIndex: true,
    },
  ],
};
