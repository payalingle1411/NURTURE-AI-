/*
=========================================================
Nurture AI Database Views
Database: PostgreSQL
=========================================================
*/

-- View 1: User Profile Details
CREATE OR REPLACE VIEW vw_user_profile_details AS
SELECT
    u.user_id,
    u.full_name,
    u.email,
    u.mobile_number,
    up.age,
    up.blood_group,
    up.height_cm,
    up.weight_kg,
    up.city,
    up.state,
    up.country
FROM users u
JOIN user_profile up
ON u.user_id = up.user_id;

---------------------------------------------------------

-- View 2: Pregnancy Information
CREATE OR REPLACE VIEW vw_pregnancy_details AS
SELECT
    u.user_id,
    u.full_name,
    p.due_date,
    p.pregnancy_week,
    p.trimester,
    p.high_risk,
    p.multiple_pregnancy
FROM users u
JOIN pregnancy_details p
ON u.user_id = p.user_id;

---------------------------------------------------------

-- View 3: Medical Summary
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
    a.food_allergy,
    a.medicine_allergy,
    a.other_allergy
FROM users u
JOIN medical_history m
ON u.user_id = m.user_id
JOIN allergies a
ON u.user_id = a.user_id;

---------------------------------------------------------

-- View 4: Doctor Details
CREATE OR REPLACE VIEW vw_doctor_details AS
SELECT
    u.full_name,
    d.doctor_name,
    d.hospital_name,
    d.contact_number,
    d.next_appointment
FROM users u
JOIN doctors d
ON u.user_id = d.user_id;

---------------------------------------------------------

-- View 5: Family Members
CREATE OR REPLACE VIEW vw_family_members AS
SELECT
    u.full_name,
    f.name,
    f.relationship,
    f.phone_number,
    f.permission_level
FROM users u
JOIN family_members f
ON u.user_id = f.user_id;