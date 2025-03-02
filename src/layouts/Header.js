import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";
import { Link } from "react-router-dom";
import us from "../assets/images/icons/flags/US.png";

import logo from "../assets/images/logo.svg";

function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [categories, setCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const email = localStorage.getItem("email");

        if (token && email) {
            setIsLoggedIn(true);
            setUserEmail(email);
        }
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        setUserEmail("");
    };

    return (
        <header className="section-header">
            <nav className="navbar d-none d-md-flex p-md-0 navbar-expand-sm navbar-light border-bottom">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarTop4"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTop4">
                        <ul className="navbar-nav mr-auto">
                        <li>
                                {isLoggedIn ? (
                                    <span className="nav-link">
                                        Xin chào, <b>{userEmail}</b> | 
                                        <a href="#" onClick={handleLogout} style={{ color: "#F24405", marginLeft: "5px" }}>
                                            Đăng xuất
                                        </a>
                                    </span>
                                ) : (
                                    <span className="nav-link">
                                        Xin chào, <Link to="/Login">Đăng nhập</Link> hoặc
                                        <Link to="/Register"> Đăng ký</Link>
                                    </span>
                                )}
                            </li>
                            <li>
                                <a href="#" className="nav-link">
                                    Khuyến mãi
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link">
                                    Bán hàng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link">
                                    Trợ giúp
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li>
                                <a href="#" className="nav-link">
                                    <img src={us} alt="us" height="16" /> Giao hàng tới
                                </a>
                            </li>
                            <li 
            className="nav-item dropdown"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Link to="#" className="nav-link dropdown-toggle">
                Danh sách theo dõi
            </Link>
            <ul className={`dropdown-menu small ${isOpen ? "show" : ""}`}>
                <li>
                    <Link className="dropdown-item" to="/san-pham-1">
                        Sản phẩm thứ nhất
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="/san-pham-2">
                        Sản phẩm thứ hai
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="/san-pham-3">
                        Sản phẩm thứ ba
                    </Link>
                </li>
            </ul>
        </li>
                            <li>
                                <a href="/Order" className="nav-link">
                                    Đơn hàng của tôi
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link">
                                    <i className="fa fa-bell"></i>
                                </a>
                            </li>
                            <li>
                                <a href="/cart" className="nav-link">
                                    <i className="fa fa-shopping-cart"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container">
                <section className="header-main border-bottom">
                    <div className="row row-sm">
                        <div className="col-6 col-sm col-md col-lg flex-grow-0">
                            <Link to="/Home" className="brand-wrap">
                                <img className="logo" src={logo} alt="Logo" />
                            </Link>
                        </div>
                        <div className="col-lg-6 col-xl col-md-5 col-sm-12 flex-grow-1">
                            <form action="#" className="search-header">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Tìm kiếm" />
                                    <select className="custom-select border-left" name="category_name">
                                        <option value="">Tất cả loại</option>
                                        <option value="codex">Đặc biệt</option>
                                        <option value="comments">Chỉ tốt nhất</option>
                                        <option value="content">Mới nhất</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg col-md" style={{ flexGrow: 0.2 }}>
                            <button className="btn btn-block btn-primary" type="submit">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </section>
                <nav className="navbar navbar-main navbar-expand pl-0">
            <ul className="navbar-nav flex-wrap">
                <li className="nav-item">
                    <Link className="nav-link" to="/Home">
                        Trang chủ
                    </Link>
                </li>
                <li className="nav-item dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <a className="nav-link dropdown-toggle" href="#" role="button">
                        Danh sách sản phẩm
                    </a>
                    <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                        {categories.length > 0 &&
                            categories.map((row) => (
                                <Link
                                    className="dropdown-item"
                                    to={`/ListingGrid?categoryId=${row.categoryId}`}
                                    key={row.categoryId}
                                >
                                    {row.categoryName}
                                </Link>
                            ))}
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/ListingGrid">
                            Tất cả sản phẩm
                        </Link>
                    </div>
                </li>
                <li className="nav-item"><a className="nav-link" href="#">Điện tử</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Thời trang</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Làm đẹp</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Xe hơi</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Thể thao</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Nông trại và vườn</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Khuyến mãi</a></li>
                {/* <li className="nav-item"><a className="nav-link" href="#">Dưới $10</a></li> */}
            </ul>
        </nav>
            </div>
        </header>
    );
}

export default Header;