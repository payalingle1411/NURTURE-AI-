package com.nurture.backend.dto;

public class PregnancyProfileResponse {

    private Integer pregnancyWeek;
    private String trimester;

    private Boolean highRisk;
    private Boolean ivfPregnancy;
    private Boolean multiplePregnancy;

    private String pregnancyType;
    private Integer babyCount;
    private Boolean firstPregnancy;

    public PregnancyProfileResponse() {
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

    public Boolean getFirstPregnancy() {
        return firstPregnancy;
    }

    public void setFirstPregnancy(Boolean firstPregnancy) {
        this.firstPregnancy = firstPregnancy;
    }
}