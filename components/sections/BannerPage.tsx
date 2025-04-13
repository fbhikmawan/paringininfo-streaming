import Link from 'next/link';
import Image from 'next/image';
import { getVideoTypeBySlug } from "@/lib/api";
import { Suspense } from 'react'

export default async function BannerPage({
  params,
}: {
  params: Promise<{ videoTypeSlug: string }>
}) {
  const videoTypeSlug = (await params).videoTypeSlug
  const videoType = await getVideoTypeBySlug(videoTypeSlug);

  return (
    <section className="breadcrumb-area breadcrumb-bg">
      <Image src="/assets/img/bg/breadcrumb_bg.jpg" alt="breadcrumb" fill style={{ objectFit: 'cover' }} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-content">
              <Suspense fallback={<h2 className="title fs-60">Our <span>Contents</span></h2>}>
                <h2 className="title fs-60">Our <span>{videoType?.bannerPageTitle}</span></h2>
              </Suspense>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <Suspense fallback={<li className="breadcrumb-item active" aria-current="page">Contents</li>}>
                    <li className="breadcrumb-item active" aria-current="page">{videoType?.bannerPageTitle}</li>
                  </Suspense>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}