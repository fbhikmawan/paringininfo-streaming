import Image from 'next/image';
import Link from 'next/link';

import VideoPlayerModal from '../modals/VideoPlayerModal';

import { VideoDetail } from '../../types/videos';

import imgDownload from '../../assets/fonts/download.svg'
import imgPlayIcon from '../../assets/img/images/play_icon.png'

interface Props {
  videosDetail: VideoDetail[];
}

export default function MovieDetailsArea({ videosDetail }: Props) {
  const video = videosDetail[0];

  const getLabel = (video: VideoDetail) => {
    const now = new Date();
    const publishedAt = new Date(video.publishedAt);
    const diffDays = Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60 * 24));
    const labelsMap: Record<string, { limit: number; text: string }> = {
      movies: { limit: 30, text: 'New Release' },
      series: { limit: 14, text: 'New Episode' },
      sports: { limit: 14, text: 'New Highlight' },
      live: { limit: 7, text: 'New Stream' },
    };

    const config = labelsMap[video.type.videoTypeSlug];
    if (config && diffDays <= config.limit) {
      return video.videoUrl ? config.text : 'Available Soon';
    }
    return null;
  };

  const label = getLabel(video);

  return (
    <section className="movie-details-area" data-background="/assets/img/bg/movie_details_bg.jpg">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: 'transparent' }}>
            <li className="breadcrumb-item"><Link href={`/${video.type.videoTypeSlug}`}>{video.type.videoType}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{video.name} ({video.releaseYear})</li>
          </ol>
        </nav>
        <div className="row align-items-center position-relative">
          <div className="col-xl-3 col-lg-4 align-self-start">
            <div className="movie-details-img">
              <Image src={video.poster.url} alt={video.name} width={303} height={430}/>
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
                    <span>hd</span>
                  </li>
                  <li className="category">
                    <Link href="#">Romance,</Link>
                    <Link href="#">Drama</Link>
                  </li>
                  <li className="release-time">
                    <span><i className="far fa-calendar-alt"></i> { video.releaseYear }</span>
                    <span><i className="far fa-clock"></i> { video.duration } minutes</span>
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
                  <li className="share"><Link href="#"><i className="fas fa-share-alt"></i> Share</Link></li>
                  <li className="streaming">
                    <h6>Prime Video</h6>
                    <span>Streaming Channels</span>
                  </li>
                  <li className="watch">
                    {video.videoUrl ? (
                      <VideoPlayerModal
                        modalId="videoPlayerModal"
                        videoSrc={video.videoUrl}
                        posterSrc={video.poster.url}
                      >
                        <a
                          className="btn"
                          data-toggle="modal"
                          data-target="#videoPlayerModal"
                        >
                          <i className="fas fa-play"></i> Watch Now
                        </a>
                      </VideoPlayerModal>
                    ) : (
                      <>
                        <a className="btn disabled" href='#'>
                          <i className="fas fa-play"></i> Available Soon
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