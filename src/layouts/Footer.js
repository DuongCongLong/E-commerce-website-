import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      <section className="section-subscribe padding-y-lg">
        <div className="container">
          <p className="pb-2 text-center text-white">
            Cập nhật xu hướng sản phẩm mới nhất và tin tức ngành trực tiếp đến hộp thư của bạn
          </p>
          <div className="row justify-content-md-center">
            <div className="col-lg-5 col-md-6">
              <form className="form-row">
                <div className="col-md-8 col-7">
                  <input
                    className="form-control border-0"
                    placeholder="Email của bạn"
                    type="email"
                  />
                </div>
                <div className="col-md-4 col-5">
                  <button type="submit" className="btn btn-block btn-warning">
                    <i className="fa fa-envelope"></i> Đăng ký
                  </button>
                </div>
              </form>
              <small className="form-text text-white-50">
                Chúng tôi sẽ không bao giờ chia sẻ email của bạn với bên thứ ba.
              </small>
            </div>
          </div>
        </div>
      </section>
        {/* ========================= FOOTER ========================= */}
        <footer className="section-footer bg-secondary">
          <div className="container">
            <section className="footer-top padding-y-lg text-white">
              <div className="row">
                <aside className="col-md col-6">
                  <h6 className="title">Thương hiệu</h6>
                  <ul className="list-unstyled">
                    <li><a href="#">Adidas</a></li>
                    <li><a href="#">Puma</a></li>
                    <li><a href="#">Reebok</a></li>
                    <li><a href="#">Nike</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Công ty</h6>
                  <ul className="list-unstyled">
                    <li><a href="#">Về chúng tôi</a></li>
                    <li><a href="#">Tuyển dụng</a></li>
                    <li><a href="#">Tìm cửa hàng</a></li>
                    <li><a href="#">Điều khoản và quy định</a></li>
                    <li><a href="#">Sơ đồ trang web</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Hỗ trợ</h6>
                  <ul className="list-unstyled">
                    <li><a href="#">Liên hệ</a></li>
                    <li><a href="#">Hoàn tiền</a></li>
                    <li><a href="#">Trạng thái đơn hàng</a></li>
                    <li><a href="#">Thông tin vận chuyển</a></li>
                    <li><a href="#">Mở tranh chấp</a></li>
                  </ul>
                </aside>
                <aside className="col-md col-6">
                  <h6 className="title">Tài khoản</h6>
                  <ul className="list-unstyled">
                    <li><a href="#">Đăng nhập</a></li>
                    <li><a href="#">Đăng ký</a></li>
                    <li><a href="#">Cài đặt tài khoản</a></li>
                    <li><a href="#">Đơn hàng của tôi</a></li>
                  </ul>
                </aside>
                <aside className="col-md">
                  <h6 className="title">Mạng xã hội</h6>
                  <ul className="list-unstyled">
                    <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
                    <li><a href="#"><i className="fab fa-youtube"></i> Youtube</a></li>
                  </ul>
                </aside>
              </div>
            </section>
            <section className="footer-bottom text-center">
              <p className="text-white">Chính sách bảo mật - Điều khoản sử dụng - Hướng dẫn pháp lý</p>
              <p className="text-muted"> &copy; 2019 Tên công ty, Mọi quyền được bảo lưu </p>
              <br />
            </section>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
