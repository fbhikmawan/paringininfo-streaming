import { PaginationMeta } from "@/types/bases";
import { PopulatedVideo, VideoType } from "@/types/videos";
import axios, { AxiosInstance } from "axios";

export interface VideoFilters {
  [key: string]: string | number | boolean | { [subKey: string]: string | number | boolean };
}

export const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
});

// ***
// APIs for Videos
// ***
export const getAllVideo = async (
  page: number = 1,
): Promise<{ videos: PopulatedVideo[], pagination: PaginationMeta }> => {
  try {
    // Fetch videos with pagination and populate the required fields
    const response = await api.get(
      `api/videos?pagination[page]=${page}&pagination[pageSize]=${process.env.NEXT_PUBLIC_PAGE_LIMIT}&populate=*`
    );
    return {
      videos: response.data.data as PopulatedVideo[],
      pagination: response.data.meta.pagination as PaginationMeta, // Return data and include pagination data
    };
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Server error"); // Error handling
  }
};
// Get videos by slug
export const getVideoBySlug = async (slug: string): Promise<{ video: PopulatedVideo }> => {
  try {
    const response = await api.get(
      `api/videos?filters[nameSlug]=${slug}&populate=*`
    ); // Fetch a single video using the slug parameter
    if (response.data.data.length > 0) {
      return {
        video: response.data.data[0] as PopulatedVideo, // Return the video data
      };
    }
    throw new Error("Video not found.");
  } catch (error) {
    console.error("Error fetching video:", error);
    throw new Error("Server error");
  }
};
// Get videos by slug
export const getVideoByTypeAndSlug = async (videoTypeNameSlug: string, nameSlug: string): Promise<{ video: PopulatedVideo }> => {
  try {
    const response = await api.get(
      `api/videos?filters[video_type][nameSlug][$eq]=${videoTypeNameSlug}&filters[nameSlug][$eq]=${nameSlug}&populate=*`
    ); // Fetch a single video using the slug parameter
    if (response.data.data.length > 0) {
      return {
        video: response.data.data[0] as PopulatedVideo, // Return the video data
      };
    }
    throw new Error("Video not found.");
  } catch (error) {
    console.error("Error fetching video:", error);
    throw new Error("Server error");
  }
};
// Get videos by videoType
export const getAllVideoByType = async (
  videoTypeSlug: string,
) => {
  try {
    // Fetch videos with pagination and populate the required fields
    const response = await api.get(
      `api/videos?filters[video_type][nameSlug][$eq]=${videoTypeSlug}&populate=*`
    );
    return {
      videos: response.data.data,
      pagination: response.data.meta.pagination, // Return data and include pagination data
    };
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Server error"); // Error handling
  }
};
// Get videos by videoType and videoCategory
export const getAllVideoByTypeAndCategory = async (
  page: number = 1,
  videoType: VideoType,
  videoCategorySlug: string,
) => {
  try {
    // Fetch videos with pagination and populate the required fields
    const response = await api.get(
      `api/videos?pagination[page]=${page}&pagination[pageSize]=${process.env.NEXT_PUBLIC_PAGE_LIMIT}&filters[video_type][nameSlug][$eq]=${videoType.nameSlug}${videoCategorySlug !== '*' ? `&filters[video_categories][nameSlug][$eq]=${videoCategorySlug}` : ''
      }&populate=*`
    );
    return {
      videos: response.data.data,
      pagination: response.data.meta.pagination, // Return data and include pagination data
    };
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Server error"); // Error handling
  }
};
// Get videos by nullness of videoUrl
export const getAllVideoByVideoUrlNull = async (): Promise<{ videos: PopulatedVideo[], pagination: PaginationMeta }> => {
  try {
    // Fetch videos with pagination and populate the required fields
    const response = await api.get(
      `api/videos?filters[videoUrl][$null]=true&populate=*`
    );
    return {
      videos: response.data.data,
      pagination: response.data.meta.pagination, // Return data and include pagination data
    };
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Server error"); // Error handling
  }
};

// ***
// APIs for Video Categories
// ***
// Get categories
export const getAllCategories = async () => {
  try {
    const response = await api.get(`api/video-categories?populate=*`); // Route to fetch Categories data
    return {
      categories: response.data.data,
      pagination: response.data.meta.pagination, // Return data and include pagination data
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Server error");
  }
};
// Get category by slug
export const getCategoryBySlug = async (slug: string) => {
  try {
    const response = await api.get(
      `api/video-categories?filters[nameSlug]=${slug}&populate=*`
    ); // Fetch a single category using the slug parameter
    if (response.data.data.length > 0) {
      // If category exists
      return response.data.data[0]; // Return the category data
    }
    throw new Error("Category not found.");
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("Server error");
  }
};
// Get categories by videoType
export const getAllCategoriesByVideoType = async (
  videoType: VideoType,
) => {
  try {
    // Fetch categories with pagination and populate the required fields
    const response = await api.get(
      `api/video-categories?filters[video_types][nameSlug][$eq]=${videoType.nameSlug}&populate=*`
    );
    return {
      categories: response.data.data,
      pagination: response.data.meta.pagination, // Return data and include pagination data
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Server error"); // Error handling
  }
};

// ***
// APIs for Video Types
// ***
// Get all video types
export const getAllVideoTypes = async (): Promise<{ videoTypes: VideoType[], pagination: PaginationMeta }> => {
  try {
    const response = await api.get(`api/video-types?populate=*`);
    return {
      videoTypes: response.data.data as VideoType[],
      pagination: response.data.meta.pagination as PaginationMeta, // Return data and include pagination data
    };
  } catch (error) {
    console.error("Error fetching video types:", error);
    throw new Error("Server error");
  }
};
// Get video type by slug
export const getVideoTypeBySlug = async (slug: string): Promise<VideoType> => {
  try {
    const response = await api.get(
      `api/video-types?filters[nameSlug]=${slug}&populate=*`
    );
    if (response.data.data.length > 0) {
      return response.data.data[0] as VideoType;
    }
    throw new Error("Video type not found.");
  } catch (error) {
    console.error("Error fetching video type:", error);
    throw new Error("Server error");
  }
};

// ***
// APIs for Video Qualities
// ***
// Get qualities
export const getAllQualities = async () => {
  try {
    const response = await api.get(`api/video-categories?populate=*`); // Route to fetch Categories data
    return response.data.data; // Return all categories
  } catch (error) {
    console.error("Error fetching qualitites:", error);
    throw new Error("Server error");
  }
};
// Get quality by slug
export const getQualityBySlug = async (slug: string) => {
  try {
    const response = await api.get(
      `api/video-qualities?filters[nameSlug]=${slug}&populate=*`
    ); // Fetch a single category using the slug parameter
    if (response.data.data.length > 0) {
      // If category exists
      return response.data.data[0]; // Return the category data
    }
    throw new Error("Category not found.");
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("Server error");
  }
};