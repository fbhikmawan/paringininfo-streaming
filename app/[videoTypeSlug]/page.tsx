import { notFound } from 'next/navigation'

// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import ContentsArea from '../../components/sections/ContentsArea';
import { DataMap } from '../../types/dataMaps';
import { fetchData } from '../../lib/videoDataFetcher';

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