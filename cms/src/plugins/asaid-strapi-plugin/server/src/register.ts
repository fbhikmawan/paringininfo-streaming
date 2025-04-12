import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase for video collection type
  strapi.db.lifecycles.subscribe({
    models: ['api::video.video'],
    // after a video post is created
    async afterCreate(event) {
      const videoData = await strapi.documents('api::video.video').findOne({
        documentId: event.result.documentId,
        populate: ['video_type','video_source'],
      });

      // create new data
      if (videoData.video_type?.nameSlug !== 'series') {
        if (!videoData.video_source) {
          const newData = {
            name: event.result.name,
            video: event.result.documentId,
            videoLink: null,
            videoObject: null,
            trailerLink: null,
            trailerObject: null,
          };

          // create new video source
          await strapi.documents('api::video-source.video-source').create({
            data: newData,
          });
        }
      }
    },
  });
  // register phase for series-episode collection type
  strapi.db.lifecycles.subscribe({
    models: ['api::series-episode.series-episode'],
    // after a video post is created
    async afterCreate(event) {
      const seriesEpisodeData = await strapi.documents('api::series-episode.series-episode').findOne({
        documentId: event.result.documentId,
        populate: ['video_source'],
      });

      if (!seriesEpisodeData.video_source) {
        const newData = {
          name: seriesEpisodeData.name,
          series_episode: seriesEpisodeData.documentId,
          videoLink: null,
          videoObject: null,
          trailerLink: null,
          trailerObject: null,
        };

        // create new video source
        await strapi.documents('api::video-source.video-source').create({
          data: newData,
        });
      }
    },
  });
};

export default register;
