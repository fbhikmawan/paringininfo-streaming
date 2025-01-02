import Link from 'next/link'

// Template Elements
import ImageLogo from '../elements/ImageLogo';

export default function Header() {
  return (
    <header>
      <div id="sticky-header" className="menu-area transparent-header">
        <div className="container custom-container">
          <div className="row">
            <div className="col-12">
              <div className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
              <div className="menu-wrap">
                <nav className="menu-nav show">
                  <div className="logo">
                    <ImageLogo />
                  </div>
                  <div className="navbar-wrap main-menu d-none d-lg-flex">
                    <ul className="navigation">
                      <li className="active menu-item-has-children"><Link href="#">Home</Link>
                        <ul className="submenu">
                          <li className="active"><Link href="index-2.html">Home One</Link></li>
                          <li><Link href="index-3.html">Home Two</Link></li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children"><Link href="#">Movie</Link>
                        <ul className="submenu">
                          <li><Link href="movie.html">Movie</Link></li>
                          <li><Link href="movie-details.html">Movie Details</Link></li>
                        </ul>
                      </li>
                      <li><Link href="tv-show.html">tv show</Link></li>
                      <li><Link href="pricing.html">Pricing</Link></li>
                      <li className="menu-item-has-children"><Link href="#">blog</Link>
                        <ul className="submenu">
                          <li><Link href="blog.html">Our Blog</Link></li>
                          <li><Link href="blog-details.html">Blog Details</Link></li>
                        </ul>
                      </li>
                      <li><Link href="contact.html">contacts</Link></li>
                    </ul>
                  </div>
                  <div className="header-action d-none d-md-block">
                    <ul>
                      <li className="header-search"><Link href="#" data-toggle="modal" data-target="#search-modal"><i className="fas fa-search"></i></Link></li>
                      <li className="header-lang">
                        <form action="#">
                          <div className="icon"><i className="flaticon-globe"></i></div>
                          <select id="lang-dropdown">
                            <option value="">En</option>
                            <option value="">Au</option>
                            <option value="">AR</option>
                            <option value="">TU</option>
                          </select>
                        </form>
                      </li>
                      <li className="header-btn"><Link href="#" className="btn">Sign In</Link></li>
                    </ul>
                  </div>
                </nav>
              </div>

              {/* Mobile Menu */}
              <div className="mobile-menu">
                <div className="close-btn"><i className="fas fa-times"></i></div>

                <nav className="menu-box">
                  <div className="nav-logo">
                    <ImageLogo />
                  </div>
                  <div className="menu-outer">
                    {/* Menu will come automatically via JavaScript */}
                  </div>
                  <div className="social-links">
                    <ul className="clearfix">
                      <li><Link href="#"><span className="fab fa-twitter"></span></Link></li>
                      <li><Link href="#"><span className="fab fa-facebook-square"></span></Link></li>
                      <li><Link href="#"><span className="fab fa-pinterest-p"></span></Link></li>
                      <li><Link href="#"><span className="fab fa-instagram"></span></Link></li>
                      <li><Link href="#"><span className="fab fa-youtube"></span></Link></li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="menu-backdrop"></div>
              {/* End Mobile Menu */}

              {/* Modal Search */}
              <div className="modal fade" id="search-modal" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <form>
                      <input type="text" placeholder="Search here..." />
                      <button><i className="fas fa-search"></i></button>
                    </form>
                  </div>
                </div>
              </div>
              {/* Modal Search-end */}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}