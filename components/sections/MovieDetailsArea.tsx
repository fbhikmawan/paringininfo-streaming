import Image from 'next/image';
import Link from 'next/link';

import imgMovieDetails from '../../assets/img/poster/movie_details_img.jpg'
import imgDownload from '../../assets/fonts/download.svg'
import imgPlayIcon from '../../assets/img/images/play_icon.png'

export default function MovieDetailsArea() {
  return (
    <section className="movie-details-area" data-background="/assets/img/bg/movie_details_bg.jpg">
      <div className="container">
        <div className="row align-items-center position-relative">
          <div className="col-xl-3 col-lg-4">
            <div className="movie-details-img">
              <Image src={ imgMovieDetails } alt="" />
                <Link href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video"><Image src={ imgPlayIcon } alt="" /></Link>
            </div>
          </div>
          <div className="col-xl-6 col-lg-8">
            <div className="movie-details-content">
              <h5>New Episodes</h5>
              <h2>The Easy <span>Reach</span></h2>
              <div className="banner-meta">
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
              <p>Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod tempor.There are many
                variations of passages of lorem
                Ipsum available, but the majority have suffered alteration in some injected humour.</p>
              <div className="movie-details-prime">
                <ul>
                  <li className="share"><Link href="#"><i className="fas fa-share-alt"></i> Share</Link></li>
                  <li className="streaming">
                    <h6>Prime Video</h6>
                    <span>Streaming Channels</span>
                  </li>
                  <li className="watch"><Link href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="btn popup-video"><i className="fas fa-play"></i> Watch Now</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="movie-details-btn">
            <a href="/assets/img/poster/movie_details_img.jpg" className="download-btn" download="">Download <Image src={ imgDownload } alt="" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}