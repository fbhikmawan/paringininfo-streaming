import { notFound } from 'next/navigation'
import { Suspense } from 'react'

// Template Sections
import BannerPage from '@/components/sections/BannerPage';
import BannerPageSkeleton from '@/components/sections/BannerPageSkeleton';
import ContentsArea from '@/components/sections/ContentsArea';
import { getAllVideoTypes, getVideoTypeBySlug } from "@/lib/api";

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
      <Suspense fallback={<BannerPageSkeleton />}>
        <BannerPage videoType={videoType} />
      </Suspense>
      <ContentsArea videoType={videoType} />
    </>
  );
}