// Template Sections
import BannerPage from '../../components/sections/BannerPage';
import PricingPlan from '../../components/sections/PricingPlan';
import Newsletter from '../../components/sections/Newsletter';

export default function Pricing() {
  return (
    <>
      <BannerPage
        backgroundUrl="/assets/img/bg/breadcrumb_bg.jpg"
        titleParts={['Our', 'Plan']}
        activeBreadcrumb="Pricing"
      />
      <PricingPlan />
      <Newsletter />
    </>
  );
}