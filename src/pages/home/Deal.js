import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_ALL } from "../../api/apiService";

const Deal = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 9, hours: 12, minutes: 58, seconds: 2 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🕒 Đếm ngược thời gian khuyến mãi
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🛒 Gọi API lấy danh sách sản phẩm khuyến mãi
  useEffect(() => {
    const params = {
      pageNumber: 0,
      pageSize: 20,
      sortBy: "productId",
      sortOrder: "asc",
    };

    GET_ALL("products", params)
      .then((response) => {
        // Lọc sản phẩm có giảm giá
        const discountedProducts = response.content.filter((product) => product.discount > 0);
        setProducts(discountedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="padding-bottom">
      <div className="card card-deal">
        <div className="row align-items-center">
          {/* 🏷️ Tiêu đề & Đồng hồ đếm ngược */}
          <div className="col-md-4 col-heading content-body">
            <header className="section-heading">
              <h3 className="section-title">Ưu đãi và khuyến mãi</h3>
              <p>Nhanh tay săn giảm giá</p>
            </header>
            <div className="timer">
              <div>
                <span className="num">{timeLeft.days}</span> <small>Ngày</small>
              </div>
              <div>
                <span className="num">{timeLeft.hours}</span> <small>Giờ</small>
              </div>
              <div>
                <span className="num">{timeLeft.minutes}</span> <small>Phút</small>
              </div>
              <div>
                <span className="num">{timeLeft.seconds}</span> <small>Giây</small>
              </div>
            </div>
          </div>

          {/* 🛒 Danh sách sản phẩm */}
          <div className="col-md-8 row no-gutters">
            {loading ? (
              <p>🔄 Đang tải sản phẩm...</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div className="col-md col-6" key={product.productId}>
                  <figure className="card-product-grid card-sm">
                    <Link to={`/Detail?productId=${product.productId}`} className="img-wrap">
                      <img
                        src={`http://localhost:8080/api/public/products/image/${product.image}`}
                        alt={product.productName}
                      />
                    </Link>
                    <div className="text-wrap p-3">
                      <Link to={`/Detail?productId=${product.productId}`} className="title">
                        {product.productName}
                      </Link>
                      <span className="badge badge-danger">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.discount)}
                      </span>
                    </div>
                  </figure>
                </div>
              ))
            ) : (
              <p>❌ Không có sản phẩm giảm giá nào</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deal;
