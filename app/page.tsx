// Template Sections
import Banner from '../components/sections/Banner';
import UpComing from '../components/sections/UpComing';
import TopRatedMovie from '../components/sections/TopRatedMovie';
import LiveArea from '../components/sections/LiveArea';

export default function Home() {
  return (
    <>
      <Banner />
      <UpComing />
      <TopRatedMovie />
      <LiveArea />
    </>
  );
}
