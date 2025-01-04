// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import BlogDetailsArea from '../../components/sections/BlogDetailsArea';
import Newsletter from '../../components/sections/Newsletter';

export default function BlogDetails() {
  return (
    <>
      <BannerPage
        backgroundUrl="/assets/img/bg/breadcrumb_bg.jpg"
        titleParts={['News', 'Details']}
        activeBreadcrumb="Blog Details"
      />
      <BlogDetailsArea />
      <Newsletter />
    </>
  );
}