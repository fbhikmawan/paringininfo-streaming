import Image from 'next/image';

export default function NotFound() {
  return (
    <section className="breadcrumb-area breadcrumb-bg">
      <Image src="/assets/img/bg/breadcrumb_bg.jpg" alt="breadcrumb" fill style={{ objectFit: 'cover' }} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-content">
            <h2 className="title">404  |  <span>This page could not be found.</span></h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}