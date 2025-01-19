'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';

// Template Elements
import ImageLogo from '../elements/ImageLogo';

export default function Footer() {
  const pathname = usePathname();

  const isActiveRoute = (path: string): boolean => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <footer>
      <div className="footer-top-wrap">
        <div className="container">
          <div className="footer-menu-wrap">
            <div className="row align-items-center">
              <div className="col-lg-3">
                <div className="footer-logo">
                  <ImageLogo />
                </div>
              </div>
              <div className="col-lg-9">
                <div className="footer-menu">
                  <nav>
                    <ul className="navigation">
                      <li><Link href="/" className={isActiveRoute('/') ? 'active' : ''}>Home</Link></li>
                      <li><Link href="/movies" className={isActiveRoute('/movies') ? 'active' : ''}>Movies</Link></li>
                      <li><Link href="/series" className={isActiveRoute('/series') ? 'active' : ''}>Series</Link></li>
                      <li><Link href="/sports" className={isActiveRoute('/sports') ? 'active' : ''}>Sports</Link></li>
                      <li><Link href="/live" className={isActiveRoute('/live') ? 'active' : ''}>Live</Link></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-quick-link-wrap">
            <div className="row align-items-center">
              <div className="col-md-7">
                <div className="quick-link-list">
                  <ul>
                    <li><Link href="/faq">FAQ</Link></li>
                    <li><Link href="/terms-of-use">Terms of Use</Link></li>
                    <li><Link href="https://paringininfo.com/privacy">Privacy</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5">
                <div className="footer-social">
                  <ul>
                    <li><Link href="#" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                    <li><Link href="#" target="_blank"><i className="fab fa-twitter"></i></Link></li>
                    <li><Link href="#" target="_blank"><i className="fab fa-pinterest-p"></i></Link></li>
                    <li><Link href="#" target="_blank"><i className="fab fa-linkedin-in"></i></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-wrap">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="copyright-text">
                <p>Copyright &copy; {new Date().getFullYear()}. All Rights Reserved By <Link href="https://paringininfo.com" target='_blank'>ParinginInfo</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}