package com.nurture.backend.service;

import org.springframework.stereotype.Component;

@Component
public class HealthScoreCalculator {

    public int calculateScore(
            Integer waterGlasses,
            Double sleepHours,
            String sleepQuality,
            String mood,
            Integer symptomSeverity,
            String nutritionQuality,
            Integer activityMinutes,
            Boolean medicationTaken
    ) {

        double score = 0;

        // =========================
        // WATER - 10%
        // Target: 8 glasses
        // =========================

        if (waterGlasses != null) {
            score += Math.min(waterGlasses / 8.0, 1.0) * 10;
        }

        // =========================
        // SLEEP - 15%
        // Target: 7-9 hours
        // =========================

        if (sleepHours != null) {

            if (sleepHours >= 7 && sleepHours <= 9) {
                score += 15;
            } else if (sleepHours >= 6 && sleepHours < 7) {
                score += 11;
            } else if (sleepHours > 9 && sleepHours <= 10) {
                score += 11;
            } else if (sleepHours >= 5) {
                score += 7;
            }
        }

        // Sleep quality
        if ("GOOD".equalsIgnoreCase(sleepQuality)) {
            score += 3;
        } else if ("AVERAGE".equalsIgnoreCase(sleepQuality)) {
            score += 2;
        } else if ("POOR".equalsIgnoreCase(sleepQuality)) {
            score += 0;
        }

        // =========================
        // MOOD - 10%
        // =========================

        if ("VERY_GOOD".equalsIgnoreCase(mood)) {
            score += 10;
        } else if ("GOOD".equalsIgnoreCase(mood)) {
            score += 8;
        } else if ("OKAY".equalsIgnoreCase(mood)) {
            score += 6;
        } else if ("SAD".equalsIgnoreCase(mood)) {
            score += 3;
        } else if ("STRESSED".equalsIgnoreCase(mood)) {
            score += 2;
        }

        // =========================
        // SYMPTOMS - 25%
        // Lower severity = better
        // =========================

        if (symptomSeverity == null || symptomSeverity == 0) {
            score += 25;
        } else if (symptomSeverity <= 2) {
            score += 20;
        } else if (symptomSeverity <= 4) {
            score += 15;
        } else if (symptomSeverity <= 7) {
            score += 8;
        } else {
            score += 2;
        }

        // =========================
        // NUTRITION - 20%
        // =========================

        if ("EXCELLENT".equalsIgnoreCase(nutritionQuality)) {
            score += 20;
        } else if ("GOOD".equalsIgnoreCase(nutritionQuality)) {
            score += 16;
        } else if ("AVERAGE".equalsIgnoreCase(nutritionQuality)) {
            score += 11;
        } else if ("POOR".equalsIgnoreCase(nutritionQuality)) {
            score += 5;
        }

        // =========================
        // ACTIVITY - 5%
        // =========================

        if (activityMinutes != null) {

            if (activityMinutes >= 30) {
                score += 5;
            } else if (activityMinutes >= 20) {
                score += 4;
            } else if (activityMinutes >= 10) {
                score += 2;
            }
        }

        // =========================
        // MEDICATION - 10%
        // =========================

        if (Boolean.TRUE.equals(medicationTaken)) {
            score += 10;
        }

        return Math.max(0, Math.min(100, (int) Math.round(score)));
    }

    public String getStatus(int score) {

        if (score >= 80) {
            return "GOOD";
        }

        if (score >= 60) {
            return "MODERATE";
        }

        if (score >= 40) {
            return "NEEDS_ATTENTION";
        }

        return "LOW";
    }

    public String getMessage(int score) {

        if (score >= 80) {
            return "Your health is looking good today.";
        }

        if (score >= 60) {
            return "Your health is moderate. A few improvements can help.";
        }

        if (score >= 40) {
            return "Your health score needs attention. Review today's activities.";
        }

        return "Your health score is low. Please review your symptoms and consider contacting your healthcare provider if you feel unwell.";
    }
}