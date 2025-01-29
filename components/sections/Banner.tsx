import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Banner() {
  return (
    <section className="banner-area banner-bg">
      <Image src="/assets/img/banner/banner_bg01.jpg" alt="banner" fill style={{ objectFit: 'cover' }} />
      <div className="container custom-container">
        <div className="row">
          <div className="col-xl-6 col-lg-8">
            <div className="banner-content">
              <h6 className="sub-title" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1800">ParinginInfo</h6>
              <h2 className="title" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1800">Unlimited <span>Movie</span>, Series, & More.</h2>
              <div className="banner-meta" data-aos="fade-up" data-aos-delay="600" data-aos-duration="1800">
                <p>Discover a world of endless entertainment with ParinginInfo. <br />Dive into our extensive library of movies, series, and live streams, all available at your fingertips. <br />Experience high-quality streaming and Elevate your entertainment experience!</p>
              </div>
              <Link href="/movies" className="banner-btn btn" data-aos="fade-up" data-aos-delay="800" data-aos-duration="1800"><FontAwesomeIcon icon={faPlay} /> Watch Now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}