'use client'

import { useEffect, useState } from 'react';
import Image from "next/image";
import styles from './Preloader.module.css';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`${styles.preloader} ${!isVisible ? styles.fadeOut : ''}`}>
        <div className={styles.loadingCenter}>
          <div className={styles.loadingCenterAbsolute}>
            <Image src="/assets/img/preloader.svg" alt="Preloader" width={80} height={80} priority />
          </div>
        </div>
      </div>
    </>
  );
}