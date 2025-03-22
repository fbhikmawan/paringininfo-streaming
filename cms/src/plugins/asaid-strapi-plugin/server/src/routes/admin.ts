const routes = [
  {
    method: 'GET',
    path: '/',
    handler: 'controller.index',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/upload',
    handler: 'controller.uploadMedia',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/process-media',
    handler: 'controller.processMedia',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/video-sources',
    handler: 'controller.getVideoSources',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/single-video-source',
    handler: 'controller.getSingleVideoSource',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/search-video-source',
    handler: 'controller.getSearchQueryVideoSource',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/delete-video-source',
    handler: 'controller.deleteVideoSource',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/bucket-storage-info',
    handler: 'controller.getBucketStorageInfo',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/update-video-object',
    handler: 'controller.updateVideoObject',
    config: {
      policies: [],
      auth: false,
    },
  },
];

export default routes;
