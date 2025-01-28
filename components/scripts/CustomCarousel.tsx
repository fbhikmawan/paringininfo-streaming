'use client'

// React Multi Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Interface types
import { PopulatedVideo } from '../../types/videos';

interface CustomCarouselProps {
  items: PopulatedVideo[];
  children: (item: PopulatedVideo, index: number) => React.ReactNode;
}

export default function CustomCarousel({ items, children }: CustomCarouselProps) {
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
      centerMode={false}
      responsive={responsive}
      ssr={false}
      infinite={false}
      autoPlay={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={300}
      containerClass="ucm-active"
      itemClass="movie-item mr-3 mb-50 d-flex flex-column"
      arrows={true}
    >
      {items.map((item, index) => children(item, index))}
    </Carousel>
  );
};