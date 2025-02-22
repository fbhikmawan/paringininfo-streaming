import type { Core } from '@strapi/strapi';
import { Client } from 'minio';
import * as fs from 'fs';
import * as path from 'path';
import ffmpeg from 'fluent-ffmpeg';

const postPerPage = 10;

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
   * Upload Media to Temporary Folder
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async uploadMedia(file: any, uploadId: string, chunkIndex: number, totalChunks: number, fileExtension: string) {
    const tempFolder = `/tmp/${uploadId}`;
    const tempSourceFolder = `${tempFolder}/source`;
    const chunkFileName = `chunk_${chunkIndex}`;
    const tempChunkPath = `${tempSourceFolder}/${chunkFileName}`;

    try {
      await fs.promises.mkdir(tempFolder, { recursive: true });
      await fs.promises.mkdir(tempSourceFolder, { recursive: true });
      await fs.promises.rename(file.filepath, tempChunkPath);
  
      if (chunkIndex === totalChunks - 1) {
        // Combine chunks into a single file
        const combinedFilePath = `${tempSourceFolder}/combined.${fileExtension}`;
        const writeStream = fs.createWriteStream(combinedFilePath);
  
        for (let i = 0; i < totalChunks; i++) {
          const chunkPath = `${tempSourceFolder}/chunk_${i}`;
          const data = fs.readFileSync(chunkPath);
          writeStream.write(data);
          fs.unlinkSync(chunkPath); // Delete chunk after writing
        }
  
        writeStream.end();
        return { success: true, tempFolder, tempSourcePath: combinedFilePath };
      }
  
      return { success: true };
    } catch (error) {
      console.error('Error during upload media:', error);
      throw error;
    }
  },

  /**
   * Process Media
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async processMedia(videoSource: any, attributes: string[], tempFolder: any, tempSourcePath: any) {
    const bucketName = process.env.MINIO_BUCKET_NAME;
    let objectFolder: string;
    if (videoSource.series_episode) {
      objectFolder = `series/${videoSource.series_episode.series_season.video.nameSlug}/season-${videoSource.series_episode.series_season.seasonNumber}/episode-${videoSource.series_episode.episodeNumber}`;
    } else {
      objectFolder = `${videoSource.video.video_type.nameSlug}/${videoSource.video.nameSlug}/${attributes[0]}`;
    }
    try {
      const processedFiles = await this.convertVideo(tempSourcePath, tempFolder);

      const uploadPromises = processedFiles.map(({ path, name }) => {
        const fileStream = fs.createReadStream(path);
        return minioClient.putObject(bucketName, `${objectFolder}/${name}`, fileStream);
      });

      await Promise.all(uploadPromises);

      const updateData = {
        [attributes[0]]: `${objectFolder}/stream.m3u8`
      };
      const updatedVideoSource = await strapi.query('api::video-source.video-source').update({
        where: { documentId: videoSource.documentId },
        data: updateData,
      });

      return { success: true, data: updatedVideoSource };
    } catch (error) {
      console.error('Error during process media:', error);
      throw error;
    } finally {
      await fs.promises.rm(tempFolder, { recursive: true, force: true });
    }
  },

  /**
   * Covnert video using ffmpeg
   */
  async convertVideo(inputFilePath: string, outputFolder: string): Promise<{ path: string, name: string }[]> {
    return new Promise((resolve, reject) => {
      const outputFiles: { path: string, name: string }[] = [];
      const ext = path.extname(inputFilePath).toLowerCase();
      const tempFilePath = `${outputFolder}/temp.mp4`;
  
      const convertToMp4 = (input: string, output: string) => {
        return new Promise<void>((resolve, reject) => {
          ffmpeg(input)
            .outputOptions(['-c:v libx264', '-c:a aac'])
            .output(output)
            .on('start', (commandLine) => {
              console.log('Spawned ffmpeg with command: ' + commandLine);
            })
            .on('end', () => resolve())
            .on('error', (err) => {
              console.error('Error during convertToMp4:', err);
              reject(err);
            })
            .run();
        });
      };
  
      const convertToHls = (input: string) => {
        return new Promise<void>((resolve, reject) => {
          ffmpeg(input)
            .outputOptions([
              '-c copy',
              '-start_number 0',
              '-hls_time 10',
              '-hls_list_size 0',
              '-f hls'
            ])
            .output(`${outputFolder}/stream.m3u8`)
            .on('start', (commandLine) => {
              console.log('Spawned ffmpeg with command: ' + commandLine);
            })
            .on('end', () => resolve())
            .on('error', (err) => {
              console.error('Error during convertToHls:', err);
              reject(err);
            })
            .run();
        });
      };
  
      const collectOutputFiles = async () => {
        try {
          const files = await fs.promises.readdir(outputFolder);
          for (const file of files) {
            const filePath = path.join(outputFolder, file);
            const stats = await fs.promises.stat(filePath);
            if (stats.isFile()) {
              outputFiles.push({ path: filePath, name: file });
            }
          }
          resolve(outputFiles);
        } catch (err) {
          reject(err);
        }
      };
  
      (async () => {
        try {
          if (ext !== '.mp4') {
            await convertToMp4(inputFilePath, tempFilePath);
            await convertToHls(tempFilePath);
            await fs.promises.unlink(tempFilePath); // Delete the temporary .mp4 file
          } else {
            await convertToHls(inputFilePath);
          }
          await collectOutputFiles();
        } catch (err) {
          reject(err);
        }
      })();
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
      const totalVideoSources = await strapi.documents('api::video-source.video-source').count({});

      // get video sources
      const videoSources = await strapi.documents('api::video-source.video-source').findMany({
        populate: {
          video: {
            populate: '*',
          },
          series_episode: {
            populate: {
              series_season: {
                populate: '*',
              },
            }
          }
        },
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
      const videoSource = await strapi.documents('api::video-source.video-source').findFirst({
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
      await strapi.documents('api::video-source.video-source').delete({ documentId: videoSourceDocumentId });

      return 'Video Source deleted';
    } catch (error) {
      console.error('Error deleting video source:', error);
      throw error;
    }
  },
});

export default service;
