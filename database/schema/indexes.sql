/*
=========================================================
Nurture AI Database Indexes
Database: PostgreSQL
=========================================================

Indexes are created for frequently searched columns and
foreign key columns used in table relationships.

Note:
PostgreSQL automatically creates indexes for PRIMARY KEY
and UNIQUE constraints. Therefore, explicit indexes are
not created again for those columns.
=========================================================
*/


-- ======================================================
-- PREGNANCY DETAILS
-- ======================================================

CREATE INDEX idx_pregnancy_due_date
ON pregnancy_details(due_date);


-- ======================================================
-- EMERGENCY CONTACTS
-- ======================================================

CREATE INDEX idx_emergency_contacts_user_id
ON emergency_contacts(user_id);


-- ======================================================
-- FAMILY MEMBERS
-- ======================================================

CREATE INDEX idx_family_members_user_id
ON family_members(user_id);


-- ======================================================
-- DOCTORS
-- ======================================================

CREATE INDEX idx_doctors_user_id
ON doctors(user_id);

CREATE INDEX idx_doctors_name
ON doctors(doctor_name);

CREATE INDEX idx_doctors_next_appointment
ON doctors(next_appointment);


-- ======================================================
-- APPOINTMENT HISTORY
-- ======================================================

CREATE INDEX idx_appointment_history_user_id
ON appointment_history(user_id);