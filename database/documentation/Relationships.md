# Database Relationships

## Project Name

**Nurture AI – AI-Powered Personalized Pregnancy Wellness & Family Support Platform**

---

# Introduction

Database relationships define how data is connected between different tables. These relationships help maintain data consistency, reduce redundancy, and enforce referential integrity through foreign keys.

In the Nurture AI database, the **users** table acts as the central table. All other tables are connected to it through the `user_id` foreign key.

---

# Relationship Types

The database uses the following relationship types:

- One-to-One (1:1)
- One-to-Many (1:N)

---

# One-to-One Relationships

The following tables maintain a maximum of one related record for each user.

| Parent Table | Child Table | Foreign Key |
|--------------|-------------|-------------|
| users | user_profile | user_profile.user_id |
| users | pregnancy_details | pregnancy_details.user_id |
| users | medical_history | medical_history.user_id |
| users | allergies | allergies.user_id |
| users | notification_preferences | notification_preferences.user_id |

These relationships are enforced using `UNIQUE` constraints on the `user_id` columns of the child tables.

## Description

Each user can have:

- One personal profile
- One pregnancy record
- One medical history record
- One allergy record
- One notification preference record

---

# One-to-Many Relationships

The following tables can contain multiple records for a single user.

| Parent Table | Child Table | Foreign Key |
|--------------|-------------|-------------|
| users | doctors | doctors.user_id |
| users | emergency_contacts | emergency_contacts.user_id |
| users | family_members | family_members.user_id |
| users | appointment_history | appointment_history.user_id |

## Description

A user can have:

- Multiple doctors
- Multiple emergency contacts
- Multiple family members
- Multiple appointment history records

These relationships allow flexible storage of multiple records associated with the same user.

---

# Foreign Key Relationships

All child tables reference the primary key of the `users` table.

| Child Table | Referenced Table | Foreign Key |
|-------------|------------------|-------------|
| user_profile | users | user_profile.user_id → users.user_id |
| pregnancy_details | users | pregnancy_details.user_id → users.user_id |
| medical_history | users | medical_history.user_id → users.user_id |
| allergies | users | allergies.user_id → users.user_id |
| notification_preferences | users | notification_preferences.user_id → users.user_id |
| emergency_contacts | users | emergency_contacts.user_id → users.user_id |
| family_members | users | family_members.user_id → users.user_id |
| doctors | users | doctors.user_id → users.user_id |
| appointment_history | users | appointment_history.user_id → users.user_id |

---

# Relationship Summary

| Relationship | Type |
|--------------|------|
| users → user_profile | One-to-One |
| users → pregnancy_details | One-to-One |
| users → medical_history | One-to-One |
| users → allergies | One-to-One |
| users → notification_preferences | One-to-One |
| users → doctors | One-to-Many |
| users → emergency_contacts | One-to-Many |
| users → family_members | One-to-Many |
| users → appointment_history | One-to-Many |

### Relationship Count

- **One-to-One relationships:** 5
- **One-to-Many relationships:** 4
- **Total relationships:** 9

---

# Referential Integrity

The database uses foreign key constraints to maintain referential integrity.

These constraints:

- Prevent invalid references between tables.
- Prevent orphaned records.
- Maintain consistency between related tables.
- Ensure that child records reference an existing user.
- Support reliable data retrieval through relationships.

---

# ON DELETE CASCADE

The foreign key relationships use `ON DELETE CASCADE`.

When a user is deleted from the `users` table, the related records in the child tables are automatically deleted.

This applies to:

- user_profile
- pregnancy_details
- medical_history
- allergies
- notification_preferences
- emergency_contacts
- family_members
- doctors
- appointment_history

This helps prevent orphaned records and maintains database consistency.

---

# Relationship Design

The overall relationship structure can be represented as:

```text
                         ┌─────────────────────┐
                         │        users        │
                         │     (user_id)       │
                         └──────────┬──────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             │ 1:1                  │ 1:1                  │ 1:1
             ▼                      ▼                      ▼
      user_profile          pregnancy_details       medical_history
             │
             │ 1:1
             ▼
         allergies

             users
               │
               └── 1:1 ──► notification_preferences


             users
               │
       ┌───────┼───────────────┬──────────────────┐
       │       │               │                  │
      1:N     1:N             1:N                1:N
       ▼       ▼               ▼                  ▼
    doctors  emergency      family_members   appointment_history
             contacts