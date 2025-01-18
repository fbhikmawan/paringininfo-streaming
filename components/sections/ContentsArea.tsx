'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Video, VideoDetail, VideoType, Category } from '../../types/videos';
import { DataMap } from '../../types/dataMaps';
import { fetchData } from '../../lib/videoDataFetcher';

interface Props {
  title: string;
  videoType: VideoType;
}

export default function ContentsArea({ title, videoType }: Props) {
  const data: DataMap = fetchData(['videosDetail', 'categories'], { videoTypeId: videoType.documentId });

  const [filter, setFilter] = useState<string>('*');
  const [filteredVideos, setFilteredMovies] = useState<VideoDetail[]>(data.videosDetail || []);

  useEffect(() => {
    if (filter === '*') {
      setFilteredMovies(data.videosDetail || []);
    } else {
      const filtered = (data.videosDetail || []).filter((video: Video) => {
        const movieCategories = (data.categories || []).filter((cat: Category) => 
          video.categories.some(mc => mc.documentId === cat.documentId)
        );
        return movieCategories.some((cat: Category) => cat.categoryType === filter);
      });
      setFilteredMovies(filtered);
    }
  }, [filter]);

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
                {(data.categories || []).map((category: Category) => (
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
              <div className="d-flex flex-column h-100">
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
                    <li><Link href={`/${movie.type.videoTypeSlug}/${movie.nameSlug}`} className="btn">Details</Link></li>
                  </ul>
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href={`/${movie.type.videoTypeSlug}/${movie.nameSlug}`}>{movie.name}</Link></h5>
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
            </div>
          ))}
          {filteredVideos.length === 0 && (
            <div className="col-12">
                <h5>Stay tuned! More exciting content is on the way.</h5>
            </div>
          )}
        </div>
        {/* <div className="row">
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
        </div> */}
      </div>
    </section>
  )
}
