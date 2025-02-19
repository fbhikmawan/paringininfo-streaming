import Image from 'next/image';
import Link from 'next/link';

import VideoPlayerModal from '@/components/modals/VideoPlayerModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons';
import { faPlay, faShareAlt } from '@fortawesome/free-solid-svg-icons';

import { PopulatedVideo } from '@/types/videos';

import imgPlayIcon from '@/assets/img/images/play_icon.png'

interface Props {
  video: PopulatedVideo;
}

export default function MovieDetailsArea({ video }: Props) {
  const getLabel = (video: PopulatedVideo) => {
    const labelsMap: Record<string, { text: string }> = {
      movies: { text: 'Must Watch' },
      series: { text: 'Catch Up' },
      sports: { text: 'Top Moments' },
      live: { text: 'Live Now' },
    };
    const config = labelsMap[video.video_type?.nameSlug || ''];
    return video.video_source?.videoLink ? config.text : (video.video_type?.nameSlug !== 'series' ? 'Available Soon' : config.text);
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
                          {video.video_type?.nameSlug !== 'series' ? (
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}