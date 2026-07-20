import { useState } from "react";
import { Link } from "react-router-dom";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API call will be added later
    console.log("Register Successfully");
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

              <select required>

                <option value="">Select Role</option>

                <option>Mother</option>

                <option>Family Member</option>

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