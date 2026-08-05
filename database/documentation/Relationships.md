# Database Relationships

## Project Name

**Nurture AI – AI-Powered Personalized Pregnancy Wellness & Family Support Platform**

---

# Introduction

Database relationships define how data is connected between different tables. These relationships help maintain data consistency, reduce redundancy, and enforce referential integrity through foreign keys.

In the Nurture AI database, the **users** table acts as the central table. All other tables are linked to it using the `user_id` foreign key.

---

# Relationship Types

The database uses the following relationship types:

- One-to-One (1:1)
- One-to-Many (1:N)

---

# One-to-One Relationships

These tables store a single record for each registered user.

| Parent Table | Child Table | Foreign Key |
|---------------|-------------|-------------|
| users | user_profile | user_profile.user_id |
| users | pregnancy_details | pregnancy_details.user_id |
| users | medical_history | medical_history.user_id |
| users | allergies | allergies.user_id |
| users | notification_preferences | notification_preferences.user_id |
| users | security_settings | security_settings.user_id |

### Description

Each user can have:

- One personal profile
- One pregnancy record
- One medical history record
- One allergy record
- One notification preference record
- One security settings record

These relationships are enforced using **UNIQUE** foreign keys.

---

# One-to-Many Relationships

These tables can contain multiple records for a single user.

| Parent Table | Child Table | Foreign Key |
|---------------|-------------|-------------|
| users | doctors | doctors.user_id |
| users | emergency_contacts | emergency_contacts.user_id |
| users | family_members | family_members.user_id |

### Description

A user can have:

- Multiple doctors
- Multiple emergency contacts
- Multiple family members

These relationships allow flexible storage of related information.

---

# Foreign Key Relationships

| Table | References | Foreign Key |
|---------|------------|-------------|
| user_profile | users | user_id |
| pregnancy_details | users | user_id |
| medical_history | users | user_id |
| allergies | users | user_id |
| emergency_contacts | users | user_id |
| doctors | users | user_id |
| family_members | users | user_id |
| notification_preferences | users | user_id |
| security_settings | users | user_id |

---

# Relationship Summary

| Relationship | Type |
|--------------|------|
| users → user_profile | One-to-One |
| users → pregnancy_details | One-to-One |
| users → medical_history | One-to-One |
| users → allergies | One-to-One |
| users → notification_preferences | One-to-One |
| users → security_settings | One-to-One |
| users → doctors | One-to-Many |
| users → emergency_contacts | One-to-Many |
| users → family_members | One-to-Many |

---

# Referential Integrity

The database uses foreign key constraints to maintain referential integrity.

Benefits include:

- Prevents orphan records.
- Ensures valid references between tables.
- Maintains data consistency.
- Protects database integrity.
- Supports reliable data retrieval.

---

# ON DELETE CASCADE

The foreign key relationships use **ON DELETE CASCADE**.

This means that if a user record is deleted, all related records in the child tables are automatically removed.

This prevents orphaned records and keeps the database consistent.

---

# Advantages of the Relationship Design

The relationship design provides several benefits:

- Eliminates duplicate data.
- Improves data consistency.
- Supports efficient JOIN operations.
- Simplifies database maintenance.
- Enhances scalability.
- Ensures data integrity through foreign key constraints.

---

# Conclusion

The Nurture AI database uses well-defined One-to-One and One-to-Many relationships centered around the `users` table. Foreign keys and referential integrity constraints ensure accurate, consistent, and reliable data management while supporting efficient database operations.