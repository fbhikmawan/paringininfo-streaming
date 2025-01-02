import React, { useEffect, useState } from 'react';
import styles from './ButtonScrollToTop.module.css';

export default function ButtonScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition >= 245);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`${styles.scrollToTop} ${isVisible ? styles.scrollToTopOpen : ''}`}
      onClick={handleClick}
      aria-label="Scroll to Top"
    >
      <i className="fas fa-angle-up"></i>
    </button>
  );
}