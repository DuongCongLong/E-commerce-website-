import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";
import { Link } from "react-router-dom";

const Apparel = ({ categoryName, categoryId }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!categoryId) {
            console.error("⚠️ categoryId không hợp lệ:", categoryId);
            setError("Danh mục không hợp lệ.");
            setLoading(false);
            return;
        }

        const params = {
            pageNumber: 0,
            pageSize: 8,
            sortBy: "productId",
            sortOrder: "asc",
        };

        console.log(`📡 Đang gọi API lấy sản phẩm cho categoryId: ${categoryId}`);

        GET_ALL(`categories/${categoryId}/products`, params)
            .then(response => {
                console.log("✅ Products API response:", response);
                setProducts(response.content || []);
            })
            .catch(error => {
                console.error("❌ Lỗi khi lấy sản phẩm:", error);
                setError("Không thể tải sản phẩm. Vui lòng thử lại.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    return (
        <section className="padding-bottom">
            <header className="section-heading heading-line">
                <h4 className="title-section text-uppercase">{categoryName}</h4>
            </header>

            <div className="card card-home-category">
                <div className="row no-gutters">
                    <div className="col-md-3">
                        <div className="home-category-banner bg-light-orange">
                            <h5 className="title">Hệ sinh thái công nghệ</h5>
                            {/* <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                            <a href="#" className="btn btn-outline-primary rounded-pill">Mua ngay</a>
                            <img src={require("../../assets/images/items/airpod3.jpg")} className="img-bg" alt="Banner" />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <ul className="row no-gutters bordered-cols">
                            {loading ? (
                                <p>🔄 Đang tải sản phẩm...</p>
                            ) : error ? (
                                <p>⚠️ {error}</p>
                            ) : products.length > 0 ? (
                                products.map((row) => (
                                    <li className="col-6 col-lg-3 col-md-4" key={row.id}>
                                        <a href={`/Detail?productId=${row.productId}`} className="item">
                                            <div className="card-body">
                                                <h6 className="title">{row.productName}</h6>
                                                <img className="img-sm float-right"
                                                    src={`http://localhost:8080/api/public/products/image/${row.image}`} 
                                                    alt={row.productName}
                                                    onError={(e) => { e.target.src = "/default-image.jpg"; }}  
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt"></i>  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(row.price)}
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <p>⚠️ Không có sản phẩm nào</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Apparel;
