// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import ContentsArea from '../../components/sections/ContentsArea';

export default function Movies() {
  return (
    <>
      <BannerPage
        backgroundUrl="/assets/img/bg/breadcrumb_bg.jpg"
        titleParts={['Our', 'Movies']}
        activeBreadcrumb="Movies"
      />
      <ContentsArea title="New Release Movies" />
    </>
  );
}