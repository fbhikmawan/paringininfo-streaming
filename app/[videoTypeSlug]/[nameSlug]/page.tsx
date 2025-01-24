import { notFound } from 'next/navigation'

import { Metadata } from 'next';
import MovieDetailsArea from '../../../components/sections/MovieDetailsArea';
import EpisodeArea from '../../../components/sections/EpisodeArea';
import { DataMap } from '../../../types/dataMaps';
import { fetchData } from '../../../lib/videoDataFetcher';
import { truncateText } from '../../../lib/functions';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const data: DataMap = fetchData(['videosDetail']);
  if (!data.videosDetail) {
    return [];
  }
  return data.videosDetail.map((videoDetail) => ({
    params: { videoTypeSlug: videoDetail.type.videoTypeSlug, nameSlug: videoDetail.nameSlug },
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ videoTypeSlug: string; nameSlug: string }>
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

  if (!data.videosDetail || data.videosDetail.length < 1) {
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