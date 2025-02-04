import type { Core } from '@strapi/strapi';

const postPerPage = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getVideoSources = async ({ strapi }: { strapi: Core.Strapi }, query: any) => {
  try {
    const { start } = query;
    const totalVideoSources = await strapi.documents('plugin::asaid-strapi-plugin.video-source').count({});
    const videoSources = await strapi.documents('plugin::asaid-strapi-plugin.video-source').findMany({
      populate: {
        blog: {
          populate: ['tags'],
        },
      },
      start,
      limit: postPerPage,
    });
    return { videoSources, totalVideoSources };
  } catch (error) {
    throw error;
  }
};

export { getVideoSources };