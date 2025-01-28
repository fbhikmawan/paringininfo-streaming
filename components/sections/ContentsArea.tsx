"use client";

import { useEffect, useState, useCallback } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { getAllVideoByTypeAndCategory, getAllCategoriesByVideoType } from "@/lib/api";
import { PopulatedVideo, VideoType, VideoCategory } from "@/types/videos";
import Loader from "@/components/elements/Loader";
import Pagination from "../elements/Pagination";
import { PaginationMeta } from "@/types/bases";

interface Props {
  title: string;
  videoType: VideoType;
}

export default function ContentsArea({ title, videoType }: Props) {
  const [filter, setFilter] = useState<string>('*');
  const [filteredVideos, setFilteredMovies] = useState<PopulatedVideo[]>([]);
  const [categories, setCategories] = useState<VideoCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>();

  const fetchVideos = useCallback(async (page: number, filter: string) => {
    setLoading(true);
    try {
      const { videos, pagination } = await getAllVideoByTypeAndCategory(page, videoType, filter);
      setFilteredMovies(videos);
      setPagination(pagination);
    } catch (error) {
      setError("Error fetching videos.");
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }, [videoType]);

  const fetchCategories = useCallback(async () => {
    try {
      const { categories } = await getAllCategoriesByVideoType(videoType);
      setCategories(categories);
    } catch (error) {
      setError("Error fetching categories.");
      console.error("Error fetching categories:", error);
    }
  }, [videoType]);

  const handleFilterClick = (filter: string) => {
    setFilter(filter);
    fetchVideos(1, filter);
  };

  useEffect(() => {
    fetchVideos(1, '*');
    fetchCategories();
  }, [fetchVideos, fetchCategories]);

  return (
    <section className="movie-area movie-bg" style={{ backgroundImage: 'url(/assets/img/bg/movie_bg.jpg)' }}>
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
                <button onClick={() => handleFilterClick('*')} className={`me-3 ${filter === '*' ? 'active' : ''}`}>All</button>
                {categories?.map((category: VideoCategory) => (
                  <button 
                    key={category.documentId}
                    onClick={() => handleFilterClick(category.nameSlug)}
                    className={`me-3 ${filter === category.nameSlug ? 'active' : ''}`}
                  >
                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row tr-movie-active">
          {loading && (
            <div className="w-full flex items-center justify-center">
              <Loader />
            </div>
          )}
          {error && <p>{error}</p>}
          {!loading && !error && (
            <>
              {filteredVideos.map((video) => (
                <div key={video.nameSlug} className={`col-xl-3 col-lg-4 col-sm-6 movie-item movie-item-three mb-50 ${video.video_categories.map(cat => cat.nameSlug).join(' ')}`}>
                  <div className="d-flex flex-column h-100">
                    <div className="movie-poster">
                      {video.poster && (
                        <Image 
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${video.poster.url}`}
                          alt={video.name} 
                          width={video.poster.width} 
                          height={video.poster.height} 
                        />
                      )}
                      <ul className="overlay-btn">
                        <li className="rating">
                          {[...Array(Math.floor(video.video_ratings[0]?.score || 0)).keys()].map(() => (
                            <i key={Math.random()} className="fas fa-star"></i>
                          ))}
                        </li>
                        <li><Link href={`/${video.video_type?.nameSlug}/${video.nameSlug}`} className="btn">Details</Link></li>
                      </ul>
                    </div>
                    <div className="movie-content">
                      <div className="top">
                        <h5 className="title"><Link href={`/${video.video_type?.nameSlug}/${video.nameSlug}`}>{video.name}</Link></h5>
                        <span className="date">{video.releaseYear}</span>
                      </div>
                      <div className="bottom">
                        <ul>
                          <li><span className={`quality ${video.video_quality?.name.toLowerCase()}`}>{video.video_quality?.name.toUpperCase()}</span></li>
                          <li>
                            <span className="duration"><i className="far fa-clock"></i> {video.duration} min</span>
                            <span className="rating"><i className="fas fa-thumbs-up"></i> {(video.video_ratings[0]?.score || 0).toFixed(1)}</span>
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
            </>
          )}
        </div>
        {pagination && (
          <Pagination 
            meta={pagination}
            onPageChange={(page: number) => fetchVideos(page, filter)} 
          />
        )}
      </div>
    </section>
  )
}
