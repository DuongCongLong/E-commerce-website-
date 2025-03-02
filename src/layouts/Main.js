import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../layouts/Home';
import UserLogin from '../layouts/UserLogin';
import UserRegister from '../layouts/UserRegister';
import DetailProduct from '../layouts/DetailProduct';
import ListingGrid from '../layouts/ListingGrid';
import ShoppingCart from '../layouts/ShoppingCart';
import Payment from '../layouts/Payment';
import Order from '../layouts/Order';
const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Login" element={<UserLogin />} />
      <Route path="/Register" element={<UserRegister />} />
      <Route path="/Detail" element={<DetailProduct />} />
      <Route path="/ListingGrid" element={<ListingGrid />} />
      <Route path="/Cart" element={<ShoppingCart />} />
      <Route path="/Payment" element={<Payment />} />
      <Route path="/Order" element={<Order />} />
    </Routes>
  </main>
);

export default Main;