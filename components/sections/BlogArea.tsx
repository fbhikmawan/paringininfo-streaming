import Image from 'next/image';
import Link from 'next/link';

import imgBlogThumb01 from '../../assets/img/blog/blog_thumb01.jpg'
import imgBlogThumb02 from '../../assets/img/blog/blog_thumb02.jpg'
import imgBlogThumb03 from '../../assets/img/blog/blog_thumb03.jpg'
import imgRcPostThumb01 from '../../assets/img/blog/rc_post_thumb01.jpg'
import imgRcPostThumb02 from '../../assets/img/blog/rc_post_thumb02.jpg'
import imgRcPostThumb03 from '../../assets/img/blog/rc_post_thumb03.jpg'

export default function BlogArea() {
  return (
    <section className="blog-area blog-bg" data-background="/assets/img/bg/blog_bg.jpg">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="blog-post-item">
              <div className="blog-post-thumb">
                <Link href="blog-details"><Image src={ imgBlogThumb01 } alt="" /></Link>
              </div>
              <div className="blog-post-content">
                <span className="date"><i className="far fa-clock"></i> 10 Mar 2021</span>
                <h2 className="title"><Link href="blog-details">Your Free Movie Streaming Purposes</Link></h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun
                  labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exesa
                  commodo consequat. Duis aute
                  irure dolor in reprehend .</p>
                <div className="blog-post-meta">
                  <ul>
                    <li><i className="far fa-user"></i> by <Link href="#">Admin</Link></li>
                    <li><i className="far fa-thumbs-up"></i> 63</li>
                    <li><i className="far fa-comments"></i><Link href="#">12 Comments</Link></li>
                  </ul>
                  <div className="read-more">
                    <Link href="blog-details">Read More <i className="fas fa-angle-double-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="blog-post-item">
              <div className="blog-post-thumb">
                <Link href="blog-details"><Image src={ imgBlogThumb02 } alt="" /></Link>
              </div>
              <div className="blog-post-content">
                <span className="date"><i className="far fa-clock"></i> 10 Mar 2021</span>
                <h2 className="title"><Link href="blog-details">Where watch English movies free?</Link></h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun
                  labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exesa
                  commodo consequat. Duis aute
                  irure dolor in reprehend .</p>
                <div className="blog-post-meta">
                  <ul>
                    <li><i className="far fa-user"></i> by <Link href="#">Admin</Link></li>
                    <li><i className="far fa-thumbs-up"></i> 63</li>
                    <li><i className="far fa-comments"></i><Link href="#">12 Comments</Link></li>
                  </ul>
                  <div className="read-more">
                    <Link href="blog-details">Read More <i className="fas fa-angle-double-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="blog-post-item">
              <div className="blog-post-thumb">
                <Link href="blog-details"><Image src={ imgBlogThumb03 } alt="" /></Link>
              </div>
              <div className="blog-post-content">
                <span className="date"><i className="far fa-clock"></i> 10 Mar 2021</span>
                <h2 className="title"><Link href="blog-details">House movie to is streaming website?</Link></h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun
                  labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exesa
                  commodo consequat. Duis aute
                  irure dolor in reprehend .</p>
                <div className="blog-post-meta">
                  <ul>
                    <li><i className="far fa-user"></i> by <Link href="#">Admin</Link></li>
                    <li><i className="far fa-thumbs-up"></i> 63</li>
                    <li><i className="far fa-comments"></i><Link href="#">12 Comments</Link></li>
                  </ul>
                  <div className="read-more">
                    <Link href="blog-details">Read More <i className="fas fa-angle-double-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="pagination-wrap mt-60">
              <nav>
                <ul>
                  <li className="active"><Link href="#">1</Link></li>
                  <li><Link href="#">2</Link></li>
                  <li><Link href="#">3</Link></li>
                  <li><Link href="#">4</Link></li>
                  <li><Link href="#">Next</Link></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-4">
            <aside className="blog-sidebar">
              <div className="widget blog-widget">
                <div className="widget-title mb-30">
                  <h5 className="title">Categories</h5>
                </div>
                <div className="sidebar-cat">
                  <ul>
                    <li><Link href="#">Movies</Link> <span>12</span></li>
                    <li><Link href="#">Action Movies</Link> <span>10</span></li>
                    <li><Link href="#">Streaming</Link> <span>9</span></li>
                    <li><Link href="#">Download</Link> <span>16</span></li>
                  </ul>
                </div>
              </div>
              <div className="widget blog-widget">
                <div className="widget-title mb-30">
                  <h5 className="title">Recent Posts</h5>
                </div>
                <div className="rc-post">
                  <ul>
                    <li className="rc-post-item">
                      <div className="thumb">
                        <Link href="blog-details"><Image src={ imgRcPostThumb01 } alt="" /></Link>
                      </div>
                      <div className="content">
                        <h5 className="title"><Link href="blog-details">Express Management Effective</Link></h5>
                        <span className="date"><i className="far fa-clock"></i> 10 Mar 2021</span>
                      </div>
                    </li>
                    <li className="rc-post-item">
                      <div className="thumb">
                        <Link href="blog-details"><Image src={ imgRcPostThumb02 } alt="" /></Link>
                      </div>
                      <div className="content">
                        <h5 className="title"><Link href="blog-details">Where watch English movies free?</Link></h5>
                        <span className="date"><i className="far fa-clock"></i> 10 Mar 2021</span>
                      </div>
                    </li>
                    <li className="rc-post-item">
                      <div className="thumb">
                        <Link href="blog-details"><Image src={ imgRcPostThumb03 } alt="" /></Link>
                      </div>
                      <div className="content">
                        <h5 className="title"><Link href="blog-details">House movie streaming website</Link></h5>
                        <span className="date"><i className="far fa-clock"></i> 10 Mar 2021</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="widget blog-widget">
                <div className="widget-title mb-30">
                  <h5 className="title">Tag Post</h5>
                </div>
                <div className="tag-list">
                  <ul>
                    <li><Link href="#">Movies</Link></li>
                    <li><Link href="#">Creative</Link></li>
                    <li><Link href="#">News</Link></li>
                    <li><Link href="#">Romantic</Link></li>
                    <li><Link href="#">Who</Link></li>
                    <li><Link href="#">English</Link></li>
                    <li><Link href="#">Blending</Link></li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}