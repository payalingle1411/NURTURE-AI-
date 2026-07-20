import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);

    // Backend API will be added here
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="login-left">
        <div className="overlay">
          <h1>🤱 Nurture AI</h1>

          <h2>Welcome Back!</h2>

          <p>
            Your trusted pregnancy wellness companion. Stay healthy, track your
            baby's growth, receive AI-powered guidance, and keep your family
            connected throughout your motherhood journey.
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
            <label htmlFor="email">Email Address</label>

            <div className="input-box">
              <FaEnvelope className="input-icon" />

              <input
                id="email"
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
            <label htmlFor="password">Password</label>

            <div className="input-box">
              <FaLock className="input-icon" />

              <input
                id="password"
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
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
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
          <button type="submit" className="login-btn">
            Login
          </button>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google Login */}
          <button type="button" className="google-btn">
            <FcGoogle className="google-icon" />
            <span>Continue with Google</span>
          </button>

          {/* Register */}
          <p className="register-link">
            Don't have an account?
            <Link to="/register"> Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;