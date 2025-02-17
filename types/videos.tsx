import { BaseFields, DescriptionElement, Image, PaginationMeta } from './bases'

export interface VideoRating extends BaseFields {
  score: number;
}

export interface VideoSource extends BaseFields {
  name: string;
  video?: Video;
  videoLink?: string;
  trailerLink?: string;
  videoObject?: string;
  trailerObject?: string;
}

export interface VideoType extends BaseFields {
  name: string;
  nameSlug: string;
  bannerPageTitle: string;
  contentsAreaTitle: string;
}

export interface VideoCategory extends BaseFields {
  name: string;
  nameSlug: string;
}
export interface PopulatedVideoCategory extends VideoCategory {
  videos: Video[];
  video_types: VideoType[];
}

export interface VideoQuality extends BaseFields {
  name: string;
  nameSlug: string;
}

export interface Episode extends BaseFields {
  name: string;
  episodeNumber: number;
  duration: number;
  video_source?: VideoSource;
  series_season?: Season;
}

export interface Season extends BaseFields {
  name: string;
  seasonNumber: number;
  series_episodes: Episode[];
  video?: Video;
}

export interface Video extends BaseFields {
  name: string;
  releaseYear: number;
  duration: number;
  nameSlug: string;
  description: DescriptionElement[];
}

export interface PopulatedVideo extends Video {
  poster?: Image;
  video_type?: VideoType;
  video_ratings: VideoRating[];
  video_categories: VideoCategory[];
  video_quality?: VideoQuality;
  video_source?: VideoSource;
  series_seasons?: Season[];
}

export interface VideosApiResponse {
  data: Video[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface PopulatedVideosApiResponse {
  data: PopulatedVideo[];
  meta: {
    pagination: PaginationMeta;
  };
}