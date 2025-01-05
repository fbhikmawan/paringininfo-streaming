// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import ContentsArea from '../../components/sections/ContentsArea';

export default function Series() {
  return (
    <>
      <BannerPage
        backgroundUrl="/assets/img/bg/breadcrumb_bg.jpg"
        titleParts={['Our', 'Series']}
        activeBreadcrumb="Series"
      />
      <ContentsArea title="Popular Series" />
    </>
  );
}