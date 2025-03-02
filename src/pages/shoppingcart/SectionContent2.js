import React, { useEffect, useState } from "react";

const SectionContent2 = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken"); // Lấy token từ localStorage

    fetch(
      "http://localhost:8080/api/public/users/dcl@gmail.com/carts/1",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`, // Thêm token vào header
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Lỗi khi tải giỏ hàng:", error));
  }, []);

  if (!cart) {
    return <p>Đang tải giỏ hàng...</p>;
  }

  const handleDeleteProduct = (productId) => {
    const authToken = localStorage.getItem("authToken");

    fetch(`http://localhost:8080/api/public/carts/1/product/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi xóa sản phẩm");
        }
        return response.text(); // Không parse JSON
      })
      .then(() => {
        window.location.reload(); // Tải lại trang
      })
      .catch((error) => console.error("Lỗi khi xóa sản phẩm:", error));
  };

  const handlePayment = () => {
    const authToken = localStorage.getItem("authToken");

    fetch(
      "http://localhost:8080/api/public/users/dcl@gmail.com/carts/1/payments/success/order",
      {
        method: "POST", // Hoặc "GET" nếu API yêu cầu
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Kết quả thanh toán:", data);
        if (data.status) {
          alert("Thanh toán thất bại!");
        } else {
          alert("Thanh toán thành công!");
          window.location.href = "/Payment"; // Chuyển hướng trang
        }
      })
      .catch((error) => console.error("Lỗi khi thanh toán:", error));
  };

  return (
    <>
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <div className="card">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Sản phẩm</th>
                      <th scope="col" width="120">
                        Số lượng
                      </th>
                      <th scope="col" width="120">
                        Giá
                      </th>
                      <th scope="col" className="text-right" width="200"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.products && cart.products.length > 0 ? (
                      cart.products.map((product) => (
                        <tr key={product.productId}>
                          <td>
                            <figure className="itemside">
                              <div className="aside">
                                <img
                                  src={`http://localhost:8080/api/public/products/image/${product.image}`}
                                  alt={product.productName}
                                  width="80" // Điều chỉnh kích thước theo ý muốn
                                  height="80"
                                />
                              </div>
                              <figcaption className="info">
                                <a href="#" className="title text-dark">
                                  {product.productName}
                                </a>
                                <p className="text-muted small">
                                  {product.description}
                                </p>
                              </figcaption>
                            </figure>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              defaultValue={product.quantity}
                            >
                              {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {product.quantity}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <div className="price-wrap">
                              <var className="price">
                                {product.specialPrice.toLocaleString()} đ
                              </var>
                              <small className="text-muted">
                                {" "}
                                Giá gốc: {product.price.toLocaleString()} đ
                              </small>
                            </div>
                          </td>
                          <td className="text-right">
                            <button
                              className="btn btn-light"
                              onClick={() =>
                                handleDeleteProduct(product.productId)
                              }
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Giỏ hàng trống
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="card-body border-top">
                  <button
                    onClick={handlePayment}
                    className="btn btn-primary float-md-right"
                  >
                    Thanh toán <i className="fa fa-chevron-right"></i>
                  </button>

                  <a href="/Home" className="btn btn-light">
                    <i className="fa fa-chevron-left"></i> Tiếp tục mua sắm
                  </a>
                </div>
              </div>
              <div className="alert alert-success mt-3">
                <p className="icontext">
                  <i className="icon text-success fa fa-truck"></i> Miễn phí
                  giao hàng trong vòng 1-2 tuần
                </p>
              </div>
            </main>
            <aside className="col-md-3">
              <div className="card mb-3">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Bạn có mã giảm giá?</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập mã giảm giá"
                        />
                        <span className="input-group-append">
                          <button className="btn btn-primary">Áp dụng</button>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Tổng giá:</dt>
                    <dd className="text-right">USD 568</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Giảm giá:</dt>
                    <dd className="text-right">USD 658</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Tổng cộng:</dt>
                    <dd className="text-right h5">
                      <strong>$1,650</strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img
                      src={require("../../assets/images/misc/payments.png")}
                      height="26"
                      alt="payments"
                    />
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionContent2;
