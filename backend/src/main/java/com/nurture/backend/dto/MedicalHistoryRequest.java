package com.nurture.backend.dto;

import lombok.Data;

@Data
public class MedicalHistoryRequest {

    private Boolean diabetes;
    private Boolean hypertension;
    private Boolean thyroid;
    private Boolean pcos;
    private Boolean asthma;
    private Boolean heartDisease;
    private String otherDisease;
}