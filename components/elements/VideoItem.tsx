import Image from 'next/image';
import Link from 'next/link';
import { PopulatedVideo } from "@/types/videos";

interface VideoItemProps {
  video: PopulatedVideo;
}

export default function VideoItem({ video }: VideoItemProps) {
  return (
    <div className={`col-xl-3 col-lg-4 col-sm-6 movie-item movie-item-three mb-50 ${video.video_categories.map(cat => cat.nameSlug).join(' ')}`}>
      <div className="d-flex flex-column h-100">
        <div className="movie-poster">
          {video.poster && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${video.poster.url}`}
              alt={video.name}
              width={video.poster.width}
              height={video.poster.height}
            />
          )}
          <ul className="overlay-btn">
            <li className="rating">
              {[...Array(Math.floor(video.video_ratings[0]?.score || 0)).keys()].map(() => (
                <i key={Math.random()} className="fas fa-star"></i>
              ))}
            </li>
            <li><Link href={`/${video.video_type?.nameSlug}/${video.nameSlug}`} className="btn">Details</Link></li>
          </ul>
        </div>
        <div className="movie-content">
          <div className="top">
            <h5 className="title"><Link href={`/${video.video_type?.nameSlug}/${video.nameSlug}`}>{video.name}</Link></h5>
            <span className="date">{video.releaseYear}</span>
          </div>
          <div className="bottom">
            <ul>
              <li><span className={`quality ${video.video_quality?.name.toLowerCase()}`}>{video.video_quality?.name.toUpperCase()}</span></li>
              <li>
                <span className="duration"><i className="far fa-clock"></i> {video.duration} min</span>
                <span className="rating"><i className="fas fa-thumbs-up"></i> {(video.video_ratings[0]?.score || 0).toFixed(1)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}