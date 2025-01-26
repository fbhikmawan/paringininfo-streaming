import { notFound } from 'next/navigation'

// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import ContentsArea from '../../components/sections/ContentsArea';
import { DataMap } from '../../types/dataMaps';
import { fetchData } from '../../lib/videoDataFetcher';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const data: DataMap = fetchData(['videoTypes']);
  if (!data.videoTypes) {
    return [];
  }
  return data.videoTypes.map((videoType) => ({
    params: { videoTypeSlug: videoType.videoTypeSlug },
  }));
}

export default async function VideoTypePage({
  params,
}: {
  params: Promise<{ videoTypeSlug: string }>
}) {
  const videoTypeSlug = (await params).videoTypeSlug
  const data: DataMap = fetchData(['videoTypes'], { videoTypeSlug: videoTypeSlug });
  
  if (!data.videoTypes || data.videoTypes.length < 1) {
    notFound();
  }

  return (
    <>
      <BannerPage
        backgroundUrl="/assets/img/bg/breadcrumb_bg.jpg"
        titleParts={['Our', data.videoTypes[0].bannerPageTitle]}
        activeBreadcrumb={data.videoTypes[0].bannerPageTitle}
      />
      <ContentsArea title={data.videoTypes[0].contentsAreaTitle} videoType={data.videoTypes[0]} />
    </>
  );
}