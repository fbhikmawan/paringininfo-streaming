'use client'

import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import Link from 'next/link';

interface CarouselItem {
  title: string;
  titleSlug: string;
  videoTypeSlug: string;
  poster: string;
  quality: string;
  duration: number;
  rating: number;
  year: number;
}

interface CustomCarouselProps {
  items: CarouselItem[];
}

export default function CustomCarousel({ items }: CustomCarouselProps) {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);

  useEffect(() => {
    setCarouselItems(items);
  }, [items]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 4,
    },
    laptop: {
      breakpoint: { max: 1200, min: 992 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 992, min: 768 },
      items: 2,
    },
    mobileLarge: {
      breakpoint: { max: 768, min: 575 },
      items: 2,
    },
    mobileSmall: {
      breakpoint: { max: 575, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={false}
      infinite={false}
      autoPlay={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={300}
      containerClass="ucm-active owl-carousel"
      itemClass="carousel-item-padding-40-px mr-2"
      arrows={true}
    >
      {carouselItems.map((item, index) => (
        <div key={index} className="movie-item mb-50">
          <div className="movie-poster">
            <Link href={`/${item.videoTypeSlug}/${item.titleSlug}`}>
              <Image src={item.poster} alt={item.title} width={300} height={450} />
            </Link> 
          </div>
          <div className="movie-content">
            <div className="top">
              <h5 className="title"><Link href={`/${item.videoTypeSlug}/${item.titleSlug}`}>{item.title}</Link> </h5>
              <span className="date">{item.year}</span>
            </div>
            <div className="bottom">
              <ul>
                <li><span className="quality">{item.quality}</span></li>
                <li>
                  <span className="duration"><i className="far fa-clock"></i> {item.duration} min</span>
                  <span className="rating"><i className="fas fa-thumbs-up"></i> {item.rating}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};