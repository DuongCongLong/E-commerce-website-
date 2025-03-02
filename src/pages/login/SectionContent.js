// import React, { useState } from "react";
// import { LOGIN } from "../../api/apiService";
// import { useNavigate } from "react-router-dom";

// const SectionContent = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const body = { email, password };

//         try {
//             const response = await LOGIN(body);

//             // In ra toàn bộ phản hồi từ API để kiểm tra cấu trúc dữ liệu
//             console.log("🔹 Login API response:", response);

//             if (response && response.data) {
//                 console.log("🔹 Login response data:", response.data);

//                 // Kiểm tra token trong phản hồi
//                 const token = response.data["jwt-token"];
//                 if (token) {
//                     // Lưu token vào localStorage
//                     localStorage.setItem("authToken", token);
//                     window.alert("Login successful!");

//                     // Kiểm tra lại token đã lưu vào localStorage chưa
//                     const storedToken = localStorage.getItem("authToken");
//                     console.log("🔑 Token lưu trong localStorage:", storedToken);

//                     // Nếu token lưu thành công, chuyển hướng về trang chủ
//                     if (storedToken) {
//                         navigate("/"); // Chuyển hướng về trang chủ
//                     } else {
//                         window.alert("Lưu token thất bại trong localStorage");
//                     }
//                 } else {
//                     window.alert("Token không có trong phản hồi API");
//                 }
//             } else {
//                 window.alert("Phản hồi đăng nhập không có dữ liệu");
//             }
//         } catch (error) {
//             window.alert("Đăng nhập thất bại: " + error.message);
//         }
//     };

//     return (
//         <section className="section-content padding-y" style={{ minHeight: "84vh" }}>
//             <div className="card mx-auto" style={{ maxWidth: "380px", marginTop: "100px" }}>
//                 <div className="card-body">
//                     <h4 className="card-title mb-4">Sign in</h4>
//                     <form onSubmit={handleSubmit}>
//                         <a href="#" className="btn btn-facebook btn-block mb-2">
//                             <i className="fab fa-facebook-f"></i> &nbsp; Sign in with Facebook
//                         </a>
//                         <a href="#" className="btn btn-google btn-block mb-4">
//                             <i className="fab fa-google"></i> &nbsp; Sign in with Google
//                         </a>
//                         <div className="form-group">
//                             <input
//                                 name="email"
//                                 className="form-control"
//                                 placeholder="Email"
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <input
//                                 name="password"
//                                 className="form-control"
//                                 placeholder="Password"
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <a href="#" className="float-right">Forgot password?</a>
//                         </div>
//                         <label className="float-left custom-control custom-checkbox">
//                             <input type="checkbox" className="custom-control-input" />
//                             <div className="custom-control-label">Remember</div>
//                         </label>
//                         <div className="form-group">
//                             <button type="submit" className="btn btn-primary btn-block">Sign In</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             <p className="text-center mt-4">
//                 Don't have an account? <a href="#">Sign up</a>
//             </p>
//         </section>
//     );
// };

// export default SectionContent;
import React, { useState } from "react";
import { LOGIN } from "../../api/apiService";
import { useNavigate } from "react-router-dom";

const SectionContent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = { email, password };

        try {
            const response = await LOGIN(body);

            // In ra toàn bộ phản hồi từ API để kiểm tra cấu trúc dữ liệu
            console.log("🔹 Login API response:", response);

            if (response && response.data) {
                console.log("🔹 Login response data:", response.data);

                // Kiểm tra token trong phản hồi
                const token = response.data["jwt-token"];
                if (token) {
                    // Lưu token vào localStorage
                    localStorage.setItem("authToken", token);
                    localStorage.setItem("email", email);
                    localStorage.setItem("user_id", 1);
                    window.alert("Login successful!");

                    // Kiểm tra lại token đã lưu vào localStorage chưa
                    const storedToken = localStorage.getItem("authToken");
                    console.log("🔑 Token lưu trong localStorage:", storedToken);

                    // Nếu token lưu thành công, chuyển hướng về trang chủ
                    if (storedToken) {
                        navigate("/"); // Chuyển hướng về trang chủ
                    } else {
                        window.alert("Lưu token thất bại trong localStorage");
                    }
                } else {
                    window.alert("Token không có trong phản hồi API");
                }
            } else {
                window.alert("Phản hồi đăng nhập không có dữ liệu");
            }
        } catch (error) {
            window.alert("Đăng nhập thất bại: " + error.message);
        }
    };

    return (
        <section className="section-content padding-y" style={{ minHeight: "84vh" }}>
            <div className="card mx-auto" style={{ maxWidth: "380px", marginTop: "100px" }}>
                <div className="card-body">
                    <h4 className="card-title mb-4">Sign in</h4>
                    <form onSubmit={handleSubmit}>
                        <a href="#" className="btn btn-facebook btn-block mb-2">
                            <i className="fab fa-facebook-f"></i> &nbsp; Sign in with Facebook
                        </a>
                        <a href="#" className="btn btn-google btn-block mb-4">
                            <i className="fab fa-google"></i> &nbsp; Sign in with Google
                        </a>
                        <div className="form-group">
                            <input
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <a href="#" className="float-right">Forgot password?</a>
                        </div>
                        <label className="float-left custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" />
                            <div className="custom-control-label">Remember</div>
                        </label>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
            <p className="text-center mt-4">
                Don't have an account? <a href="#">Sign up</a>
            </p>
        </section>
    );
};

export default SectionContent;




