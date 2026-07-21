import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserTag,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        role: formData.role,
        password: formData.password,
      }
    );

    console.log(response.data);

    // If registration is successful
    if (response.data === "Registration Successful") {
      alert("Registration Successful ✅");

      // Clear form
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        role: "",
        password: "",
        confirmPassword: "",
      });

      // Temporary navigation
      navigate("/dashboard");

      // Later replace with:
      // navigate("/user-details");
    } else {
      alert(response.data);
    }

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data);
    } else {
      alert("Unable to connect to the server.");
    }
  }
};

  return (
    <div className="register-container">
      {/* Left Section */}
      <div className="register-left">
        <div className="overlay">
          <h1>🤱 Nurture AI</h1>

          <h2>Create Your Account</h2>

          <p>
            Join thousands of mothers using AI-powered pregnancy tracking,
            personalized wellness insights, and family support throughout
            every stage of motherhood.
          </p>
        </div>
      </div>

      {/* Right Section */}

      <div className="register-right">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>

          <p className="subtitle">
            Create your account to begin your pregnancy journey.
          </p>

          {/* Full Name */}

          <div className="input-group">
            <label>Full Name</label>

            <div className="input-box">
              <FaUser className="input-icon" />

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Email */}

          <div className="input-group">
            <label>Email Address</label>

            <div className="input-box">
              <FaEnvelope className="input-icon" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Mobile */}

          <div className="input-group">
            <label>Mobile Number</label>

            <div className="input-box">
              <FaPhone className="input-icon" />

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                maxLength="10"
                required
              />
            </div>
          </div>

          {/* Role */}

          <div className="input-group">
            <label>Role</label>

            <div className="input-box">
              <FaUserTag className="input-icon" />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Mother">Mother</option>
                <option value="Family Member">Family Member</option>
              </select>
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Create Password"
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

          {/* Confirm Password */}

          <div className="input-group">
            <label>Confirm Password</label>

            <div className="input-box">
              <FaLock className="input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>

          {/* Terms */}

          <div className="terms">
            <label>
              <input type="checkbox" required />

              I agree to the <a href="/">Terms & Conditions</a>
            </label>
          </div>

          {/* Register Button */}

          <button className="register-btn" type="submit">
            Create Account
          </button>

          {/* Login Link */}

          <p className="login-link">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

          {/* Quote */}

          <p className="quote">
            ❤️ Every mother deserves personalized care because every pregnancy
            is unique.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;