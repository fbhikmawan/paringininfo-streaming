import { Client } from 'minio';
import { Parser as m3u8Parser } from 'm3u8-parser';

// Initialize the Minio client
const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT, 10),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

// PresignedURL duration in seconds
const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;
const PRESIGNED_URL_DURATION = parseInt(process.env.PRESIGNED_URL_DURATION, 10);

export async function GET(request) {  
  const { searchParams } = new URL(request.url);
  const manifestName = searchParams.get('manifestName');
  
  try {
    // Generate a presigned URL for the .m3u8 manifest file
    const manifestUrl = await minioClient.presignedUrl('GET', BUCKET_NAME, manifestName, PRESIGNED_URL_DURATION);

    // Fetch the .m3u8 manifest file
    const response = await fetch(manifestUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch manifest: ${response.statusText}`);
    }
    const manifestText = await response.text()

    // Parse the .m3u8 manifest file
    const parser = new m3u8Parser;
    parser.push(manifestText);
    parser.end();
    const segments = parser.manifest.segments;
    
    // Generate presigned URLs for the .ts segment files
    const presignedUrls = { manifestUrl, segments: [] };
    for (const segment of segments) {
      const segmentPath = `${manifestName.replace('stream.m3u8', '')}${segment.uri}`;
      const segmentUrl = await minioClient.presignedUrl('GET', BUCKET_NAME, segmentPath, PRESIGNED_URL_DURATION);
      presignedUrls.segments.push({ uri: segmentPath, url: segmentUrl });
    }
    
    return new Response(JSON.stringify(presignedUrls), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}