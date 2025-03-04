import { notFound } from 'next/navigation'
import { Suspense } from 'react'

// Template Sections
import BannerPage from '@/components/sections/BannerPage';
import BannerPageSkeleton from '@/components/sections/BannerPageSkeleton';
import ContentsAreaSkeleton from '@/components/sections/ContentsAreaSkeleton';
import ContentsArea from '@/components/sections/ContentsArea';
import { getVideoTypeBySlug, getAllCategoriesByVideoType } from "@/lib/api";

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

  const categoriesPromise = getAllCategoriesByVideoType(videoType);

  return (
    <>
      <Suspense fallback={<BannerPageSkeleton />}>
        <BannerPage videoType={videoType} />
      </Suspense>
      <Suspense fallback={<ContentsAreaSkeleton />}>
        <ContentsArea videoType={videoType} categories={categoriesPromise} />
      </Suspense>
    </>
  );
}