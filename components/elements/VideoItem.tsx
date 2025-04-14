'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PopulatedVideo } from "@/types/videos";
import { getSeriesVideoWithEpisodes } from "@/lib/api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

interface VideoItemProps {
  video: PopulatedVideo;
}


export default function VideoItem({ video }: VideoItemProps) {
  const [durationText, setDurationText] = useState<string>('');

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

  return (
    <Link href={`/${video.video_type?.nameSlug}/${video.nameSlug}`}>
      <div className="d-flex flex-column h-100">
        <div className="movie-poster">
          {video.poster && (
            <Image
              src={`${process.env.STRAPI_URL}${video.poster.url}`}
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
            <span className="date">
              {video.video_type?.nameSlug === 'live' ? 'Live Streaming' : video.releaseYear}
            </span>
          </div>
          <div className="bottom">
            <ul>
              <li><span className={`quality ${video.video_quality?.name.toLowerCase()}`}>{video.video_quality?.name.toUpperCase()}</span></li>
              <li>
                <span className="duration"><FontAwesomeIcon icon={faClock} /> {durationText}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}