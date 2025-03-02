import React, { useEffect, useState } from 'react';
import Slider from '../pages/home/Slider';
import Deal from '../pages/home/Deal';
import Apparel from '../pages/home/Apparel';
import Electronics from '../pages/home/Electronic';
import Request from '../pages/home/Request';
import Items from '../pages/home/Items';
import Services from '../pages/home/Services';
import Section1 from '../pages/home/Section1';
import Region from '../pages/home/Region';
import { GET_ALL } from '../api/apiService';

function Home() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        GET_ALL('categories')
            .then(response => {
                console.log("📡 Categories API response:", response);
                setCategories(response.content || []);
            })
            .catch(error => {
                console.error("❌ Lỗi khi lấy danh mục:", error);
                setError("Không thể tải danh mục. Vui lòng thử lại.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <Slider />
            <Deal />
            {loading ? (
                <p>🔄 Đang tải danh mục...</p>
            ) : error ? (
                <p>{error}</p>
            ) : categories.length > 0 ? (
                categories.map(category => (
                    <Section1
                        key={category.categoryId}
                        categoryName={category.categoryName}
                        categoryId={category.categoryId} 
                    />
                ))
            ) : (
                <p>⚠️ Không có danh mục nào</p>
            )}
            {loading ? (
                <p>🔄 Đang tải danh mục...</p>
            ) : error ? (
                <p>{error}</p>
            ) : categories.length > 0 ? (
                categories.map(category => (
                    <Apparel
                        key={category.categoryId}
                        categoryName={category.categoryName}
                        categoryId={category.categoryId} 
                    />
                ))
            ) : (
                <p>⚠️ Không có danh mục nào</p>
            )}
            {/* <Electronics /> */}
            <Request />
            <Items />
            <Services />
            <Region />
        </div>
    );
}

export default Home;