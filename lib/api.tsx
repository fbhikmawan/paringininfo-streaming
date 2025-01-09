// lib/api.ts
import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_STRAPI_URL}`,
});

export const getAllVideos = async (
  page: number = 1,
  pageLimit: number = 8,
  searchQuery: string = ""
) => {
  try {
    // If search query exists, filter videos based on name
    const searchFilter = searchQuery
      ? `&filters[name][$containsi]=${searchQuery}`
      : ""; // Search filter with the name
    // Fetch videos with pagination and populate the required fields
    const response = await api.get(
      `api/videos?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageLimit}${searchFilter}`
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

// Get post by slug
export const getVideoByName = async (name: string) => {
  try {
    const response = await api.get(
      `api/blogs?filters[name]=${name}&populate=*`
    ); // Fetch a single video using the name parameter
    if (response.data.data.length > 0) {
      // If video exists
      return response.data.data[0]; // Return the video data
    }
    throw new Error("Video not found.");
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Server error");
  }
};

// Get all posts categories
export const getAllCategories = async () => {
  try {
    const response = await api.get("api/categories"); // Route to fetch Categories data
    return response.data.data; // Return all categories
  } catch (error) {
    console.error("Error fetching video:", error);
    throw new Error("Server error");
  }
};
