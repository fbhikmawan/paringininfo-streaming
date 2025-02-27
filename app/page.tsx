// Template Sections
import Banner from '../components/sections/Banner';
import NewReleases from '../components/sections/NewReleases';
import MostViewedVideos from '../components/sections/MostViewedVideos';
import LiveArea from '../components/sections/LiveArea';

export default function Home() {
  return (
    <>
      <Banner />
      <NewReleases />
      <MostViewedVideos />
      <LiveArea />
    </>
  );
}
