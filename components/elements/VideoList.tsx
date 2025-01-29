import { useEffect, useState, useCallback } from "react";
import { getAllVideoByTypeAndCategory } from "@/lib/api";
import { PopulatedVideo, VideoType } from "@/types/videos";
import { PaginationMeta } from "@/types/bases";
import Pagination from "@/components/elements/Pagination";
import VideoItem from "@/components/elements/VideoItem";

interface VideoListProps {
  videoType: VideoType;
  filter: string;
  onPaginationChange: (pagination: PaginationMeta) => void;
}

export default function VideoList({ videoType, filter, onPaginationChange }: VideoListProps) {
  const [filteredVideos, setFilteredVideos] = useState<PopulatedVideo[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>();

  const fetchVideos = useCallback(async (filter: string, page: number) => {
    try {
      const { videos, pagination } = await getAllVideoByTypeAndCategory(page, videoType, filter);
      setFilteredVideos(videos);
      setPagination(pagination);
      onPaginationChange(pagination);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }, [videoType, onPaginationChange]);

  useEffect(() => {
    fetchVideos(filter, 1);
  }, [fetchVideos, filter]);

  return (
    <div className="row tr-movie-active">
      {filteredVideos.map((video) => (
        <VideoItem key={video.nameSlug} video={video} />
      ))}
      {filteredVideos.length === 0 && (
        <div className="col-12">
          <h5>Stay tuned! More exciting content is on the way.</h5>
        </div>
      )}
      {pagination && (
        <Pagination
          meta={pagination}
          onPageChange={(page: number) => fetchVideos(filter, page)}
        />
      )}
    </div>
  );
}