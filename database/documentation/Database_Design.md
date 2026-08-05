# Database Design

## Project Name

**Nurture AI – AI-Powered Personalized Pregnancy Wellness & Family Support Platform**

---

# Introduction

The Nurture AI database is designed to securely store and manage pregnancy-related information of registered users. It provides a structured and efficient way to store personal details, pregnancy information, medical history, doctor details, emergency contacts, family information, notification preferences, and security settings.

The database follows normalization principles to reduce redundancy and maintain data integrity. PostgreSQL is used as the database management system because it offers reliability, scalability, security, and excellent support for relational databases.

---

# Objectives

The primary objectives of the database are:

- Store user information securely.
- Maintain pregnancy records throughout the pregnancy journey.
- Store medical history and allergy information.
- Manage doctor and hospital details.
- Maintain emergency contact information.
- Store family member details.
- Manage user notification preferences.
- Store security settings for user accounts.
- Ensure data consistency using relationships and constraints.
- Improve query performance using indexes.

---

# Database Management System

| Property | Value |
|----------|-------|
| Database Name | nurture_ai_db |
| DBMS | PostgreSQL |
| Database Type | Relational Database |
| SQL Language | PostgreSQL SQL |
| Schema | public |

---

# Database Architecture

The database follows a relational architecture where the **Users** table acts as the primary table.

Every registered user has associated records in different tables through foreign key relationships.

The architecture separates different types of information into dedicated tables, making the database modular, maintainable, and scalable.

---

# Database Tables

The database consists of the following tables:

| Table Name | Purpose |
|------------|---------|
| users | Stores login and basic user information |
| user_profile | Stores personal profile information |
| pregnancy_details | Stores pregnancy-related information |
| medical_history | Stores previous medical conditions |
| allergies | Stores allergy information |
| emergency_contacts | Stores emergency contact details |
| doctors | Stores doctor and hospital information |
| family_members | Stores family member information |
| notification_preferences | Stores notification settings |
| security_settings | Stores account security settings |

---

# Relationships

The database contains both One-to-One and One-to-Many relationships.

### One-to-One

- Users ↔ User Profile
- Users ↔ Pregnancy Details
- Users ↔ Medical History
- Users ↔ Allergies
- Users ↔ Notification Preferences
- Users ↔ Security Settings

### One-to-Many

- Users → Doctors
- Users → Family Members
- Users → Emergency Contacts

Foreign keys are used to maintain referential integrity.

---

# Constraints

The database uses the following constraints:

- Primary Key
- Foreign Key
- Unique Constraint
- NOT NULL Constraint
- CHECK Constraint
- DEFAULT Constraint

These constraints ensure data accuracy and maintain consistency across all tables.

---

# Indexing

Indexes are created on frequently searched columns to improve query performance.

Examples include:

- Email
- Mobile Number
- User ID
- Due Date
- Doctor Name
- Appointment Date

---

# Views

The following views are created to simplify data retrieval:

- vw_user_profile_details
- vw_pregnancy_details
- vw_medical_summary
- vw_doctor_details
- vw_family_members

Views reduce query complexity and improve readability.

---

# Stored Functions

The database includes reusable PostgreSQL functions:

- get_user_profile()
- get_pregnancy_details()
- get_doctor_details()
- count_family_members()
- count_emergency_contacts()

These functions provide efficient access to frequently required information.

---

# Security

Database security is maintained through:

- Primary and Foreign Key Constraints
- User Authentication
- Security Settings Table
- Two-Factor Authentication Support
- Biometric Authentication Support

---

# Advantages

- Reduced data redundancy
- Better data integrity
- Faster query execution
- Easy maintenance
- Scalable design
- Secure data storage
- Well-structured relational model

---

# Conclusion

The Nurture AI database is designed using relational database principles and PostgreSQL best practices. The database structure supports secure storage, efficient retrieval, and reliable management of pregnancy-related information. Proper normalization, indexing, constraints, views, and stored functions ensure high performance, maintainability, and scalability for future enhancements.