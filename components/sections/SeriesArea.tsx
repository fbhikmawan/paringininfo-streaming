import Image from 'next/image';
import Link from 'next/link';

import imgPoster03 from '../../assets/img/poster/ucm_poster03.jpg'
import imgPoster04 from '../../assets/img/poster/ucm_poster04.jpg'
import imgPoster09 from '../../assets/img/poster/ucm_poster09.jpg'
import imgPoster10 from '../../assets/img/poster/ucm_poster10.jpg'

export default function SeriesArea() {
  return (
    <section className="tv-series-area tv-series-bg" data-background="/assets/img/bg/tv_series_bg.jpg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-50">
              <span className="sub-title">Best Series</span>
              <h2 className="title">World Best Series</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="movie-item mb-50">
              <div className="movie-poster">
                <Link href="movie-details"><Image src={imgPoster09} alt="" /></Link>
              </div>
              <div className="movie-content">
                <div className="top">
                  <h5 className="title"><Link href="movie-details">Women&apos;s Day</Link></h5>
                  <span className="date">2021</span>
                </div>
                <div className="bottom">
                  <ul>
                    <li><span className="quality">hd</span></li>
                    <li>
                      <span className="duration"><i className="far fa-clock"></i> 128 min</span>
                      <span className="rating"><i className="fas fa-thumbs-up"></i> 3.5</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="movie-item mb-50">
              <div className="movie-poster">
                <Link href="movie-details"><Image src={imgPoster10} alt="" /></Link>
              </div>
              <div className="movie-content">
                <div className="top">
                  <h5 className="title"><Link href="movie-details">The Perfect Match</Link></h5>
                  <span className="date">2021</span>
                </div>
                <div className="bottom">
                  <ul>
                    <li><span className="quality">4k</span></li>
                    <li>
                      <span className="duration"><i className="far fa-clock"></i> 128 min</span>
                      <span className="rating"><i className="fas fa-thumbs-up"></i> 3.5</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="movie-item mb-50">
              <div className="movie-poster">
                <Link href="movie-details"><Image src={imgPoster03} alt="" /></Link>
              </div>
              <div className="movie-content">
                <div className="top">
                  <h5 className="title"><Link href="movie-details">The Dog Woof</Link></h5>
                  <span className="date">2021</span>
                </div>
                <div className="bottom">
                  <ul>
                    <li><span className="quality">hd</span></li>
                    <li>
                      <span className="duration"><i className="far fa-clock"></i> 128 min</span>
                      <span className="rating"><i className="fas fa-thumbs-up"></i> 3.5</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="movie-item mb-50">
              <div className="movie-poster">
                <Link href="movie-details"><Image src={imgPoster04} alt="" /></Link>
              </div>
              <div className="movie-content">
                <div className="top">
                  <h5 className="title"><Link href="movie-details">The Easy Reach</Link></h5>
                  <span className="date">2021</span>
                </div>
                <div className="bottom">
                  <ul>
                    <li><span className="quality">hd</span></li>
                    <li>
                      <span className="duration"><i className="far fa-clock"></i> 128 min</span>
                      <span className="rating"><i className="fas fa-thumbs-up"></i> 3.5</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}