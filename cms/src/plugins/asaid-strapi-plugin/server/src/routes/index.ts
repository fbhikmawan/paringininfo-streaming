import admin from './admin';

const routes = {
  'pass-data': {
    type: 'admin',
    routes: [...admin],
  },
};

export default routes;
