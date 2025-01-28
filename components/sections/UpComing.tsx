'use client'

import { useEffect, useState } from 'react';

// Template Scripts
import Fade from '../scripts/Fade';
import CustomCarousel from '../scripts/CustomCarousel';
import CarouselItemUpcoming from '../elements/CarouselItemUpcoming';

import { PopulatedVideo, VideoType } from '@/types/videos';
import { getAllVideoByVideoUrlNull } from '@/lib/api';

const FADE_TIMEOUT = 300;

export default function UpComing() {
  const [activeTab, setActiveTab] = useState<string>('');
  const [fadeState, setFadeState] = useState(true);
  const [videoDetails, setVideoDetails] = useState<PopulatedVideo[]>([]);
  const [videoTypes, setVideoTypes] = useState<VideoType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { videos } = await getAllVideoByVideoUrlNull();
      setVideoDetails(videos);
      
      const filteredVideoTypes = videos.map(video => video.video_type).filter((type, index, self) => type && self.findIndex(t => t?.nameSlug === type?.nameSlug) === index) as VideoType[];
      setVideoTypes(filteredVideoTypes);
  
      if (filteredVideoTypes.length > 0) {
        setActiveTab(filteredVideoTypes[0]?.nameSlug);
      }
    }
    fetchData();
  }, []);

  const handleTabClick = (tab: string) => {
    setFadeState(false);
    setTimeout(() => {
      setActiveTab(tab);
      setFadeState(true);
    }, FADE_TIMEOUT);
  };

  const getActiveItems = (): PopulatedVideo[] => {
    return videoDetails.filter(video => video.video_type?.nameSlug === activeTab);
  };

  if (videoDetails.length === 0) {
    return null;
  }

  return (
    <section className="ucm-area ucm-bg" style={{ backgroundImage: 'url(/assets/img/bg/ucm_bg.jpg)' }}>
      <div className="ucm-bg-shape" style={{ backgroundImage: 'url(/assets/img/bg/ucm_bg_shape.png)' }}></div>
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
                      className={`nav-link ${activeTab === type.nameSlug ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTabClick(type.nameSlug);
                      }}
                      role="tab"
                      aria-controls={type.nameSlug}
                      aria-selected={activeTab === type.nameSlug}
                    >
                      {type.name}
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