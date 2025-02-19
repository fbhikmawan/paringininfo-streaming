'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import { PopulatedVideo, Season } from '@/types/videos';
import { getVideoSeasons } from '@/lib/api';

interface Props {
  video: PopulatedVideo;
}

export default function EpisodeArea({ video }: Props) {
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
    async function fetchSeasons() {
      const seasonsData = await getVideoSeasons(video.id);
      console.log('Seasons:', seasonsData);
      setSeasons(seasonsData.seriesSeasons);
    }
    fetchSeasons();
  }, [video.id]);

  return (
    <section className="episode-area episode-bg">
      <Image src="/assets/img/bg/episode_bg.jpg" alt="episode" fill style={{ objectFit: 'cover' }} />
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="movie-episode-wrap">
              <div className="episode-top-wrap">
                <div className="section-title">
                  <span className="sub-title">ONLINE STREAMING</span>
                  <h2 className="title">Watch Full Episode</h2>
                </div>
              </div>
              <div className="episode-watch-wrap">
                <div className="accordion" id="accordionExample">
                  {seasons.map((season) => (
                    <div className="card" key={season.id}>
                      <div className="card-header" id={`heading${season.id}`}>
                        <button className="btn-block text-left" type="button" data-toggle="collapse" data-target={`#collapse${season.id}`} aria-expanded="true" aria-controls={`collapse${season.id}`}>
                          <span className="season">Season {season.seasonNumber}</span>
                          <span className="video-count">{season.series_episodes.length} Full Episodes</span>
                        </button>
                      </div>
                      <div id={`collapse${season.id}`} className="collapse show" aria-labelledby={`heading${season.id}`} data-parent="#accordionExample">
                        <div className="card-body">
                          <ul>
                            {season.series_episodes.map((episode) => (
                              <li key={episode.id}>
                                <a href={episode.video_source?.videoLink} className="popup-video">
                                  <FontAwesomeIcon icon={faPlay} /> Episode {episode.episodeNumber} - {episode.name}
                                </a> 
                                <span className="duration"><FontAwesomeIcon icon={faClock} /> {episode.duration} Min</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="episode-img">
              <Image 
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${video.poster?.url}`}
                alt={video.name} 
                width={video.poster?.width} 
                height={video.poster?.height} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}