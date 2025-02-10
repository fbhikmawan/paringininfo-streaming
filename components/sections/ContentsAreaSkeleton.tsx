import Image from 'next/image';

export default function ContentsAreaSkeleton() {
  return (
    <section className="movie-area movie-bg">
      <Image src="/assets/img/bg/movie_bg.jpg" alt="movie" fill style={{ objectFit: 'cover' }} />
      <div className="container">
        <div className="row align-items-end mb-60">
          <div className="col-lg-6">
            <div className="section-title text-center text-lg-left">
              <span className="sub-title">ONLINE STREAMING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
