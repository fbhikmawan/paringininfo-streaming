'use server'

import { PaginationMeta } from "@/types/bases";
import { PopulatedVideo, VideoType, Season, Episode } from "@/types/videos";
import { AdBanner } from "@/types/ads";

export interface VideoFilters {
  [key: string]: string | number | boolean | { [subKey: string]: string | number | boolean };
}

const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
const headers: HeadersInit = process.env.NEXT_PUBLIC_TOKEN
  ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` }
  : {};

// Helper function to handle fetch requests with multiple method support
const fetchData = async (url: string, options: {
  method?: string;
  body?: string | object | null;
  contentType?: string;
} = {}) => {
  const { 
    method = 'GET', 
    body = null, 
    contentType = 'application/json'
  } = options;
  
  const requestHeaders: HeadersInit = {
    ...headers,
    ...(body && { 'Content-Type': contentType })
  };
  
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    ...(body && { body: typeof body === 'string' ? body : JSON.stringify(body) })
  };
  
  const response = await fetch(`${baseURL}/${url}`, requestOptions);
  
  if (!response.ok) {
    throw new Error("Server error");
  }
  
  // For methods like DELETE that might not return content
  if (response.status === 204) {
    return null;
  }
  
  // Try to parse as JSON, but handle empty responses
  try {
    return await response.json();
  } catch (error) {
    console.error('Error parsing data from fetcg response:', error);
  }
};

// Increment view count
export const incrementViewCount = async (videoId: string, currentViewCount: number) => {
  try {
    await fetchData(`api/videos/${videoId}`, {
      method: 'PUT',
      body: {
        data: {
          viewCount: currentViewCount + 1,
        },
      }
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
};

// Get the total count of all videos
export const getTotalViewCount = async (): Promise<number> => {
  try {
    let totalViewCount = 0;
    let page = 1;
    const pageSize = 25;
    let hasMore = true;

    while (hasMore) {
      const data = await fetchData(`api/videos?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=updatedAt:desc`);
      const videos = data.data as PopulatedVideo[];
      totalViewCount += videos.reduce((sum, video) => sum + (video.viewCount || 0), 0);

      if (videos.length < pageSize) {
        hasMore = false;
      } else {
        page++;
      }
    }
    
    return totalViewCount;
  } catch (error) {
    console.error('Error fetching total view count:', error);
    return 0;
  }
};

// Get the top 10 most viewed videos
export const getTopViewedVideos = async (): Promise<{ videos: PopulatedVideo[] }> => {
  const data = await fetchData(`api/videos?sort=viewCount:desc&pagination[pageSize]=8&sort=updatedAt:desc&populate=*`);
  return {
    videos: data.data as PopulatedVideo[],
  };
};

// ***
// APIs for Videos
// ***
// Get all video with pagination
export const getAllVideo = async (
  page: number = 1,
): Promise<{ videos: PopulatedVideo[], pagination: PaginationMeta }> => {
  const data = await fetchData(
    `api/videos?pagination[page]=${page}&pagination[pageSize]=${process.env.NEXT_PUBLIC_PAGE_LIMIT}&sort=updatedAt:desc&populate=*`
  );
  return {
    videos: data.data as PopulatedVideo[],
    pagination: data.meta.pagination as PaginationMeta,
  };
};
// Get all video no pagination
export const getAllVideoNoPagination = async (): Promise<{ videos: PopulatedVideo[]}> => {
  try {
    let videos: PopulatedVideo[] = [];
    let page = 1;
    const pageSize = 25;
    let hasMore = true;

    while (hasMore) {
      const data = await fetchData(`api/videos?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=updatedAt:desc&populate=*`);
      const fetchedVideos = data.data as PopulatedVideo[];
      videos = [...videos, ...fetchedVideos];
      
      if (fetchedVideos.length < pageSize) {
        hasMore = false;
      } else {
        page++;
      }
    }
    
    return { videos };
  } catch (error) {
    console.error('Error fetching videos by video type slug:', error);
    return { videos: [] };
  }
};

// Get video by its nameSlug
export const getVideoBySlug = async (slug: string): Promise<{ video: PopulatedVideo }> => {
  const data = await fetchData(`api/videos?filters[nameSlug]=${slug}&sort=updatedAt:desc&populate=*`);
  if (data.data.length > 0) {
    return {
      video: data.data[0] as PopulatedVideo,
    };
  }
  throw new Error("Video not found.");
};

export const getVideoByTypeAndSlug = async (videoTypeNameSlug: string, nameSlug: string): Promise<{ video: PopulatedVideo }> => {
  const data = await fetchData(
    `api/videos?filters[video_type][nameSlug][$eq]=${videoTypeNameSlug}&filters[nameSlug][$eq]=${nameSlug}&sort=updatedAt:desc&populate=*`
  );
  if (data.data.length > 0) {
    return {
      video: data.data[0] as PopulatedVideo,
    };
  }
  throw new Error("Video not found.");
};

export const getAllVideoByType = async (videoTypeSlug: string) => {
  const data = await fetchData(`api/videos?filters[video_type][nameSlug][$eq]=${videoTypeSlug}&sort=updatedAt:desc&populate=*`);
  return {
    videos: data.data,
    pagination: data.meta.pagination,
  };
};

export const getAllVideoByTypeAndCategory = async (
  page: number = 1,
  videoType: VideoType,
  videoCategorySlug: string,
  pageSize: number
) => {
  const data = await fetchData(
    `api/videos?pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[video_type][nameSlug][$eq]=${videoType.nameSlug}${videoCategorySlug !== '*' ? `&filters[video_categories][nameSlug][$eq]=${videoCategorySlug}` : ''
    }&sort=updatedAt:desc&populate=*`
  );
  return {
    videos: data.data,
    pagination: data.meta.pagination,
  };
};

export const getSeriesVideoWithEpisodes = async (
  videoDocumentId: string,
) => {
  const baseUrl = `api/videos/${videoDocumentId}?`;
  const populateParam = '&populate[series_seasons][populate]=*';
  
  const data = await fetchData(`${baseUrl}${populateParam}`);
  
  return {
    videoData: data.data,
  };
};

export const getAllVideoByVideoLinkNull = async (): Promise<{ videos: PopulatedVideo[], pagination: PaginationMeta }> => {
  const data = await fetchData(`api/videos?filters[video_source][videoLink][$null]=true&sort=updatedAt:desc&populate=*`);
  return {
    videos: data.data,
    pagination: data.meta.pagination,
  };
};

export const getNewReleaseVideos = async (currentDate: string): Promise<{ videos: PopulatedVideo[], pagination: PaginationMeta }> => {
  const date = new Date(currentDate);
  date.setDate(date.getDate() - 30);
  const formattedDate = date.toISOString();

  const data = await fetchData(`api/videos?filters[createdAt][$gte]=${formattedDate}&sort=createdAt:desc&populate=*`);
  return {
    videos: data.data,
    pagination: data.meta.pagination,
  };
};

// ***
// APIs for Advertisement Banners
// ***
// Get all ad banners based on filters
export const getAdBanners = async (filters: Record<string, string> = {}): Promise<{ adBanners: AdBanner[] }> => {
  const queryString = new URLSearchParams(filters).toString();
  const data = await fetchData(`api/ad-banners?${queryString}&sort=displayCount:asc&populate=*`);
  return {
    adBanners: data.data as AdBanner[],
  };
};
// Increment displayCount field value
export const incrementDisplayCount = async (adBannerId: string, currentDisplayCount: number) => {
  try {
    await fetch(`${baseURL}/api/ad-banners/${adBannerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        data: {
          displayCount: currentDisplayCount + 1,
        },
      }),
    });
  } catch (error) {
    console.error('Error incrementing display count:', error);
  }
};

// ***
// APIs for Video Categories
// ***
export const getAllCategories = async () => {
  const data = await fetchData(`api/video-categories?populate=*`);
  return {
    categories: data.data,
    pagination: data.meta.pagination,
  };
};

export const getCategoryBySlug = async (slug: string) => {
  const data = await fetchData(`api/video-categories?filters[nameSlug]=${slug}&populate=*`);
  if (data.data.length > 0) {
    return data.data[0];
  }
  throw new Error("Category not found.");
};

export const getAllCategoriesByVideoType = async (videoType: VideoType) => {
  const data = await fetchData(`api/video-categories?filters[video_types][nameSlug][$eq]=${videoType.nameSlug}&populate=*`);
  return {
    categories: data.data,
    pagination: data.meta.pagination,
  };
};

// ***
// APIs for Video Types
// ***
export const getAllVideoTypes = async (): Promise<{ videoTypes: VideoType[], pagination: PaginationMeta }> => {
  const data = await fetchData(`api/video-types?populate=*`);
  return {
    videoTypes: data.data as VideoType[],
    pagination: data.meta.pagination as PaginationMeta,
  };
};

export const getVideoTypeBySlug = async (slug: string): Promise<VideoType | null> => {
  const data = await fetchData(`api/video-types?filters[nameSlug]=${slug}&populate=*`);
  if (data.data && data.data.length > 0) {
    return data.data[0] as VideoType;
  }
  return null;
};

// ***
// APIs for Video Qualities
// ***
export const getAllQualities = async () => {
  const data = await fetchData(`api/video-categories?populate=*`);
  return data.data;
};

export const getQualityBySlug = async (slug: string) => {
  const data = await fetchData(`api/video-qualities?filters[nameSlug]=${slug}&populate=*`);
  if (data.data.length > 0) {
    return data.data[0];
  }
  throw new Error("Category not found.");
};

// ***
// APIs for Series type
// ***
export const getVideoSeasons = async (videoId: number): Promise<{ seriesSeasons: Season[] }> => {
  const data = await fetchData(`api/series-seasons?filters[video][id][$eq]=${videoId}&populate[series_episodes][populate][0]=video_source`);
  if (data.data) {
    return {
      seriesSeasons: data.data
    };
  }
  throw new Error("Season not found.");
};
export const getSeasonEpisodes = async (seasonId: number): Promise<{ seriesEpisodes: Episode[] }> => {
  const data = await fetchData(`api/series-episodes?filters[series-season][id][$eq]=${seasonId}&populate=*`);
  if (data.data) {
    return {
      seriesEpisodes: data.data
    };
  }
  throw new Error("Episode not found.");
};