import Link from 'next/link';

export default function PricingPlan() {
  return (
    <section className="pricing-area pricing-bg" data-background="/assets/img/bg/pricing_bg.jpg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title title-style-three text-center mb-70">
              <span className="sub-title">our pricing plans</span>
              <h2 className="title">Our Pricing Strategy</h2>
            </div>
          </div>
        </div>
        <div className="pricing-box-wrap">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="pricing-box-item mb-30">
                <div className="pricing-top">
                  <h6>premium</h6>
                  <div className="price">
                    <h3>$7.99</h3>
                    <span>Monthly</span>
                  </div>
                </div>
                <div className="pricing-list">
                  <ul>
                    <li className="quality"><i className="fas fa-check"></i> Video quality <span>Good</span></li>
                    <li><i className="fas fa-check"></i> Resolution <span>480p</span></li>
                    <li><i className="fas fa-check"></i> Screens you can watch <span>1</span></li>
                    <li><i className="fas fa-check"></i> Cancel anytime</li>
                  </ul>
                </div>
                <div className="pricing-btn">
                  <Link href="#" className="btn">Buy Now</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="pricing-box-item active mb-30">
                <div className="pricing-top">
                  <h6>standard</h6>
                  <div className="price">
                    <h3>$9.99</h3>
                    <span>Monthly</span>
                  </div>
                </div>
                <div className="pricing-list">
                  <ul>
                    <li className="quality"><i className="fas fa-check"></i> Video quality <span>Better</span></li>
                    <li><i className="fas fa-check"></i> Resolution <span>1080p</span></li>
                    <li><i className="fas fa-check"></i> Screens you can watch <span>2</span></li>
                    <li><i className="fas fa-check"></i> Cancel anytime</li>
                  </ul>
                </div>
                <div className="pricing-btn">
                  <Link href="#" className="btn">Buy Now</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <div className="pricing-box-item mb-30">
                <div className="pricing-top">
                  <h6>premium</h6>
                  <div className="price">
                    <h3>$11.99</h3>
                    <span>Monthly</span>
                  </div>
                </div>
                <div className="pricing-list">
                  <ul>
                    <li className="quality"><i className="fas fa-check"></i> Video quality <span>Best</span></li>
                    <li><i className="fas fa-check"></i> Resolution <span>4K+HDR</span></li>
                    <li><i className="fas fa-check"></i> Screens you can watch <span>4</span></li>
                    <li><i className="fas fa-check"></i> Cancel anytime</li>
                  </ul>
                </div>
                <div className="pricing-btn">
                  <Link href="#" className="btn">Buy Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
