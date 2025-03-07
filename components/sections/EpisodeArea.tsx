'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faClock } from '@fortawesome/free-solid-svg-icons';

import { PopulatedVideo, Season } from '@/types/videos';
import { getVideoSeasons, getAdBanners } from '@/lib/api';
import VideoPlayerModal from '@/components/modals/VideoPlayerModal';
import YouTubeEmbedModal from '@/components/modals/YouTubeEmbedModal';
import { AdBanner } from '@/types/ads';

interface Props {
  video: PopulatedVideo;
}

export default function EpisodeArea({ video }: Props) {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [randomAdBanner, setRandomAdBanner] = useState<AdBanner | null>(null);

  useEffect(() => {
    async function fetchSeasons() {
      const seasonsData = await getVideoSeasons(video.id);
      setSeasons(seasonsData.seriesSeasons);
    }
    fetchSeasons();
  }, [video.id]);

  useEffect(() => {
    async function fetchAdBanners() {
      const { adBanners } = await getAdBanners();
      if (adBanners.length > 0) {
        const randomBanner = adBanners[Math.floor(Math.random() * adBanners.length)];
        setRandomAdBanner(randomBanner);
      }
    }
    fetchAdBanners();
  }, []);

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <>
      {seasons.flatMap((season) =>
        season.series_episodes.map((episode) => {
          const videoObject = episode.video_source?.videoObject || episode.video_source?.trailerObject;
          const videoLink = episode.video_source?.videoLink || episode.video_source?.trailerLink;
          const modalId = `videoModal${episode.id}`;

          if (videoObject) {
            return (
              <VideoPlayerModal
                key={episode.id}
                modalId={modalId}
                videoObject={videoObject}
              />
            );
          } else if (videoLink) {
            const videoId = extractYouTubeId(videoLink);
            return (
              <YouTubeEmbedModal
                key={episode.id}
                modalId={modalId}
                videoId={videoId || ''}
              />
            );
          } else {
            return null;
          }
        })
      )}
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
                    {seasons.map((season, seasonIndex) => (
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
                              {season.series_episodes.map((episode) => {
                                const videoObject = episode.video_source?.videoObject || episode.video_source?.trailerObject;
                                const videoLink = episode.video_source?.videoLink || episode.video_source?.trailerLink;
                                const modalId = `videoModal${episode.id}`;

                                return (
                                  <li key={episode.id}>
                                    {videoObject ? (
                                      <a
                                        className="popup-video"
                                        data-toggle="modal"
                                        data-target={`#${modalId}`}
                                      >
                                        <FontAwesomeIcon icon={faPlay} /> Episode {episode.episodeNumber} - {episode.name}
                                      </a>
                                    ) : videoLink ? (
                                      <a
                                        className="popup-video"
                                        data-toggle="modal"
                                        data-target={`#${modalId}`}
                                      >
                                        <FontAwesomeIcon icon={faPlay} /> Episode {episode.episodeNumber} - {episode.name}
                                      </a>
                                    ) : (
                                      <span>
                                        <FontAwesomeIcon icon={faPlay} /> Episode {episode.episodeNumber} - {episode.name} (Available Soon)
                                      </span>
                                    )}
                                    <span className="duration"><FontAwesomeIcon icon={faClock} /> {episode.duration} Min</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                        {randomAdBanner && randomAdBanner.banner728x90 && seasonIndex < seasons.length - 1 && (
                          <div className="ad-banner position-relative mt-4">
                            <div className="banner728x90">
                              <a href={randomAdBanner.destinationLink} target="_blank">
                                <Image
                                  className="img-banner"
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${randomAdBanner.banner728x90?.url}`}
                                  alt={randomAdBanner.name}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  style={{
                                    objectFit: 'contain',
                                    objectPosition: 'left',
                                  }}
                                />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {randomAdBanner && randomAdBanner.banner728x90 && seasons.length < 2 && (
                    <div className="ad-banner d-block d-lg-none position-relative mt-4">
                      <div className="banner728x90">
                        <a href={randomAdBanner.destinationLink} target="_blank">
                          <Image
                            className="img-banner"
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${randomAdBanner.banner728x90?.url}`}
                            alt={randomAdBanner.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{
                              objectFit: 'contain',
                              objectPosition: 'left',
                            }}
                          />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-none d-lg-block">
              {randomAdBanner && randomAdBanner.banner160x600 && (
                <div className="ad-banner position-relative mt-4">
                  <div className="banner160x600">
                    <a href={randomAdBanner.destinationLink} target="_blank">
                      <Image
                        className="img-banner"
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${randomAdBanner.banner160x600?.url}`}
                        alt={randomAdBanner.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                          objectFit: 'contain',
                          objectPosition: 'left',
                        }}
                      />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}