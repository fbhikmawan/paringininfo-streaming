'use client'

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Template Styles
import "../assets/css/bootstrap.min.css";
import "../assets/css/animate.min.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/fontawesome-all.min.css";
import "../assets/css/owl.carousel.min.css";
import "../assets/css/flaticon.css";
import "../assets/css/odometer.css";
import "../assets/css/slick.css";
import "../assets/css/default.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";

// Template Sections
import Footer from '../components/sections/Footer';

// Template Elements
import ButtonScrollToTop from '../components/elements/ButtonScrollToTop';
import Preloader from '../components/elements/Preloader';

// Template Scripts
import TemplateScripts from '../components/scripts/TemplateScripts';

export default function TemplateLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      mirror: true,
      once: true,
      disable: 'mobile',
    });
  }, []);

  return (
    <>
      <Preloader />
      <ButtonScrollToTop />
      {children}
      <Footer />
      <TemplateScripts />
    </>
  );
}