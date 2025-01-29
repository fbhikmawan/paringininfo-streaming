import Link from 'next/link';
import { VideoType } from "@/types/videos";

interface BannerPageProps {
  videoType: VideoType;
}

export default function BannerPage({
  videoType,
}: BannerPageProps) {
  return (
    <section className="breadcrumb-area breadcrumb-bg" style={{ backgroundImage: `url("/assets/img/bg/breadcrumb_bg.jpg")` }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-content">
              <h2 className="title fs-60">Our <span>{videoType.bannerPageTitle}</span></h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{videoType.bannerPageTitle}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}