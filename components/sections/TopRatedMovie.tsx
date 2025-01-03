'use client'

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

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
  { title: "Women's Day", year: 2021, quality: "hd", duration: 128, rating: 3.5, category: ["cat-two"], poster: imgPoster01 },
  { title: "The Perfect Match", year: 2021, quality: "4k", duration: 128, rating: 3.5, category: ["cat-one", "cat-three"], poster: imgPoster02 },
  { title: "The Dog Woof", year: 2021, quality: "hd", duration: 128, rating: 3.5, category: ["cat-two"], poster: imgPoster03 },
  { title: "The Easy Reach", year: 2021, quality: "8K", duration: 128, rating: 3.5, category: ["cat-one", "cat-three"], poster: imgPoster04 },
  { title: "The Cooking", year: 2021, quality: "3D", duration: 128, rating: 3.5, category: ["cat-two"], poster: imgPoster05 },
  { title: "The Hikaru", year: 2021, quality: "hd", duration: 128, rating: 3.9, category: ["cat-one", "cat-three"], poster: imgPoster06 },
  { title: "Life Quotes", year: 2021, quality: "4K", duration: 128, rating: 3.9, category: ["cat-two"], poster: imgPoster07 },
  { title: "The Beachball", year: 2021, quality: "4K", duration: 128, rating: 3.9, category: ["cat-one", "cat-three"], poster: imgPoster08 },
];

export default function TopRatedMovie() {
  const [filter, setFilter] = useState<string>('*');
  const [filteredMovies, setFilteredMovies] = useState<MovieItem[]>(movies);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      filter === '*' || movie.category.includes(filter)
    );
    setFilteredMovies(filtered);
  }, [filter]);

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
              <button onClick={() => setFilter('*')} className={`me-3 ${filter === '*' ? 'active' : ''}`}>All</button>
              <button onClick={() => setFilter('cat-one')} className={`me-3 ${filter === 'cat-one' ? 'active' : ''}`}>Movies</button>
              <button onClick={() => setFilter('cat-two')} className={`me-3 ${filter === 'cat-two' ? 'active' : ''}`}>Series</button>
              <button onClick={() => setFilter('cat-three')} className={`${filter === 'cat-three' ? 'active' : ''}`}>Sports</button>
            </div>
          </div>
        </div>
        <div className="row tr-movie-active">
          {filteredMovies.map((movie, index) => (
            <div key={index} className={`col-xl-3 col-lg-4 col-sm-6 movie-item mb-60 ${movie.category.join(' ')}`}>
              <div className="movie-poster">
                <Link href={`/movie-details/${movie.title.toLowerCase().replace(/\s+/g, '-')}`}><Image src={movie.poster} alt={movie.title} width={300} height={450} /></Link>
              </div>
              <div className="movie-content">
                <div className="top">
                  <h5 className="title"><Link href={`/movie-details/${movie.title.toLowerCase().replace(/\s+/g, '-')}`}>{movie.title}</Link> </h5>
                  <span className="date">{movie.year}</span>
                </div>
                <div className="bottom">
                  <ul>
                    <li><span className={`quality ${movie.quality}`}>{movie.quality.toUpperCase()}</span></li>
                    <li>
                      <span className="duration"><i className="far fa-clock"></i> {movie.duration} min</span>
                      <span className="rating"><i className="fas fa-thumbs-up"></i> {movie.rating}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}