import Image from 'next/image';
import Link from 'next/link';

import VideoPlayerModal from '@/components/modals/VideoPlayerModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faPlay, faShareAlt } from '@fortawesome/free-solid-svg-icons';

import { PopulatedVideo } from '@/types/videos';

import imgDownload from '@/assets/fonts/download.svg'
import imgPlayIcon from '@/assets/img/images/play_icon.png'

interface Props {
  video: PopulatedVideo;
}

export default function MovieDetailsArea({ video }: Props) {
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
      return video.videoUrl ? config.text : 'Available Soon';
    }
    return null;
  };
  const label = getLabel(video);

  return (
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
                data-disabled={!video.videoUrl}
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
                    {video.trailerUrl ? (
                      <VideoPlayerModal
                        modalId="trailerModal"
                        videoSrc={video.trailerUrl}
                        posterSrc={`${process.env.NEXT_PUBLIC_STRAPI_URL}${video.poster?.url}`}
                      >
                        <a
                          className="btn"
                          data-toggle="modal"
                          data-target="#trailerModal"
                        >
                          <FontAwesomeIcon icon={faPlay} /> Watch Trailer
                        </a>
                      </VideoPlayerModal>
                    ) : (
                      <></>
                    )}
                    {video.videoUrl ? (
                      <VideoPlayerModal
                        modalId="videoModal"
                        videoSrc={video.videoUrl}
                        posterSrc={`${process.env.NEXT_PUBLIC_STRAPI_URL}${video.poster?.url}`}
                      >
                        <a
                          className="btn"
                          data-toggle="modal"
                          data-target="#videoModal"
                        >
                          <FontAwesomeIcon icon={faPlay} /> Watch Now
                        </a>
                      </VideoPlayerModal>
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
          <div className="movie-details-btn">
            <a href="/assets/img/poster/movie_details_img.jpg" className="download-btn" download="">Download <Image src={imgDownload} alt="" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}