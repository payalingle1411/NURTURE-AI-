/*
=========================================================
Nurture AI Database Constraints
Database: PostgreSQL
=========================================================

Primary Keys, Foreign Keys, UNIQUE constraints, and CHECK
constraints are defined directly inside create_tables.sql.

This file documents the constraint structure used in the
final Nurture AI database design.
=========================================================
*/


/*
---------------------------------------------------------
PRIMARY KEY CONSTRAINTS
---------------------------------------------------------

Each table has a unique primary key.
*/

-- users.user_id
-- user_profile.profile_id
-- pregnancy_details.pregnancy_id
-- medical_history.history_id
-- allergies.allergy_id
-- notification_preferences.preference_id
-- emergency_contacts.contact_id
-- family_members.family_member_id
-- doctors.doctor_id
-- appointment_history.appointment_id


/*
---------------------------------------------------------
UNIQUE KEY CONSTRAINTS
---------------------------------------------------------

The following columns enforce uniqueness in the
database. Unique user_id values in the related tables
also enforce the one-to-one relationships with users.
*/

-- users.email
-- users.mobile_number

-- user_profile.user_id
-- pregnancy_details.user_id
-- medical_history.user_id
-- allergies.user_id
-- notification_preferences.user_id


/*
---------------------------------------------------------
FOREIGN KEY CONSTRAINTS
---------------------------------------------------------

All child tables reference users(user_id).

ON DELETE CASCADE ensures that related records are
automatically removed when a user is deleted.
*/

-- user_profile.user_id
-- pregnancy_details.user_id
-- medical_history.user_id
-- allergies.user_id
-- notification_preferences.user_id
-- emergency_contacts.user_id
-- family_members.user_id
-- doctors.user_id
-- appointment_history.user_id


/*
---------------------------------------------------------
CHECK CONSTRAINTS
---------------------------------------------------------
*/

-- users.role
-- Allowed values:
-- MOTHER
-- FAMILY_MEMBER

-- pregnancy_details.pregnancy_week
-- Allowed range: 1 to 42

-- pregnancy_details.trimester
-- Allowed range: 1 to 3

-- family_members.permission_level
-- Allowed values:
-- VIEW_ONLY
-- VIEW_AND_REMINDERS


/*
---------------------------------------------------------
DEFAULT CONSTRAINTS
---------------------------------------------------------
*/

-- users.role = 'MOTHER'
-- users.terms_accepted = FALSE

-- pregnancy_details.first_pregnancy = TRUE
-- pregnancy_details.previous_pregnancies = 0
-- pregnancy_details.live_births = 0
-- pregnancy_details.miscarriages = 0
-- pregnancy_details.high_risk = FALSE
-- pregnancy_details.ivf_pregnancy = FALSE
-- pregnancy_details.multiple_pregnancy = FALSE

-- notification_preferences.medicine_reminder = TRUE
-- notification_preferences.water_reminder = TRUE
-- notification_preferences.appointment_reminder = TRUE
-- notification_preferences.weekly_update = TRUE
-- notification_preferences.nutrition_reminder = TRUE

-- family_members.permission_level = 'VIEW_ONLY'


/*
---------------------------------------------------------
DATABASE TABLES
---------------------------------------------------------

1. users
2. user_profile
3. pregnancy_details
4. medical_history
5. allergies
6. notification_preferences
7. emergency_contacts
8. family_members
9. doctors
10. appointment_history
*/