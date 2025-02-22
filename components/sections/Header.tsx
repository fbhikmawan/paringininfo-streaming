'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitter, faPinterestP, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

// Template Elements
import ImageLogo from '@/components/elements/ImageLogo';

export default function Header() {
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const setupMobileMenu = () => {
      if (!mobileMenuRef.current || !backdropRef.current) return;

      // Duplicate main menu content to mobile menu
      const mainMenu = document.querySelector('.menu-area .main-menu');
      const mobileMenuOuter = mobileMenuRef.current.querySelector('.menu-outer');
      if (mainMenu && mobileMenuOuter) {
        mobileMenuOuter.innerHTML = mainMenu.innerHTML;
      }

      // Append dropdown buttons
      const menuItemsWithChildren = mobileMenuRef.current.querySelectorAll('.menu-item-has-children');
      menuItemsWithChildren.forEach(item => {
        const dropdownBtn = document.createElement('div');
        dropdownBtn.className = 'dropdown-btn';
        dropdownBtn.innerHTML = '<span class="fas fa-angle-down"></span>';
        item.appendChild(dropdownBtn);

        dropdownBtn.addEventListener('click', function(this: HTMLElement) {
          this.classList.toggle('open');
          const submenu = item.querySelector('ul');
          if (submenu) {
            if (this.classList.contains('open')) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`;
              submenu.style.opacity = '1';
            } else {
              submenu.style.maxHeight = '0px';
              submenu.style.opacity = '0';
            }
          }
        });
      });

      // Toggle mobile menu visibility
      const toggleMobileMenu = (isVisible: boolean) => {
        document.body.classList.toggle('mobile-menu-visible', isVisible);
      };

      // Add click listeners
      const mobileNavToggler = document.querySelector('.mobile-nav-toggler');
      if (mobileNavToggler) {
        mobileNavToggler.addEventListener('click', () => toggleMobileMenu(true));
      }

      backdropRef.current.addEventListener('click', () => toggleMobileMenu(false));

      const closeBtn = mobileMenuRef.current.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => toggleMobileMenu(false));
      }
    };

    setupMobileMenu();
  }, []);
  
  const isActiveRoute = (path: string): boolean => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header>
      <div id="sticky-header" className="menu-area transparent-header">
        <div className="container custom-container">
          <div className="row">
            <div className="col-12">
              <div className="mobile-nav-toggler"><FontAwesomeIcon icon={faBars} /></div>
              <div className="menu-wrap">
                <nav className="menu-nav show">
                  <div className="logo">
                    <ImageLogo />
                  </div>
                  <div className="navbar-wrap main-menu d-none d-lg-flex">
                    <ul className="navigation">
                      <li className={isActiveRoute('/') ? 'active' : ''}><Link href="/">Home</Link></li>
                      <li className={isActiveRoute('/movies') ? 'active' : ''}><Link href="/movies">Movies</Link></li>
                      <li className={isActiveRoute('/series') ? 'active' : ''}><Link href="/series">Series</Link></li>
                      <li className={isActiveRoute('/sports') ? 'active' : ''}><Link href="/sports">Sports</Link></li>
                      <li className={isActiveRoute('/live') ? 'active' : ''}><Link href="/live">Live</Link></li>
                        <li><Link href="https://paringininfo.com/contactus" target='_blank' onClick={(e) => { e.preventDefault(); const newWindow = window.open('https://paringininfo.com/contactus', '_blank'); if (newWindow) newWindow.focus(); }}>Contacts</Link></li>
                    </ul>
                  </div>
                </nav>
              </div>

              {/* Mobile Menu */}
              <div ref={mobileMenuRef} className="mobile-menu">
                <div className="close-btn"><FontAwesomeIcon icon={faTimes} /></div>

                <nav className="menu-box">
                  <div className="nav-logo">
                    <ImageLogo />
                  </div>
                  <div className="menu-outer">
                    {/* Menu will come automatically via JavaScript */}
                  </div>
                  <div className="social-links">
                    <ul className="clearfix">
                      <li><Link href="#"><span><FontAwesomeIcon icon={faTwitter} /></span></Link></li>
                      <li><Link href="#"><span><FontAwesomeIcon icon={faFacebookSquare} /></span></Link></li>
                      <li><Link href="#"><span><FontAwesomeIcon icon={faPinterestP} /></span></Link></li>
                      <li><Link href="#"><span><FontAwesomeIcon icon={faInstagram} /></span></Link></li>
                      <li><Link href="#"><span><FontAwesomeIcon icon={faYoutube} /></span></Link></li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div ref={backdropRef} className="menu-backdrop"></div>
              {/* End Mobile Menu */}

              {/* Modal Search */}
              <div className="modal fade" id="search-modal" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <form>
                      <input type="text" placeholder="Search here..." />
                      <button><FontAwesomeIcon icon={faSearch} /></button>
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