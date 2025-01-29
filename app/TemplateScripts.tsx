'use client'

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script'

import AOS from 'aos';
import 'aos/dist/aos.css';

// Template Styles
import "../assets/css/bootstrap.min.css";
import "../assets/css/animate.min.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/flaticon.css";
import "../assets/css/default.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";

export default function TemplateScripts() {
  const [isYtriggered, setisYtriggered] = useState(false);
  const pathname = usePathname();

  const setupScrollToTarget = useCallback(() => {
    const scrollToTargetElements = document.querySelectorAll<HTMLElement>('.scroll-to-target');
    scrollToTargetElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          const targetSelector = element.getAttribute('data-target');
          if (targetSelector) {
            let targetElement: Element | null = null;
            if (targetSelector.startsWith('#')) {
              targetElement = document.getElementById(targetSelector.slice(1));
            } else if (targetSelector.startsWith('.')) {
              targetElement = document.querySelector(targetSelector);
            } else if (/^[a-z]+$/i.test(targetSelector)) {
              targetElement = document.getElementsByTagName(targetSelector)[0];
            } else {
              targetElement = document.querySelector(targetSelector);
            }
            if (targetElement) {
              const duration = 1000;
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
              setTimeout(() => {}, duration);
            }
          }
        });
      }
    });
  }, []);

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
    setupScrollToTarget();
  }, [setupScrollToTarget]);

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
      <Script src="../../assets/js/vendor/jquery-3.6.0.min.js" />
      <Script src="../../assets/js/bootstrap.min.js" />
      <Script src="../../assets/js/popper.min.js" />
    </>
  );
}
