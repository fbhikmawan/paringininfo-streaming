import type { Core } from '@strapi/strapi';
import { Client } from 'minio';
import * as fs from 'fs';
import * as path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { v4 as uuidv4 } from 'uuid';

const postPerPage = 5;

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT, 10),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

// Set paths for ffmpeg and ffprobe binaries
const ffmpegPath = path.resolve(__dirname, '../../bin/ffmpeg');
const ffprobePath = path.resolve(__dirname, '../../bin/ffprobe');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

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
    const objectFolder = `${videoSourceData.video.video_type.nameSlug}/${videoSourceData.video.nameSlug}/${attribute}`;
    const tempFolder = `/tmp/${uuidv4()}`;
    const tempSourceFolder = `${tempFolder}/source`;
    const sourceFileName = file.originalFilename;
    const tempSourcePath = `${tempSourceFolder}/${sourceFileName}`;

    try {
      // Ensure the temporary directory exists
      await fs.promises.mkdir(tempFolder, { recursive: true });
      await fs.promises.mkdir(tempSourceFolder, { recursive: true });

      // Move the source file to the temporary directory
      await fs.promises.rename(file.filepath, tempSourcePath);

      // Video processing
      const processedFiles = await this.processVideo(tempSourcePath, tempFolder);

      // Upload processed files to MinIO
      const uploadPromises = processedFiles.map(({ path, name }) => {
        const fileStream = fs.createReadStream(path);
        return minioClient.putObject(bucketName, `${objectFolder}/${name}`, fileStream);
      });

      await Promise.all(uploadPromises);

      const fileUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${objectFolder}/stream.m3u8`;

      const updatedVideoSource = await strapi.query('plugin::asaid-strapi-plugin.video-source').update({
        where: { documentId: videoSourceData.documentId },
        data: {
          [attribute]: fileUrl,
        },
      });

      return { success: true, data: updatedVideoSource };
    } catch (error) {
      console.error('Error during process media, upload media or update collection type:', error);
    } finally {
      // Ensure the temporary folder is deleted
      await fs.promises.rm(tempFolder, { recursive: true, force: true });
    }
  },

  /**
   * Process Video using ffmpeg
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async processVideo(inputFilePath: string, outputFolder: string): Promise<{ path: string, name: string }[]> {
    return new Promise((resolve, reject) => {
      const outputFiles: { path: string, name: string }[] = [];

      ffmpeg(inputFilePath)
        .outputOptions([
          '-c copy',
          '-start_number 0',
          '-hls_time 10',
          '-hls_list_size 0',
          '-f hls'
        ])
        .output(`${outputFolder}/stream.m3u8`)
        .on('end', () => {
          // Collect all generated files
          fs.readdir(outputFolder, async (err, files) => {
            if (err) {
              return reject(err);
            }
            for (const file of files) {
              const filePath = path.join(outputFolder, file);
              const stats = await fs.promises.stat(filePath);
              if (stats.isFile()) {
                outputFiles.push({ path: filePath, name: file });
              }
            }
            resolve(outputFiles);
          });
        })
        .on('error', (err) => {
          reject(err);
        })
        .run();
    });
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
