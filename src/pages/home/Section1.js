import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";
import { Link } from "react-router-dom";

const Section1 = ({ categoryName, categoryId }) => {
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
            <header className="section-heading mb-4">
                <h3 className="title-section">{categoryName}</h3>
            </header>

            {loading ? (
                <p>🔄 Đang tải sản phẩm...</p>
            ) : error ? (
                <p>⚠️ {error}</p>
            ) : products.length > 0 ? (
                <div className="row">
                    {products.map((row) => (
                        <div className="col-xl-3 col-lg-3 col-md-4 col-6" key={row.id}>
                            <div className="card card-product-grid">
                                <Link to={`/Detail?productId=${row.productId}`} className="img-wrap">
                                    <img 
                                        src={`http://localhost:8080/api/public/products/image/${row.image}`} 
                                        alt={row.productName} 
                                        onError={(e) => { e.target.src = "/default-image.jpg"; }} 
                                    />
                                </Link>
                                <figcaption className="info-wrap">
                                    <Link to={`/Detail?productId=${row.productId}`} className="title">
                                        {row.productName}
                                    </Link>
                                    <div className="price h5 mt-2">
                                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(row.price)}
                                    </div>
                                </figcaption>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (   
                <p>⚠️ Không có sản phẩm nào</p>
            )}
        </section>
    );
};

export default Section1;