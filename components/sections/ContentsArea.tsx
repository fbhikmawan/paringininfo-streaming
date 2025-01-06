'use client'

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
}

// Import poster images
import imgPoster01 from '../../assets/img/poster/ucm_poster01.jpg'
import imgPoster02 from '../../assets/img/poster/ucm_poster02.jpg'
import imgPoster03 from '../../assets/img/poster/ucm_poster03.jpg'
import imgPoster04 from '../../assets/img/poster/ucm_poster04.jpg'
import imgPoster05 from '../../assets/img/poster/ucm_poster05.jpg'
import imgPoster06 from '../../assets/img/poster/ucm_poster06.jpg'
import imgPoster07 from '../../assets/img/poster/ucm_poster07.jpg'
import imgPoster08 from '../../assets/img/poster/ucm_poster08.jpg'

interface MovieItem {
  title: string;
  year: number;
  quality: string;
  duration: number;
  rating: number;
  category: string[];
  poster: StaticImageData;
}

const movies: MovieItem[] = [
  { title: "Women's Day", year: 2021, quality: "hd", duration: 128, rating: 5, category: ["animation"], poster: imgPoster01 },
  { title: "The Perfect Match", year: 2021, quality: "4k", duration: 128, rating: 4, category: ["action"], poster: imgPoster02 },
  { title: "The Dog Woof", year: 2021, quality: "hd", duration: 128, rating: 3.5, category: ["romantic"], poster: imgPoster03 },
  { title: "The Easy Reach", year: 2021, quality: "hd", duration: 128, rating: 3.5, category: ["action"], poster: imgPoster04 },
  { title: "The Cooking", year: 2021, quality: "hd", duration: 128, rating: 1, category: ["romantic"], poster: imgPoster05 },
  { title: "The Hikaru Night", year: 2021, quality: "hd", duration: 128, rating: 2.5, category: ["animation", "action"], poster: imgPoster06 },
  { title: "Life Quotes", year: 2021, quality: "hd", duration: 128, rating: 1.9, category: ["animation"], poster: imgPoster07 },
  { title: "The Beachball", year: 2021, quality: "hd", duration: 128, rating: 4.5, category: ["action", "romantic"], poster: imgPoster08 },
];

export default function ContentsArea({ title }: Props) {
  const [filter, setFilter] = useState<string>('*');
  const [filteredMovies, setFilteredMovies] = useState<MovieItem[]>(movies);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      filter === '*' || movie.category.includes(filter)
    );
    setFilteredMovies(filtered);
  }, [filter]);

  return (
    <section className="movie-area movie-bg" data-background="/assets/img/bg/movie_bg.jpg">
      <div className="container">
        <div className="row align-items-end mb-60">
          <div className="col-lg-6">
            <div className="section-title text-center text-lg-left">
              <span className="sub-title">ONLINE STREAMING</span>
              <h2 className="title">{title}</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="movie-page-meta">
              <div className="tr-movie-menu-active text-center">
                <button onClick={() => setFilter('*')} className={`me-3 ${filter === '*' ? 'active' : ''}`}>All</button>
                <button onClick={() => setFilter('animation')} className={`me-3 ${filter === 'animation' ? 'active' : ''}`}>Animation</button>
                <button onClick={() => setFilter('action')} className={`me-3 ${filter === 'action' ? 'active' : ''}`}>Action</button>
                <button onClick={() => setFilter('romantic')} className={`${filter === 'romantic' ? 'active' : ''}`}>Romantic</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row tr-movie-active">
          {filteredMovies.map((movie, index) => (
            <div key={index} className={`col-xl-3 col-lg-4 col-sm-6 movie-item movie-item-three mb-50 ${movie.category.join(' ')}`}>
              <div className="movie-poster">
                <Image src={movie.poster} alt={movie.title} width={300} height={450} />
                <ul className="overlay-btn">
                  <li className="rating">
                    {[...Array(Math.floor(movie.rating)).keys()].map(() => (
                      <i key={Math.random()} className="fas fa-star"></i>
                    ))}
                  </li>
                  <li><Link href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="popup-video btn">Watch Now</Link></li>
                  <li><Link href={`/movie-details`} className="btn">Details</Link></li>
                </ul>
              </div>
              <div className="movie-content">
                <div className="top">
                  <h5 className="title"><Link href={`/movie-details`}>{movie.title}</Link></h5>
                  <span className="date">{movie.year}</span>
                </div>
                <div className="bottom">
                  <ul>
                    <li><span className={`quality ${movie.quality}`}>{movie.quality.toUpperCase()}</span></li>
                    <li>
                      <span className="duration"><i className="far fa-clock"></i> {movie.duration} min</span>
                      <span className="rating"><i className="fas fa-thumbs-up"></i> {movie.rating.toFixed(1)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="pagination-wrap mt-30">
              <nav>
                <ul>
                  <li className="active"><Link href="#">1</Link></li>
                  <li><Link href="#">2</Link></li>
                  <li><Link href="#">3</Link></li>
                  <li><Link href="#">4</Link></li>
                  <li><Link href="#">Next</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
