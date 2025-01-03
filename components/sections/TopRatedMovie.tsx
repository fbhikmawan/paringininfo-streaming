import Image from 'next/image';
import Link from 'next/link';

import imgPoster01 from '../../assets/img/poster/ucm_poster01.jpg'
import imgPoster02 from '../../assets/img/poster/ucm_poster02.jpg'
import imgPoster03 from '../../assets/img/poster/ucm_poster03.jpg'
import imgPoster04 from '../../assets/img/poster/ucm_poster04.jpg'
import imgPoster05 from '../../assets/img/poster/ucm_poster05.jpg'
import imgPoster06 from '../../assets/img/poster/ucm_poster06.jpg'
import imgPoster07 from '../../assets/img/poster/ucm_poster07.jpg'
import imgPoster08 from '../../assets/img/poster/ucm_poster08.jpg'

export default function TopRatedMovie() {
  return (
    <section className="top-rated-movie tr-movie-bg" data-background="/assets/img/bg/tr_movies_bg.jpg">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="section-title text-center mb-50">
                        <span className="sub-title">ONLINE STREAMING</span>
                        <h2 className="title">Top Rated Movies</h2>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="tr-movie-menu-active text-center">
                        <button className="active" data-filter="*">TV Shows</button>
                        <button className="" data-filter=".cat-one">Movies</button>
                        <button className="" data-filter=".cat-two">documentary</button>
                        <button className="" data-filter=".cat-three">sports</button>
                    </div>
                </div>
            </div>
            <div className="row tr-movie-active">
                <div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two">
                    <div className="movie-item mb-60">
                        <div className="movie-poster">
                            <Link href="movie-details"><Image src={ imgPoster01 } alt="" /></Link> 
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
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-one cat-three">
                    <div className="movie-item mb-60">
                        <div className="movie-poster">
                            <Link href="movie-details"><Image src={ imgPoster02 } alt="" /></Link> 
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
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two">
                    <div className="movie-item mb-60">
                        <div className="movie-poster">
                            <Link href="movie-details"><Image src={ imgPoster03 } alt="" /></Link> 
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
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-one cat-three">
                    <div className="movie-item mb-60">
                        <div className="movie-poster">
                            <Link href="movie-details"><Image src={ imgPoster04 } alt="" /></Link> 
                        </div>
                        <div className="movie-content">
                            <div className="top">
                                <h5 className="title"><Link href="movie-details">The Easy Reach</Link> </h5>
                                <span className="date">2021</span>
                            </div>
                            <div className="bottom">
                                <ul>
                                    <li><span className="quality">8K</span></li>
                                    <li>
                                        <span className="duration"><i className="far fa-clock"></i> 128 min</span>
                                        <span className="rating"><i className="fas fa-thumbs-up"></i> 3.5</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two">
                    <div className="movie-item mb-60">
                        <div className="movie-poster">
                            <Link href="movie-details"><Image src={ imgPoster05 } alt="" /></Link> 
                        </div>
                        <div className="movie-content">
                            <div className="top">
                                <h5 className="title"><Link href="movie-details">The Cooking</Link> </h5>
                                <span className="date">2021</span>
                            </div>
                            <div className="bottom">
                                <ul>
                                    <li><span className="quality">3D</span></li>
                                    <li>
                                        <span className="duration"><i className="far fa-clock"></i> 128 min</span>
                                        <span className="rating"><i className="fas fa-thumbs-up"></i> 3.5</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-one cat-three">
                    <div className="movie-item mb-60">
                        <div className="movie-poster">
                            <Link href="movie-details"><Image src={ imgPoster06 } alt="" /></Link> 
                        </div>
                        <div className="movie-content">
                            <div className="top">
                                <h5 className="title"><Link href="movie-details">The Hikaru</Link> </h5>
                                <span className="date">2021</span>
                            </div>
                            <div className="bottom">
                                <ul>
                                    <li><span className="quality">hd</span></li>
                                    <li>
                                        <span className="duration"><i className="far fa-clock"></i> 128 min</span>
                                        <span className="rating"><i className="fas fa-thumbs-up"></i> 3.9</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two">
                    <div className="movie-item mb-60">
                        <div className="movie-poster">
                            <Link href="movie-details"><Image src={ imgPoster07 } alt="" /></Link> 
                        </div>
                        <div className="movie-content">
                            <div className="top">
                                <h5 className="title"><Link href="movie-details">Life Quotes</Link> </h5>
                                <span className="date">2021</span>
                            </div>
                            <div className="bottom">
                                <ul>
                                    <li><span className="quality">4K</span></li>
                                    <li>
                                        <span className="duration"><i className="far fa-clock"></i> 128 min</span>
                                        <span className="rating"><i className="fas fa-thumbs-up"></i> 3.9</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-one cat-three">
                    <div className="movie-item mb-60">
                        <div className="movie-poster">
                            <Link href="movie-details"><Image src={ imgPoster08 } alt="" /></Link> 
                        </div>
                        <div className="movie-content">
                            <div className="top">
                                <h5 className="title"><Link href="movie-details">The Beachball</Link> </h5>
                                <span className="date">2021</span>
                            </div>
                            <div className="bottom">
                                <ul>
                                    <li><span className="quality">4K</span></li>
                                    <li>
                                        <span className="duration"><i className="far fa-clock"></i> 128 min</span>
                                        <span className="rating"><i className="fas fa-thumbs-up"></i> 3.9</span>
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