"use client";

import { useState, Suspense } from "react";
import { VideoType } from "@/types/videos";
import CategoryButtons from "@/components/elements/CategoryButtons";
import VideoList from "@/components/elements/VideoList";

interface Props {
  videoType: VideoType;
}

export default function ContentsArea({ videoType }: Props) {
  const [filter, setFilter] = useState<string>('*');

  return (
    <section className="movie-area movie-bg" style={{ backgroundImage: 'url(/assets/img/bg/movie_bg.jpg)' }}>
      <div className="container">
        <div className="row align-items-end mb-60">
          <div className="col-lg-6">
            <div className="section-title text-center text-lg-left">
              <span className="sub-title">ONLINE STREAMING</span>
              <h2 className="title">{videoType?.contentsAreaTitle}</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <Suspense fallback={<div>Loading...</div>}>
              <CategoryButtons 
                videoType={videoType} 
                filter={filter} 
                onFilterChange={setFilter} 
              />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <VideoList 
            videoType={videoType} 
            filter={filter}
          />
        </Suspense>
      </div>
    </section>
  )
}
