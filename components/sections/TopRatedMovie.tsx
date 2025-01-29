'use client'

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PopulatedVideo, VideoType } from '@/types/videos';
import { getAllVideo } from '@/lib/api';

interface PopulatedVideoWithRating extends PopulatedVideo {
  averageRating: number;
}

export default function TopRatedMovie() {
  const [activeTab, setActiveTab] = useState<string>('*');
  const [filteredVideos, setFilteredVideos] = useState<PopulatedVideoWithRating[]>([]);
  const [videoTypes, setVideoTypes] = useState<VideoType[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const { videos } = await getAllVideo();
      const filteredVideos = videos
        .map(video => {
          const averageRating = video.video_ratings.reduce((acc, rating) => acc + rating.score, 0) / video.video_ratings.length;
          return { ...video, averageRating };
        })
        .filter(video => video.averageRating > 3 && video.videoUrl !== null);
      setFilteredVideos(filteredVideos);

      const uniqueVideoTypes = filteredVideos
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
      setFilteredVideos(filteredVideos);
    } else {
      const filtered = filteredVideos.filter(video => video.video_type?.nameSlug === tab);
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
              <h2 className="title">Top Rated Movies</h2>
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
            <div key={index} className="col-xl-3 col-lg-4 col-sm-6 movie-item mb-60 d-flex flex-column">
              <div className="movie-poster">
                <Link href={`/${video.video_type?.nameSlug}/${video.nameSlug}`}>
                  <Image 
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${video.poster?.url}`}
                  alt={video.name} 
                  width={video.poster?.width} 
                  height={video.poster?.height} />
                </Link>
              </div>
              <div className="movie-content">
                <div className="top">
                  <h5 className="title">
                    <Link href={`/${video.video_type?.nameSlug}/${video.nameSlug}`}>
                      {video.name}
                    </Link> 
                  </h5>
                  <span className="date">{video.releaseYear}</span>
                </div>
                <div className="bottom">
                  <ul>
                    <li><span className={`quality ${video.video_quality?.nameSlug}`}>{video.video_quality?.name.toUpperCase()}</span></li>
                    <li>
                      <span className="duration"><i className="far fa-clock"></i> {video.duration} min</span>
                      <span className="rating"><i className="fas fa-thumbs-up"></i> {video.averageRating}</span>
                    </li>
                  </ul>
                </div>
              </div>
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