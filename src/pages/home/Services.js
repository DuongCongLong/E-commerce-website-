import React from 'react';

const Services = () => {
  return (
    <section className="padding-bottom">
      <header className="section-heading heading-line">
        <h4 className="title-section text-uppercase">Dịch vụ thương mại</h4>
      </header>

      <div className="row">
        <div className="col-md-3 col-sm-6">
          <article className="card card-post">
            <img src={require("../../assets/images/posts/1.jpg")} className="card-img-top" alt="Trade Assurance" />
            <div className="card-body">
              <h6 className="title">Đảm bảo thương mại</h6>
              <p className="small text-uppercase text-muted">Bảo vệ đơn hàng</p>
            </div>
          </article>
        </div>

        <div className="col-md-3 col-sm-6">
          <article className="card card-post">
            <img src={require("../../assets/images/posts/2.jpg")} className="card-img-top" alt="Pay anytime" />
            <div className="card-body">
              <h6 className="title">Thanh toán bất cứ lúc nào</h6>
              <p className="small text-uppercase text-muted">Giải pháp tài chính</p>
            </div>
          </article>
        </div>

        <div className="col-md-3 col-sm-6">
          <article className="card card-post">
            <img src={require("../../assets/images/posts/3.jpg")} className="card-img-top" alt="Inspection solution" />
            <div className="card-body">
              <h6 className="title">Giải pháp kiểm tra</h6>
              <p className="small text-uppercase text-muted">Kiểm tra dễ dàng</p>
            </div>
          </article>
        </div>

        <div className="col-md-3 col-sm-6">
          <article className="card card-post">
            <img src={require("../../assets/images/posts/4.jpg")} className="card-img-top" alt="Ocean and Air Shipping" />
            <div className="card-body">
              <h6 className="title">Đường biển và đường hàng không</h6>
              <p className="small text-uppercase text-muted">Dịch vụ hậu cần</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Services;
