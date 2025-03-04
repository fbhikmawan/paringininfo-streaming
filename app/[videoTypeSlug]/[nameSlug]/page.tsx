import { notFound } from 'next/navigation'

import { Metadata } from 'next';
import MovieDetailsArea from '@/components/sections/MovieDetailsArea';
import EpisodeArea from '@/components/sections/EpisodeArea';
import { getVideoByTypeAndSlug } from "@/lib/api";
import { truncateText } from '@/lib/functions';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ videoTypeSlug: string; nameSlug: string }>
}): Promise<Metadata> {
  const { videoTypeSlug, nameSlug } = (await params);
  const { video } = await getVideoByTypeAndSlug(videoTypeSlug, nameSlug);
  if (!video) {
    notFound();
  }

  if (video && video.video_type && video.video_categories.length > 0) {
    const videoType = video.video_type;
    const description = video.description?.map(desc => desc.children.map(child => child.text).join(' ')).join(' ') || '';
    const truncatedDescription = truncateText(description, 150);
    const ogImage = video.poster ? (process.env.NEXT_PUBLIC_STRAPI_URL || '') + video.poster.url : '';

    const title = video.video_type?.nameSlug === 'live'
      ? `${video.name} | ${videoType.name} | Sanggam Streaming`
      : `${video.name} (${video.releaseYear}) | ${videoType.name} | Sanggam Streaming`;

    return {
      title,
      description: truncatedDescription,
      keywords: `${video.name}, ${videoType.name}, ParinginInfo, Online Movies, Online Series, Online Sports, Live Streaming`,
      openGraph: {
        title,
        description: truncatedDescription,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: video.name,
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
  const { video } = await getVideoByTypeAndSlug(videoTypeSlug, nameSlug);
  if (!video) {
    notFound();
  }

  return (
    <>
      {video && (
        <MovieDetailsArea video={video} />
      )}
      {videoTypeSlug === 'series' && <EpisodeArea video={video} />}
    </>
  );
}