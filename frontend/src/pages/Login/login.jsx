import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );

    console.log(response.data);

    if (response.data === "Login Successful") {
      alert("Login Successful ✅");
      navigate("/dashboard");
    } else {
      alert(response.data); // User not found / Invalid password
    }

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data);
    } else {
      alert("Unable to connect to server.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="login-left">
        <div className="overlay">
          <h1>🤱 Nurture AI</h1>

          <h2>Welcome Back!</h2>

          <p>
            Your trusted pregnancy wellness companion. Stay healthy,
            track your baby's growth, receive AI-powered guidance,
            and keep your family connected throughout your motherhood
            journey.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>

          <h2>Login</h2>

          <p className="subtitle">
            Sign in to continue your pregnancy journey.
          </p>

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>

            <div className="input-box">
              <FaEnvelope className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <div className="input-box">
              <FaLock className="input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="remember">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Remember Me</span>
            </label>

            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google */}
          <button
            type="button"
            className="google-btn"
          >
            <FcGoogle className="google-icon" />
            <span>Continue with Google</span>
          </button>

          {/* Register */}
          <p className="register-link">
            Don't have an account?
            <Link to="/register">
              {" "}
              Create Account
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;