'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import VideoPlayerModal from '@/components/modals/VideoPlayerModal';
import YouTubeEmbedModal from '@/components/modals/YouTubeEmbedModal';
import AdBannerContent from '@/components/elements/AdBannerContent';
import { incrementViewCount, getSeriesVideoWithEpisodes } from '@/lib/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { PopulatedVideo } from '@/types/videos';

import imgPlayIcon from '@/assets/img/images/play_icon.png'

interface Props {
  video: PopulatedVideo;
}

export default function MovieDetailsArea({ video }: Props) {
  const [durationText, setDurationText] = useState<string>('');

  useEffect(() => {
    incrementViewCount(video.documentId, video.viewCount || 0);

  }, [video.documentId, video.viewCount]);

  useEffect(() => {
      const fetchVideoSeries = async () => {
        try {
          const { videoData } = await getSeriesVideoWithEpisodes(video.documentId);
          const seasonCount = videoData.series_seasons?.length || 0;
          const episodeCount = videoData.series_seasons?.reduce((acc: number, season: { series_episodes: { length: number }[] }) => acc + season.series_episodes.length, 0) || 0;
          setDurationText(`${seasonCount}S, ${episodeCount}E`);
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      };
  
      if (video.video_type?.nameSlug === 'series') {
        fetchVideoSeries();
      } else if (video.video_type?.nameSlug === 'live') {
        setDurationText('Now');
      } else {
        setDurationText(`${video.duration} min`);
      }
    }, [video]);

  const getLabel = (video: PopulatedVideo) => {
    const labelsMap: Record<string, { text: string }> = {
      movies: { text: 'Must Watch' },
      series: { text: 'Catch Up' },
      sports: { text: 'Top Moments' },
      live: { text: 'Live Now' },
    };
    const config = labelsMap[video.video_type?.nameSlug || ''];
    return (video.video_source?.videoLink || video.video_source?.videoObject) ? config.text : (video.video_type?.nameSlug !== 'series' ? 'Available Soon' : config.text);
  };
  const label = getLabel(video);

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <>
      {['trailer', 'video'].map((key, index) => {
        const theObject = key === 'trailer' ? video.video_source?.trailerObject : video.video_source?.videoObject;
        const theLink = key === 'trailer' ? video.video_source?.trailerLink : video.video_source?.videoLink;
        const modalId = key === 'trailer' ? 'trailerModal' : 'videoModal';

        if (theObject) {
          return (
            <VideoPlayerModal
              key={index}
              modalId={modalId}
              videoObject={theObject}
            />
          );
        } else if (theLink) {
          const videoId = extractYouTubeId(theLink);
          return (
            <YouTubeEmbedModal
              key={index}
              modalId={modalId}
              videoId={videoId || ''}
            />
          );
        } else {
          return null;
        }
      })}
      <section className="movie-details-area pb-5">
        <Image src="/assets/img/bg/movie_details_bg.jpg" alt="Movie Details Background" fill style={{ objectFit: 'cover' }} />
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{ backgroundColor: 'transparent' }}>
              <li className="breadcrumb-item"><Link href={`/${video.video_type?.nameSlug}`}>{video.video_type?.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">
                  {video.name} {video.video_type?.nameSlug !== 'live' && `(${video.releaseYear})`}
                </li>
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
                  <Image src={imgPlayIcon} alt={video.name} />
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-8">
              <div className="movie-details-content">
                {label && <h5>{label}</h5>}
                <h2>{video.name}</h2>
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
                      <span><FontAwesomeIcon icon={faCalendarAlt} /> {video.video_type?.nameSlug === 'live' ? 'Live Streaming' : video.releaseYear}</span>
                      <span><FontAwesomeIcon icon={faClock} /> {durationText}</span>
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
                {video.video_type?.nameSlug !== 'series' && (
                  <div className="movie-details-prime">
                    <ul>
                      <li className="streaming">
                        <h6>Prime Video</h6>
                        <span>Streaming Channels</span>
                      </li>                      
                      <li className="watch d-flex">
                        {video.video_source?.trailerObject || video.video_source?.trailerLink ? (
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
                        {video.video_source?.videoObject || video.video_source?.videoLink ? (
                          <a
                            className="btn"
                            data-toggle="modal"
                            data-target="#videoModal"
                          >
                          <FontAwesomeIcon icon={faPlay} /> Watch Now
                          </a>
                        ) : (
                          <>
                            {video.video_type?.nameSlug !== 'series' ? 
                            (
                              <a className="btn disabled" href='#'>
                              <FontAwesomeIcon icon={faPlay} /> Available Soon
                              </a>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
                <AdBannerContent type="leaderboard" dynamic={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}