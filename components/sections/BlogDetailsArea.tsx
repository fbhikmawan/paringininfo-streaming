import Image from 'next/image';
import Link from 'next/link';

import imgBlogThumb01 from '../../assets/img/blog/blog_thumb01.jpg'
import imgPostAvatar from '../../assets/img/blog/post_avatar_img.png'
import imgCommmentAvatar01 from '../../assets/img/blog/comment_avatar01.jpg'
import imgCommmentAvatar02 from '../../assets/img/blog/comment_avatar02.jpg'
import imgBlogDetails01 from '../../assets/img/blog/blog_details_img01.jpg'
import imgBlogDetails02 from '../../assets/img/blog/blog_details_img02.jpg'
import imgRcPostThumb01 from '../../assets/img/blog/rc_post_thumb01.jpg'
import imgRcPostThumb02 from '../../assets/img/blog/rc_post_thumb02.jpg'
import imgRcPostThumb03 from '../../assets/img/blog/rc_post_thumb03.jpg'

export default function BlogDetailsArea() {
  return (
    <section className="blog-details-area blog-bg" data-background="/assets/img/bg/blog_bg.jpg">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="blog-post-item blog-details-wrap">
              <div className="blog-post-thumb">
                <Link href="blog-details"><Image src={ imgBlogThumb01 } alt="" /></Link>
              </div>
              <div className="blog-post-content">
                <div className="blog-details-top-meta">
                  <span className="user"><i className="far fa-user"></i> by <Link href="#">Admin</Link></span>
                  <span className="date"><i className="far fa-clock"></i> 10 Mar 2021</span>
                </div>
                <h2 className="title">Your Free Movie Streaming Purposes</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typetting industry. Lorem Ipsum has been the industry&apos;s standard
                  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuies, but also the leap into electronic typesetting, remaining essentially
                  unchanged. It was populrised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                  recently .</p>
                <p>Printing and typetting industry. Lorem Ipsum has been the industry&apos;s standrd dummy text ever since the, when an unknown
                  printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuies, but
                  also the leap into electronic typesetting, remaining essentially unched. It was populrised in the 1960s with the release
                  of Letraset sheets containing .</p>
                <blockquote>
                  <i className="fas fa-quote-right"></i>
                  <p>Watch Mobflx movies & TV shows online or stream rights to your smart TV, game console, PC, mobile more.</p>
                  <figure><span>Frenk Smith</span> Founder ceo</figure>
                </blockquote>
                <div className="blog-img-wrap">
                  <div className="row">
                    <div className="col-sm-6">
                      <Image src={ imgBlogDetails01 } alt="" />
                    </div>
                    <div className="col-sm-6">
                      <Image src={ imgBlogDetails02 } alt="" />
                    </div>
                  </div>
                </div>
                <p>Lorem Ipsum is simply dummy text of the printing and typetting industry. Lorem Ipsum has been the industry&apos;s standard
                  dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuies.</p>
                <p>Printing and typetting industry. Lorem Ipsum has been the industry&apos;s standrd dummy text ever since the, when an unknown
                  printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuies, but
                  also the leap into electronic typesetting, remaining essentially unched. It was populrised in the 1960s with the release
                  of Letraset sheets containing .</p>
                <div className="blog-post-meta">
                  <div className="blog-details-tags">
                    <ul>
                      <li><i className="fas fa-tags"></i> <span>Tags :</span></li>
                      <li><Link href="#">Movies ,</Link> <Link href="#">Creative ,</Link> <Link href="#">News ,</Link> <Link href="#">English</Link></li>
                    </ul>
                  </div>
                  <div className="blog-post-share">
                    <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                    <Link href="#"><i className="fab fa-twitter"></i></Link>
                    <Link href="#"><i className="fab fa-pinterest-p"></i></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="avatar-post mt-40 mb-80">
              <div className="post-avatar-img">
                <Image src={ imgPostAvatar } alt="img" />
              </div>
              <div className="post-avatar-content">
                <h5>Thomas Herlihy</h5>
                <p>Printing and typetting industry. Lorem Ipsum has been the instry standrd the dummy
                  text ever since the, when an unknown printer took a galley .</p>
                <ul>
                  <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                  <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                  <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
                </ul>
              </div>
            </div>
            <div className="blog-comment mb-80">
              <div className="widget-title mb-45">
                <h5 className="title">Comment&apos;s (02)</h5>
              </div>
              <ul>
                <li>
                  <div className="single-comment">
                    <div className="comment-avatar-img">
                      <Image src={ imgCommmentAvatar01 } alt="img" />
                    </div>
                    <div className="comment-text">
                      <div className="comment-avatar-info">
                        <h5>Daisy Waterstone <span className="comment-date">November 13, 2021</span></h5>
                        <Link href="#" className="comment-reply-link">Reply <i className="fas fa-reply-all"></i></Link>
                      </div>
                      <p>Printing and typetting industry. Lorem Ipsum has been the instry standrd the dummy
                        text ever since the, when an unknown printer took a galley .</p>
                    </div>
                  </div>
                </li>
                <li className="comment-reply">
                  <div className="single-comment">
                    <div className="comment-avatar-img">
                      <Image src={ imgCommmentAvatar02 } alt="img" />
                    </div>
                    <div className="comment-text">
                      <div className="comment-avatar-info">
                        <h5>Jon Deo <span className="comment-date">November 13, 2021</span></h5>
                        <Link href="#" className="comment-reply-link">Reply <i className="fas fa-reply-all"></i></Link>
                      </div>
                      <p>Printing and typetting industry. Lorem Ipsum has been the instry standrd the dummy
                        text ever since the, when an unknown printer took a galley .</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="contact-form-wrap">
              <div className="widget-title mb-50">
                <h5 className="title">Post a Comment</h5>
              </div>
              <div className="contact-form">
                <form action="#">
                  <div className="row">
                    <div className="col-md-6">
                      <input type="text" placeholder="You Name *" />
                    </div>
                    <div className="col-md-6">
                      <input type="email" placeholder="You  Email *" />
                    </div>
                  </div>
                  <input type="text" placeholder="Subject *" />
                    <textarea name="message" placeholder="Type Your Message..."></textarea>
                    <button className="btn">Send Message</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <aside className="blog-sidebar">
              <div className="widget blog-widget">
                <div className="widget-title mb-30">
                  <h5 className="title">Search Objects</h5>
                </div>
                <form action="#" className="sidebar-search">
                  <input type="text" placeholder="Search..." />
                    <button><i className="fas fa-search"></i></button>
                </form>
              </div>
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