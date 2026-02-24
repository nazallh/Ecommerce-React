import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  // If coming from Buy Now → go to checkout
  const redirectPath = location.state?.from || "/";

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  /* ================= REGISTER ================= */
  const handleRegister = async () => {
    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      alert("All fields are required");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: registerData.name,
          email: registerData.email,
          password: registerData.password
        }
      );

      alert(res.data.message);

      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert("Email and Password required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      // ✅ Redirect correctly (checkout if coming from Buy Now)
      navigate(redirectPath, { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      
      <div className="auth-container">
        <div className="auth-card">

          {/* LOGIN SECTION */}
          <div className="auth-left">
            <h2>Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
          </div>

          {/* REGISTER SECTION */}
          <div className="auth-right">
            <h2>Register</h2>

            <input
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  confirmPassword: e.target.value
                })
              }
            />

            <button className="register-btn" onClick={handleRegister}>
              Register
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Auth;