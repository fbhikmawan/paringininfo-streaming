'use client'

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function CustomCarousel({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      ssr={true}
      infinite={true}
      autoPlay={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={300}
      containerClass="ucm-active owl-carousel"
      itemClass="carousel-item-padding-40-px"
      arrows={true}
    >
      {React.Children.map(children, child => (
        <div style={{ margin: '0 30px 0 0' }}>{child}</div>
      ))}
    </Carousel>
  );
};