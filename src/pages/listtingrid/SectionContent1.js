import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GET_ALL, GET_ID } from "../../api/apiService";

const SectionContent1 = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1;
    const categoryId = queryParams.get("categoryId");
    const numItems = 5;

    const handlePageChange = (page) => {
        navigate(`/ListingGrid?page=${page}&categoryId=${categoryId}`);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
                    <Link className="page-link" to={`?page=${i}&categoryId=${categoryId}`} onClick={() => handlePageChange(i)}>
                        {i}
                    </Link>
                </li>
            );
        }
        return pageNumbers;
    };

    useEffect(() => {
        setLoading(true);
        const params = {
            pageNumber: 0,
            pageSize: 8,
            sortBy: "productId",
            sortOrder: "asc",
        };
        if (categoryId !== null) {
            GET_ALL(`categories/${categoryId}/products`, params)
                .then((response) => {
                    setProducts(response.content);
                    setTotalPages(response.totalPages);
                    setTotalElements(response.totalElements);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Failed to fetch products:", error);
                    setLoading(false);
                });
            GET_ID("categories", categoryId)
                .then((item) => setCategories(item))
                .catch((error) => {
                    console.error("Failed to fetch category:", error);
                });
        } else {
            GET_ALL("products", params)
                .then((response) => {
                    setProducts(response.content);
                    setTotalPages(response.totalPages);
                    setTotalElements(response.totalElements);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Failed to fetch products:", error);
                    setLoading(false);
                });
            setCategories({ categoryName: "Tất cả sản phẩm" });
        }
    }, [categoryId, currentPage]);

    return (
        <section className="section-content padding-y">
            <div className="container">
                <div className="card mb-3">
                    <div className="card-body">
                        {/* Breadcrumb navigation */}
                        <div className="row">
                            <div className="col-md-2"> Bạn đang ở đây: </div>
                            <nav className="col-md-8">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#">Trang chủ</a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a href="#">{categories?.categoryName}</a>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <hr />
                        {/* Search result header */}
                        <header className="mb-3">
                            <div className="form-inline">
                                <strong className="mr-md-auto">Kết quả tìm kiếm:</strong>
                                <select className="mr-2 form-control">
                                    <option>Sản phẩm mới nhất</option>
                                    <option>Đang thịnh hành</option>
                                    <option>Phổ biến nhất</option>
                                    <option>Rẻ nhất</option>
                                </select>
                            </div>
                        </header>
                        {/* Product grid */}
                        <div className="row">
    {loading && <p>Loading...</p>}
    {!loading && products.length > 0 &&
        products.map((row) => (
            <div className="col-md-3" key={row.productId}>
                <figure className="card card-product-grid">
                    <Link to={`/Detail?productId=${row.productId}`} className="img-wrap"> 
                        {row.isNew && <span className="badge badge-danger">MỚI</span>}
                        <img 
                            src={`http://localhost:8080/api/public/products/image/${row.image}`} 
                            alt={row.productName} 
                         />
                    </Link>
                    <figcaption className="info-wrap">
                        <Link to={`/Detail?productId=${row.productId}`} className="title mb-2">
                            {row.productName}
                        </Link>
                        <div className="price-wrap">
                            <span className="price">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.price)}
                            </span>
                            <small className="text-muted"> / mỗi sản phẩm</small>
                        </div>
                        <p className="mb-2"> {row.quantity} Cái  <small className="text-muted">(Số lượng tối thiểu)</small></p>
                        <p class="text-muted ">{categories?.categoryName}</p>
                        <p className="text-muted">{row.supplier}</p>

                        <hr />

                        {row.verified && (
                            <p className="mb-3">
                                <span className="tag"> <i className="fa fa-check"></i> Đã xác minh</span> 
                            </p>
                        )}

                        <label className="custom-control mb-3 custom-checkbox">
                            <input type="checkbox" className="custom-control-input" />
                            <div className="custom-control-label">Thêm vào so sánh</div>
                        </label>

                        <a href="#" className="btn btn-outline-primary"> 
                            <i className="fa fa-envelope"></i> Liên hệ nhà cung cấp 
                        </a>
                    </figcaption>
                </figure>
            </div> 
        ))
    }
</div>

                        {/* Pagination */}
                        <nav>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={handlePrevious} disabled={currentPage === 1}>
                                        Trang trước
                                    </button>
                                </li>
                                {renderPageNumbers()}
                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={handleNext} disabled={currentPage === totalPages}>
                                        Trang sau
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default SectionContent1;
