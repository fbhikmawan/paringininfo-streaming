import type { Core } from '@strapi/strapi';
import { Client } from 'minio';
import * as fs from 'fs';

const postPerPage = 5;

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT, 10),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  /**
   * Upload Media to Strapi Media Library
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async uploadMedia(file: any, videoSource: any, attribute: any) {
    const videoSourceData = JSON.parse(videoSource);
  const bucketName = process.env.MINIO_BUCKET_NAME;
  const folderPath = `${videoSourceData.video.video_type.nameSlug}/${videoSourceData.video.nameSlug}/${attribute}`;
  const fileName = file.originalFilename;
  const filePath = `${folderPath}/${fileName}`;

  try {
    const fileStream = fs.createReadStream(file.filepath);

    const uploadPromise = minioClient.putObject(bucketName, filePath, fileStream);
    const fileUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${filePath}`;

    const updatePromise = strapi.query('plugin::asaid-strapi-plugin.video-source').update({
      where: { documentId: videoSourceData.documentId },
      data: {
        [attribute]: fileUrl,
      },
    });

    const [, updatedVideoSource] = await Promise.all([uploadPromise, updatePromise]);

    return { success: true, data: updatedVideoSource };
  } catch (error) {
    console.error('Error during upload or update:', error);

    // Rollback logic
    if (error.message.includes('putObject')) {
      // If upload failed, no need to delete anything
      return { success: false, error: 'File upload failed' };
    } else if (error.message.includes('update')) {
      // If update failed, delete the uploaded file
      try {
        await minioClient.removeObject(bucketName, filePath);
      } catch (deleteError) {
        console.error('Error deleting uploaded file:', deleteError);
      }
      return { success: false, error: 'Database update failed' };
    }

    return { success: false, error: 'Unknown error occurred' };
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
   * DELETE Video Source
   */
  async deleteVideoSource(query: { videoSourceDocumentId: string }) {
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
