package com.nurture.backend.dto;

import java.time.LocalDate;

public class PregnancyProfileRequest {

    private Long userId;

    private String dueDate;
    private Integer pregnancyWeek;
    private String trimester;

    // New Fields
    private LocalDate lastMenstrualPeriod;
    private String pregnancyType;
    private Integer babyCount;
    private String doctorNotes;

    // Existing Fields
    private Boolean firstPregnancy;
    private Integer previousPregnancies;
    private Integer liveBirths;
    private Integer miscarriages;

    private Boolean highRisk;
    private Boolean ivfPregnancy;
    private Boolean multiplePregnancy;

    public PregnancyProfileRequest() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public void setPregnancyWeek(Integer pregnancyWeek) {
        this.pregnancyWeek = pregnancyWeek;
    }

    public String getTrimester() {
        return trimester;
    }

    public void setTrimester(String trimester) {
        this.trimester = trimester;
    }

    public LocalDate getLastMenstrualPeriod() {
        return lastMenstrualPeriod;
    }

    public void setLastMenstrualPeriod(LocalDate lastMenstrualPeriod) {
        this.lastMenstrualPeriod = lastMenstrualPeriod;
    }

    public String getPregnancyType() {
        return pregnancyType;
    }

    public void setPregnancyType(String pregnancyType) {
        this.pregnancyType = pregnancyType;
    }

    public Integer getBabyCount() {
        return babyCount;
    }

    public void setBabyCount(Integer babyCount) {
        this.babyCount = babyCount;
    }

    public String getDoctorNotes() {
        return doctorNotes;
    }

    public void setDoctorNotes(String doctorNotes) {
        this.doctorNotes = doctorNotes;
    }

    public Boolean getFirstPregnancy() {
        return firstPregnancy;
    }

    public void setFirstPregnancy(Boolean firstPregnancy) {
        this.firstPregnancy = firstPregnancy;
    }

    public Integer getPreviousPregnancies() {
        return previousPregnancies;
    }

    public void setPreviousPregnancies(Integer previousPregnancies) {
        this.previousPregnancies = previousPregnancies;
    }

    public Integer getLiveBirths() {
        return liveBirths;
    }

    public void setLiveBirths(Integer liveBirths) {
        this.liveBirths = liveBirths;
    }

    public Integer getMiscarriages() {
        return miscarriages;
    }

    public void setMiscarriages(Integer miscarriages) {
        this.miscarriages = miscarriages;
    }

    public Boolean getHighRisk() {
        return highRisk;
    }

    public void setHighRisk(Boolean highRisk) {
        this.highRisk = highRisk;
    }

    public Boolean getIvfPregnancy() {
        return ivfPregnancy;
    }

    public void setIvfPregnancy(Boolean ivfPregnancy) {
        this.ivfPregnancy = ivfPregnancy;
    }

    public Boolean getMultiplePregnancy() {
        return multiplePregnancy;
    }

    public void setMultiplePregnancy(Boolean multiplePregnancy) {
        this.multiplePregnancy = multiplePregnancy;
    }
}