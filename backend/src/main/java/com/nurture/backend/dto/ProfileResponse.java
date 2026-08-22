package com.nurture.backend.dto;

import java.time.LocalDate;

public class ProfileResponse {

    private Long id;

    private String fullName;

    private String email;

    private String mobile;

    private String role;

    private PregnancyProfileResponse pregnancyProfile;


    // =========================================================
    // EMPTY CONSTRUCTOR
    // =========================================================

    public ProfileResponse() {
    }


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public ProfileResponse(
            Long id,
            String fullName,
            String email,
            String mobile,
            String role,
            PregnancyProfileResponse pregnancyProfile
    ) {

        this.id = id;

        this.fullName = fullName;

        this.email = email;

        this.mobile = mobile;

        this.role = role;

        this.pregnancyProfile =
                pregnancyProfile;
    }


    // =========================================================
    // GETTERS / SETTERS
    // =========================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }


    public PregnancyProfileResponse getPregnancyProfile() {
        return pregnancyProfile;
    }

    public void setPregnancyProfile(
            PregnancyProfileResponse pregnancyProfile
    ) {
        this.pregnancyProfile =
                pregnancyProfile;
    }


    // =========================================================
    // PREGNANCY PROFILE RESPONSE
    // =========================================================

    public static class PregnancyProfileResponse {

        private Long pregnancyId;

        private String dueDate;

        private Integer pregnancyWeek;

        private String trimester;

        private LocalDate lastMenstrualPeriod;

        private String pregnancyType;

        private Integer babyCount;

        private String doctorNotes;

        private Boolean firstPregnancy;

        private Integer previousPregnancies;

        private Integer liveBirths;

        private Integer miscarriages;

        private Boolean highRisk;

        private Boolean ivfPregnancy;

        private Boolean multiplePregnancy;


        // =====================================================
        // EMPTY CONSTRUCTOR
        // =====================================================

        public PregnancyProfileResponse() {
        }


        // =====================================================
        // CONSTRUCTOR
        // =====================================================

        public PregnancyProfileResponse(

                Long pregnancyId,

                String dueDate,

                Integer pregnancyWeek,

                String trimester,

                LocalDate lastMenstrualPeriod,

                String pregnancyType,

                Integer babyCount,

                String doctorNotes,

                Boolean firstPregnancy,

                Integer previousPregnancies,

                Integer liveBirths,

                Integer miscarriages,

                Boolean highRisk,

                Boolean ivfPregnancy,

                Boolean multiplePregnancy
        ) {

            this.pregnancyId =
                    pregnancyId;

            this.dueDate =
                    dueDate;

            this.pregnancyWeek =
                    pregnancyWeek;

            this.trimester =
                    trimester;

            this.lastMenstrualPeriod =
                    lastMenstrualPeriod;

            this.pregnancyType =
                    pregnancyType;

            this.babyCount =
                    babyCount;

            this.doctorNotes =
                    doctorNotes;

            this.firstPregnancy =
                    firstPregnancy;

            this.previousPregnancies =
                    previousPregnancies;

            this.liveBirths =
                    liveBirths;

            this.miscarriages =
                    miscarriages;

            this.highRisk =
                    highRisk;

            this.ivfPregnancy =
                    ivfPregnancy;

            this.multiplePregnancy =
                    multiplePregnancy;
        }


        // =====================================================
        // GETTERS / SETTERS
        // =====================================================

        public Long getPregnancyId() {
            return pregnancyId;
        }

        public void setPregnancyId(Long pregnancyId) {
            this.pregnancyId = pregnancyId;
        }


        public String getDueDate() {
            return dueDate;
        }

        public void setDueDate(String dueDate) {
            this.dueDate = dueDate;
        }


        public Integer getPregnancyWeek() {
            return pregnancyWeek;
        }

        public void setPregnancyWeek(
                Integer pregnancyWeek
        ) {
            this.pregnancyWeek =
                    pregnancyWeek;
        }


        public String getTrimester() {
            return trimester;
        }

        public void setTrimester(String trimester) {
            this.trimester =
                    trimester;
        }


        public LocalDate getLastMenstrualPeriod() {
            return lastMenstrualPeriod;
        }

        public void setLastMenstrualPeriod(
                LocalDate lastMenstrualPeriod
        ) {
            this.lastMenstrualPeriod =
                    lastMenstrualPeriod;
        }


        public String getPregnancyType() {
            return pregnancyType;
        }

        public void setPregnancyType(
                String pregnancyType
        ) {
            this.pregnancyType =
                    pregnancyType;
        }


        public Integer getBabyCount() {
            return babyCount;
        }

        public void setBabyCount(Integer babyCount) {
            this.babyCount =
                    babyCount;
        }


        public String getDoctorNotes() {
            return doctorNotes;
        }

        public void setDoctorNotes(String doctorNotes) {
            this.doctorNotes =
                    doctorNotes;
        }


        public Boolean getFirstPregnancy() {
            return firstPregnancy;
        }

        public void setFirstPregnancy(
                Boolean firstPregnancy
        ) {
            this.firstPregnancy =
                    firstPregnancy;
        }


        public Integer getPreviousPregnancies() {
            return previousPregnancies;
        }

        public void setPreviousPregnancies(
                Integer previousPregnancies
        ) {
            this.previousPregnancies =
                    previousPregnancies;
        }


        public Integer getLiveBirths() {
            return liveBirths;
        }

        public void setLiveBirths(Integer liveBirths) {
            this.liveBirths =
                    liveBirths;
        }


        public Integer getMiscarriages() {
            return miscarriages;
        }

        public void setMiscarriages(
                Integer miscarriages
        ) {
            this.miscarriages =
                    miscarriages;
        }


        public Boolean getHighRisk() {
            return highRisk;
        }

        public void setHighRisk(Boolean highRisk) {
            this.highRisk =
                    highRisk;
        }


        public Boolean getIvfPregnancy() {
            return ivfPregnancy;
        }

        public void setIvfPregnancy(
                Boolean ivfPregnancy
        ) {
            this.ivfPregnancy =
                    ivfPregnancy;
        }


        public Boolean getMultiplePregnancy() {
            return multiplePregnancy;
        }

        public void setMultiplePregnancy(
                Boolean multiplePregnancy
        ) {
            this.multiplePregnancy =
                    multiplePregnancy;
        }
    }
}