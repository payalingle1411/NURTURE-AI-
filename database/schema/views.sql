/*
=========================================================
Nurture AI Database Views
Database: PostgreSQL
=========================================================
*/


-- ======================================================
-- View 1: User Profile Details
-- ======================================================

CREATE OR REPLACE VIEW vw_user_profile_details AS
SELECT
    u.user_id,
    u.full_name,
    u.email,
    u.mobile_number,
    up.date_of_birth,
    up.age,
    up.height_cm,
    up.weight_kg,
    up.blood_group,
    up.profile_picture,
    up.country,
    up.state,
    up.city,
    up.address,
    up.pincode
FROM users u
JOIN user_profile up
ON u.user_id = up.user_id;


-- ======================================================
-- View 2: Pregnancy Information
-- ======================================================

CREATE OR REPLACE VIEW vw_pregnancy_details AS
SELECT
    u.user_id,
    u.full_name,
    p.lmp_date,
    p.due_date,
    p.pregnancy_week,
    p.trimester,
    p.first_pregnancy,
    p.previous_pregnancies,
    p.live_births,
    p.miscarriages,
    p.high_risk,
    p.ivf_pregnancy,
    p.multiple_pregnancy
FROM users u
JOIN pregnancy_details p
ON u.user_id = p.user_id;


-- ======================================================
-- View 3: Medical Summary
-- ======================================================

CREATE OR REPLACE VIEW vw_medical_summary AS
SELECT
    u.user_id,
    u.full_name,
    m.diabetes,
    m.hypertension,
    m.thyroid,
    m.pcos,
    m.asthma,
    m.heart_disease,
    m.other_disease,
    a.food_allergy,
    a.medicine_allergy,
    a.other_allergy
FROM users u
JOIN medical_history m
ON u.user_id = m.user_id
JOIN allergies a
ON u.user_id = a.user_id;


-- ======================================================
-- View 4: Doctor Details
-- ======================================================

CREATE OR REPLACE VIEW vw_doctor_details AS
SELECT
    u.user_id,
    u.full_name,
    d.doctor_name,
    d.hospital_name,
    d.contact_number,
    d.hospital_address,
    d.next_appointment
FROM users u
JOIN doctors d
ON u.user_id = d.user_id;


-- ======================================================
-- View 5: Family Members
-- ======================================================

CREATE OR REPLACE VIEW vw_family_members AS
SELECT
    u.user_id,
    u.full_name,
    f.name,
    f.relationship,
    f.mobile_number,
    f.permission_level
FROM users u
JOIN family_members f
ON u.user_id = f.user_id;


-- ======================================================
-- View 6: Appointment History
-- ======================================================

CREATE OR REPLACE VIEW vw_appointment_history AS
SELECT
    u.user_id,
    u.full_name,
    a.appointment_id,
    a.total_appointment,
    a.prescription,
    a.reports
FROM users u
JOIN appointment_history a
ON u.user_id = a.user_id;