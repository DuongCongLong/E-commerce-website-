import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_ALL } from "../../api/apiService";

const Items = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {
      pageNumber: 0,
      pageSize: 20,
      sortBy: "productId",
      sortOrder: "asc",
    };

    GET_ALL("products", params)
      .then((response) => {
        setProducts(response.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="padding-bottom-sm">
  <header className="section-heading heading-line">
    <h4 className="title-section text-uppercase">Tất cả sản phẩm</h4>
  </header>

  <div className="row row-sm">
    {loading && <p>Loading...</p>}
    {!loading && products.length > 0 ? (
      products.map((product) => (
        <div className="col-xl-3 col-lg-3 col-md-4 col-12" key={product.productId}>
          <div className="card card-sm card-product-grid">
            <Link to={`/Detail?productId=${product.productId}`} className="img-wrap">
              <img
                src={`http://localhost:8080/api/public/products/image/${product.image}`}
                alt={product.productName}
              />
            </Link>
            <figcaption className="info-wrap">
              <Link to={`/Detail?productId=${product.productId}`} className="title">
                {product.productName}
              </Link>
              <div className="price mt-1">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
              </div>
              <div className="price mt-1" style={{ color: "orange", fontSize: "14px" }}>Giảm giá: 
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.discount)}
            </div>
            </figcaption>
          </div>
        </div>
      ))
    ) : (
      <p>Không có sản phẩm nào</p>
    )}
  </div>
</section>
  );
};

export default Items;