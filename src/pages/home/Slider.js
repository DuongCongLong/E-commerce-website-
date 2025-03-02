import React, { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";
import { Link } from "react-router-dom";
const Slider = () => {
  const [categories, setCategories] = useState([]);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [isOpen, setIsOpen] = useState(false);
      const toggleDropdown = () => {
          setIsDropdownOpen(!isDropdownOpen);
      };
      useEffect(() => {
          const params = {
              pageNumber: 0,
              pageSize: 5,
              sortBy: "categoryId",
              sortOrder: "asc",
          };
          GET_ALL("categories", params)
              .then((response) => {
                  setCategories(response.content);
                  console.log("response", response.content);
              })
              .catch((error) => {
                  console.error("Failed to fetch categories:", error);
              });
      }, []);
  
  return (
    <>
      {/* ========================= SECTION MAIN ========================= */}
      <section className="section-main padding-y">
        <main className="card">
          <div className="card-body">
            <div className="row">
              <aside className="col-lg col-md-3 flex-lg-grow-0">
                <nav className="nav-home-aside">
                  <h6 className="title-category">
                    Danh mục <i className="d-md-none icon fa fa-chevron-down"></i>
                  </h6>
                  <ul className="menu-category">
                    {categories.length > 0 ? (
                        categories.map((row) => (
                            <li key={row.categoryId}>
                                <Link
                                    className="dropdown-item"
                                    to={`/ListingGrid?categoryId=${row.categoryId}`}
                                >
                                    {row.categoryName}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li>Không có danh mục</li>
                    )}
                </ul>

                </nav>
              </aside>
              {/* Left navigation ends */}

              <div className="col-md-9 col-xl-7 col-lg-7">
                {/* Bootstrap Slider */}
                <div
                  id="carousel1_indicator"
                  className="slider-home-banner carousel slide"
                  data-bs-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li data-bs-target="#carousel1_indicator" data-bs-slide-to="0" className="active"></li>
                    <li data-bs-target="#carousel1_indicator" data-bs-slide-to="1"></li>
                    <li data-bs-target="#carousel1_indicator" data-bs-slide-to="2"></li>
                  </ol>
                  <div className="carousel-inner">
                  <div className="carousel-item active">
        <img src={require("../../assets/images/banners/slide1.jpg")} alt="First slide" />
      </div>
      <div className="carousel-item">
        <img src={require("../../assets/images/banners/slide2.jpg")} alt="Second slide" />
      </div>
      <div className="carousel-item">
        <img src={require("../../assets/images/banners/slide3.jpg")} alt="Third slide" />
      </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carousel1_indicator"
                    role="button"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carousel1_indicator"
                    role="button"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
              {/* Slider ends */}

              <div className="col-md d-none d-lg-block flex-grow-1">
                <aside className="special-home-right">
                  <h6 className="bg-blue text-center text-white mb-0 p-2">Thương hiệu</h6>

                  <div className="card-banner border-bottom">
                    <div className="py-3" style={{ width: '80%' }}>
                      <h6 className="card-title">XIAOMI</h6>
                      <a href="#" className="btn btn-secondary btn-sm">Tìm hiểu ngay</a>
                    </div>
                    <img src={require("../../assets/images/items/max.jpg")} height="80" className="img-bg" alt="Winter clothing" />
                  </div>
                  <div className="card-banner border-bottom">
                    <div className="py-3" style={{ width: '80%' }}>
                      <h6 className="card-title">APPLE</h6>
                      <a href="#" className="btn btn-secondary btn-sm">Tìm hiểu ngay</a>
                    </div>
                    <img src={require("../../assets/images/items/apple.jpg")} height="80" className="img-bg" alt="Men clothing" />
                  </div>
                  <div className="card-banner border-bottom">
                    <div className="py-3" style={{ width: '80%' }}>
                      <h6 className="card-title">SAMSUNG</h6>
                      <a href="#" className="btn btn-secondary btn-sm">Tìm hiểu ngay</a>
                    </div>
                    <img src={require("../../assets/images/items/airrr.jpg")} height="80" className="img-bg" alt="Home inventory" />
                  </div>
                </aside>
              </div>
              {/* Popular category ends */}
            </div>
          </div>
        </main>
      </section>
      {/* ========================= SECTION MAIN END ========================= */}
    </>
  );
};

export default Slider;
