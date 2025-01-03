import Link from 'next/link'

// Template Elements
import ImageLogo from '../elements/ImageLogo';

export default function Footer() {
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
                      <li><Link href="/">Home</Link></li>
                      <li><Link href="/movies">Movies</Link></li>
                      <li><Link href="/series">Series</Link></li>
                      <li><Link href="/live">Live</Link></li>
                    </ul>
                    <div className="footer-search">
                      <form action="#">
                        <input type="text" placeholder="Find Favorite Movie" />
                        <button type="submit"><i className="fas fa-search"></i></button>
                      </form>
                    </div>
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
                    <li><Link href="/help-center">Help Center</Link></li>
                    <li><Link href="/terms-of-use">Terms of Use</Link></li>
                    <li><Link href="/privacy">Privacy</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5">
                <div className="footer-social">
                  <ul>
                    <li><Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></Link></li>
                    <li><Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></Link></li>
                    <li><Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest-p"></i></Link></li>
                    <li><Link href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></Link></li>
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
                <p>Copyright &copy; {new Date().getFullYear()}. All Rights Reserved By <Link href="/">ParinginInfo</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}