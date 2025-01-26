import { BaseFields } from './bases'

export interface Poster extends BaseFields {
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    small: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      url: string;
    };
  } | null;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category extends BaseFields {
  categoryType: string;
  videoType: { documentId: string };
}

export interface Quality extends BaseFields {
  qualityType: string;
  videos?: { documentId: string }[] | null;
}

export interface Rating extends BaseFields {
  score: number;
  member?: { documentId: string } | null;
  video: { documentId: string };
}

export interface VideoType extends BaseFields {
  videoType: string;
  videoTypeSlug: string;
  bannerPageTitle: string;
  contentsAreaTitle: string;
}

export interface Video extends BaseFields {
  name: string;
  nameSlug?: string | null;
  releaseYear: number;
  duration: number;
  videoUrl?: string | null;
  trailerUrl?: string | null;
  description?: Array<{
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }> | null;
  poster: { documentId: string };
  categories: { documentId: string }[];
  ratings: { documentId: string }[];
  quality: { documentId: string };
  type: { documentId: string };
}

export interface VideoDetail extends BaseFields {
  name: string;
  nameSlug?: string | null;
  releaseYear: number;
  duration: number;
  videoUrl?: string | null;
  trailerUrl?: string | null;
  description?: Array<{
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }> | null;
  poster: Poster;
  categories: Category[];
  ratings: Rating[];
  quality: Quality;
  type: VideoType;
}

export interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface VideoResponse {
  data: Video[];
  meta: Meta;
}

export interface SingleVideoResponse {
  data: Video;
  meta: Meta;
}