// Template Sections
import Banner from '../components/sections/Banner';
import UpComing from '../components/sections/UpComing';
import TopRatedMovie from '../components/sections/TopRatedMovie';
import LiveArea from '../components/sections/LiveArea';
import TvSeriesArea from '../components/sections/TvSeriesArea';
import Newsletter from '../components/sections/Newsletter';

export default function Home() {
  return (
    <>
      <Banner />
      <UpComing />
      <TopRatedMovie />
      <LiveArea />
      <TvSeriesArea />
      <Newsletter />
    </>
  );
}
