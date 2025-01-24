'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { fetchData } from '../../lib/videoDataFetcher';
import { VideoDetail } from '../../types/videos';
import { DataMap } from '../../types/dataMaps';

interface VideoDetailWithRating extends VideoDetail {
  averageRating: number;
}

export default function TopRatedMovie() {  
  const data: DataMap = fetchData(['videosDetail', 'videoTypes']);

  const filteredVideos = (data.videosDetail || []).filter(video => {
    const averageRating = video.ratings.reduce((acc, rating) => acc + rating.score, 0) / video.ratings.length;
    return averageRating > 3;
  }).map(video => {
    const averageRating = video.ratings.reduce((acc, rating) => acc + rating.score, 0) / video.ratings.length;
    return { ...video, averageRating };
  });

  const [activeTab, setActiveTab] = useState<string>('*');
  const [videoDetails, setVideoDetails] = useState<VideoDetailWithRating[]>(filteredVideos);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === '*') {
      setVideoDetails(filteredVideos);
    } else {
      const filtered = filteredVideos.filter((video: VideoDetailWithRating) => video.type.videoTypeSlug === tab);
      setVideoDetails(filtered);
    }
  };

  if (filteredVideos.length === 0) {
    return null;
  }

  return (
    <section className="top-rated-movie tr-movie-bg" data-background="/assets/img/bg/tr_movies_bg.jpg">
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
              {data.videoTypes && data.videoTypes.map((videoType, index) => (
                <button key={index} onClick={() => handleTabClick(videoType.videoTypeSlug)} className={`me-3 ${activeTab === videoType.videoTypeSlug ? 'active' : ''}`}>{videoType.bannerPageTitle}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="row tr-movie-active justify-content-center">
          {videoDetails.map((video, index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-sm-6 movie-item mb-60 d-flex flex-column">
              <div className="movie-poster">
                <Link href={`/${video.type.videoTypeSlug}/${video.nameSlug}`}><Image src={video.poster.url} alt={video.name} width={300} height={450} /></Link>
              </div>
              <div className="movie-content">
                <div className="top">
                  <h5 className="title"><Link href={`/${video.type.videoTypeSlug}/${video.nameSlug}`}>{video.name}</Link> </h5>
                  <span className="date">{video.releaseYear}</span>
                </div>
                <div className="bottom">
                  <ul>
                    <li><span className={`quality ${video.quality}`}>{video.quality.qualityType.toUpperCase()}</span></li>
                    <li>
                      <span className="duration"><i className="far fa-clock"></i> {video.duration} min</span>
                      <span className="rating"><i className="fas fa-thumbs-up"></i> {video.averageRating}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
          {videoDetails.length === 0 && (
            <div className="col-6">
              <h5 className='text-center'>Stay tuned! More exciting content is on the way.</h5>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}