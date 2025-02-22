// Template Sections
import Banner from '../components/sections/Banner';
import NewReleases from '../components/sections/NewReleases';
import TopRatedMovie from '../components/sections/TopRatedMovie';
import LiveArea from '../components/sections/LiveArea';

export default function Home() {
  return (
    <>
      <Banner />
      <NewReleases />
      <TopRatedMovie />
      <LiveArea />
    </>
  );
}
