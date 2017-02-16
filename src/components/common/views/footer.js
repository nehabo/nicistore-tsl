import React from 'react';

export default() =>
  (
    <footer id="page-footer">
      <div className="footer-wrapper">
        <div className="block">
          <div className="container">
            <div className="vertical-aligned-elements">
              <div className="element width-50">
                <p>
                  <a href="">Terms & Conditions</a> and
                  <a href="">Privacy Policy</a>.
                </p>
              </div>
              <div className="element width-50 text-align-right">
                <a href="index-hero-version-2.html#" className="circle-icon">
                  <i className="social_twitter" />
                </a>
                <a href="index-hero-version-2.html#" className="circle-icon">
                  <i className="social_facebook" />
                </a>
                <a href="index-hero-version-2.html#" className="circle-icon">
                  <i className="social_youtube" />
                </a>
              </div>
            </div>
            <div className="background-wrapper">
              <div className="bg-transfer opacity-50">
                <img src="../../../static/img/footer-bg.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-navigation">
          <div className="container">
            <div className="vertical-aligned-elements">
              <div className="element width-50">
                All right reserved © 2016 Enotech Medical Solutions Pvt Ltd
              </div>
              <div className="element width-50 text-align-right">
                <a href="/">Home</a>
                <a href="/contact">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
