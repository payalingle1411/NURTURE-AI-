/*
=========================================================
Nurture AI Database Indexes
Database: PostgreSQL
=========================================================
*/

-- Users
CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_users_mobile_number
ON users(mobile_number);

-- User Profile
CREATE INDEX idx_user_profile_user_id
ON user_profile(user_id);

-- Pregnancy Details
CREATE INDEX idx_pregnancy_user_id
ON pregnancy_details(user_id);

CREATE INDEX idx_pregnancy_due_date
ON pregnancy_details(due_date);

-- Medical History
CREATE INDEX idx_medical_history_user_id
ON medical_history(user_id);

-- Allergies
CREATE INDEX idx_allergies_user_id
ON allergies(user_id);

-- Emergency Contacts
CREATE INDEX idx_emergency_contacts_user_id
ON emergency_contacts(user_id);

-- Doctors
CREATE INDEX idx_doctors_user_id
ON doctors(user_id);

CREATE INDEX idx_doctors_name
ON doctors(doctor_name);

CREATE INDEX idx_doctors_next_appointment
ON doctors(next_appointment);

-- Family Members
CREATE INDEX idx_family_members_user_id
ON family_members(user_id);

-- Notification Preferences
CREATE INDEX idx_notification_preferences_user_id
ON notification_preferences(user_id);

-- Security Settings
CREATE INDEX idx_security_settings_user_id
ON security_settings(user_id);