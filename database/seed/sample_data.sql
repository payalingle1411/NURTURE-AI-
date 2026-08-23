/*
=========================================================
Nurture AI Sample Data
Database: PostgreSQL (Neon Cloud)
=========================================================
*/


-- ======================================================
-- 1. USERS
-- ======================================================

INSERT INTO users
(full_name, email, password, mobile_number, role, terms_accepted)
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
('Ishita Rao','ishita.rao@gmail.com','Ishita@123','9876500010','MOTHER',TRUE),
('Tanvi Deshmukh','tanvi.deshmukh@gmail.com','Tanvi@123','9876500011','MOTHER',TRUE),
('Shreya Mishra','shreya.mishra@gmail.com','Shreya@123','9876500012','MOTHER',TRUE),
('Nandini Joshi','nandini.joshi@gmail.com','Nandini@123','9876500013','MOTHER',TRUE),
('Divya Reddy','divya.reddy@gmail.com','Divya@123','9876500014','MOTHER',TRUE),
('Simran Kapoor','simran.kapoor@gmail.com','Simran@123','9876500015','MOTHER',TRUE);


-- ======================================================
-- 2. USER PROFILE
-- ======================================================

INSERT INTO user_profile
(user_id, date_of_birth, age, height_cm, weight_kg,
 blood_group, profile_picture, country, state, city,
 address, pincode)
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
 'CIDCO, Aurangabad','431001'),

(11,'1997-06-22',29,159.60,56.90,'A+',
 'profile11.jpg','India','Maharashtra','Nagpur',
 'Manish Nagar, Nagpur','440015'),

(12,'1996-08-17',30,161.80,59.50,'O+',
 'profile12.jpg','India','Maharashtra','Pune',
 'Baner, Pune','411045'),

(13,'1998-02-11',28,157.50,53.70,'B+',
 'profile13.jpg','India','Maharashtra','Nashik',
 'Gangapur Road, Nashik','422013'),

(14,'1997-12-09',28,163.70,61.20,'AB+',
 'profile14.jpg','India','Maharashtra','Mumbai',
 'Powai, Mumbai','400076'),

(15,'1996-10-25',29,160.20,57.80,'O-',
 'profile15.jpg','India','Maharashtra','Amravati',
 'Camp Road, Amravati','444602');

 -- ======================================================
-- 3. PREGNANCY DETAILS
-- ======================================================

INSERT INTO pregnancy_details
(user_id, lmp_date, due_date, pregnancy_week, trimester,
 first_pregnancy, previous_pregnancies, live_births, miscarriages,
 high_risk, ivf_pregnancy, multiple_pregnancy)
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

(10,'2026-01-05','2026-10-12',26,2,TRUE,0,0,0,FALSE,FALSE,FALSE),

(11,'2026-03-05','2026-12-10',18,2,FALSE,1,1,0,FALSE,FALSE,FALSE),

(12,'2026-04-01','2027-01-06',14,1,TRUE,0,0,0,FALSE,FALSE,FALSE),

(13,'2026-01-25','2026-11-01',23,2,FALSE,1,1,0,FALSE,FALSE,FALSE),

(14,'2026-03-12','2026-12-17',17,2,TRUE,0,0,0,FALSE,FALSE,FALSE),

(15,'2025-12-28','2026-10-04',29,3,FALSE,2,1,1,TRUE,FALSE,FALSE);


-- ======================================================
-- 4. MEDICAL HISTORY
-- ======================================================

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

(10,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,NULL),

(11,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,'Iron Deficiency'),

(12,FALSE,FALSE,TRUE,FALSE,FALSE,FALSE,'Thyroid Imbalance'),

(13,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,NULL),

(14,FALSE,FALSE,FALSE,TRUE,FALSE,FALSE,'PCOS'),

(15,FALSE,FALSE,FALSE,FALSE,FALSE,FALSE,NULL);

-- ======================================================
-- 5. ALLERGIES
-- ======================================================

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

(10,NULL,NULL,NULL),

(11,'Tree Nuts',NULL,NULL),

(12,NULL,'Aspirin',NULL),

(13,NULL,NULL,'Pet Dander'),

(14,NULL,NULL,NULL),

(15,'Dairy',NULL,NULL);


-- ======================================================
-- 6. NOTIFICATION PREFERENCES
-- ======================================================

INSERT INTO notification_preferences
(user_id, medicine_reminder, water_reminder,
 appointment_reminder, weekly_update, nutrition_reminder)
VALUES
(1,TRUE,TRUE,TRUE,TRUE,TRUE),

(2,TRUE,FALSE,TRUE,TRUE,TRUE),

(3,FALSE,TRUE,TRUE,TRUE,FALSE),

(4,TRUE,TRUE,FALSE,FALSE,TRUE),

(5,TRUE,TRUE,TRUE,TRUE,TRUE),

(6,FALSE,TRUE,TRUE,FALSE,TRUE),

(7,TRUE,FALSE,TRUE,TRUE,TRUE),

(8,TRUE,TRUE,TRUE,FALSE,FALSE),

(9,TRUE,FALSE,TRUE,TRUE,TRUE),

(10,TRUE,TRUE,TRUE,TRUE,TRUE),

(11,TRUE,TRUE,FALSE,TRUE,TRUE),

(12,FALSE,TRUE,TRUE,TRUE,TRUE),

(13,TRUE,TRUE,TRUE,FALSE,TRUE),

(14,TRUE,TRUE,FALSE,TRUE,FALSE),

(15,TRUE,TRUE,TRUE,TRUE,TRUE);

-- ======================================================
-- 7. EMERGENCY CONTACTS
-- ======================================================

INSERT INTO emergency_contacts
(user_id, contact_name, relationship, mobile_number)
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


-- ======================================================
-- 8. FAMILY MEMBERS
-- ======================================================

INSERT INTO family_members
(user_id, name, relationship, mobile_number, permission_level)
VALUES
(1,'Rohit Sharma','Husband','9876521001','VIEW_AND_REMINDERS'),
(1,'Aarav Sharma','Son','9876521002','VIEW_ONLY'),

(2,'Amit Verma','Husband','9876521003','VIEW_AND_REMINDERS'),
(2,'Anaya Verma','Daughter','9876521004','VIEW_ONLY'),

(3,'Kunal Patil','Husband','9876521005','VIEW_AND_REMINDERS'),
(3,'Vihaan Patil','Son','9876521006','VIEW_ONLY'),

(4,'Rahul Gupta','Husband','9876521007','VIEW_AND_REMINDERS'),
(4,'Seema Gupta','Mother-in-law','9876521008','VIEW_ONLY'),

(5,'Arjun Iyer','Husband','9876521009','VIEW_AND_REMINDERS'),
(5,'Diya Iyer','Daughter','9876521010','VIEW_ONLY'),

(6,'Vikas Singh','Husband','9876521011','VIEW_AND_REMINDERS'),
(6,'Renu Singh','Mother-in-law','9876521012','VIEW_ONLY'),

(7,'Nikhil Joshi','Husband','9876521013','VIEW_AND_REMINDERS'),
(7,'Aditi Joshi','Daughter','9876521014','VIEW_ONLY'),

(8,'Aditya Kulkarni','Husband','9876521015','VIEW_AND_REMINDERS'),
(8,'Om Kulkarni','Son','9876521016','VIEW_ONLY'),

(9,'Rakesh Nair','Husband','9876521017','VIEW_AND_REMINDERS'),
(9,'Ira Nair','Daughter','9876521018','VIEW_ONLY'),

(10,'Karan Rao','Husband','9876521019','VIEW_AND_REMINDERS'),
(10,'Savitri Rao','Mother-in-law','9876521020','VIEW_ONLY');

-- ======================================================
-- 9. DOCTORS
-- ======================================================

INSERT INTO doctors
(user_id, doctor_name, hospital_name, contact_number,
 hospital_address, next_appointment)
VALUES
(1,'Dr. Anjali Mehta','Kingsway Hospital','9876520001',
 'Nagpur','2026-07-30 10:00:00'),

(2,'Dr. Vivek Kulkarni','Ruby Hall Clinic','9876520002',
 'Pune','2026-08-02 11:00:00'),

(3,'Dr. Snehal Deshpande','Kokilaben Hospital','9876520003',
 'Mumbai','2026-07-29 09:30:00'),

(4,'Dr. Pooja Shah','Wockhardt Hospital','9876520004',
 'Nashik','2026-08-05 10:30:00'),

(5,'Dr. Rohan Patil','Life Care Hospital','9876520005',
 'Amravati','2026-08-01 11:30:00'),

(6,'Dr. Neha Joshi','Care Hospital','9876520006',
 'Akola','2026-08-04 09:00:00'),

(7,'Dr. Sameer Gupta','Apollo Hospital','9876520007',
 'Chandrapur','2026-07-31 10:00:00'),

(8,'Dr. Shweta Kulkarni','District Hospital','9876520008',
 'Wardha','2026-08-03 12:00:00'),

(9,'Dr. Rajesh Nair','Lotus Hospital','9876520009',
 'Yavatmal','2026-08-06 10:30:00'),

(10,'Dr. Meenal Rao','United CIIGMA Hospital','9876520010',
 'Aurangabad','2026-08-07 09:30:00'),

(3,'Dr. Kiran More','Kokilaben Hospital','9876520011',
 'Mumbai','2026-08-10 11:00:00'),

(5,'Dr. Ashish Jain','Life Care Hospital','9876520012',
 'Amravati','2026-08-11 10:00:00'),

(7,'Dr. Nitin Bansal','Apollo Hospital','9876520013',
 'Chandrapur','2026-08-09 09:30:00'),

(9,'Dr. Priyanka Patil','Lotus Hospital','9876520014',
 'Yavatmal','2026-08-12 11:30:00'),

(6,'Dr. Kavita Sharma','Care Hospital','9876520015',
 'Akola','2026-08-08 10:30:00');


-- ======================================================
-- 10. APPOINTMENT HISTORY
-- ======================================================

INSERT INTO appointment_history
(user_id, total_appointment, prescription, reports)
VALUES
(1,3,
 'Iron and Folic Acid tablets',
 'Blood test report - Normal'),

(2,2,
 'Calcium and Vitamin D supplements',
 'Ultrasound report - Normal'),

(3,4,
 'Iron supplements and prescribed medication',
 'Blood sugar monitoring report'),

(4,1,
 'Folic Acid tablets',
 'Initial pregnancy checkup - Normal'),

(5,3,
 'Calcium and Iron supplements',
 'Routine blood test - Normal'),

(6,2,
 'Prenatal vitamins and supplements',
 'Ultrasound report - Normal'),

(7,5,
 'Iron supplements and glucose monitoring',
 'High-risk pregnancy monitoring report'),

(8,2,
 'Folic Acid and Calcium supplements',
 'Routine checkup report - Normal'),

(9,3,
 'Iron supplements and dietary advice',
 'Blood sugar test report'),

(10,1,
 'Prenatal vitamins',
 'Initial pregnancy checkup - Normal'),

(11,2,
 'Iron and Folic Acid tablets',
 'Routine blood test - Normal'),

(12,3,
 'Calcium and Vitamin D supplements',
 'Ultrasound report - Normal'),

(13,2,
 'Prenatal vitamins',
 'Routine pregnancy checkup - Normal'),

(14,4,
 'Iron and Calcium supplements',
 'Blood test report - Normal'),

(15,3,
 'Iron supplements and prescribed medication',
 'Pregnancy monitoring report');