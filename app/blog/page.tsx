// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import BlogArea from '../../components/sections/BlogArea';
import Newsletter from '../../components/sections/Newsletter';

export default function Blog() {
  return (
    <>
      <BannerPage
        backgroundUrl="/assets/img/bg/breadcrumb_bg.jpg"
        titleParts={['News', 'Update']}
        activeBreadcrumb="Blog"
      />
      <BlogArea />
      <Newsletter />
    </>
  );
}