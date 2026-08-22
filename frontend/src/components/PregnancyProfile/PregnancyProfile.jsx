import "./PregnancyProfile.css";

function PregnancyProfile() {
  return (
    <div className="pregnancy-profile-page">
      <div className="profile-container">

        {/* PAGE HEADER */}
        <div className="profile-header">
          <h1>Create Pregnancy Profile</h1>
          <p>
            Complete your personal, pregnancy and medical information
          </p>
        </div>

        {/* ================= USERS ================= */}
        <section className="profile-section">
          <div className="section-heading">
            <span className="section-number">01</span>
            <div>
              <h2>Basic Information</h2>
              <p>Information associated with your account</p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter mobile number"
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select>
                <option>Select role</option>
                <option>Mother</option>
                <option>Family Member</option>
              </select>
            </div>

          </div>
        </section>


        {/* ================= USER PROFILE ================= */}
        <section className="profile-section">
          <div className="section-heading">
            <span className="section-number">02</span>
            <div>
              <h2>Personal Profile</h2>
              <p>Your personal and physical information</p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                placeholder="Enter age"
              />
            </div>

            <div className="form-group">
              <label>Height (cm)</label>
              <input
                type="number"
                placeholder="Enter height"
              />
            </div>

            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                placeholder="Enter weight"
              />
            </div>

            <div className="form-group">
              <label>Blood Group</label>
              <select>
                <option>Select blood group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            <div className="form-group">
              <label>Profile Picture</label>
              <input
                type="file"
                accept="image/*"
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                placeholder="Enter country"
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                placeholder="Enter state"
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                placeholder="Enter city"
              />
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                placeholder="Enter pincode"
              />
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <textarea
                rows="3"
                placeholder="Enter complete address"
              ></textarea>
            </div>

          </div>
        </section>


        {/* ================= PREGNANCY DETAILS ================= */}
        <section className="profile-section">
          <div className="section-heading">
            <span className="section-number">03</span>
            <div>
              <h2>Pregnancy Details</h2>
              <p>Provide your current pregnancy information</p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>LMP Date</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Pregnancy Week</label>
              <input
                type="number"
                placeholder="Enter pregnancy week"
              />
            </div>

            <div className="form-group">
              <label>Trimester</label>
              <select>
                <option>Select trimester</option>
                <option>First Trimester</option>
                <option>Second Trimester</option>
                <option>Third Trimester</option>
              </select>
            </div>

            <div className="form-group">
              <label>First Pregnancy</label>
              <select>
                <option>Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Previous Pregnancies</label>
              <input
                type="number"
                placeholder="Enter number"
              />
            </div>

            <div className="form-group">
              <label>Live Births</label>
              <input
                type="number"
                placeholder="Enter number"
              />
            </div>

            <div className="form-group">
              <label>Miscarriages</label>
              <input
                type="number"
                placeholder="Enter number"
              />
            </div>

            <div className="form-group">
              <label>High Risk Pregnancy</label>
              <select>
                <option>Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="form-group">
              <label>IVF Pregnancy</label>
              <select>
                <option>Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Multiple Pregnancy</label>
              <select>
                <option>Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

          </div>
        </section>


        {/* ================= MEDICAL HISTORY ================= */}
        <section className="profile-section">
          <div className="section-heading">
            <span className="section-number">04</span>
            <div>
              <h2>Medical History</h2>
              <p>Tell us about your existing medical conditions</p>
            </div>
          </div>

          <div className="medical-grid">

            <label className="medical-option">
              <input type="checkbox" />
              <span>Diabetes</span>
            </label>

            <label className="medical-option">
              <input type="checkbox" />
              <span>Hypertension</span>
            </label>

            <label className="medical-option">
              <input type="checkbox" />
              <span>Thyroid</span>
            </label>

            <label className="medical-option">
              <input type="checkbox" />
              <span>PCOS</span>
            </label>

            <label className="medical-option">
              <input type="checkbox" />
              <span>Asthma</span>
            </label>

            <label className="medical-option">
              <input type="checkbox" />
              <span>Heart Disease</span>
            </label>

            <div className="form-group full-width">
              <label>Other Disease</label>
              <textarea
                rows="3"
                placeholder="Enter any other medical condition"
              ></textarea>
            </div>

          </div>
        </section>


        {/* ACTION BUTTONS */}
        <div className="profile-actions">
          <button className="cancel-btn">
            Cancel
          </button>

          <button className="save-btn">
            Save Profile
          </button>
        </div>

      </div>
    </div>
  );
}

export default PregnancyProfile;