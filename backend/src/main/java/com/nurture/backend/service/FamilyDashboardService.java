package com.nurture.backend.service;

import com.nurture.backend.dto.FamilyAppointmentResponse;
import com.nurture.backend.dto.FamilyDashboardResponse;
import com.nurture.backend.entity.Appointment;
import com.nurture.backend.entity.FamilyMember;
import com.nurture.backend.entity.Login;
import com.nurture.backend.entity.PregnancyProfile;
import com.nurture.backend.entity.UserProfile;

import com.nurture.backend.repository.AppointmentRepository;
import com.nurture.backend.repository.FamilyMemberRepository;
import com.nurture.backend.repository.LoginRepository;
import com.nurture.backend.repository.PregnancyProfileRepository;
import com.nurture.backend.repository.UserProfileRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class FamilyDashboardService {

    private final LoginRepository loginRepository;

    private final FamilyMemberRepository familyMemberRepository;

    private final UserProfileRepository userProfileRepository;

    private final PregnancyProfileRepository pregnancyProfileRepository;

    private final AppointmentRepository appointmentRepository;


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public FamilyDashboardService(
            LoginRepository loginRepository,
            FamilyMemberRepository familyMemberRepository,
            UserProfileRepository userProfileRepository,
            PregnancyProfileRepository pregnancyProfileRepository,
            AppointmentRepository appointmentRepository
    ) {

        this.loginRepository = loginRepository;

        this.familyMemberRepository =
                familyMemberRepository;

        this.userProfileRepository =
                userProfileRepository;

        this.pregnancyProfileRepository =
                pregnancyProfileRepository;

        this.appointmentRepository =
                appointmentRepository;
    }


    // =========================================================
    // FAMILY DASHBOARD
    // =========================================================

    public FamilyDashboardResponse getDashboard(
            Long familyMemberUserId
    ) {

        // =====================================================
        // 1. VALIDATE FAMILY MEMBER
        // =====================================================

        if (familyMemberUserId == null) {

            throw new RuntimeException(
                    "Family member user ID is required"
            );
        }


        // =====================================================
        // 2. FIND FAMILY MEMBER
        // =====================================================

        Optional<FamilyMember> familyMemberOptional =
                familyMemberRepository
                        .findByUserId(familyMemberUserId);


        if (familyMemberOptional.isEmpty()) {

            throw new RuntimeException(
                    "Family member profile not found for userId: "
                            + familyMemberUserId
            );
        }


        FamilyMember familyMember =
                familyMemberOptional.get();


        // =====================================================
        // 3. GET MOTHER / PATIENT USER ID
        // =====================================================

        Long patientUserId =
                familyMember.getPatientUserId();


        if (patientUserId == null) {

            throw new RuntimeException(
                    "Mother is not linked with this family member."
            );
        }


        System.out.println(
                "========================================"
        );

        System.out.println(
                "FAMILY DASHBOARD"
        );

        System.out.println(
                "Family Member User ID: "
                        + familyMemberUserId
        );

        System.out.println(
                "Mother / Patient User ID: "
                        + patientUserId
        );

        System.out.println(
                "========================================"
        );


        // =====================================================
        // 4. FIND MOTHER
        // =====================================================

        Optional<Login> motherOptional =
                loginRepository.findById(
                        patientUserId
                );


        if (motherOptional.isEmpty()) {

            throw new RuntimeException(
                    "Mother user not found with userId: "
                            + patientUserId
            );
        }


        Login mother =
                motherOptional.get();


        // =====================================================
        // 5. CREATE RESPONSE
        // =====================================================

        FamilyDashboardResponse response =
                new FamilyDashboardResponse();


        response.setPatientUserId(
                patientUserId
        );


        // =====================================================
        // 6. MOTHER BASIC INFORMATION
        // =====================================================

        response.setName(
                mother.getFullName()
        );

        response.setEmail(
                mother.getEmail()
        );

        response.setPhone(
                mother.getPhoneNumber()
        );


        // =====================================================
        // 7. USER PROFILE
        // =====================================================

        Optional<UserProfile> profileOptional =
                userProfileRepository
                        .findByUser(mother);


        if (profileOptional.isPresent()) {

            UserProfile profile =
                    profileOptional.get();

            response.setAge(
                    profile.getAge()
            );
        }


        // =====================================================
        // 8. PREGNANCY PROFILE
        // =====================================================

        Optional<PregnancyProfile> pregnancyOptional =
                pregnancyProfileRepository
                        .findByUser_Id(
                                patientUserId
                        );


        if (pregnancyOptional.isPresent()) {

            PregnancyProfile pregnancy =
                    pregnancyOptional.get();

            response.setPregnancyWeek(
                    pregnancy.getPregnancyWeek()
            );

            response.setTrimester(
                    pregnancy.getTrimester()
            );

            response.setDueDate(
                    pregnancy.getDueDate()
            );

            response.setPregnancyType(
                    pregnancy.getPregnancyType()
            );

            response.setBabyCount(
                    pregnancy.getBabyCount()
            );

            response.setHighRisk(
                    pregnancy.getHighRisk()
            );
        }


        // =====================================================
        // 9. GET ALL MOTHER'S APPOINTMENTS
        // =====================================================

        List<Appointment> appointments =
                appointmentRepository
                        .findByUserIdOrderByAppointmentDateAscAppointmentTimeAsc(
                                patientUserId
                        );


        System.out.println(
                "Mother appointments found: "
                        + appointments.size()
        );


        // =====================================================
        // 10. CONVERT APPOINTMENTS TO DTO
        // =====================================================

        List<FamilyAppointmentResponse>
                appointmentResponses =
                new ArrayList<>();


        for (Appointment appointment : appointments) {

            FamilyAppointmentResponse appointmentResponse =
                    new FamilyAppointmentResponse();


            appointmentResponse.setId(
                    appointment.getId()
            );


            appointmentResponse.setDoctorName(
                    appointment.getDoctorName()
            );


            appointmentResponse.setSpecialization(
                    appointment.getSpecialization()
            );


            if (appointment.getAppointmentDate() != null) {

                appointmentResponse.setAppointmentDate(
                        appointment
                                .getAppointmentDate()
                                .toString()
                );
            }


            if (appointment.getAppointmentTime() != null) {

                appointmentResponse.setAppointmentTime(
                        appointment
                                .getAppointmentTime()
                                .toString()
                );
            }


            appointmentResponse.setHospital(
                    appointment.getHospital()
            );


            appointmentResponse.setStatus(
                    appointment.getStatus()
            );


            appointmentResponses.add(
                    appointmentResponse
            );


            // Debug information
            System.out.println(
                    "----------------------------------------"
            );

            System.out.println(
                    "Appointment ID: "
                            + appointment.getId()
            );

            System.out.println(
                    "Doctor: "
                            + appointment.getDoctorName()
            );

            System.out.println(
                    "Date: "
                            + appointment.getAppointmentDate()
            );

            System.out.println(
                    "Time: "
                            + appointment.getAppointmentTime()
            );

            System.out.println(
                    "Hospital: "
                            + appointment.getHospital()
            );

            System.out.println(
                    "Status: "
                            + appointment.getStatus()
            );
        }


        // =====================================================
        // 11. SET ALL APPOINTMENTS
        // =====================================================

        response.setAppointments(
                appointmentResponses
        );


        System.out.println(
                "========================================"
        );

        System.out.println(
                "TOTAL APPOINTMENTS SENT TO FAMILY DASHBOARD: "
                        + appointmentResponses.size()
        );

        System.out.println(
                "========================================"
        );


        // =====================================================
        // 12. HEALTH SCORE
        // =====================================================

        response.setHealthScore(
                null
        );


        // =====================================================
        // 13. RETURN RESPONSE
        // =====================================================

        return response;
    }
}