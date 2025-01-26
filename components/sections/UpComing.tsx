'use client'

import { useEffect, useState } from 'react';

// Template Scripts
import Fade from '../scripts/Fade';
import CustomCarousel from '../scripts/CustomCarousel';
import CarouselItemUpcoming from '../elements/CarouselItemUpcoming';

import { fetchData } from '../../lib/videoDataFetcher';
import { VideoDetail, VideoType } from '../../types/videos';
import { DataMap } from '../../types/dataMaps';

const FADE_TIMEOUT = 300;

export default function UpComing() {
  const [activeTab, setActiveTab] = useState<string>('');
  const [fadeState, setFadeState] = useState(true);
  const [videoDetails, setVideoDetails] = useState<VideoDetail[]>([]);
  const [videoTypes, setVideoTypes] = useState<VideoType[]>([]);

  useEffect(() => {
    const data: DataMap = fetchData(['videosDetail', 'videoTypes']);
    const filteredVideos = (data.videosDetail || []).filter(video => video.videoUrl === null);
    setVideoDetails(filteredVideos);
    
    const filteredVideoTypes = data.videoTypes?.filter(type => 
      filteredVideos.some(video => video.type.documentId === type.documentId)
    ) || [];
    setVideoTypes(filteredVideoTypes);

    if (filteredVideoTypes.length > 0) {
      setActiveTab(filteredVideoTypes[0].videoTypeSlug);
    }
  }, []);

  const handleTabClick = (tab: string) => {
    setFadeState(false);
    setTimeout(() => {
      setActiveTab(tab);
      setFadeState(true);
    }, FADE_TIMEOUT);
  };

  const getActiveItems = (): VideoDetail[] => {
    return videoDetails.filter(video => video.type.videoTypeSlug === activeTab);
  };

  if (videoDetails.length === 0) {
    return null;
  }

  return (
    <section className="ucm-area ucm-bg" data-background="/assets/img/bg/ucm_bg.jpg">
      <div className="ucm-bg-shape" data-background="/assets/img/bg/ucm_bg_shape.png"></div>
      <div className="container">
        <div className="row align-items-end mb-55">
          <div className="col-lg-6">
            <div className="section-title text-center text-lg-left">
              <span className="sub-title">ONLINE STREAMING</span>
              <h2 className="title">Upcoming Videos</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ucm-nav-wrap">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {videoTypes.map(type => (
                  <li className="nav-item" role="presentation" key={type.documentId}>
                    <a
                      href='#'
                      className={`nav-link ${activeTab === type.videoTypeSlug ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTabClick(type.videoTypeSlug);
                      }}
                      role="tab"
                      aria-controls={type.videoTypeSlug}
                      aria-selected={activeTab === type.videoTypeSlug}
                    >
                      {type.videoType}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="activeTab" role="tabpanel" aria-labelledby="activeTab-tab">
            <Fade in={fadeState} timeout={FADE_TIMEOUT}>
              <CustomCarousel items={getActiveItems()}>
                {(item, index) => <CarouselItemUpcoming key={index} item={item} />}
              </CustomCarousel>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  )
}