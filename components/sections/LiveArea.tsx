'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import imgLive from '../../assets/img/images/live_img.png'

interface OdometerProps {
  count: number;
  duration: number;
}

const Odometer: React.FC<OdometerProps> = ({ count, duration = 1000 }) => {
  const [currentCount, setCurrentCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const animate = () => {
      const start = performance.now();

      const animationFrame = (currentTime: number) => {
        const elapsedTime = currentTime - start;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = progress * (2 - progress); // Ease-out quadratic
        const newCount = Math.floor(easedProgress * count);

        setCurrentCount(newCount);

        if (progress < 1) {
          requestAnimationFrame(animationFrame);
        }
      };

      requestAnimationFrame(animationFrame);
      setHasAnimated(true);
    };

    const checkVisibility = () => {
      if (!ref.current || hasAnimated) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate();
            observer?.disconnect(); // Stop observing once animated
          }
        },
        { threshold: 0.1 } // Adjust this value to change when the animation starts
      );

      if (ref.current) {
        observer.observe(ref.current);
      }
    };

    checkVisibility();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [count, duration, hasAnimated]);

  return <span ref={ref}>{currentCount}</span>;
};

export default function LiveArea() {
  return (
    <section className="live-area live-bg fix" data-background="/assets/img/bg/live_bg.jpg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-5 col-lg-6">
            <div className="section-title title-style-two mb-25">
              <span className="sub-title">ONLINE STREAMING</span>
              <h2 className="title">Movies, Series & Live For Friends & Family</h2>
            </div>
            <div className="live-movie-content">
              <p>Discover a world of endless entertainment with ParinginInfo. Whether you&apos;re in the mood for a heartwarming romance, an intense drama, or the latest blockbuster, we&apos;ve got you covered. Dive into our extensive library of movies, series, and live streams, all available at your fingertips. Experience high-quality streaming and never miss a moment of your favorite shows. Elevate your entertainment experience!</p>
              <div className="live-fact-wrap">
                <div className="resolution">
                  <h2>HD</h2>
                </div>
                <div className="active-customer">
                  <h4><Odometer count={50} duration={3000} />+</h4>
                  <p>Active Customer</p>
                </div>
              </div>
              <Link href="/movies" className="btn"><i className="fas fa-play"></i> Watch Now</Link>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6">
            <div className="live-movie-img" data-aos="fade-left" data-aos-delay="200" data-aos-easing="ease-in-quart" data-aos-duration="900" data-aos-once="true">
              <Image src={imgLive} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}