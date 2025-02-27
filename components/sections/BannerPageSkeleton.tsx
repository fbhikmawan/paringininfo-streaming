import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function BannerPageSkeleton() {
  return (
    <section className="breadcrumb-area breadcrumb-bg">
      <Image src="/assets/img/bg/breadcrumb_bg.jpg" alt="breadcrumb" fill style={{ objectFit: 'cover' }} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-content">
              <h2 className="title fs-60">Our <span><Skeleton highlightColor='#e4d804' containerClassName='d-inline-block w-25' borderRadius='1rem' style={{ opacity: 0.5 }}/></span></h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page"><Skeleton highlightColor='#e4d804' borderRadius='1rem' style={{ opacity: 0.5 }} className='d-inline-block' width='100px' height='100%' /></li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}