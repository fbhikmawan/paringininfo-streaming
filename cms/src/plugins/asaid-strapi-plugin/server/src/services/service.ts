import type { Core } from '@strapi/strapi';

const postPerPage = 5;

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  /**
   * Upload Media to Strapi Media Library
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async uploadMedia(file: any, videoSourceId: any, attribute: any) {
    try {
      // Save the file to the Strapi Media Library
      const uploadedFiles = await strapi.plugin('upload').service('upload').upload({
        data: {
          refId: videoSourceId,
          ref: 'plugin::asaid-strapi-plugin.video-source',
          field: attribute,
        },
        files: file,
      });

      if (!uploadedFiles || uploadedFiles.length === 0) {
        return { success: false, error: 'File upload failed' };
      }

      // Update the video source with the new file path
      const updatedVideoSource = await strapi.query('plugin::asaid-strapi-plugin.video-source').update({
        where: { id: videoSourceId },
        data: {
          [attribute]: uploadedFiles[0].url,
        },
      });

      return { success: true, data: updatedVideoSource };
    } catch (error) {
      throw error;
    }
  },

  /**
   * GET Video Sources with Pagination
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getVideoSources(query: any) {
    try {
      // get start from query params
      const { start } = query;
        
      // get total video sources count
      const totalVideoSources = await strapi.documents('plugin::asaid-strapi-plugin.video-source').count({});

      // get video sources
      const videoSources = await strapi.documents('plugin::asaid-strapi-plugin.video-source').findMany({
        populate: {
          video: {
            populate: '*',
          },
        },
        // return only 5 videoSources from the start index
        start,
        limit: postPerPage,
      });

      // return the videoSources and total videoSources
      return { videoSources, totalVideoSources };
    } catch (error) {
      throw error;
    }
  },

  /**
   * FETCH SINGLE VideoSource
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getSingleVideoSource(query: any) {
    // get videoDocumentId from query
    const { videoDocumentId } = query;
    try {
      // find the videoSource
      const videoSource = await strapi.documents('plugin::asaid-strapi-plugin.video-source').findFirst({
        populate: {
          video: {
            populate: '*',
          },
        },
        // filter the videoSource by videoDocumentId
        filters: {
          video: {
            documentId: {
              $eq: videoDocumentId,
            },
          },
        },
      });

      // return the videoSource
      return videoSource;
    } catch (error) {
      throw error;
    }
  },

  /**
   * DELETE Post
   */
  async deletePost(query: { videoSourceDocumentId: string }) {
    try {
      // get videoSourceDocumentId from query
      const { videoSourceDocumentId } = query;

      // delete the video source
      await strapi.documents('plugin::asaid-strapi-plugin.video-source').delete({ documentId: videoSourceDocumentId });

      return 'Video Source deleted';
    } catch (error) {
      console.error('Error deleting video source:', error);
      throw error;
    }
  },
});

export default service;
