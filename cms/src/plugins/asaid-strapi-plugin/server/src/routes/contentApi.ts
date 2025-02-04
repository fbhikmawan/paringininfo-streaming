const routes = [
  {
    method: 'GET',
    path: '/videos',
    // name of the controller file & the method.
    handler: 'controller.getVideos',
    config: {
      policies: [],
    },
  },
];

export default routes;
