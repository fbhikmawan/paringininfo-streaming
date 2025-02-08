import { PaginationMeta } from "@/types/bases";
import { PopulatedVideo, VideoType } from "@/types/videos";

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
