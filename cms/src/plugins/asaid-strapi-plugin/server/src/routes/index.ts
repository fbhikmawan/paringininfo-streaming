import admin from './admin';
// import contentApi from './contentApi';

const routes = {
  // 'content-api': {
  //   type: 'content-api',
  //   routes: [...contentApi],
  // },
  'pass-data': {
    type: 'admin',
    routes: [...admin],
  },
};

export default routes;
