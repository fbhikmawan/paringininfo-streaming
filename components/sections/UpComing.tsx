'use client'

import { useState } from 'react';
import Link from 'next/link'

// Template Scripts
import Fade from '../scripts/Fade';
import CustomCarousel from '../scripts/CustomCarousel';

import imgPoster01 from '../../assets/img/poster/ucm_poster01.jpg'
import imgPoster02 from '../../assets/img/poster/ucm_poster02.jpg'
import imgPoster03 from '../../assets/img/poster/ucm_poster03.jpg'
import imgPoster04 from '../../assets/img/poster/ucm_poster04.jpg'
import imgPoster05 from '../../assets/img/poster/ucm_poster05.jpg'
import imgPoster06 from '../../assets/img/poster/ucm_poster06.jpg'
import imgPoster07 from '../../assets/img/poster/ucm_poster07.jpg'
import imgPoster08 from '../../assets/img/poster/ucm_poster08.jpg'

interface CarouselItem {
  title: string;
  poster: string;
  quality: string;
  duration: number;
  rating: number;
  year: number;
}

const tvShowItems: CarouselItem[] = [
  { title: "Women's Day", poster: imgPoster01.src, quality: "hd", duration: 128, rating: 3.5, year: 2021 },
  { title: "The Perfect Match", poster: imgPoster02.src, quality: "4k", duration: 128, rating: 3.5, year: 2021 },
  { title: "The Dog Woof", poster: imgPoster03.src, quality: "hd", duration: 128, rating: 3.5, year: 2021 },
  { title: "The Easy Reach", poster: imgPoster04.src, quality: "8k", duration: 128, rating: 3.5, year: 2021 },
  { title: "The Cooking", poster: imgPoster05.src, quality: "hd", duration: 128, rating: 3.5, year: 2021 },
];

const movieItems: CarouselItem[] = [
  { title: "The Cooking", poster: imgPoster05.src, quality: "hd", duration: 128, rating: 3.5, year: 2021 },
  { title: "The Hikers", poster: imgPoster06.src, quality: "4k", duration: 128, rating: 3.5, year: 2021 },
  { title: "Life Quotes", poster: imgPoster07.src, quality: "hd", duration: 128, rating: 3.5, year: 2021 },
  { title: "The Beachball", poster: imgPoster08.src, quality: "4k", duration: 128, rating: 3.5, year: 2021 },
  { title: "The Dog Woof", poster: imgPoster03.src, quality: "hd", duration: 128, rating: 3.5, year: 2021 },
];

const animeItems: CarouselItem[] = [
  { title: "Women's Day", poster: imgPoster01.src, quality: "hd", duration: 128, rating: 3.5, year: 2021 },
  { title: "The Perfect Match", poster: imgPoster02.src, quality: "4k", duration: 128, rating: 3.5, year: 2021 },
  { title: "The Dog Woof", poster: imgPoster03.src, quality: "hd", duration: 128, rating: 3.5, year: 2021 },
  { title: "The Easy Reach", poster: imgPoster04.src, quality: "8k", duration: 128, rating: 3.5, year: 2021 },
  { title: "The Cooking", poster: imgPoster05.src, quality: "hd", duration: 128, rating: 3.5, year: 2021 },
];

const FADE_TIMEOUT = 300;

export default function UpComing() {  
  const [activeTab, setActiveTab] = useState<'tvShow' | 'movies' | 'anime'>('tvShow');
  const [fadeState, setFadeState] = useState(true);

  const handleTabClick = (tab: 'tvShow' | 'movies' | 'anime') => {
    setFadeState(false);
    setTimeout(() => {
      setActiveTab(tab);
      setFadeState(true);
    }, FADE_TIMEOUT);
  };

  const getActiveItems = (): CarouselItem[] => {
    switch(activeTab) {
      case 'tvShow':
        return tvShowItems;
      case 'movies':
        return movieItems;
      case 'anime':
        return animeItems;
      default:
        return [];
    }
  };

  return (
    <section className="ucm-area ucm-bg" data-background="/assets/img/bg/ucm_bg.jpg">
      <div className="ucm-bg-shape" data-background="/assets/img/bg/ucm_bg_shape.png"></div>
      <div className="container">
        <div className="row align-items-end mb-55">
          <div className="col-lg-6">
            <div className="section-title text-center text-lg-left">
              <span className="sub-title">ONLINE STREAMING</span>
              <h2 className="title">Upcoming Movies</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ucm-nav-wrap">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <Link 
                    href="#tvShow"
                    className={`nav-link ${activeTab === 'tvShow' ? 'active' : ''}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick('tvShow');
                    }}
                    role="tab" 
                    aria-controls="tvShow" 
                    aria-selected={activeTab === 'tvShow'}
                  >
                    TV Shows
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link 
                    href="#movies"
                    className={`nav-link ${activeTab === 'movies' ? 'active' : ''}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick('movies');
                    }}
                    role="tab" 
                    aria-controls="movies" 
                    aria-selected={activeTab === 'movies'}
                  >
                    Movies
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link 
                    href="#anime"
                    className={`nav-link ${activeTab === 'anime' ? 'active' : ''}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick('anime');
                    }}
                    role="tab" 
                    aria-controls="anime" 
                    aria-selected={activeTab === 'anime'}
                  >
                    Anime
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="activeTab" role="tabpanel" aria-labelledby="activeTab-tab">
            <Fade in={fadeState} timeout={FADE_TIMEOUT}>
              <CustomCarousel items={getActiveItems()} />
            </Fade>
          </div>
        </div>
      </div>
    </section>
  )
}