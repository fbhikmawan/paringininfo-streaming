import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.db.lifecycles.subscribe({
    // only for the video collection type
    models: ['api::video.video'],
    // after a video post is created
    async afterCreate(event) {
      // create new data
      const newData = {
        video: event.result.documentId,
        videoLink: null,
        trailerLink: null,
      };

      // create new video source
      await strapi.documents('plugin::asaid-strapi-plugin.video-source').create({
        data: newData,
      });
    },
  });
};

export default register;
