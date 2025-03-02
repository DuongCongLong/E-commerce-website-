import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { GET_ID } from "../../api/apiService";

  const SectionContent = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get("productId"); // Lấy productId từ query string
    const [product, setProduct] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
  };
  
  const decreaseQuantity = () => {
      setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  useEffect(() => {
  // Ví dụ lấy cartId từ localStorage hoặc từ API
  const storedCartId = localStorage.getItem("user_id");
  if (storedCartId) {
    setCartId(storedCartId);
  } else {
    // Gọi API lấy cartId nếu cần
    axios.get("http://localhost:8080/api/public/carts/user")
      .then(response => {
        setCartId(response.data.cartId);
        localStorage.setItem("cartId", response.data.cartId);
      })
      .catch(error => console.error("Lỗi lấy cartId:", error));
  }
}, []);

const handleAddToCart = async () => {
  if (!cartId) {
    alert("Không tìm thấy giỏ hàng!");
    return;
  }

  const authToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

  try {
    await axios.post(
      `http://localhost:8080/api/public/carts/${cartId}/products/${productId}/quantity/1`,
      {}, // Payload có thể rỗng tùy vào API của bạn
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Thêm token vào header
          "Content-Type": "application/json",
        },
      }
    );

    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    if (error.response && error.response.status === 401) {
      alert("Lỗi xác thực! Vui lòng đăng nhập lại.");
    } else {
      alert("Lỗi khi thêm vào giỏ hàng. Vui lòng thử lại!");
    }
  }
};

  
    useEffect(() => {
        if (!productId) {
            setError("Sản phẩm không hợp lệ.");
            setLoading(false);
            return;
        }

        console.log(`📡 Đang lấy chi tiết sản phẩm cho productId: ${productId}`);

        GET_ID("products", productId)
            .then(response => {
                console.log("✅ Product Detail API response:", response);
                setProduct(response);
            })
            .catch(error => {
                console.error("❌ Lỗi khi lấy chi tiết sản phẩm:", error);
                setError("Không thể tải chi tiết sản phẩm.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [productId]);
    

    if (loading) return <p>🔄 Đang tải chi tiết sản phẩm...</p>;
    if (error) return <p>⚠️ {error}</p>;
    return (
      <>
        <section className="py-3 bg-light">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
              <li className="breadcrumb-item active" aria-current="page">{product.productName}</li>
            </ol>
          </div>
        </section>

        <section className="section-content bg-white padding-y">
          <div className="container">
            <div className="row">
              <aside className="col-md-6">
                <div className="card">
                  <article className="gallery-wrap">
                    <div className="img-big-wrap">
                      <div><a href="#">
                        <img 
                  src={`http://localhost:8080/api/public/products/image/${product.image}`} 
                  alt={product.productName} 
                  onError={(e) => { e.target.src = "/default-image.jpg"; }} 
                  style={{ maxWidth: "auto" }}/>
                        </a></div>
                    </div>
                    <div className="thumbs-wrap">
                      <a href="#" className="item-thumb"><img 
                  src={`http://localhost:8080/api/public/products/image/${product.image}`} 
                  alt={product.productName} 
                  onError={(e) => { e.target.src = "/default-image.jpg"; }} 
                  style={{ maxWidth: "auto" }}/></a>
                      <a href="#" className="item-thumb"><img 
                  src={`http://localhost:8080/api/public/products/image/${product.image}`} 
                  alt={product.productName} 
                  onError={(e) => { e.target.src = "/default-image.jpg"; }} 
                  style={{ maxWidth: "auto" }}/></a>
                      <a href="#" className="item-thumb"><img 
                  src={`http://localhost:8080/api/public/products/image/${product.image}`} 
                  alt={product.productName} 
                  onError={(e) => { e.target.src = "/default-image.jpg"; }} 
                  style={{ maxWidth: "auto" }}/></a>
                      <a href="#" className="item-thumb"><img 
                  src={`http://localhost:8080/api/public/products/image/${product.image}`} 
                  alt={product.productName} 
                  onError={(e) => { e.target.src = "/default-image.jpg"; }} 
                  style={{ maxWidth: "auto" }}/></a>
                    </div>
                  </article>
                </div>
              </aside>
              <main className="col-md-6">
                <article className="product-info-aside">
                  <h2 className="title mt-3">{product.productName}</h2>

                  <div className="rating-wrap my-3">
                    <ul className="rating-stars">
                      <li style={{ width: "80%" }} className="stars-active">
                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>
                    <small className="label-rating text-muted">99 đánh giá</small>
                    <small className="label-rating text-success"><i className="fa fa-clipboard-check"></i> 50 đơn hàng</small>
                  </div>

                  <div className="mb-3">
                    <var className="price h4">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}</var>
                    <span className="text-muted pl-4">Giảm còn: {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.discount)}</span>
                  </div>

                  <p>{product.description}</p>

                  <dl className="row">
                    <dt className="col-sm-3">Nhà sản xuất</dt>
                    <dd className="col-sm-9"><a href="#">Hệ sinh thái</a></dd>

                    <dt className="col-sm-3">Mã sản phẩm</dt>
                    <dd className="col-sm-9">596 065</dd>

                    <dt className="col-sm-3">Bảo hành</dt>
                    <dd className="col-sm-9">2 năm</dd>

                    <dt className="col-sm-3">Thời gian giao hàng</dt>
                    <dd className="col-sm-9">3-4 ngày</dd>

                    <dt className="col-sm-3">Tình trạng</dt>
                    <dd className="col-sm-9">Còn hàng</dd>
                  </dl>

                  <div className="form-row mt-4">
                    <div className="form-group">
                    <div className="input-group input-spinner">
                    <div className="input-group-prepend">
                        <button className="btn btn-light" type="button" onClick={decreaseQuantity}> - </button>
                    </div>
                    <input type="text" className="form-control" value={quantity} readOnly />
                    <div className="input-group-append">
                        <button className="btn btn-light" type="button" onClick={increaseQuantity}> + </button>
                    </div>
                    </div>
                    </div>
                    <div className="form-group col-md">
                        <a 
                        href="#" 
                        className="btn btn-primary" 
                        onClick={(e) => {
                          e.preventDefault(); // Ngăn chặn load lại trang
                          handleAddToCart(cartId, productId, 1);
                        }}
                      > 
                        <i className="fas fa-shopping-cart"></i> <span className="text">Thêm vào giỏ hàng</span>
                      </a>

                      <a href="#" className="btn btn-light">
                        <i className="fas fa-envelope"></i> <span className="text">Liên hệ nhà cung cấp</span> 
                      </a>
                    </div> 
                  </div> 
                </article>
              </main>
            </div>
          </div>
        </section>
        <section className="section-name padding-y bg">
    <div className="container">
      <div className="row">
        {/* Thông số kỹ thuật */}
        <div className="col-md-8">
          <h5 className="title-description">Thông số kỹ thuật</h5>
          <table className="table table-bordered">
            <thead>
              <tr><th colSpan="2">Thông số cơ bản</th></tr>
            </thead>
            <tbody>
              <tr><td>Loại năng lượng</td><td>Loại pin Titanium</td></tr>
              <tr><td>Số vùng nấu</td><td>2</td></tr>
              <tr><td>Kết nối tự động</td><td><i className="fa fa-check text-success"></i> Có</td></tr>
            </tbody>

            <thead>
              <tr><th colSpan="2">Kích thước</th></tr>
            </thead>
            <tbody>
              <tr><td>Chiều rộng</td><td>500mm</td></tr>
              <tr><td>Chiều sâu</td><td>400mm</td></tr>
              <tr><td>Chiều cao</td><td>700mm</td></tr>
            </tbody>

            <thead>
              <tr><th colSpan="2">Vật liệu</th></tr>
            </thead>
            <tbody>
              <tr><td>Bên ngoài</td><td>Thép không gỉ</td></tr>
              <tr><td>Bên trong</td><td>Sắt</td></tr>
            </tbody>
          </table>
        </div>

        {/* Phần tệp và video hướng dẫn */}
        <aside className="col-md-4">
          <div className="box">
            <h5 className="title-description">Tệp tin</h5>
            <p>
              Tài liệu hướng dẫn chi tiết về sản phẩm. Bạn có thể tải về và tham khảo cách sử dụng sản phẩm đúng cách.
            </p>

            <h5 className="title-description">Video hướng dẫn</h5>
            
            {[1, 2, 3].map((id) => (
              <article key={id} className="media mb-3">
                <a href="#"><img className="img-sm mr-3" src={require(`../../assets/images/posts/${id}.jpg`)} alt={`Video hướng dẫn ${id}`} /></a>
                <div className="media-body">
                  <h6 className="mt-0"><a href="#">Mẹo và hướng dẫn mới</a></h6>
                  <p className="mb-2"> Hướng dẫn chi tiết cách sử dụng và mẹo tối ưu sản phẩm.</p>
                </div>
              </article>
            ))}

          </div>
        </aside>
      </div>
    </div>
  </section>
      </>
    );
  };

  export default SectionContent;