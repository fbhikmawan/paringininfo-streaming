'use client'

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function RuntimeScripts({
  children,
}: {
  children: React.ReactNode
}) {
  const [isYtriggered, setisYtriggered] = useState(false);
  const pathname = usePathname();

  const triggerYposition = useCallback(() => {
    const scrollPosition = window.scrollY;
    setisYtriggered(scrollPosition >= 245);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      mirror: true,
      once: true,
      disable: 'mobile',
    });
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', triggerYposition);
  }, [triggerYposition]);

  useEffect(() => {
    const stickyHeader = document.getElementById('sticky-header');
    const scrollToTargetElements = document.querySelectorAll('.scroll-to-target');
    if (stickyHeader) {
      if (isYtriggered) {
        stickyHeader.classList.add('sticky-menu');
        scrollToTargetElements.forEach(element => element.classList.add('open'));
      } else {
        stickyHeader.classList.remove('sticky-menu');
        scrollToTargetElements.forEach(element => element.classList.remove('open'));
      }
    }
  }, [isYtriggered]);

  return (
    <>
      {children}
    </>
  );
}
