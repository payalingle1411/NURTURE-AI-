# Data Dictionary

## Project Name

**Nurture AI – AI-Powered Personalized Pregnancy Wellness & Family Support Platform**

---

# Introduction

The Data Dictionary provides detailed information about all database tables, columns, data types, constraints, and their purpose. It serves as a reference document for developers and database administrators.

---

# 1. users

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| id | BIGINT | Primary Key, Identity | Unique user identifier |
| full_name | VARCHAR(100) | NOT NULL | User's full name |
| email | VARCHAR(100) | UNIQUE, NOT NULL | User email address |
| password | VARCHAR(255) | NOT NULL | Encrypted password |
| mobile_number | VARCHAR(15) | UNIQUE, NOT NULL | Mobile number |
| role | VARCHAR(20) | NOT NULL | User role (MOTHER) |
| terms_accepted | BOOLEAN | DEFAULT TRUE | Terms acceptance status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |

---

# 2. user_profile

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| id | BIGINT | Primary Key, Identity | Profile ID |
| user_id | BIGINT | FK, UNIQUE | References users(id) |
| date_of_birth | DATE | NOT NULL | User's birth date |
| age | INTEGER | CHECK(age>0) | User age |
| height_cm | DECIMAL(5,2) | CHECK(height_cm>0) | Height in centimeters |
| weight_kg | DECIMAL(5,2) | CHECK(weight_kg>0) | Weight in kilograms |
| blood_group | VARCHAR(5) | | Blood group |
| profile_picture | VARCHAR(255) | | Profile image path |
| country | VARCHAR(50) | | Country |
| state | VARCHAR(50) | | State |
| city | VARCHAR(50) | | City |
| address | TEXT | | Residential address |
| pincode | VARCHAR(10) | | Postal code |

---

# 3. pregnancy_details

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| id | BIGINT | Primary Key, Identity | Pregnancy record ID |
| user_id | BIGINT | FK, UNIQUE | References users(id) |
| lmp_date | DATE | NOT NULL | Last menstrual period |
| due_date | DATE | NOT NULL | Expected delivery date |
| pregnancy_week | INTEGER | CHECK(1-42) | Current pregnancy week |
| trimester | INTEGER | CHECK(1-3) | Current trimester |
| first_pregnancy | BOOLEAN | | First pregnancy status |
| previous_pregnancies | INTEGER | DEFAULT 0 | Previous pregnancies |
| live_births | INTEGER | DEFAULT 0 | Number of live births |
| miscarriages | INTEGER | DEFAULT 0 | Number of miscarriages |
| high_risk | BOOLEAN | DEFAULT FALSE | High-risk pregnancy |
| ivf_pregnancy | BOOLEAN | DEFAULT FALSE | IVF pregnancy |
| multiple_pregnancy | BOOLEAN | DEFAULT FALSE | Multiple babies |

---

# 4. medical_history

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| id | BIGINT | Primary Key, Identity | Medical history ID |
| user_id | BIGINT | FK, UNIQUE | References users(id) |
| diabetes | BOOLEAN | DEFAULT FALSE | Diabetes history |
| hypertension | BOOLEAN | DEFAULT FALSE | Hypertension history |
| thyroid | BOOLEAN | DEFAULT FALSE | Thyroid disorder |
| pcos | BOOLEAN | DEFAULT FALSE | PCOS history |
| asthma | BOOLEAN | DEFAULT FALSE | Asthma history |
| heart_disease | BOOLEAN | DEFAULT FALSE | Heart disease |
| other_disease | TEXT | | Other medical conditions |

---

# 5. allergies

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| id | BIGINT | Primary Key, Identity | Allergy record ID |
| user_id | BIGINT | FK, UNIQUE | References users(id) |
| food_allergy | TEXT | | Food allergies |
| medicine_allergy | TEXT | | Medicine allergies |
| other_allergy | TEXT | | Other allergies |

---

# 6. emergency_contacts

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| id | BIGINT | Primary Key, Identity | Contact ID |
| user_id | BIGINT | FK | References users(id) |
| contact_name | VARCHAR(100) | NOT NULL | Contact name |
| relationship | VARCHAR(50) | NOT NULL | Relationship with user |
| phone_number | VARCHAR(15) | NOT NULL | Contact number |

---

# 7. doctors

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| id | BIGINT | Primary Key, Identity | Doctor record ID |
| user_id | BIGINT | FK | References users(id) |
| doctor_name | VARCHAR(100) | NOT NULL | Doctor's name |
| specialization | VARCHAR(100) | | Medical specialization |
| hospital_name | VARCHAR(100) | | Hospital name |
| hospital_address | TEXT | | Hospital address |
| phone_number | VARCHAR(15) | | Contact number |
| next_appointment | DATE | | Upcoming appointment |

---

# 8. family_members

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| id | BIGINT | Primary Key, Identity | Family member ID |
| user_id | BIGINT | FK | References users(id) |
| member_name | VARCHAR(100) | NOT NULL | Family member name |
| relationship | VARCHAR(50) | NOT NULL | Relationship |
| age | INTEGER | CHECK(age>=0) | Member age |

---

# 9. notification_preferences

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| id | BIGINT | Primary Key, Identity | Preference ID |
| user_id | BIGINT | FK, UNIQUE | References users(id) |
| appointment_reminders | BOOLEAN | DEFAULT TRUE | Appointment reminders |
| medication_reminders | BOOLEAN | DEFAULT TRUE | Medicine reminders |
| water_reminders | BOOLEAN | DEFAULT TRUE | Water intake reminders |
| exercise_reminders | BOOLEAN | DEFAULT TRUE | Exercise reminders |
| weekly_reports | BOOLEAN | DEFAULT TRUE | Weekly reports |
| email_notifications | BOOLEAN | DEFAULT TRUE | Email notifications |
| sms_notifications | BOOLEAN | DEFAULT TRUE | SMS notifications |

---

# 10. security_settings

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| id | BIGINT | Primary Key, Identity | Security record ID |
| user_id | BIGINT | FK, UNIQUE | References users(id) |
| two_factor_enabled | BOOLEAN | DEFAULT FALSE | Two-factor authentication |
| biometric_enabled | BOOLEAN | DEFAULT FALSE | Biometric authentication |
| security_question | VARCHAR(255) | | Security question |
| security_answer | VARCHAR(255) | | Security answer |

---

# Summary

| Total Tables | 10 |
|--------------|----|
| Primary Keys | 10 |
| Foreign Keys | 9 |
| One-to-One Relationships | 6 |
| One-to-Many Relationships | 3 |
| Views | 5 |
| Stored Functions | 5 |
| Indexes | Multiple |

---

# Conclusion

The data dictionary provides a complete reference for all database objects used in the Nurture AI project. It defines the structure, purpose, and constraints of every table and column, making database development, maintenance, and future enhancements easier.