'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Video, VideoDetail, VideoType, Category, Poster, Quality, Rating } from '../../types/videos'
import rawVideosData from '../../data/videos.json'
import rawCategoriesData from '../../data/categories.json'
import rawQualitiesData from '../../data/qualities.json'
import rawRatingsData from '../../data/ratings.json'
import rawPostersData from '../../data/posters.json'
import rawVideoTypesData from '../../data/types.json'

interface Props {
  title: string;
  videoType: VideoType;
}

const videosData: Video[] = rawVideosData.map(video => ({ ...video }))
const categoriesData: Category[] = rawCategoriesData.map(category => ({ ...category }))
const qualitiesData: Quality[] = rawQualitiesData.map(quality => ({ ...quality }))
const ratingsData: Rating[] = rawRatingsData.map(rating => ({ ...rating }))
const postersData: Poster[] = rawPostersData.map(poster => ({ ...poster }))
const videoTypesData: VideoType[] = rawVideoTypesData.map(videoType => ({ ...videoType }))

export default function ContentsArea({ title, videoType }: Props) {
  const videosOnVideoType = videosData.filter((video: Video) => 
    video.type?.documentId === videoType.documentId
  )
  const categoriesOnVideoType = categoriesData.filter((category:Category) => 
    category.videoType?.documentId === videoType.documentId
  )

  const videosDetailData: VideoDetail[] = videosOnVideoType.map(video => ({
    ...video,
    poster: postersData.find((poster: Poster) => poster.documentId === video.poster.documentId) as Poster,
    categories: video.categories.map(category =>  categoriesOnVideoType.find((cat: Category) => cat.documentId === category.documentId)) as Category[],
    ratings: video.ratings.map(videoRating => ratingsData.find(rate => rate.documentId === videoRating.documentId)) as Rating[],
    quality: qualitiesData.find(quality => quality.documentId === video.quality.documentId) as Quality,
    type: videoTypesData.find(type => type.documentId === video.type.documentId) as VideoType,
  }));

  const [filter, setFilter] = useState<string>('*')
  const [filteredVideos, setFilteredMovies] = useState<VideoDetail[]>(videosDetailData)

  useEffect(() => {
    if (filter === '*') {
      setFilteredMovies(videosDetailData);
    } else {
      const filtered = videosDetailData.filter(movie => {
        const movieCategories = categoriesOnVideoType.filter(cat => 
          movie.categories.some(mc => mc.documentId === cat.documentId)
        );
        return movieCategories.some(cat => cat.categoryType === filter);
      });
      setFilteredMovies(filtered);
    }
  }, [filter])

  return (
    <section className="movie-area movie-bg" data-background="/assets/img/bg/movie_bg.jpg">
      <div className="container">
        <div className="row align-items-end mb-60">
          <div className="col-lg-6">
            <div className="section-title text-center text-lg-left">
              <span className="sub-title">ONLINE STREAMING</span>
              <h2 className="title">{title}</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="movie-page-meta">
              <div className="tr-movie-menu-active text-center">
                <button onClick={() => setFilter('*')} className={`me-3 ${filter === '*' ? 'active' : ''}`}>All</button>
                {categoriesOnVideoType.map((category) => (
                  <button 
                    key={category.documentId}
                    onClick={() => setFilter(category.categoryType)}
                    className={`me-3 ${filter === category.categoryType ? 'active' : ''}`}
                  >
                    {category.categoryType.charAt(0).toUpperCase() + category.categoryType.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row tr-movie-active">
          {filteredVideos.map((movie) => (
            <div key={movie.id} className={`col-xl-3 col-lg-4 col-sm-6 movie-item movie-item-three mb-50 ${movie.categories.map(cat => cat.categoryType).join(' ')}`}>
              <div className="movie-poster">
                {movie.poster && (
                  <Image 
                    src={movie.poster.url} 
                    alt={movie.name} 
                    width={movie.poster.width} 
                    height={movie.poster.height} 
                  />
                )}
                <ul className="overlay-btn">
                  <li className="rating">
                    {[...Array(Math.floor(movie.ratings[0]?.score || 0)).keys()].map(() => (
                      <i key={Math.random()} className="fas fa-star"></i>
                    ))}
                  </li>
                  <li><Link href="#" className="popup-video btn">Watch Now</Link></li>
                  <li><Link href={`/movie-details/${movie.id}`} className="btn">Details</Link></li>
                </ul>
              </div>
              <div className="movie-content">
                <div className="top">
                  <h5 className="title"><Link href={`/movie-details/${movie.id}`}>{movie.name}</Link></h5>
                  <span className="date">{movie.releaseYear}</span>
                </div>
                <div className="bottom">
                  <ul>
                    <li><span className={`quality ${movie.quality?.qualityType.toLowerCase()}`}>{movie.quality?.qualityType.toUpperCase()}</span></li>
                    <li>
                      <span className="duration"><i className="far fa-clock"></i> {movie.duration} min</span>
                      <span className="rating"><i className="fas fa-thumbs-up"></i> {(movie.ratings[0]?.score || 0).toFixed(1)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="pagination-wrap mt-30">
              <nav>
                <ul>
                  <li className="active"><Link href="#">1</Link></li>
                  <li><Link href="#">2</Link></li>
                  <li><Link href="#">3</Link></li>
                  <li><Link href="#">4</Link></li>
                  <li><Link href="#">Next</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
