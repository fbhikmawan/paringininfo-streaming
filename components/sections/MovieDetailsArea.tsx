'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import VideoPlayerModal from '@/components/modals/VideoPlayerModal';
import { getVideoSeasons, getSeasonEpisodes } from '@/lib/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faPlay, faShareAlt } from '@fortawesome/free-solid-svg-icons';

import { PopulatedVideo, Season, Episode } from '@/types/videos';

import imgPlayIcon from '@/assets/img/images/play_icon.png'

interface Props {
  video: PopulatedVideo;
}

export default function MovieDetailsArea({ video }: Props) {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodes, setEpisodes] = useState<{ [key: number]: Episode[] }>({});

  useEffect(() => {
    if (video.video_type?.nameSlug === 'series') {
      async function fetchSeasons() {
        const seasonsData = await getVideoSeasons(video.id);
        setSeasons(seasonsData.seriesSeasons);
        const episodesData: { [key: number]: Episode[] } = {};
        for (const season of seasonsData.seriesSeasons) {
          episodesData[season.id] = (await getSeasonEpisodes(season.id)).seriesEpisodes;
        }
        setEpisodes(episodesData);
      }
      fetchSeasons();
    }
  }, [video.id, video.video_type?.nameSlug]);

  const getLabel = (video: PopulatedVideo) => {
    const now = new Date();
    const publishedAt = new Date(video.publishedAt);
    const diffDays = Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60 * 24));
    const labelsMap: Record<string, { limit: number; text: string }> = {
      movies: { limit: 30, text: 'New Release' },
      series: { limit: 14, text: 'New Episode' },
      sports: { limit: 14, text: 'New Highlight' },
      live: { limit: 7, text: 'New Stream' },
    };
    const config = labelsMap[video.video_type?.nameSlug || ''];
    if (config && diffDays <= config.limit) {
      return video.video_source?.videoLink ? config.text : 'Available Soon';
    }
    return null;
  };
  const label = getLabel(video);

  return (
    <>
      {video.video_source?.trailerObject ? (
        <VideoPlayerModal
          modalId="trailerModal"
          videoObject={video.video_source.trailerObject}
          posterSrc={`${process.env.NEXT_PUBLIC_STRAPI_URL}${video.poster?.url}`}
        >
        </VideoPlayerModal>
      ) : (
        <></>
      )}
      {video.video_source?.videoObject ? (
        <VideoPlayerModal
          modalId="videoModal"
          videoObject={video.video_source.videoObject}
          posterSrc={`${process.env.NEXT_PUBLIC_STRAPI_URL}${video.poster?.url}`}
        >
        </VideoPlayerModal>
      ) : (
        <></>
      )}
      <section className="movie-details-area">
        <Image src="/assets/img/bg/movie_details_bg.jpg" alt="Movie Details Background" fill style={{ objectFit: 'cover' }} />
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{ backgroundColor: 'transparent' }}>
              <li className="breadcrumb-item"><Link href={`/${video.video_type?.nameSlug}`}>{video.video_type?.name}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{video.name} ({video.releaseYear})</li>
            </ol>
          </nav>
          <div className="row align-items-center position-relative">
            <div className="col-xl-3 col-lg-4 align-self-start">
              <div className="movie-details-img">
                <Image 
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${video.poster?.url}`}
                  alt={video.name} 
                  width={video.poster?.width} 
                  height={video.poster?.height} 
                />
                <a
                  className="popup-video"
                  data-toggle="modal"
                  data-target="#videoPlayerModal"
                  data-disabled={!video.video_source?.videoLink}
                >
                  <Image src={imgPlayIcon} alt={ video.name } />
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-8">
              <div className="movie-details-content">
                {label && <h5>{label}</h5>}
                <h2>{ video.name }</h2>
                <div className="banner-meta">
                  <ul>
                    <li className="quality">
                      <span>{video.video_quality?.name.toLowerCase()}</span>
                    </li>
                    <li className="category">
                      {video.video_categories.map((category, index) => (
                        <Link key={index} href="#">
                          {category.name}{index < video.video_categories.length - 1 && ','}
                        </Link>
                      ))}
                    </li>
                    <li className="release-time">
                      <span><FontAwesomeIcon icon={faCalendarAlt} /> { video.releaseYear }</span>
                      <span><FontAwesomeIcon icon={faClock} /> { video.duration } minutes</span>
                    </li>
                  </ul>
                </div>
                {video.description?.map((desc, index) => (
                  <p key={index}>
                    {desc.children.map((child, childIndex) => (
                      <span key={childIndex}>{child.text}</span>
                    ))}
                  </p>
                ))}
                <div className="movie-details-prime">
                  <ul>
                    <li className="share"><Link href="#"><FontAwesomeIcon icon={faShareAlt} /> Share</Link></li>
                    <li className="streaming">
                      <h6>Prime Video</h6>
                      <span>Streaming Channels</span>
                    </li>
                    <li className="watch d-flex">
                      {video.video_source?.trailerLink ? (
                        <a
                          className="btn"
                          data-toggle="modal"
                          data-target="#trailerModal"
                        >
                          <FontAwesomeIcon icon={faPlay} /> Watch Trailer
                        </a>
                      ) : (
                        <></>
                      )}
                      {video.video_source?.videoLink ? (
                        <a
                          className="btn"
                          data-toggle="modal"
                          data-target="#videoModal"
                        >
                          <FontAwesomeIcon icon={faPlay} /> Watch Now
                        </a>
                      ) : (
                        <>
                          <a className="btn disabled" href='#'>
                            <FontAwesomeIcon icon={faPlay} /> Available Soon
                          </a>
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {video.video_type?.nameSlug === 'series' && (
        <section className="episode-area episode-bg" data-background="img/bg/episode_bg.jpg">
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
                              <span className="video-count">{episodes[season.id]?.length} Full Episodes</span>
                            </button>
                          </div>
                          <div id={`collapse${season.id}`} className="collapse show" aria-labelledby={`heading${season.id}`} data-parent="#accordionExample">
                            <div className="card-body">
                              <ul>
                                {episodes[season.id]?.map((episode) => (
                                  <li key={episode.id}>
                                    <a href={episode.video_source?.videoLink} className="popup-video"><i className="fas fa-play"></i> Episode {episode.episodeNumber} - {episode.name}</a>
                                    <span className="duration"><i className="far fa-clock"></i> {episode.duration} Min</span>
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
                  <img src="img/images/episode_img.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}