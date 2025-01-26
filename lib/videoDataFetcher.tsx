import { Video, VideoDetail, VideoType, Category, Poster, Quality, Rating } from '../types/videos';
import { DataMap } from '../types/dataMaps';
import rawVideosData from '../data/videos.json';
import rawCategoriesData from '../data/categories.json';
import rawQualitiesData from '../data/qualities.json';
import rawRatingsData from '../data/ratings.json';
import rawPostersData from '../data/posters.json';
import rawVideoTypesData from '../data/types.json';

type DataType = 'videos' | 'videosDetail' | 'categories' | 'qualities' | 'ratings' | 'posters' | 'videoTypes' | 'members';

interface FetchCriteria {
  videoTypeId?: string;
  videoTypeSlug?: string;
  videoId?: string;
  videoNameSlug?: string;
  memberId?: string;
}

export function fetchData(dataTypes: DataType[], criteria: FetchCriteria = {}) {
  const data: Partial<DataMap> = {};

  // Video
  if (dataTypes.includes('videos')) {
    data.videos = rawVideosData.map((video: Video) => ({ ...video }));
  }
  if (dataTypes.includes('videos') && criteria.videoTypeId) {
    data.videos = (data.videos || []).filter((video: Video) => video.type.documentId === criteria.videoTypeId);
  }

  // Category
  if (dataTypes.includes('categories')) {
    data.categories = rawCategoriesData.map((category: Category) => ({ ...category }));
  }
  if (dataTypes.includes('categories') && criteria.videoTypeId) {
    data.categories = (data.categories || []).filter((category: Category) => category.videoType.documentId === criteria.videoTypeId);
  }

  // Quality
  if (dataTypes.includes('qualities')) {
    data.qualities = rawQualitiesData.map((quality: Quality) => ({ ...quality }));
  }
  if (dataTypes.includes('qualities') && criteria.videoId) {
    data.qualities = (data.qualities || []).filter((quality: Quality) =>
      (quality.videos || []).some(video => video.documentId === criteria.videoId)
    );
  }

  // Rating
  if (dataTypes.includes('ratings')) {
    data.ratings = rawRatingsData.map((rating: Rating) => ({ ...rating }));
  }
  if (dataTypes.includes('ratings') && criteria.videoId) {
    data.ratings = (data.ratings || []).filter((rating: Rating) => rating.video.documentId === criteria.videoId);
  }
  if (dataTypes.includes('ratings') && criteria.memberId) {
    data.ratings = (data.ratings || []).filter((rating: Rating) => rating.member?.documentId === criteria.memberId);
  }

  if (dataTypes.includes('posters')) {
    data.posters = rawPostersData.map((poster: Poster) => ({ ...poster }));
  }

  // VideoType
  if (dataTypes.includes('videoTypes')) {
    data.videoTypes = rawVideoTypesData.map((videoType: VideoType) => ({ ...videoType }));
  }
  if (dataTypes.includes('videoTypes') && criteria.videoTypeSlug) {
    const matchingVideoType = (data.videoTypes || []).find((video: VideoType) => video.videoTypeSlug === criteria.videoTypeSlug);
    data.videoTypes = matchingVideoType ? [matchingVideoType] : [];
  }

  // VideoDetail
  if (dataTypes.includes('videosDetail')) {
    const videosData = data.videos || rawVideosData.map((video: Video) => ({ ...video }));
    const categoriesData = data.categories || rawCategoriesData.map((category: Category) => ({ ...category }));
    const qualitiesData = data.qualities || rawQualitiesData.map((quality: Quality) => ({ ...quality }));
    const ratingsData = data.ratings || rawRatingsData.map((rating: Rating) => ({ ...rating }));
    const postersData = data.posters || rawPostersData.map((poster: Poster) => ({ ...poster }));
    const videoTypesData = data.videoTypes || rawVideoTypesData.map((videoType: VideoType) => ({ ...videoType }));

    data.videosDetail = videosData.map((video: Video) => ({
      ...video,
      poster: postersData.find((poster: Poster) => poster.documentId === video.poster.documentId) as Poster,
      categories: video.categories.map(category => categoriesData.find((cat: Category) => cat.documentId === category.documentId)) as Category[],
      ratings: video.ratings.map(videoRating => ratingsData.find((rate: Rating) => rate.documentId === videoRating.documentId)) as Rating[],
      quality: qualitiesData.find((quality: Quality) => quality.documentId === video.quality.documentId) as Quality,
      type: videoTypesData.find((type: VideoType) => type.documentId === video.type.documentId) as VideoType,
    })) as VideoDetail[];
  }
  if (dataTypes.includes('videosDetail') && criteria.videoTypeId) {
    data.videosDetail = (data.videosDetail || []).filter((video: Video) => video.type.documentId === criteria.videoTypeId);
  }
  if (dataTypes.includes('videosDetail') && criteria.videoTypeSlug && criteria.videoNameSlug) {
    data.videosDetail = (data.videosDetail || []).filter((videoDetail: VideoDetail) => {
      const matchesType = criteria.videoTypeSlug ? videoDetail.type.videoTypeSlug === criteria.videoTypeSlug : true;
      const matchesNameSlug = criteria.videoNameSlug ? videoDetail.nameSlug === criteria.videoNameSlug : true;
      return matchesType && matchesNameSlug;
    });
  }

  return data;
}