import React from 'react';

const Request = () => (
  <section className="padding-bottom">
    <header className="section-heading heading-line">
      <h4 className="title-section text-uppercase">Yêu cầu báo giá</h4>
    </header>

    <div className="row">
      <div className="col-md-8">
        <div className="card-banner banner-quote overlay-gradient" style={{ backgroundImage: "url('images/banners/banner9.jpg')" }}>
          <div className="card-img-overlay white">
            <h3 className="card-title">Cách dễ dàng để gửi yêu cầu đến nhà cung cấp</h3>
            <p className="card-text" style={{ maxWidth: "400px" }}>
              Hãy tìm hiểu phương thức để khách hàng có thể dễ dàng mua sắm
            </p>
            <a href="" className="btn btn-primary rounded-pill">Tìm hiểu thêm</a>
          </div>
        </div>
      </div> {/* col // */}

      <div className="col-md-4">
        <div className="card card-body">
          <h4 className="title py-3">Một yêu cầu, nhiều báo giá</h4>
          <form>
            <div className="form-group">
              <input className="form-control" placeholder="Bạn đang tìm kiếm gì?" type="text" />
            </div>
            <div className="form-group">
              <div className="input-group">
                <input className="form-control" placeholder="Số lượng" type="text" />
                <select className="custom-select form-control">
                  <option>Chiếc</option>
                  <option>Lít</option>
                  <option>Tấn</option>
                  <option>Gam</option>
                </select>
              </div>
            </div>
            <div className="form-group text-muted">
              <p>Chọn loại yêu cầu:</p>
              <label className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" value="option1" />
                <span className="form-check-label">Yêu cầu báo giá</span>
              </label>
              <label className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" value="option2" />
                <span className="form-check-label">Yêu cầu mẫu thử</span>
              </label>
            </div>
            <div className="form-group">
              <button className="btn btn-warning">Gửi yêu cầu báo giá</button>
            </div>
          </form>
        </div>
      </div> {/* col // */}
    </div> {/* row // */}
  </section>
);

export default Request;
