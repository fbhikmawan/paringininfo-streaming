import Link from 'next/link';
import Image from 'next/image';
import { VideoType } from "@/types/videos";

interface BannerPageProps {
  videoType: VideoType;
}

export default function BannerPage({
  videoType,
}: BannerPageProps) {
  return (
    <section className="breadcrumb-area breadcrumb-bg">
      <Image src="/assets/img/bg/breadcrumb_bg.jpg" alt="breadcrumb" fill style={{ objectFit: 'cover' }} />
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