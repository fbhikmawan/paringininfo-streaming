import { PaginationMeta } from "@/types/bases";
import { PopulatedVideo, VideoType, Season, Episode } from "@/types/videos";

export interface VideoFilters {
  [key: string]: string | number | boolean | { [subKey: string]: string | number | boolean };
}

const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
};

// Helper function to handle fetch requests
const fetchData = async (url: string) => {
  const response = await fetch(`${baseURL}/${url}`, {
    headers,
  });
  if (!response.ok) {
    throw new Error("Server error");
  }
  return response.json();
};

// Increment view count
export const incrementViewCount = async (videoId: string, currentViewCount: number) => {
  try {
    await fetch(`${baseURL}/api/videos/${videoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        data: {
          viewCount: currentViewCount + 1,
        },
      }),
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
      const data = await fetchData(`api/videos?pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
      const videos = data.data as PopulatedVideo[];
      totalViewCount += videos.reduce((sum, video) => sum + (video.viewCount || 0), 0);

      if (videos.length < pageSize) {
        hasMore = false;
      } else {
        page++;
      }
    }

    console.log(`Total view count: ${totalViewCount}`);
    return totalViewCount;
  } catch (error) {
    console.error('Error fetching total view count:', error);
    return 0;
  }
};

// Get the top 10 most viewed videos
export const getTopViewedVideos = async (): Promise<{ videos: PopulatedVideo[] }> => {
  const data = await fetchData(`api/videos?sort=viewCount:desc&pagination[pageSize]=10&populate=*`);
  return {
    videos: data.data as PopulatedVideo[],
  };
};

// ***
// APIs for Videos
// ***
export const getAllVideo = async (
  page: number = 1,
): Promise<{ videos: PopulatedVideo[], pagination: PaginationMeta }> => {
  const data = await fetchData(
    `api/videos?pagination[page]=${page}&pagination[pageSize]=${process.env.NEXT_PUBLIC_PAGE_LIMIT}&populate=*`
  );
  return {
    videos: data.data as PopulatedVideo[],
    pagination: data.meta.pagination as PaginationMeta,
  };
};

export const getVideoBySlug = async (slug: string): Promise<{ video: PopulatedVideo }> => {
  const data = await fetchData(`api/videos?filters[nameSlug]=${slug}&populate=*`);
  if (data.data.length > 0) {
    return {
      video: data.data[0] as PopulatedVideo,
    };
  }
  throw new Error("Video not found.");
};

export const getVideoByTypeAndSlug = async (videoTypeNameSlug: string, nameSlug: string): Promise<{ video: PopulatedVideo }> => {
  const data = await fetchData(
    `api/videos?filters[video_type][nameSlug][$eq]=${videoTypeNameSlug}&filters[nameSlug][$eq]=${nameSlug}&populate=*`
  );
  if (data.data.length > 0) {
    return {
      video: data.data[0] as PopulatedVideo,
    };
  }
  throw new Error("Video not found.");
};

export const getAllVideoByType = async (videoTypeSlug: string) => {
  const data = await fetchData(`api/videos?filters[video_type][nameSlug][$eq]=${videoTypeSlug}&populate=*`);
  return {
    videos: data.data,
    pagination: data.meta.pagination,
  };
};

export const getAllVideoByTypeAndCategory = async (
  page: number = 1,
  videoType: VideoType,
  videoCategorySlug: string,
) => {
  const data = await fetchData(
    `api/videos?pagination[page]=${page}&pagination[pageSize]=${process.env.NEXT_PUBLIC_PAGE_LIMIT}&filters[video_type][nameSlug][$eq]=${videoType.nameSlug}${videoCategorySlug !== '*' ? `&filters[video_categories][nameSlug][$eq]=${videoCategorySlug}` : ''
    }&populate=*`
  );
  return {
    videos: data.data,
    pagination: data.meta.pagination,
  };
};

export const getAllVideoByVideoLinkNull = async (): Promise<{ videos: PopulatedVideo[], pagination: PaginationMeta }> => {
  const data = await fetchData(`api/videos?filters[video_source][videoLink][$null]=true&populate=*`);
  return {
    videos: data.data,
    pagination: data.meta.pagination,
  };
};

export const getNewReleaseVideos = async (currentDate: string): Promise<{ videos: PopulatedVideo[], pagination: PaginationMeta }> => {
  const date = new Date(currentDate);
  date.setDate(date.getDate() - 30);
  const formattedDate = date.toISOString();

  const data = await fetchData(`api/videos?filters[updatedAt][$gte]=${formattedDate}&populate=*`);
  return {
    videos: data.data,
    pagination: data.meta.pagination,
  };
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