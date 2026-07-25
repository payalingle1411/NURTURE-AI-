/*
=========================================================
Nurture AI Sample Data
Part 1 - Users & User Profile
=========================================================
*/

---------------------------------------------------------
-- USERS
---------------------------------------------------------

INSERT INTO users (full_name, email, password, mobile_number, role, terms_accepted)
VALUES
('Aarohi Sharma','aarohi.sharma@gmail.com','Aarohi@123','9876500001','MOTHER',TRUE),

('Priya Verma','priya.verma@gmail.com','Priya@123','9876500002','MOTHER',TRUE),

('Sneha Patil','sneha.patil@gmail.com','Sneha@123','9876500003','MOTHER',TRUE),

('Ananya Gupta','ananya.gupta@gmail.com','Ananya@123','9876500004','MOTHER',TRUE),

('Kavya Iyer','kavya.iyer@gmail.com','Kavya@123','9876500005','MOTHER',TRUE),

('Neha Singh','neha.singh@gmail.com','Neha@123','9876500006','MOTHER',TRUE),

('Pooja Joshi','pooja.joshi@gmail.com','Pooja@123','9876500007','MOTHER',TRUE),

('Riya Kulkarni','riya.kulkarni@gmail.com','Riya@123','9876500008','MOTHER',TRUE),

('Meera Nair','meera.nair@gmail.com','Meera@123','9876500009','MOTHER',TRUE),

('Ishita Rao','ishita.rao@gmail.com','Ishita@123','9876500010','MOTHER',TRUE);

---------------------------------------------------------
-- USER PROFILE
---------------------------------------------------------

INSERT INTO user_profile
(user_id, date_of_birth, age, height_cm, weight_kg, blood_group,
 profile_picture, country, state, city, address, pincode)
VALUES

(1,'1998-04-15',28,160.50,58.20,'B+',
'profile1.jpg','India','Maharashtra','Nagpur',
'Wardha Road, Nagpur','440001'),

(2,'1997-09-12',29,158.40,55.10,'O+',
'profile2.jpg','India','Maharashtra','Pune',
'Kothrud, Pune','411038'),

(3,'1996-01-20',30,162.30,60.00,'A+',
'profile3.jpg','India','Maharashtra','Mumbai',
'Andheri East, Mumbai','400069'),

(4,'1998-11-05',28,159.10,57.40,'AB+',
'profile4.jpg','India','Maharashtra','Nashik',
'College Road, Nashik','422005'),

(5,'1997-03-08',29,163.20,61.80,'O-',
'profile5.jpg','India','Maharashtra','Amravati',
'Rajapeth, Amravati','444601'),

(6,'1998-07-18',28,161.00,59.30,'B-',
'profile6.jpg','India','Maharashtra','Akola',
'Civil Lines, Akola','444001'),

(7,'1996-05-30',30,157.80,54.80,'A-',
'profile7.jpg','India','Maharashtra','Chandrapur',
'Ballarpur Road, Chandrapur','442401'),

(8,'1998-10-14',28,164.10,62.00,'AB-',
'profile8.jpg','India','Maharashtra','Wardha',
'Gandhi Chowk, Wardha','442001'),

(9,'1997-02-26',29,159.80,58.70,'O+',
'profile9.jpg','India','Maharashtra','Yavatmal',
'Arni Road, Yavatmal','445001'),

(10,'1998-12-01',28,165.50,63.40,'B+',
'profile10.jpg','India','Maharashtra','Aurangabad',
'CIDCO, Aurangabad','431001');

---------------------------------------------------------
-- PREGNANCY DETAILS
---------------------------------------------------------

INSERT INTO pregnancy_details
(user_id, lmp_date, due_date, pregnancy_week, trimester,
 first_pregnancy, previous_pregnancies, live_births,
 miscarriages, high_risk, ivf_pregnancy, multiple_pregnancy)
VALUES

(1,'2026-04-10','2027-01-15',12,1,TRUE,0,0,0,FALSE,FALSE,FALSE),

(2,'2026-01-18','2026-10-25',24,2,FALSE,1,1,0,FALSE,FALSE,FALSE),

(3,'2025-11-28','2026-09-04',31,3,FALSE,1,1,0,TRUE,FALSE,FALSE),

(4,'2026-05-01','2027-02-05',9,1,TRUE,0,0,0,FALSE,FALSE,FALSE),

(5,'2026-02-15','2026-11-22',20,2,FALSE,2,2,0,FALSE,FALSE,FALSE),

(6,'2026-03-20','2026-12-25',16,2,TRUE,0,0,0,FALSE,TRUE,FALSE),

(7,'2025-12-15','2026-09-21',28,3,FALSE,1,1,0,TRUE,FALSE,TRUE),

(8,'2026-04-22','2027-01-27',10,1,TRUE,0,0,0,FALSE,FALSE,FALSE),

(9,'2026-02-05','2026-11-12',22,2,FALSE,1,1,0,FALSE,FALSE,FALSE),

(10,'2026-01-05','2026-10-12',26,2,TRUE,0,0,0,FALSE,FALSE,FALSE);

---------------------------------------------------------
-- MEDICAL HISTORY
---------------------------------------------------------

INSERT INTO medical_history
(user_id, diabetes, hypertension, thyroid, pcos,
 asthma, heart_disease, other_disease)
VALUES

(1,FALSE,FALSE,TRUE,FALSE,FALSE,FALSE,'Vitamin D Deficiency'),

(2,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,NULL),

(3,TRUE,FALSE,FALSE,FALSE,FALSE,FALSE,'Gestational Diabetes'),

(4,FALSE,FALSE,FALSE,TRUE,FALSE,FALSE,NULL),

(5,FALSE,TRUE,FALSE,FALSE,FALSE,FALSE,'Mild Hypertension'),

(6,FALSE,FALSE,TRUE,FALSE,FALSE,FALSE,NULL),

(7,FALSE,FALSE,FALSE,FALSE,TRUE,FALSE,'Seasonal Asthma'),

(8,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,NULL),

(9,TRUE,TRUE,FALSE,FALSE,FALSE,FALSE,'High Blood Sugar'),

(10,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,NULL);

---------------------------------------------------------
-- ALLERGIES
---------------------------------------------------------

INSERT INTO allergies
(user_id, food_allergy, medicine_allergy, other_allergy)
VALUES

(1,'Peanuts',NULL,NULL),

(2,NULL,'Penicillin',NULL),

(3,'Seafood',NULL,'Dust Allergy'),

(4,NULL,NULL,NULL),

(5,'Milk',NULL,NULL),

(6,NULL,'Sulfa Drugs',NULL),

(7,NULL,NULL,'Pollen Allergy'),

(8,'Eggs',NULL,NULL),

(9,NULL,NULL,'Latex Allergy'),

(10,NULL,NULL,NULL);

---------------------------------------------------------
-- EMERGENCY CONTACTS
---------------------------------------------------------

INSERT INTO emergency_contacts
(user_id, contact_name, relationship, phone_number)
VALUES

(1,'Rohit Sharma','Husband','9876511001'),
(1,'Sunita Sharma','Mother','9876511002'),

(2,'Amit Verma','Husband','9876511003'),
(2,'Rajesh Verma','Father','9876511004'),

(3,'Kunal Patil','Husband','9876511005'),
(3,'Pallavi Deshmukh','Sister','9876511006'),

(4,'Rahul Gupta','Husband','9876511007'),
(4,'Meena Gupta','Mother','9876511008'),

(5,'Arjun Iyer','Husband','9876511009'),
(5,'Shobha Iyer','Mother','9876511010'),

(6,'Vikas Singh','Husband','9876511011'),
(6,'Anita Singh','Mother','9876511012'),

(7,'Nikhil Joshi','Husband','9876511013'),
(7,'Smita Joshi','Sister','9876511014'),

(8,'Aditya Kulkarni','Husband','9876511015'),
(8,'Madhuri Kulkarni','Mother','9876511016'),

(9,'Rakesh Nair','Husband','9876511017'),
(9,'Priya Nair','Sister','9876511018'),

(10,'Karan Rao','Husband','9876511019'),
(10,'Sonal Rao','Mother','9876511020');

---------------------------------------------------------
-- DOCTORS
---------------------------------------------------------

INSERT INTO doctors
(user_id, doctor_name, specialization, hospital_name,
 hospital_address, phone_number, next_appointment)
VALUES

(1,'Dr. Anjali Mehta','Gynecologist','Kingsway Hospital',
'Nagpur','9876520001','2026-07-30'),

(2,'Dr. Vivek Kulkarni','Obstetrician','Ruby Hall Clinic',
'Pune','9876520002','2026-08-02'),

(3,'Dr. Snehal Deshpande','Gynecologist','Kokilaben Hospital',
'Mumbai','9876520003','2026-07-29'),

(4,'Dr. Pooja Shah','Obstetrician','Wockhardt Hospital',
'Nashik','9876520004','2026-08-05'),

(5,'Dr. Rohan Patil','Gynecologist','Life Care Hospital',
'Amravati','9876520005','2026-08-01'),

(6,'Dr. Neha Joshi','Fertility Specialist','Care Hospital',
'Akola','9876520006','2026-08-04'),

(7,'Dr. Sameer Gupta','Maternal-Fetal Medicine','Apollo Hospital',
'Chandrapur','9876520007','2026-07-31'),

(8,'Dr. Shweta Kulkarni','Gynecologist','District Hospital',
'Wardha','9876520008','2026-08-03'),

(9,'Dr. Rajesh Nair','Obstetrician','Lotus Hospital',
'Yavatmal','9876520009','2026-08-06'),

(10,'Dr. Meenal Rao','Gynecologist','United CIIGMA Hospital',
'Aurangabad','9876520010','2026-08-07'),

(3,'Dr. Kiran More','Diabetologist','Kokilaben Hospital',
'Mumbai','9876520011','2026-08-10'),

(5,'Dr. Ashish Jain','Cardiologist','Life Care Hospital',
'Amravati','9876520012','2026-08-11'),

(7,'Dr. Nitin Bansal','Pulmonologist','Apollo Hospital',
'Chandrapur','9876520013','2026-08-09'),

(9,'Dr. Priyanka Patil','Endocrinologist','Lotus Hospital',
'Yavatmal','9876520014','2026-08-12'),

(6,'Dr. Kavita Sharma','Nutritionist','Care Hospital',
'Akola','9876520015','2026-08-08');

---------------------------------------------------------
-- FAMILY MEMBERS
---------------------------------------------------------

INSERT INTO family_members
(user_id, member_name, relationship, age)
VALUES

(1,'Rohit Sharma','Husband',31),
(1,'Aarav Sharma','Son',4),

(2,'Amit Verma','Husband',33),
(2,'Anaya Verma','Daughter',3),

(3,'Kunal Patil','Husband',34),
(3,'Vihaan Patil','Son',6),

(4,'Rahul Gupta','Husband',30),
(4,'Seema Gupta','Mother-in-law',56),

(5,'Arjun Iyer','Husband',32),
(5,'Diya Iyer','Daughter',5),

(6,'Vikas Singh','Husband',31),
(6,'Renu Singh','Mother-in-law',58),

(7,'Nikhil Joshi','Husband',35),
(7,'Aditi Joshi','Daughter',7),

(8,'Aditya Kulkarni','Husband',32),
(8,'Om Kulkarni','Son',2),

(9,'Rakesh Nair','Husband',34),
(9,'Ira Nair','Daughter',5),

(10,'Karan Rao','Husband',33),
(10,'Savitri Rao','Mother-in-law',57);

---------------------------------------------------------
-- NOTIFICATION PREFERENCES
---------------------------------------------------------

INSERT INTO notification_preferences
(user_id, appointment_reminders, medication_reminders,
 water_reminders, exercise_reminders, weekly_reports,
 email_notifications, sms_notifications)
VALUES

(1, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE),
(2, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE),
(3, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE),
(4, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, FALSE),
(5, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE),
(6, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE),
(7, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE),
(8, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE),
(9, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, TRUE),
(10, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

---------------------------------------------------------
-- SECURITY SETTINGS
---------------------------------------------------------

INSERT INTO security_settings
(user_id, two_factor_enabled, biometric_enabled,
 security_question, security_answer)
VALUES

(1, TRUE, TRUE,
'What is your favorite color?','Blue'),

(2, TRUE, FALSE,
'What is your birthplace?','Pune'),

(3, FALSE, TRUE,
'What is your pet name?','Bruno'),

(4, TRUE, TRUE,
'What is your favorite food?','Biryani'),

(5, FALSE, FALSE,
'What is your mother's maiden name?','Patil'),

(6, TRUE, TRUE,
'What was your first school?','St Joseph'),

(7, TRUE, FALSE,
'What is your favorite teacher''s name?','Mehta'),

(8, FALSE, TRUE,
'What is your favorite book?','Wings of Fire'),

(9, TRUE, TRUE,
'What city were you born in?','Nagpur'),

(10, TRUE, TRUE,
'What is your childhood nickname?','Ishu');