import { notFound } from 'next/navigation'

import { Metadata } from 'next';
import MovieDetailsArea from '../../../components/sections/MovieDetailsArea';
import EpisodeArea from '../../../components/sections/EpisodeArea';
import { DataMap } from '../../../types/dataMaps';
import { fetchData } from '../../../lib/videoDataFetcher';
import { truncateText } from '../../../lib/functions';

export async function generateMetadata({
  params,
}: {
  params: { videoTypeSlug: string; nameSlug: string }
}): Promise<Metadata> {
  const { videoTypeSlug, nameSlug } = (await params);
  const data: DataMap = fetchData(['videosDetail', 'videoTypes'], { videoTypeSlug, videoNameSlug: nameSlug });
  if (!data.videoTypes || data.videoTypes.length < 1 || !data.videosDetail || data.videosDetail.length < 1) {
    notFound();
  }
  if (data.videosDetail && data.videosDetail.length > 0 && data.videoTypes && data.videoTypes.length > 0) {
    const videoDetail = data.videosDetail[0];
    const videoType = data.videoTypes[0];
    const description = videoDetail.description?.map(desc => desc.children.map(child => child.text).join(' ')).join(' ') || '';
    const truncatedDescription = truncateText(description, 150);
    const ogImage = videoDetail.poster.url;

    return {
      title: `${videoDetail.name} (${videoDetail.releaseYear}) | ${videoType.videoType} | ParinginInfo`,
      description: truncatedDescription,
      keywords: `${videoDetail.name}, ${videoType.videoType}, ParinginInfo, Online Movies, Online Series, Online Sports, Live Streaming`,
      openGraph: {
        title: `${videoDetail.name} (${videoDetail.releaseYear}) | ${videoType.videoType} | ParinginInfo`,
        description: truncatedDescription,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: videoDetail.name,
          },
        ],
      },
    };
  }

  return {};
}

export default async function MovieDetails({
  params,
}: {
  params: Promise<{ videoTypeSlug: string; nameSlug: string }>
}) {
  const { videoTypeSlug, nameSlug } = (await params);
  const data: DataMap = fetchData(['videosDetail'], { videoTypeSlug, videoNameSlug: nameSlug });

  if (!data.videoTypes || data.videoTypes.length < 1 || !data.videosDetail || data.videosDetail.length < 1) {
    notFound();
  }

  return (
    <>
      {data.videosDetail && (
        <MovieDetailsArea videosDetail={data.videosDetail} />
      )}
      {videoTypeSlug === 'series' && <EpisodeArea />}
    </>
  );
}