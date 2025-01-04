// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import MoviesArea from '../../components/sections/MoviesArea';

export default function Movies() {
  return (
    <>
      <BannerPage
        backgroundUrl="/assets/img/bg/breadcrumb_bg.jpg"
        titleParts={['Our', 'Movies']}
        activeBreadcrumb="Movies"
      />
      <MoviesArea />
    </>
  );
}