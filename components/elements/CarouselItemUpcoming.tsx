import Image from 'next/image';
import Link from 'next/link';

import { PopulatedVideo } from '@/types/videos';

interface CustomCarouselProps {
  item: PopulatedVideo;
}

export default function CustomCarouselItem({ item }: CustomCarouselProps) {
  return (
    <>
      <div className="movie-poster">
        <Link href={`/${item.video_type?.nameSlug}/${item.nameSlug}`}>
          <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.poster?.url}`} alt={item.name} width={item.poster?.width} height={item.poster?.height} />
        </Link> 
      </div>
      <div className="movie-content">
        <div className="top">
          <h5 className="title"><Link href={`/${item.video_type?.nameSlug}/${item.nameSlug}`}>{item.name}</Link> </h5>
          <span className="date">{item.releaseYear}</span>
        </div>
        <div className="bottom">
          <ul>
            <li><span className="quality">{item.video_quality?.name}</span></li>
            <li>
              <span className="duration"><i className="far fa-clock"></i> {item.duration} min</span>
              <span className="rating"><i className="fas fa-thumbs-up"></i> {item.video_ratings[0]?.score || 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}