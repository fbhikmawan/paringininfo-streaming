'use client'

import Image from 'next/image'
import Link from 'next/link'

// Template Scripts
import CustomCarousel from '../scripts/CustomCarousel';

import imgPoster01 from '../../assets/img/poster/ucm_poster01.jpg'
import imgPoster02 from '../../assets/img/poster/ucm_poster02.jpg'
import imgPoster03 from '../../assets/img/poster/ucm_poster03.jpg'
import imgPoster04 from '../../assets/img/poster/ucm_poster04.jpg'
import imgPoster05 from '../../assets/img/poster/ucm_poster05.jpg'
import imgPoster06 from '../../assets/img/poster/ucm_poster06.jpg'
import imgPoster07 from '../../assets/img/poster/ucm_poster07.jpg'
import imgPoster08 from '../../assets/img/poster/ucm_poster08.jpg'

export default function UpComing() {
  return (
    <section className="ucm-area ucm-bg" data-background="/assets/img/bg/ucm_bg.jpg">
      <div className="ucm-bg-shape" data-background="/assets/img/bg/ucm_bg_shape.png"></div>
      <div className="container">
        <div className="row align-items-end mb-55">
          <div className="col-lg-6">
            <div className="section-title text-center text-lg-left">
              <span className="sub-title">ONLINE STREAMING</span>
              <h2 className="title">Upcoming Movies</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ucm-nav-wrap">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <Link className="nav-link active" id="tvShow-tab" data-toggle="tab" href="#tvShow" role="tab" aria-controls="tvShow" aria-selected="true">TV Shows</Link> 
                </li>
                <li className="nav-item" role="presentation">
                  <Link className="nav-link" id="movies-tab" data-toggle="tab" href="#movies" role="tab" aria-controls="movies" aria-selected="false">Movies</Link> 
                </li>
                <li className="nav-item" role="presentation">
                  <Link className="nav-link" id="anime-tab" data-toggle="tab" href="#anime" role="tab" aria-controls="anime" aria-selected="false">Anime</Link> 
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="tvShow" role="tabpanel" aria-labelledby="tvShow-tab">
            <CustomCarousel>
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster01} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">Women&apos;s Day</Link> </h5>
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
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster02} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Perfect Match</Link> </h5>
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
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster03} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Dog Woof</Link> </h5>
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
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster04} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Easy Reach</Link> </h5>
                    <span className="date">2021</span>
                  </div>
                  <div className="bottom">
                    <ul>
                      <li><span className="quality">8k</span></li>
                      <li>
                        <span className="duration"><i className="far fa-clock"></i> 128 min</span>
                        <span className="rating"><i className="fas fa-thumbs-up"></i> 3.5</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster05} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Cooking</Link> </h5>
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
            </CustomCarousel>
          </div>
          <div className="tab-pane fade" id="movies" role="tabpanel" aria-labelledby="movies-tab">
            <CustomCarousel>
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster05} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Cooking</Link> </h5>
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
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster06} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Hikers</Link> </h5>
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
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster07} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">Life Quotes</Link> </h5>
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
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster08} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Beachball</Link> </h5>
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
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster03} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Dog Woof</Link> </h5>
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
            </CustomCarousel>
          </div>
          <div className="tab-pane fade" id="anime" role="tabpanel" aria-labelledby="anime-tab">
            <CustomCarousel>
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster01} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">Women&apos;s Day</Link> </h5>
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
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster02} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Perfect Match</Link> </h5>
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
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster03} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Dog Woof</Link> </h5>
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
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster04} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Easy Reach</Link> </h5>
                    <span className="date">2021</span>
                  </div>
                  <div className="bottom">
                    <ul>
                      <li><span className="quality">8k</span></li>
                      <li>
                        <span className="duration"><i className="far fa-clock"></i> 128 min</span>
                        <span className="rating"><i className="fas fa-thumbs-up"></i> 3.5</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="movie-item mb-50">
                <div className="movie-poster">
                  <Link href="movie-details"><Image src={imgPoster05} alt="" /></Link> 
                </div>
                <div className="movie-content">
                  <div className="top">
                    <h5 className="title"><Link href="movie-details">The Cooking</Link> </h5>
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
            </CustomCarousel>
          </div>
        </div>
      </div>
    </section>
  )
}