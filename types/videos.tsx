import { BaseFields } from './bases'
import { Member } from './members'

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Poster extends BaseFields {
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
  };
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: string | null;
}

export interface Category extends BaseFields {
  categoryType: string;
  videoType: VideoType;
  video?: Video;
}

export interface Quality extends BaseFields {
  qualityType: string;
  videos?: Video[];
}

export interface Rating extends BaseFields {
  score: number;
  member?: Member | null;
  video: Video;
}

export interface VideoType extends BaseFields {
  videoType: string;
  videoTypeSlug?: string;
  videos?: Video[];
}

export interface Video extends BaseFields {
  name: string;
  nameSlug?: string;
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

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface VideoResponse {
  data: Video[];
  meta: Meta;
}

export interface SingleVideoResponse {
  data: Video;
  meta: Meta;
}