// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import ContentsArea from '../../components/sections/ContentsArea';

export default function Sports() {
  return (
    <>
      <BannerPage
        backgroundUrl="/assets/img/bg/breadcrumb_bg.jpg"
        titleParts={['Our', 'Sport Videos']}
        activeBreadcrumb="Sport Videos"
      />
      <ContentsArea title="Latest Sport Highlights" />
    </>
  );
}