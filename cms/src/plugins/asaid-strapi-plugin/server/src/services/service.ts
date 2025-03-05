import type { Core } from '@strapi/strapi';
import { Client } from 'minio';
import * as fs from 'fs';
import * as path from 'path';
import ffmpeg from 'fluent-ffmpeg';

const postPerPage = 10;

const minioClient = new Client({
  endPoint: 'localhost',
  port: 9000,
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

    console.log(`Starting uploadMedia with uploadId: ${uploadId}, chunkIndex: ${chunkIndex}, totalChunks: ${totalChunks}, fileExtension: ${fileExtension}`);
    console.log(`Temporary folder: ${tempFolder}`);
    console.log(`Temporary source folder: ${tempSourceFolder}`);
    console.log(`Chunk file name: ${chunkFileName}`);
    console.log(`Temporary chunk path: ${tempChunkPath}`);

    try {
      await fs.promises.mkdir(tempFolder, { recursive: true });
      console.log(`Created temporary folder: ${tempFolder}`);
      await fs.promises.mkdir(tempSourceFolder, { recursive: true });
      console.log(`Created temporary source folder: ${tempSourceFolder}`);
      await fs.promises.rename(file.filepath, tempChunkPath);
      console.log(`Moved file to temporary chunk path: ${tempChunkPath}`);
  
      if (chunkIndex === totalChunks - 1) {
        console.log(`All chunks uploaded, combining chunks into a single file`);
        // Combine chunks into a single file
        const combinedFilePath = `${tempSourceFolder}/combined.${fileExtension}`;
        const writeStream = fs.createWriteStream(combinedFilePath);
  
        for (let i = 0; i < totalChunks; i++) {
          const chunkPath = `${tempSourceFolder}/chunk_${i}`;
          if (!fs.existsSync(chunkPath)) {
            throw new Error(`Chunk file ${chunkPath} does not exist`);
          }
          const data = fs.readFileSync(chunkPath);
          writeStream.write(data);
          fs.unlinkSync(chunkPath); // Delete chunk after writing
          console.log(`Wrote chunk ${i} to combined file and deleted chunk file: ${chunkPath}`);
        }
  
        // Wait for the write stream to finish
        await new Promise<void>((resolve, reject) => {
          writeStream.on('finish', () => {
            console.log(`Finished writing combined file: ${combinedFilePath}`);
            resolve();
          });
          writeStream.on('error', (err) => {
            console.error(`Error writing combined file: ${err}`);
            reject(err);
          });
          writeStream.end();
        });
        
        // Check if the combined file exists
        if (!fs.existsSync(combinedFilePath)) {
          throw new Error(`Combined file ${combinedFilePath} does not exist`);
        }

        console.log(`Combined file exists: ${combinedFilePath}`);
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

    console.log(`Starting processMedia with videoSource: ${JSON.stringify(videoSource)}, attributes: ${attributes}, tempFolder: ${tempFolder}, tempSourcePath: ${tempSourcePath}`);
    console.log(`Bucket name: ${bucketName}`);
    console.log(`Object folder: ${objectFolder}`);

    try {
      const processedFiles = await this.convertVideo(tempSourcePath, tempFolder);
      console.log(`Processed files: ${JSON.stringify(processedFiles)}`);

      const uploadPromises = processedFiles.map(({ path, name }) => {
        const fileStream = fs.createReadStream(path);
        console.log(`Uploading file to MinIO: ${path} as ${objectFolder}/${name}`);
        return minioClient.putObject(bucketName, `${objectFolder}/${name}`, fileStream)
          .then(() => {
            console.log(`Successfully uploaded ${name} to MinIO`);
          })
          .catch((err) => {
            console.error(`Error uploading ${name} to MinIO: ${err}`);
            throw err;
          });
      });

      await Promise.all(uploadPromises);
      console.log(`All files uploaded to MinIO`);

      // Update video source with the new video source URL
      console.log(`Updating video source with documentId: ${videoSource.documentId}`);
      console.log(`Attributes: ${JSON.stringify(attributes)}`);
      console.log(`content: ${objectFolder}/stream.m3u8`);
      const updateData = {
        [attributes[0]]: `${objectFolder}/stream.m3u8`
      };
      const updatedVideoSource = await strapi.query('api::video-source.video-source').update({
        where: { documentId: videoSource.documentId },
        data: updateData,
      });

      console.log(`Updated video source: ${JSON.stringify(updatedVideoSource)}`);
      return { success: true, data: updatedVideoSource };
    } catch (error) {
      console.error('Error during process media:', error);
      throw error;
    } finally {
      await fs.promises.rm(tempFolder, { recursive: true, force: true });
      console.log(`Deleted temporary folder: ${tempFolder}`);
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
  
  /**
  * Get MinIO Bucket Storage Info
  */
  async getBucketStorageInfo() {
    try {
      const bucketName = process.env.MINIO_BUCKET_NAME;
      const bucketInfo = await minioClient.bucketExists(bucketName);
      if (!bucketInfo) {
        throw new Error(`Bucket ${bucketName} does not exist`);
      }

      const objectsStream = minioClient.listObjectsV2(bucketName, '', true);
      const serverStorageCapacity = parseInt(process.env.SERVER_STORAGE_CAPACITY, 10) || 40;
      let totalSize = 0;

      for await (const obj of objectsStream) {
        totalSize += obj.size;
      }

      // Assuming you know the total capacity of your MinIO server
      const totalCapacity = serverStorageCapacity * 1024 * 1024 * 1024; // 50 GB for example
      const remainingSpace = totalCapacity - totalSize;

      return {
        bucketName,
        totalSize,
        remainingSpace,
      };
    } catch (error) {
      console.error('Error getting bucket storage info:', error);
      throw error;
    }
  },
});

export default service;
