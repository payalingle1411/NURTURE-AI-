# Database Normalization

## Project Name

**Nurture AI – AI-Powered Personalized Pregnancy Wellness & Family Support Platform**

---

# Introduction

Database normalization is the process of organizing data into well-structured tables to reduce redundancy, improve data consistency, and maintain data integrity.

The Nurture AI database follows the principles of normalization up to the **Third Normal Form (3NF)**.

---

# Objectives of Normalization

The normalization process helps to:

- Reduce duplicate data.
- Eliminate insertion, update, and deletion anomalies.
- Improve data consistency.
- Maintain referential integrity.
- Simplify database maintenance.
- Increase scalability and efficiency.

---

# First Normal Form (1NF)

## Definition

A table is in First Normal Form if:

- Each column contains atomic (single) values.
- There are no repeating groups.
- Each record is uniquely identified by a primary key.

## Implementation in Nurture AI

The database satisfies 1NF because:

- Every table has a primary key (`id`).
- Each column stores only one value.
- There are no multi-valued or repeating attributes.
- Data is stored in separate rows.

### Example

Instead of storing multiple phone numbers in one column:

❌ Incorrect

| User | Phone Numbers |
|------|---------------|
| Aarohi | 98765..., 91234... |

✅ Correct

Each emergency contact is stored as a separate row in the `emergency_contacts` table.

---

# Second Normal Form (2NF)

## Definition

A table is in Second Normal Form if:

- It is already in 1NF.
- Every non-key attribute is fully dependent on the entire primary key.

## Implementation in Nurture AI

The database satisfies 2NF because:

- Every table uses a single-column primary key (`id`).
- All non-key attributes depend only on their respective primary key.
- User-related information is separated into dedicated tables.

### Example

Instead of storing pregnancy details inside the `users` table, they are stored in the `pregnancy_details` table and linked through `user_id`.

---

# Third Normal Form (3NF)

## Definition

A table is in Third Normal Form if:

- It is already in 2NF.
- There are no transitive dependencies.
- Non-key attributes depend only on the primary key.

## Implementation in Nurture AI

The database satisfies 3NF because:

- Personal information is stored in `user_profile`.
- Medical information is stored in `medical_history`.
- Allergy information is stored in `allergies`.
- Doctor information is stored in `doctors`.
- Family information is stored in `family_members`.
- Notification settings are stored in `notification_preferences`.
- Security settings are stored in `security_settings`.

Each table stores only information related to its specific purpose.

---

# Benefits of Normalization

The normalized database provides the following benefits:

- Eliminates duplicate data.
- Reduces storage requirements.
- Improves data integrity.
- Prevents update anomalies.
- Simplifies database maintenance.
- Enhances query performance.
- Supports future scalability.
- Makes the database easier to understand.

---

# Normalization Summary

| Normal Form | Status | Description |
|--------------|--------|-------------|
| First Normal Form (1NF) | ✅ Achieved | Atomic values and unique primary keys |
| Second Normal Form (2NF) | ✅ Achieved | Full dependency on the primary key |
| Third Normal Form (3NF) | ✅ Achieved | No transitive dependencies |

---

# Conclusion

The Nurture AI database is normalized up to the Third Normal Form (3NF). The data is organized into logical tables with appropriate primary keys and foreign keys, ensuring minimal redundancy, improved consistency, and efficient data management. This design provides a scalable and maintainable database structure suitable for a pregnancy wellness and family support platform.