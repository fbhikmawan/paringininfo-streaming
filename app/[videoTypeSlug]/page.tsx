import { notFound } from 'next/navigation'

// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import ContentsArea from '../../components/sections/ContentsArea';
import { VideoType } from '../../types/videos';
import videoTypesData from '../../data/types.json';

export default async function VideoTypePage({
  params,
}: {
  params: Promise<{ videoTypeSlug: string }>
}) {
  const videoTypeSlug = (await params).videoTypeSlug
  const videoType = videoTypesData.find((type: VideoType) => type.videoTypeSlug === videoTypeSlug);

  if (!videoType) {
    notFound();
  }

  return (
    <>
      <BannerPage
        backgroundUrl="/assets/img/bg/breadcrumb_bg.jpg"
        titleParts={['Our', videoType.bannerPageTitle]}
        activeBreadcrumb={videoType.bannerPageTitle}
      />
      <ContentsArea title={videoType.contentsAreaTitle} />
    </>
  );
}