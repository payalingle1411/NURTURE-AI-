# Database Normalization

## Project Name

**Nurture AI – AI-Powered Personalized Pregnancy Wellness & Family Support Platform**

---

# Introduction

Database normalization is the process of organizing data into well-structured tables to reduce redundancy, improve data consistency, and maintain data integrity.

The Nurture AI database follows normalization principles up to the **Third Normal Form (3NF)**.

---

# Objectives of Normalization

The normalization process helps to:

- Reduce duplicate data.
- Eliminate insertion, update, and deletion anomalies.
- Improve data consistency.
- Maintain referential integrity.
- Simplify database maintenance.
- Improve the organization of related information.
- Support future scalability.

---

# First Normal Form (1NF)

## Definition

A table is in First Normal Form (1NF) if:

- Each column contains atomic (single) values.
- There are no repeating groups.
- Each record is uniquely identifiable by a primary key.

## Implementation in Nurture AI

The database satisfies 1NF because:

- Every table has a primary key.
- Each column stores values of a single defined type.
- There are no repeating groups within a table.
- Related multiple records are stored as separate rows.
- Each record can be uniquely identified using its primary key.

## Example

Instead of storing multiple emergency contacts in one user record:

### Incorrect

| User | Emergency Contacts |
|------|---------------------|
| Aarohi | Rohit - 98765..., Sunita - 98765... |

### Correct

Each emergency contact is stored as a separate record in the `emergency_contacts` table.

| contact_id | user_id | contact_name | mobile_number |
|------------|---------|--------------|---------------|
| 1 | 1 | Rohit Sharma | 9876511001 |
| 2 | 1 | Sunita Sharma | 9876511002 |

This allows a user to have multiple emergency contacts without storing multiple values in a single column.

---

# Second Normal Form (2NF)

## Definition

A table is in Second Normal Form (2NF) if:

- It is already in 1NF.
- Every non-key attribute is fully dependent on the entire primary key.

## Implementation in Nurture AI

The database satisfies 2NF because:

- All tables are already in 1NF.
- Each table uses a single-column primary key.
- Therefore, there are no partial dependencies on a part of a composite primary key.
- Non-key attributes depend on the primary key of their respective table.
- User-related information is separated into dedicated tables.

## Example

Pregnancy information is not stored directly inside the `users` table.

Instead, it is stored in the `pregnancy_details` table:

```text
users
  |
  | user_id
  |
  ▼
pregnancy_details