"use client";

import { use, useState } from "react";
import Image from 'next/image';
import { VideoType, VideoCategory, PopulatedVideo } from "@/types/videos";
import { PaginationMeta } from "@/types/bases";
import { getAllVideoByTypeAndCategory } from "@/lib/api";
import Pagination from "@/components/elements/Pagination";
import VideoItem from "@/components/elements/VideoItem";

export default function ContentsArea({
  videoType,
  categories,
  videos,
}: {
  videoType: VideoType,
  categories: Promise<{ categories: VideoCategory[], pagination: PaginationMeta }>,
  videos: Promise<{ videos: PopulatedVideo[], pagination: PaginationMeta }>,
}) {
  const currentCategories = use(categories);
  const currentVideos = use(videos);

  const [filter, setFilter] = useState<string>('*');
  const [filteredVideos, setFilteredVideos] = useState<PopulatedVideo[]>(currentVideos.videos);
  const [currentPagination, setPagination] = useState<PaginationMeta>(currentVideos.pagination);

  const fetchVideos = async (filter: string, page: number) => {
    setFilter(filter);
    try {
      const { videos, pagination } = await getAllVideoByTypeAndCategory(page, videoType, filter);
      setFilteredVideos(videos);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <section className="movie-area movie-bg">
      <Image src="/assets/img/bg/movie_bg.jpg" alt="movie" fill style={{ objectFit: 'cover' }} />
      <div className="container">
        <div className="row align-items-end mb-60">
          <div className="col-lg-6">
            <div className="section-title text-center text-lg-left">
              <span className="sub-title">ONLINE STREAMING</span>
              <h2 className="title">{videoType?.contentsAreaTitle}</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tr-movie-menu-active text-center">
              <button onClick={() => fetchVideos('*', 1)} className={`me-3 ${filter === '*' ? 'active' : ''}`}>All</button>
              {currentCategories.categories.map((category) => (
                <button
                  key={category.documentId}
                  onClick={() => fetchVideos(category.nameSlug, 1)}
                  className={`me-3 ${filter === category.nameSlug ? 'active' : ''}`}
                >
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row tr-movie-active">
          {filteredVideos.map((video) => (
            <div key={video.nameSlug} className='col-xl-3 col-lg-4 col-sm-6 movie-item movie-item-three mb-50' >
              <VideoItem video={video} />
            </div>
          ))}
          {filteredVideos.length === 0 && (
            <div className="col-12">
              <h5>Stay tuned! More exciting content is on the way.</h5>
            </div>
          )}
        </div>
        {currentPagination && (
          <Pagination
            meta={currentPagination}
            onPageChange={(page: number) => fetchVideos(filter, page)}
          />
        )}
      </div>
    </section>
  )
}
