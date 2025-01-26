import Image from 'next/image';
import Link from 'next/link';

import { VideoDetail } from '../../types/videos';

interface CustomCarouselProps {
  item: VideoDetail;
}

export default function CustomCarouselItem({ item }: CustomCarouselProps) {
  return (
    <>
      <div className="movie-poster">
        <Link href={`/${item.type.videoTypeSlug}/${item.nameSlug}`}>
          <Image src={item.poster.url} alt={item.name} width={300} height={450} />
        </Link> 
      </div>
      <div className="movie-content">
        <div className="top">
          <h5 className="title"><Link href={`/${item.type.videoTypeSlug}/${item.nameSlug}`}>{item.name}</Link> </h5>
          <span className="date">{item.releaseYear}</span>
        </div>
        <div className="bottom">
          <ul>
            <li><span className="quality">{item.quality.qualityType}</span></li>
            <li>
              <span className="duration"><i className="far fa-clock"></i> {item.duration} min</span>
              <span className="rating"><i className="fas fa-thumbs-up"></i> {item.ratings[0]?.score || 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}