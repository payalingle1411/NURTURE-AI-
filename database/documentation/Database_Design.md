# Database Design

## Project Name

**Nurture AI – AI-Powered Personalized Pregnancy Wellness & Family Support Platform**

---

# Introduction

The Nurture AI database is designed to securely store and manage pregnancy-related information of registered users. It provides a structured and efficient way to store personal details, pregnancy information, medical history, allergy information, doctor details, emergency contacts, family member information, notification preferences, and appointment history.

The database follows normalization principles to reduce data redundancy and maintain data integrity. PostgreSQL is used as the database management system because it provides reliability, scalability, security, and strong support for relational database applications.

---

# Objectives

The primary objectives of the database are:

- Store user information securely.
- Maintain user profile information.
- Maintain pregnancy records throughout the pregnancy journey.
- Store medical history and allergy information.
- Manage doctor and hospital details.
- Maintain emergency contact information.
- Store family member details.
- Manage user notification preferences.
- Maintain appointment history and related records.
- Ensure data consistency using relationships and constraints.
- Improve query performance using indexes.
- Provide simplified data retrieval through database views and functions.

---

# Database Management System

| Property | Value |
|----------|-------|
| Database Name | neondb |
| DBMS | PostgreSQL |
| Database Type | Relational Database |
| SQL Language | PostgreSQL SQL |
| Schema | public |

---

# Database Architecture

The database follows a relational architecture where the **users** table acts as the central table.

Each registered user can have related records in different tables through foreign key relationships.

The database separates different types of information into dedicated tables. This improves organization, reduces redundancy, simplifies maintenance, and supports future scalability.

---

# Database Tables

The database consists of the following 10 tables:

| Table Name | Purpose |
|------------|---------|
| users | Stores basic user and account information |
| user_profile | Stores personal profile information |
| pregnancy_details | Stores pregnancy-related information |
| medical_history | Stores medical conditions and health history |
| allergies | Stores food, medicine, and other allergy information |
| notification_preferences | Stores user notification preferences |
| emergency_contacts | Stores emergency contact details |
| family_members | Stores family member information and permissions |
| doctors | Stores doctor and hospital information |
| appointment_history | Stores appointment history, prescriptions, and reports |

---

# Relationships

The database contains both One-to-One and One-to-Many relationships.

## One-to-One Relationships

The following tables have a one-to-one relationship with the `users` table:

- Users ↔ User Profile
- Users ↔ Pregnancy Details
- Users ↔ Medical History
- Users ↔ Allergies
- Users ↔ Notification Preferences

These relationships are enforced using `UNIQUE` constraints on the corresponding `user_id` columns.

## One-to-Many Relationships

The following tables have a one-to-many relationship with the `users` table:

- Users → Doctors
- Users → Family Members
- Users → Emergency Contacts
- Users → Appointment History

A user can have multiple doctors, family members, emergency contacts, and appointment history records.

Foreign keys are used to maintain referential integrity between the related tables.

---

# Primary Keys

Each table has a primary key that uniquely identifies every record.

| Table | Primary Key |
|-------|-------------|
| users | user_id |
| user_profile | profile_id |
| pregnancy_details | pregnancy_id |
| medical_history | history_id |
| allergies | allergy_id |
| notification_preferences | preference_id |
| emergency_contacts | contact_id |
| family_members | family_member_id |
| doctors | doctor_id |
| appointment_history | appointment_id |

---

# Foreign Keys

All related tables reference the `users(user_id)` primary key.

| Child Table | Foreign Key |
|-------------|-------------|
| user_profile | user_id |
| pregnancy_details | user_id |
| medical_history | user_id |
| allergies | user_id |
| notification_preferences | user_id |
| emergency_contacts | user_id |
| family_members | user_id |
| doctors | user_id |
| appointment_history | user_id |

The foreign keys use `ON DELETE CASCADE` so that related records are automatically removed when the corresponding user is deleted.

---

# Constraints

The database uses the following constraints:

- Primary Key
- Foreign Key
- UNIQUE Constraint
- NOT NULL Constraint
- CHECK Constraint
- DEFAULT Constraint

These constraints help maintain data accuracy, validity, and consistency.

Examples include:

- Unique email addresses for users.
- Unique mobile numbers for users.
- Valid user roles.
- Valid pregnancy week values.
- Valid trimester values.
- Valid family member permission levels.
- Required fields using `NOT NULL`.
- Default values for several Boolean and configuration fields.

---

# Indexing

Indexes are created on frequently searched columns and columns used in relationships to improve query performance.

Examples include:

- User email
- User mobile number
- User ID
- Pregnancy due date
- Doctor name
- Doctor appointment date
- Foreign key columns

Indexes help reduce query execution time when searching or filtering large amounts of data.

---

# Views

The database provides the following views to simplify commonly required data retrieval:

- `vw_user_profile_details`
- `vw_pregnancy_details`
- `vw_medical_summary`
- `vw_doctor_details`
- `vw_family_members`
- `vw_appointment_history`

These views combine information from related tables and reduce the complexity of frequently used queries.

---

# Stored Functions

The database includes reusable PostgreSQL functions:

- `get_user_profile()`
- `get_pregnancy_details()`
- `get_doctor_details()`
- `count_family_members()`
- `count_emergency_contacts()`
- `get_appointment_history()`

These functions provide reusable operations for retrieving user-related information and counting related records.

---

# Data Integrity

Data integrity is maintained through:

- Primary key constraints
- Foreign key constraints
- Unique constraints
- NOT NULL constraints
- CHECK constraints
- Default values
- Referential integrity
- Cascading deletion of dependent records

These mechanisms help prevent invalid, duplicate, or inconsistent data.

---

# Security

Database security is supported through:

- Secure user authentication data storage
- Primary and foreign key constraints
- Unique constraints on email and mobile number
- Role-based user classification
- Restricted access through application-level authentication and authorization
- Proper relational integrity

Sensitive account information such as passwords should be securely hashed by the application before being stored in the database.

---

# Advantages

- Reduced data redundancy
- Better data integrity
- Faster query execution
- Easy maintenance
- Scalable database structure
- Organized data storage
- Strong referential integrity
- Reusable database views and functions
- Efficient retrieval of related information
- Well-structured relational model

---

# Conclusion

The Nurture AI database is designed using relational database principles and PostgreSQL best practices. The database provides structured storage for user profiles, pregnancy information, medical history, allergies, doctors, family members, emergency contacts, notification preferences, and appointment history.

Proper normalization, relationships, constraints, indexes, views, and stored functions provide a reliable foundation for the Nurture AI application. The modular database design also allows the system to be extended with additional features in the future.