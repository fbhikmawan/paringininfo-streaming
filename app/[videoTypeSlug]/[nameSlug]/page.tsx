import { notFound } from 'next/navigation'

import { Metadata } from 'next';
import MovieDetailsArea from '@/components/sections/MovieDetailsArea';
import EpisodeArea from '@/components/sections/EpisodeArea';
import { getAllVideoByType, getVideoByTypeAndSlug } from "@/lib/api";
import { PopulatedVideo } from "@/types/videos";
import { truncateText } from '@/lib/functions';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams({
  params,
}: {
  params: Promise<{ videoTypeSlug: string; nameSlug: string }>
}) {
  const { videoTypeSlug } = (await params);
  const { videos } = await getAllVideoByType(videoTypeSlug);
  if (!videos || videos.length === 0) {
    return [];
  }
  return videos.map((video: PopulatedVideo) => ({
    params: { videoTypeSlug: video.video_type?.nameSlug, nameSlug: video.nameSlug },
  }));
}

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

    return {
      title: `${video.name} (${video.releaseYear}) | ${videoType.name} | ParinginInfo`,
      description: truncatedDescription,
      keywords: `${video.name}, ${videoType.name}, ParinginInfo, Online Movies, Online Series, Online Sports, Live Streaming`,
      openGraph: {
        title: `${video.name} (${video.releaseYear}) | ${videoType.name} | ParinginInfo`,
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
      {videoTypeSlug === 'series' && <EpisodeArea />}
    </>
  );
}