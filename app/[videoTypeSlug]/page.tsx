import { notFound } from 'next/navigation'

// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import ContentsArea from '../../components/sections/ContentsArea';
import { getAllVideoTypes, getVideoTypeBySlug } from "@/lib/api";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const { videoTypes } = await getAllVideoTypes();
  if (!videoTypes || videoTypes.length === 0) {
    return [];
  }
  return videoTypes.map((videoType) => ({
    params: { videoTypeSlug: videoType.nameSlug },
  }));
}

export default async function VideoTypePage({
  params,
}: {
  params: Promise<{ videoTypeSlug: string }>
}) {
  const videoTypeSlug = (await params).videoTypeSlug
  const videoType = await getVideoTypeBySlug(videoTypeSlug);
  
  if (!videoType) {
    notFound();
  }

  return (
    <>
      <BannerPage videoType={videoType} />
      <ContentsArea videoType={videoType} />
    </>
  );
}