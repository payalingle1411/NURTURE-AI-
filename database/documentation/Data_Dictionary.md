# Data Dictionary

## Project Name

**Nurture AI – AI-Powered Personalized Pregnancy Wellness & Family Support Platform**

---

# Introduction

The Data Dictionary provides detailed information about the database tables, columns, data types, constraints, and their purpose. It serves as a reference document for developers and database administrators working with the Nurture AI database.

---

# 1. users

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| user_id | BIGINT | Primary Key, Identity | Unique user identifier |
| full_name | VARCHAR(100) | NOT NULL | User's full name |
| email | VARCHAR(100) | UNIQUE, NOT NULL | User's email address |
| mobile_number | VARCHAR(15) | UNIQUE, NOT NULL | User's mobile number |
| password | VARCHAR(255) | NOT NULL | User's password stored by the application |
| role | VARCHAR(20) | CHECK, DEFAULT | User role |
| terms_accepted | BOOLEAN | NOT NULL, DEFAULT FALSE | Indicates whether terms and conditions were accepted |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record update time |

### Allowed Role Values

- MOTHER
- FAMILY_MEMBER

---

# 2. user_profile

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| profile_id | BIGINT | Primary Key, Identity | Unique profile identifier |
| user_id | BIGINT | FK, UNIQUE, NOT NULL | References users(user_id) |
| date_of_birth | DATE | | User's date of birth |
| age | INTEGER | | User's age |
| height_cm | DECIMAL(5,2) | | Height in centimeters |
| weight_kg | DECIMAL(5,2) | | Weight in kilograms |
| blood_group | VARCHAR(5) | | User's blood group |
| profile_picture | VARCHAR(255) | | Path or filename of profile picture |
| country | VARCHAR(100) | | Country |
| state | VARCHAR(100) | | State |
| city | VARCHAR(100) | | City |
| address | TEXT | | Residential address |
| pincode | VARCHAR(10) | | Postal code |

---

# 3. pregnancy_details

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| pregnancy_id | BIGINT | Primary Key, Identity | Unique pregnancy record identifier |
| user_id | BIGINT | FK, UNIQUE, NOT NULL | References users(user_id) |
| lmp_date | DATE | | Last menstrual period date |
| due_date | DATE | NOT NULL | Expected delivery date |
| pregnancy_week | INTEGER | CHECK (1–42) | Current pregnancy week |
| trimester | INTEGER | CHECK (1–3) | Current pregnancy trimester |
| first_pregnancy | BOOLEAN | DEFAULT TRUE | Indicates whether this is the first pregnancy |
| previous_pregnancies | INTEGER | DEFAULT 0 | Number of previous pregnancies |
| live_births | INTEGER | DEFAULT 0 | Number of previous live births |
| miscarriages | INTEGER | DEFAULT 0 | Number of previous miscarriages |
| high_risk | BOOLEAN | DEFAULT FALSE | Indicates high-risk pregnancy |
| ivf_pregnancy | BOOLEAN | DEFAULT FALSE | Indicates whether the pregnancy is through IVF |
| multiple_pregnancy | BOOLEAN | DEFAULT FALSE | Indicates multiple pregnancy |

---

# 4. medical_history

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| history_id | BIGINT | Primary Key, Identity | Unique medical history identifier |
| user_id | BIGINT | FK, UNIQUE, NOT NULL | References users(user_id) |
| diabetes | BOOLEAN | DEFAULT FALSE | Indicates history of diabetes |
| hypertension | BOOLEAN | DEFAULT FALSE | Indicates history of hypertension |
| thyroid | BOOLEAN | DEFAULT FALSE | Indicates thyroid disorder |
| pcos | BOOLEAN | DEFAULT FALSE | Indicates history of PCOS |
| asthma | BOOLEAN | DEFAULT FALSE | Indicates history of asthma |
| heart_disease | BOOLEAN | DEFAULT FALSE | Indicates history of heart disease |
| other_disease | TEXT | | Other medical conditions |

---

# 5. allergies

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| allergy_id | BIGINT | Primary Key, Identity | Unique allergy record identifier |
| user_id | BIGINT | FK, UNIQUE, NOT NULL | References users(user_id) |
| food_allergy | TEXT | | Food allergy information |
| medicine_allergy | TEXT | | Medicine allergy information |
| other_allergy | TEXT | | Other allergy information |

---

# 6. notification_preferences

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| preference_id | BIGINT | Primary Key, Identity | Unique notification preference identifier |
| user_id | BIGINT | FK, UNIQUE, NOT NULL | References users(user_id) |
| medicine_reminder | BOOLEAN | NOT NULL, DEFAULT TRUE | Medicine reminder preference |
| water_reminder | BOOLEAN | DEFAULT TRUE | Water reminder preference |
| appointment_reminder | BOOLEAN | DEFAULT TRUE | Appointment reminder preference |
| weekly_update | BOOLEAN | DEFAULT TRUE | Weekly update preference |
| nutrition_reminder | BOOLEAN | DEFAULT TRUE | Nutrition reminder preference |

---

# 7. emergency_contacts

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| contact_id | BIGINT | Primary Key, Identity | Unique emergency contact identifier |
| user_id | BIGINT | FK, NOT NULL | References users(user_id) |
| contact_name | VARCHAR(100) | NOT NULL | Emergency contact's name |
| relationship | VARCHAR(50) | | Relationship with the user |
| mobile_number | VARCHAR(15) | NOT NULL | Emergency contact's mobile number |

---

# 8. family_members

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| family_member_id | BIGINT | Primary Key, Identity | Unique family member identifier |
| user_id | BIGINT | FK, NOT NULL | References users(user_id) |
| name | VARCHAR(100) | NOT NULL | Family member's name |
| relationship | VARCHAR(50) | | Relationship with the user |
| mobile_number | VARCHAR(15) | | Family member's mobile number |
| permission_level | VARCHAR(30) | CHECK, DEFAULT | Access permission provided to the family member |

### Allowed Permission Values

- VIEW_ONLY
- VIEW_AND_REMINDERS

---

# 9. doctors

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| doctor_id | BIGINT | Primary Key, Identity | Unique doctor record identifier |
| user_id | BIGINT | FK, NOT NULL | References users(user_id) |
| doctor_name | VARCHAR(100) | NOT NULL | Doctor's name |
| hospital_name | VARCHAR(150) | | Hospital name |
| contact_number | VARCHAR(15) | | Doctor's contact number |
| hospital_address | TEXT | | Hospital address |
| next_appointment | TIMESTAMP | | Date and time of next appointment |

---

# 10. appointment_history

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| appointment_id | BIGINT | Primary Key, Identity | Unique appointment history identifier |
| user_id | BIGINT | FK, NOT NULL | References users(user_id) |
| total_appointment | INTEGER | DEFAULT 0 | Total number of appointments |
| prescription | TEXT | | Prescription information |
| reports | TEXT | | Medical reports or report information |

---

# Summary

| Property | Count |
|----------|-------|
| Total Tables | 10 |
| Primary Keys | 10 |
| Foreign Keys | 9 |
| One-to-One Relationships | 5 |
| One-to-Many Relationships | 4 |
| Views | 6 |
| Stored Functions | 6 |
| Indexes | Multiple |

---

# Database Tables Summary

| Table | Primary Key | Relationship with Users |
|-------|-------------|--------------------------|
| users | user_id | Parent Table |
| user_profile | profile_id | One-to-One |
| pregnancy_details | pregnancy_id | One-to-One |
| medical_history | history_id | One-to-One |
| allergies | allergy_id | One-to-One |
| notification_preferences | preference_id | One-to-One |
| emergency_contacts | contact_id | One-to-Many |
| family_members | family_member_id | One-to-Many |
| doctors | doctor_id | One-to-Many |
| appointment_history | appointment_id | One-to-Many |

---

# Conclusion

The Data Dictionary provides a complete reference for the Nurture AI database. It defines the structure, data types, constraints, and purpose of each table and column.

The document helps developers and database administrators understand the database structure and maintain consistency between the database schema, application, sample data, and database diagrams.