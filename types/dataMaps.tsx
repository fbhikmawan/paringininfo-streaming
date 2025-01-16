import { Video, VideoDetail, VideoType, Category, Poster, Quality, Rating } from './videos';

export interface DataMap {
  videos?: Video[] | null;
  videosDetail?: VideoDetail[] | null;
  categories?: Category[] | null;
  qualities?: Quality[] | null;
  ratings?: Rating[] | null;
  posters?: Poster[] | null;
  videoTypes?: VideoType[] | null;
}