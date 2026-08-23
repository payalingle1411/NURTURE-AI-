/*
=========================================================
Nurture AI PostgreSQL Functions
Database: PostgreSQL
=========================================================
*/


---------------------------------------------------------
-- Function 1: Get User Profile by User ID
---------------------------------------------------------

CREATE OR REPLACE FUNCTION get_user_profile(p_user_id BIGINT)
RETURNS TABLE (
    full_name VARCHAR,
    email VARCHAR,
    mobile_number VARCHAR,
    age INTEGER,
    blood_group VARCHAR,
    city VARCHAR,
    state VARCHAR
)
LANGUAGE SQL
AS $$
SELECT
    u.full_name,
    u.email,
    u.mobile_number,
    up.age,
    up.blood_group,
    up.city,
    up.state
FROM users u
JOIN user_profile up
ON u.user_id = up.user_id
WHERE u.user_id = p_user_id;
$$;


---------------------------------------------------------
-- Function 2: Get Pregnancy Details
---------------------------------------------------------

CREATE OR REPLACE FUNCTION get_pregnancy_details(p_user_id BIGINT)
RETURNS TABLE (
    lmp_date DATE,
    due_date DATE,
    pregnancy_week INTEGER,
    trimester INTEGER,
    high_risk BOOLEAN
)
LANGUAGE SQL
AS $$
SELECT
    p.lmp_date,
    p.due_date,
    p.pregnancy_week,
    p.trimester,
    p.high_risk
FROM pregnancy_details p
WHERE p.user_id = p_user_id;
$$;


---------------------------------------------------------
-- Function 3: Get Doctor Information
---------------------------------------------------------

CREATE OR REPLACE FUNCTION get_doctor_details(p_user_id BIGINT)
RETURNS TABLE (
    doctor_name VARCHAR,
    hospital_name VARCHAR,
    contact_number VARCHAR,
    next_appointment TIMESTAMP
)
LANGUAGE SQL
AS $$
SELECT
    d.doctor_name,
    d.hospital_name,
    d.contact_number,
    d.next_appointment
FROM doctors d
WHERE d.user_id = p_user_id;
$$;


---------------------------------------------------------
-- Function 4: Count Family Members
---------------------------------------------------------

CREATE OR REPLACE FUNCTION count_family_members(p_user_id BIGINT)
RETURNS INTEGER
LANGUAGE SQL
AS $$
SELECT COUNT(*)::INTEGER
FROM family_members
WHERE user_id = p_user_id;
$$;


---------------------------------------------------------
-- Function 5: Count Emergency Contacts
---------------------------------------------------------

CREATE OR REPLACE FUNCTION count_emergency_contacts(p_user_id BIGINT)
RETURNS INTEGER
LANGUAGE SQL
AS $$
SELECT COUNT(*)::INTEGER
FROM emergency_contacts
WHERE user_id = p_user_id;
$$;


---------------------------------------------------------
-- Function 6: Get Appointment History
---------------------------------------------------------

CREATE OR REPLACE FUNCTION get_appointment_history(p_user_id BIGINT)
RETURNS TABLE (
    appointment_id BIGINT,
    total_appointment INTEGER,
    prescription TEXT,
    reports TEXT
)
LANGUAGE SQL
AS $$
SELECT
    a.appointment_id,
    a.total_appointment,
    a.prescription,
    a.reports
FROM appointment_history a
WHERE a.user_id = p_user_id;
$$;