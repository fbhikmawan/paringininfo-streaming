import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="breadcrumb-area breadcrumb-bg" data-background="/assets/img/bg/movie_bg.jpg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-content">
            <h2 className="title">404  |  <span>This page could not be found.</span></h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}