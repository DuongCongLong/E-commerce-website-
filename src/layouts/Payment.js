import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h2 className="text-success">Thanh toán thành công!</h2>
      <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
        alt="Success"
        width="120"
      />
      <div className="mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}> 
          Quay lại trang chủ
        </button>
        <button className="btn btn-secondary ml-2" onClick={() => navigate("/Order")}> 
          Xem đơn hàng
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
