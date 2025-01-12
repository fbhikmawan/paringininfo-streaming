import Link from 'next/link';

interface BannerPageProps {
  backgroundUrl: string;
  titleParts: string[];
  activeBreadcrumb: string;
}

export default function BannerPage({
  backgroundUrl,
  titleParts,
  activeBreadcrumb,
}: BannerPageProps) {
  return (
    <section className="breadcrumb-area breadcrumb-bg" data-background={backgroundUrl}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-content">
              <h2 className="title fs-60">{titleParts[0]} <span>{titleParts[1]}</span></h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{activeBreadcrumb}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}