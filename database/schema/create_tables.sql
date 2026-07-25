CREATE TABLE users (
    user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    mobile_number VARCHAR(15) UNIQUE NOT NULL,

    role VARCHAR(20)
        CHECK (role IN ('MOTHER', 'FAMILY_MEMBER'))
        DEFAULT 'MOTHER',

    terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profile (
    profile_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT UNIQUE NOT NULL,

    date_of_birth DATE,

    age INTEGER,

    height_cm DECIMAL(5,2),

    weight_kg DECIMAL(5,2),

    blood_group VARCHAR(5),

    profile_picture VARCHAR(255),

    country VARCHAR(100),

    state VARCHAR(100),

    city VARCHAR(100),

    address TEXT,

    pincode VARCHAR(10),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_profile_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE pregnancy_details (
    pregnancy_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT UNIQUE NOT NULL,

    lmp_date DATE,

    due_date DATE NOT NULL,

    pregnancy_week INTEGER
        CHECK (pregnancy_week BETWEEN 1 AND 42),

    trimester INTEGER
        CHECK (trimester BETWEEN 1 AND 3),

    first_pregnancy BOOLEAN DEFAULT TRUE,

    previous_pregnancies INTEGER DEFAULT 0,

    live_births INTEGER DEFAULT 0,

    miscarriages INTEGER DEFAULT 0,

    high_risk BOOLEAN DEFAULT FALSE,

    ivf_pregnancy BOOLEAN DEFAULT FALSE,

    multiple_pregnancy BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_pregnancy_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE medical_history (
    history_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT UNIQUE NOT NULL,

    diabetes BOOLEAN DEFAULT FALSE,

    hypertension BOOLEAN DEFAULT FALSE,

    thyroid BOOLEAN DEFAULT FALSE,

    pcos BOOLEAN DEFAULT FALSE,

    asthma BOOLEAN DEFAULT FALSE,

    heart_disease BOOLEAN DEFAULT FALSE,

    other_disease TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_medical_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE allergies (
    allergy_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT UNIQUE NOT NULL,

    food_allergy TEXT,

    medicine_allergy TEXT,

    other_allergy TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_allergy_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE emergency_contacts (
    contact_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT NOT NULL,

    contact_name VARCHAR(100) NOT NULL,

    relationship VARCHAR(50),

    phone_number VARCHAR(15) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_contact_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE doctors (
    doctor_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT NOT NULL,

    doctor_name VARCHAR(100) NOT NULL,

    hospital_name VARCHAR(150),

    contact_number VARCHAR(15),

    hospital_address TEXT,

    next_appointment TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_doctor_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE family_members (
    family_member_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT NOT NULL,

    name VARCHAR(100) NOT NULL,

    relationship VARCHAR(50),

    phone_number VARCHAR(15),

    email VARCHAR(255),

    permission_level VARCHAR(30)
        CHECK (permission_level IN ('VIEW_ONLY', 'VIEW_AND_REMINDERS'))
        DEFAULT 'VIEW_ONLY',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_family_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE notification_preferences (
    preference_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT UNIQUE NOT NULL,

    medicine_reminder BOOLEAN NOT NULL DEFAULT TRUE,

    water_reminder BOOLEAN DEFAULT TRUE,

    appointment_reminder BOOLEAN DEFAULT TRUE,

    weekly_update BOOLEAN DEFAULT TRUE,

    nutrition_reminder BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notification_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE security_settings (
    security_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT UNIQUE NOT NULL,

    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    
    mobile_verified BOOLEAN NOT NULL DEFAULT FALSE,

    two_factor_enabled BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_security_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);