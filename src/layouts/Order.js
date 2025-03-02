import React, { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const email = localStorage.getItem("email");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!email) {
      console.error("Không tìm thấy email trong localStorage");
      return;
    }

    fetch(`http://localhost:8080/api/public/users/${email}/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải đơn hàng:", error);
        setOrders([]);
      });
  }, [email]);

  // Hàm lấy chi tiết đơn hàng
  const fetchProductDetails = async (productId) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `http://localhost:8080/api/public/products/${productId}`,
        {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
      );
      const product = await response.json();
      return product; // { productName, price }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      return null;
    }
  };

  const fetchOrderDetails = async (orderId) => {
    if (selectedOrderId === orderId) {
        setSelectedOrderId(null); // Nếu đã mở, thì ẩn đi
        return;
      }
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `http://localhost:8080/api/public/users/${email}/orders/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      let orderData = await response.json();

      if (orderData.orderItems?.length) {
        const updatedItems = await Promise.all(
          orderData.orderItems.map(async (item) => {
            const productId = item.product?.productId;
            const image = item.product?.image;
            console.log("🔍 productId:", productId);
            if (!item.productName && productId) {
              const productDetails = await fetchProductDetails(productId);
              return {
                ...item,
                productName: productDetails?.productName || "Không xác định",
                price: productDetails?.price || 0,
                imageUrl: productDetails?.image || "",
              };
            }
            return item;
          })
        );

        orderData.orderItems = updatedItems;
      }

      setOrderDetails((prev) => ({ ...prev, [orderId]: orderData }));
      setSelectedOrderId(orderId);
    } catch (error) {
      console.error("Lỗi khi tải chi tiết đơn hàng:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          📦 Danh sách đơn hàng
        </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">😔 Không có đơn hàng nào.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border rounded-lg p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition"
            >
              <p className="text-sm text-gray-600">
                📅 Ngày đặt:{" "}
                <span className="font-medium">{order.orderDate}</span>
              </p>
              <p className="text-sm text-gray-600">
                🚀 Trạng thái:{" "}
                <span className="font-medium">{order.orderStatus}</span>
              </p>
              <p className="text-sm text-gray-600">
                💰 Tổng tiền:{" "}
                <span className="font-medium text-green-600">
                  {order.totalAmount?.toLocaleString()} đ
                </span>
              </p>

              {/* Nút xem chi tiết */}
              <button
                onClick={() => fetchOrderDetails(order.orderId)}
                className="mt-2 px-4 py-2 bg-blue-700 rounded-md hover:bg-blue-800 transition"
              >
                {selectedOrderId === order.orderId
                  ? "Ẩn chi tiết"
                  : "Xem chi tiết"}
              </button>

              {/* Hiển thị chi tiết đơn hàng ngay bên dưới đơn hàng đó */}
              {selectedOrderId === order.orderId &&
                orderDetails[order.orderId] && (
                  <div className="mt-4 p-4 border rounded-lg bg-white shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800">
                      🛒 Chi tiết đơn hàng #
                      {orderDetails[order.orderId].orderId}
                    </h3>
                    <p className="text-gray-600">
                      📅 Ngày đặt: {orderDetails[order.orderId].orderDate}
                    </p>
                    <p className="text-gray-600">
                      🚀 Trạng thái: {orderDetails[order.orderId].orderStatus}
                    </p>
                    <p className="text-gray-600">
                      💰 Tổng tiền:{" "}
                      <span className="text-green-600 font-medium">
                        {orderDetails[
                          order.orderId
                        ].totalAmount?.toLocaleString()}{" "}
                        đ
                      </span>
                    </p>

                    {/* Hiển thị danh sách sản phẩm nếu có */}
                    <h4 className="mt-4 font-medium text-gray-700">
                      📌 Sản phẩm trong đơn hàng:
                    </h4>
                    {orderDetails[order.orderId].orderItems?.length > 0 ? (
                    <ul className="pl-5 text-gray-700" style={{ listStyle: "none", paddingLeft: 0 }}>
                    {orderDetails[order.orderId].orderItems.map((item, index) => (
                      <li key={index} className="flex items-center gap-4 border-b pb-2">
                        {item.imageUrl && (
                          <img 
                            src={`http://localhost:8080/api/public/products/image/${item.product.image}`} 
                            alt={item.productName} 
                            style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 8 }}
                          />
                        )}
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p>{item.quantity} x {item.price?.toLocaleString()} đ</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                   
                    ) : (
                      <p className="text-gray-500">Không có sản phẩm nào.</p>
                    )}
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default OrderPage;
