// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import ContentsArea from '../../components/sections/ContentsArea';

export default function Live() {
  return (
    <>
      <BannerPage
        backgroundUrl="/assets/img/bg/breadcrumb_bg.jpg"
        titleParts={['Our', 'Live Streaming']}
        activeBreadcrumb="Live Streaming"
      />
      <ContentsArea title="Live Events" />
    </>
  );
}