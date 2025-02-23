'use client'

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { PopulatedVideo, VideoType } from '@/types/videos';
import { getTopViewedVideos } from '@/lib/api';
import VideoItem from '@/components/elements/VideoItem';

export default function MostViewedVideos() {
  const [activeTab, setActiveTab] = useState<string>('*');
  const [initialVideos, setInitialVideos] = useState<PopulatedVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<PopulatedVideo[]>([]);
  const [videoTypes, setVideoTypes] = useState<VideoType[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const { videos } = await getTopViewedVideos();
      setInitialVideos(videos);
      setFilteredVideos(videos);

      const uniqueVideoTypes = videos
        .map(video => video.video_type)
        .filter((type, index, self) => type && self.findIndex(t => t?.nameSlug === type?.nameSlug) === index) as VideoType[];
      setVideoTypes(uniqueVideoTypes);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === '*') {
      setFilteredVideos(initialVideos);
    } else {
      const filtered = initialVideos.filter(video => video.video_type?.nameSlug === tab);
      setFilteredVideos(filtered);
    }
  };

  if (filteredVideos.length === 0) {
    return null;
  }

  return (
    <section className="top-rated-movie tr-movie-bg">
      <Image src="/assets/img/bg/tr_movies_bg.jpg" alt="top rated movie" fill={true} style={{ objectFit: 'cover' }} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-50">
              <span className="sub-title">ONLINE STREAMING</span>
              <h2 className="title">Most Viewed Videos</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="tr-movie-menu-active text-center">
              <button onClick={() => handleTabClick('*')} className={`me-3 ${activeTab === '*' ? 'active' : ''}`}>All</button>
              {videoTypes && videoTypes.map((videoType, index) => (
                <button key={index} onClick={() => handleTabClick(videoType.nameSlug)} className={`me-3 ${activeTab === videoType.nameSlug ? 'active' : ''}`}>{videoType.name}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="row tr-movie-active justify-content-center">
          {filteredVideos.map((video, index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-sm-6 movie-item movie-item-three mb-50">
              <VideoItem video={video} />
            </div>
          ))}
          {filteredVideos.length === 0 && (
            <div className="col-6">
              <h5 className='text-center'>Stay tuned! More exciting content is on the way.</h5>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}