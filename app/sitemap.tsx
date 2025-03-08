import { MetadataRoute } from 'next';
import { getAllVideoTypes } from '@/lib/api';
import { VideoType } from '@/types/videos';

export const fetchCache = 'default-no-store'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_METADATA_BASE_URL || 'http://localhost:3000';

  // Fetch all video types
  const { videoTypes }: { videoTypes: VideoType[] } = await getAllVideoTypes();

  // Check if videoTypes is empty
  if (videoTypes.length === 0) {
    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
      },
    ];
  }

  // Generate video type sitemaps
  const videoTypeSitemaps = videoTypes.map(videoType => ({
    url: `${baseUrl}/${videoType.nameSlug}`,
    lastModified: new Date().toISOString(),
  }));

  // Generate main page sitemap
  const mainPageSitemap = {
    url: baseUrl,
    lastModified: new Date().toISOString(),
  };

  return [
    mainPageSitemap,
    ...videoTypeSitemaps,
  ];
}