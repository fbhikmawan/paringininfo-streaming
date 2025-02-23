import Image from 'next/image';
import Link from 'next/link';
import { PopulatedVideo } from "@/types/videos";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

interface VideoItemProps {
  video: PopulatedVideo;
}

export default function VideoItem({ video }: VideoItemProps) {
  return (
    <div className={`col-xl-3 col-lg-4 col-sm-6 movie-item movie-item-three mb-50 ${video.video_categories.map(cat => cat.nameSlug).join(' ')}`}>
      <Link href={`/${video.video_type?.nameSlug}/${video.nameSlug}`}>
        <div className="d-flex flex-column h-100">
          <div className="movie-poster">
            {video.poster && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${video.poster.url}`}
                alt={video.name}
                width={video.poster?.width}
                height={video.poster?.height}
              />
            )}
            <ul className="overlay-btn">
              <li><div className="btn">Details</div></li>
            </ul>
          </div>
          <div className="movie-content">
            <div className="top">
              <h5 className="title">{video.name}</h5>
              <span className="date">{video.releaseYear}</span>
            </div>
            <div className="bottom">
              <ul>
                <li><span className={`quality ${video.video_quality?.name.toLowerCase()}`}>{video.video_quality?.name.toUpperCase()}</span></li>
                <li>
                  <span className="duration"><FontAwesomeIcon icon={faClock} /> {video.duration} min</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}