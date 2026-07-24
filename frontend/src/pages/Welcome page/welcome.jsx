import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="brand">
          <div className="brand-logo">✦</div>

          <div>
            <span className="brand-name">Nurture</span>
            <span className="brand-ai"> AI</span>
          </div>
        </div>

       <div className="nav-right">

  <a href="#features">Features</a>
  <a href="#about">About</a>

  {/* LOGIN BUTTON */}
  <button
    className="login-nav-btn"
    onClick={() => navigate("/login")}
  >
    Login
  </button>

  {/* SIGNUP BUTTON */}
  <button
    className="signup-nav-btn"
    onClick={() => navigate("/register")}
  >
    Sign Up
  </button>

</div>
      </nav>


      {/* ================= HERO SECTION ================= */}

      <main className="hero-section">

        <section className="hero-content">

          <div className="welcome-badge">
            ✨ Your personalized pregnancy wellness companion
          </div>

          <h1>
            Nurturing You Through
            <span>Every Step of Pregnancy</span>
          </h1>

          <p>
            Nurture AI brings personalized pregnancy wellness, AI-powered
            health guidance, nutrition support, symptom analysis, and family
            connection together in one supportive platform.
          </p>


          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              Get Started
              <span>→</span>
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
            >
              I Already Have an Account
            </button>

          </div>


          <div className="trust-text">
            <span>🔒</span>
            Your pregnancy journey deserves personalized care and support.
          </div>

        </section>


        {/* ================= VISUAL SECTION ================= */}

        <section className="hero-visual">

          <div className="soft-circle"></div>

          <div className="mother-illustration">
            🤰
          </div>


          <div className="floating-card health-card">

            <div className="card-icon">
              💗
            </div>

            <div>
              <strong>Daily Wellness</strong>
              <small>Personalized insights</small>
            </div>

          </div>


          <div className="floating-card family-card">

            <div className="card-icon">
              👨‍👩‍👧
            </div>

            <div>
              <strong>Family Support</strong>
              <small>Stay connected</small>
            </div>

          </div>


          <div className="floating-card ai-card">

            <div className="card-icon">
              🤖
            </div>

            <div>
              <strong>AI Assistant</strong>
              <small>Here when you need help</small>
            </div>

          </div>

        </section>

      </main>


      {/* ================= FEATURES ================= */}

      <section
        className="features-section"
        id="features"
      >

        <div className="section-heading">

          <p>DESIGNED AROUND YOUR JOURNEY</p>

          <h2>
            Support That Grows With You
          </h2>

        </div>


        <div className="features-grid">


          <div className="feature-card">

            <div className="feature-icon">
              🤖
            </div>

            <h3>
              AI Pregnancy Assistant
            </h3>

            <p>
              Get personalized answers and pregnancy-related health guidance
              whenever you need support.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🥗
            </div>

            <h3>
              Nutrition Analyzer
            </h3>

            <p>
              Track your food intake and receive personalized suggestions for
              improving your nutrition.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📈
            </div>

            <h3>
              Wellness Monitoring
            </h3>

            <p>
              Monitor daily wellness and understand symptom patterns through
              intelligent analysis.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              👨‍👩‍👧
            </div>

            <h3>
              Family Support
            </h3>

            <p>
              Keep family members connected and involved throughout the
              pregnancy journey.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📂
            </div>

            <h3>
              Digital Health Records
            </h3>

            <p>
              Keep important pregnancy reports and health information
              organized in one place.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔔
            </div>

            <h3>
              Smart Reminders
            </h3>

            <p>
              Receive reminders for medicines, checkups, and important
              pregnancy wellness activities.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-brand">
          ✦ Nurture AI
        </div>

        <p>
          AI-powered pregnancy wellness and family support.
        </p>

        <small>
          For wellness support only. Always consult qualified healthcare
          professionals for medical advice.
        </small>

      </footer>

    </div>
  );
}

export default Welcome;