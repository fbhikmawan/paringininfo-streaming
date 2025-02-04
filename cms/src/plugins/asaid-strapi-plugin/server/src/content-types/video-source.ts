const schema = {
  kind: 'collectionType',
  collectionName: 'video_sources',
  info: {
    singularName: 'video-source',
    pluralName: 'video-sources',
    displayName: 'Video Source',
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    'content-manager': {
      visible: true,
    },
    'content-type-builder': {
      visible: true,
    },
  },
  attributes: {
    videoLink: {
      type: 'text',
    },
    trailerLink: {
      type: 'text',
    },
  },
};

const videoSource = {
  schema,
};

export default videoSource;