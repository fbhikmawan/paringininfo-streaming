import Link from 'next/link'

export default function Banner() {
  return (
    <section className="banner-area banner-bg" data-background="/assets/img/banner/banner_bg01.jpg">
      <div className="container custom-container">
        <div className="row">
          <div className="col-xl-6 col-lg-8">
            <div className="banner-content">
              <h6 className="sub-title" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1800">ParinginInfo</h6>
              <h2 className="title" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1800">Unlimited <span>Movie</span>, Series, & More.</h2>
              <div className="banner-meta" data-aos="fade-up" data-aos-delay="600" data-aos-duration="1800">
                <ul>
                  <li className="quality">
                    <span>Pg 18</span>
                    <span>hd</span>
                  </li>
                  <li className="category">
                    <Link href="#">Romance,</Link>
                    <Link href="#">Drama</Link>
                  </li>
                  <li className="release-time">
                    <span><i className="far fa-calendar-alt"></i> 2021</span>
                    <span><i className="far fa-clock"></i> 128 min</span>
                  </li>
                </ul>
              </div>
              <Link href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="banner-btn btn popup-video" data-aos="fade-up" data-aos-delay="800" data-aos-duration="1800"><i className="fas fa-play"></i> Watch Now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}