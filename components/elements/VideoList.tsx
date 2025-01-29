'use client';

import { useState } from 'react';
import { useAllVideoByTypeAndCategory } from "@/lib/api";
import { VideoType } from "@/types/videos";
import Pagination from "@/components/elements/Pagination";
import VideoItem from "@/components/elements/VideoItem";
import Loader from "@/components/elements/Loader";

interface VideoListProps {
  videoType: VideoType;
  filter: string;
}

export default function VideoList({ videoType, filter }: VideoListProps) {
  const [page, setPage] = useState(1);
  const { videos, pagination , isLoading } = useAllVideoByTypeAndCategory(page, videoType, filter);
  if (isLoading) return <Loader />;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="row tr-movie-active">
      {videos.map((video) => (
        <VideoItem key={video.nameSlug} video={video} />
      ))}
      {videos.length === 0 && (
        <div className="col-12">
          <h5>Stay tuned! More exciting content is on the way.</h5>
        </div>
      )}
      {pagination && (
        <Pagination
          meta={pagination}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
