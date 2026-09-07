package com.nurture.backend.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nurture.backend.entity.PregnancyProfile;
import com.nurture.backend.repository.PregnancyProfileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiService {

    private final PregnancyProfileRepository pregnancyProfileRepository;
    private final ObjectMapper objectMapper;

    /*
     * Gemini API key is loaded from application.properties.
     *
     * gemini.api.key=${GEMINI_API_KEY}
     *
     * The actual API key should remain inside .env
     */
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    /*
     * Gemini model.
     *
     * Can be overridden using:
     *
     * GEMINI_MODEL=gemini-3.6-flash
     */
    @Value("${gemini.model:gemini-3.6-flash}")
    private String geminiModel;

    private final HttpClient httpClient =
            HttpClient.newHttpClient();

    public AiService(
            PregnancyProfileRepository pregnancyProfileRepository,
            ObjectMapper objectMapper
    ) {
        this.pregnancyProfileRepository =
                pregnancyProfileRepository;

        this.objectMapper = objectMapper;
    }


    // =========================================================
    // ASK AI
    // =========================================================

    public String askAi(
            Long userId,
            String userMessage
    ) {

        // Validate user ID
        if (userId == null) {

            throw new RuntimeException(
                    "User ID is required"
            );
        }

        // Validate question
        if (userMessage == null ||
                userMessage.trim().isEmpty()) {

            throw new RuntimeException(
                    "Please enter a question"
            );
        }

        /*
         * Get the pregnancy profile of the
         * currently logged-in mother.
         */
        PregnancyProfile pregnancyProfile =
                pregnancyProfileRepository
                        .findByUser_Id(userId)
                        .orElse(null);

        // Build pregnancy information
        String pregnancyContext =
                buildPregnancyContext(
                        pregnancyProfile
                );

        // Build complete AI prompt
        String prompt =
                buildPrompt(
                        pregnancyContext,
                        userMessage
                );

        // Send prompt to Gemini
        return callGemini(prompt);
    }


    // =========================================================
    // BUILD PREGNANCY CONTEXT
    // =========================================================

    private String buildPregnancyContext(
            PregnancyProfile profile
    ) {

        /*
         * If the pregnancy profile does not exist,
         * AI must not invent any pregnancy details.
         */
        if (profile == null) {

            return """
                    Pregnancy profile information is not available.

                    Do not invent any pregnancy details.

                    If pregnancy information is necessary for
                    answering the user's question, ask the user
                    for the relevant information or recommend
                    speaking with their healthcare professional.
                    """;
        }

        StringBuilder context =
                new StringBuilder();

        context.append(
                "Pregnancy information:\n"
        );


        // Pregnancy week
        if (profile.getPregnancyWeek() != null) {

            context.append(
                            "Pregnancy week: "
                    )
                    .append(
                            profile.getPregnancyWeek()
                    )
                    .append("\n");
        }


        // Trimester
        if (profile.getTrimester() != null) {

            context.append(
                            "Trimester: "
                    )
                    .append(
                            profile.getTrimester()
                    )
                    .append("\n");
        }


        // Due date
        if (profile.getDueDate() != null) {

            context.append(
                            "Due date: "
                    )
                    .append(
                            profile.getDueDate()
                    )
                    .append("\n");
        }


        // Baby count
        if (profile.getBabyCount() != null) {

            context.append(
                            "Baby count: "
                    )
                    .append(
                            profile.getBabyCount()
                    )
                    .append("\n");
        }


        // Pregnancy type
        if (profile.getPregnancyType() != null) {

            context.append(
                            "Pregnancy type: "
                    )
                    .append(
                            profile.getPregnancyType()
                    )
                    .append("\n");
        }


        // First pregnancy
        if (profile.getFirstPregnancy() != null) {

            context.append(
                            "First pregnancy: "
                    )
                    .append(
                            profile.getFirstPregnancy()
                    )
                    .append("\n");
        }


        // High-risk pregnancy
        if (profile.getHighRisk() != null) {

            context.append(
                            "High-risk pregnancy: "
                    )
                    .append(
                            profile.getHighRisk()
                    )
                    .append("\n");
        }


        return context.toString();
    }


    // =========================================================
    // BUILD AI PROMPT
    // =========================================================

    private String buildPrompt(
            String pregnancyContext,
            String userMessage
    ) {

        return """
                You are Nurture AI, a pregnancy wellness assistant.

                Your purpose is to provide supportive, educational,
                respectful and easy-to-understand information related
                to pregnancy, maternal wellness and the Nurture AI
                application.

                =====================================================
                SAFETY RULES
                =====================================================

                1. Do not diagnose diseases or medical conditions.

                2. Do not replace a doctor, gynecologist, healthcare
                   professional or emergency medical service.

                3. Do not prescribe medicines.

                4. Do not tell the user to start, stop or change
                   any medicine or dosage.

                5. If the user describes potentially serious symptoms
                   or an emergency, clearly recommend contacting a
                   healthcare professional or seeking urgent medical
                   care.

                6. Potentially serious symptoms include severe or
                   persistent abdominal pain, heavy bleeding, fainting,
                   difficulty breathing, seizures, severe weakness,
                   inability to keep fluids down, signs of dehydration,
                   or any other situation that appears dangerous.

                7. Never invent pregnancy information.

                8. Use the provided pregnancy profile only as
                   contextual information.

                9. Do not claim that you physically examined the
                   mother or baby.

                10. Do not make the user feel guilty, embarrassed,
                    frightened or judged.

                11. If the user says they are scared, worried, feel
                    strange, feel alone, are hiding symptoms, or have
                    not told anyone, respond with empathy first.

                12. Encourage the user to tell a trusted person and,
                    when medically appropriate, contact their doctor
                    or gynecologist.

                13. For serious symptoms, do not give false reassurance.
                    Clearly explain when professional medical care
                    is needed.

                14. Do not assume that IVF or high-risk pregnancy is
                    the cause of a symptom. Use those details only as
                    relevant context.

                15. Do not say that a symptom is definitely harmless
                    or definitely caused by pregnancy.

                =====================================================
                RESPONSE STYLE
                =====================================================

                1. Be warm, caring, calm and supportive.

                2. When the user expresses fear, discomfort or
                   loneliness, acknowledge their feelings before
                   giving instructions.

                3. Give practical and easy-to-follow guidance.

                4. Keep answers concise unless the user asks for
                   detailed information.

                5. Use simple language that a pregnant mother can
                   easily understand.

                6. Do not overwhelm the user with unnecessary
                   medical terminology.

                =====================================================
                IMPORTANT FORMATTING RULES
                =====================================================

                1. Return plain text only.

                2. Do NOT use Markdown.

                3. Do NOT use the # symbol anywhere.

                4. Do NOT use the * symbol anywhere.

                5. Do NOT use underscores anywhere.

                6. Do NOT use backticks anywhere.

                7. Do NOT use Markdown headings.

                8. Do NOT use Markdown bullet points.

                9. Do NOT use emojis.

                10. You may use normal numbered points such as:
                    1.
                    2.
                    3.

                11. Use normal paragraphs and line breaks.

                12. Do not put the answer inside quotation marks.

                =====================================================
                MEDICAL CONCERN RESPONSE STYLE
                =====================================================

                If the user reports a symptom, first acknowledge
                what they are experiencing.

                Then explain the safest next step.

                If the symptom could be serious, clearly recommend
                contacting their healthcare professional.

                If the user says they have not told anyone about
                their symptoms, gently encourage them to tell a
                trusted person instead of handling it alone.

                Do not shame the user for hiding symptoms.

                =====================================================
                PREGNANCY CONTEXT
                =====================================================

                %s

                =====================================================
                USER QUESTION
                =====================================================

                %s

                =====================================================
                FINAL INSTRUCTION
                =====================================================

                Answer the user's question naturally.

                Remember:
                Plain text only.
                No Markdown.
                No #.
                No *.
                No underscores.
                No backticks.
                No emojis.
                No Markdown bullets.
                No Markdown headings.
                Use normal paragraphs and numbered points when needed.
                """.formatted(
                pregnancyContext,
                userMessage.trim()
        );
    }


    // =========================================================
    // CALL GEMINI API
    // =========================================================

    private String callGemini(
            String prompt
    ) {

        try {

            /*
             * Gemini REST API URL.
             *
             * API key is sent through the request header
             * and is NOT placed in the URL.
             */
            String url =
                    "https://generativelanguage.googleapis.com/v1beta/models/"
                            + geminiModel
                            + ":generateContent";


            // =================================================
            // TEXT PART
            // =================================================

            Map<String, Object> textPart =
                    new HashMap<>();

            textPart.put(
                    "text",
                    prompt
            );


            // =================================================
            // CONTENT
            // =================================================

            Map<String, Object> content =
                    new HashMap<>();

            content.put(
                    "parts",
                    List.of(textPart)
            );

            content.put(
                    "role",
                    "user"
            );


            // =================================================
            // REQUEST BODY
            // =================================================

            Map<String, Object> requestBody =
                    new HashMap<>();

            requestBody.put(
                    "contents",
                    List.of(content)
            );


            // Convert Java object to JSON
            String json =
                    objectMapper.writeValueAsString(
                            requestBody
                    );


            // =================================================
            // HTTP REQUEST
            // =================================================

            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(
                                    URI.create(url)
                            )
                            .header(
                                    HttpHeaders.CONTENT_TYPE,
                                    MediaType.APPLICATION_JSON_VALUE
                            )
                            .header(
                                    "x-goog-api-key",
                                    geminiApiKey
                            )
                            .POST(
                                    HttpRequest.BodyPublishers
                                            .ofString(json)
                            )
                            .build();


            // =================================================
            // SEND REQUEST
            // =================================================

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers
                                    .ofString()
                    );


            // =================================================
            // CHECK RESPONSE
            // =================================================

            if (response.statusCode() < 200 ||
                    response.statusCode() >= 300) {

                throw new RuntimeException(
                        "Gemini API error: "
                                + response.statusCode()
                                + " - "
                                + response.body()
                );
            }


            // =================================================
            // PARSE JSON RESPONSE
            // =================================================

            JsonNode root =
                    objectMapper.readTree(
                            response.body()
                    );


            /*
             * Expected Gemini response:
             *
             * candidates
             *   └── 0
             *       └── content
             *           └── parts
             *               └── 0
             *                   └── text
             */
            JsonNode textNode =
                    root.path("candidates")
                            .path(0)
                            .path("content")
                            .path("parts")
                            .path(0)
                            .path("text");


            // =================================================
            // CHECK AI RESPONSE
            // =================================================

            if (textNode.isMissingNode() ||
                    textNode.asText().isBlank()) {

                throw new RuntimeException(
                        "Gemini returned an empty response"
                );
            }


            // =================================================
            // CLEAN AI RESPONSE
            // =================================================

            return cleanAiResponse(
                    textNode.asText()
            );


        } catch (InterruptedException e) {

            /*
             * Restore interrupted status.
             */
            Thread.currentThread().interrupt();

            throw new RuntimeException(
                    "AI request was interrupted",
                    e
            );


        } catch (RuntimeException e) {

            /*
             * Keep useful Gemini/API error message.
             */
            throw e;


        } catch (Exception e) {

            /*
             * Handle JSON/HTTP/other unexpected errors.
             */
            throw new RuntimeException(
                    "Unable to communicate with AI service",
                    e
            );
        }
    }


    // =========================================================
    // CLEAN AI RESPONSE
    // =========================================================

    private String cleanAiResponse(
            String response
    ) {

        if (response == null) {
            return "";
        }

        String cleaned =
                response.trim();


        // =====================================================
        // REMOVE MARKDOWN HEADINGS
        // =====================================================

        /*
         * Example:
         *
         * ### What you should do
         *
         * becomes:
         *
         * What you should do
         */
        cleaned =
                cleaned.replaceAll(
                        "(?m)^\\s*#{1,6}\\s*",
                        ""
                );


        // =====================================================
        // REMOVE BOLD MARKDOWN
        // =====================================================

        cleaned =
                cleaned.replace(
                        "**",
                        ""
                );


        // =====================================================
        // REMOVE UNDERSCORES
        // =====================================================

        cleaned =
                cleaned.replace(
                        "_",
                        ""
                );


        // =====================================================
        // REMOVE ASTERISKS
        // =====================================================

        /*
         * Removes remaining * characters anywhere
         * in the response.
         */
        cleaned =
                cleaned.replace(
                        "*",
                        ""
                );


        // =====================================================
        // REMOVE HASH SYMBOLS
        // =====================================================

        /*
         * Ensures no # remains even if Gemini
         * ignores the formatting instruction.
         */
        cleaned =
                cleaned.replace(
                        "#",
                        ""
                );


        // =====================================================
        // REMOVE BACKTICKS
        // =====================================================

        cleaned =
                cleaned.replace(
                        "`",
                        ""
                );


        // =====================================================
        // REMOVE MARKDOWN BULLET MARKERS
        // =====================================================

        /*
         * Converts:
         *
         * - Drink enough water
         *
         * into:
         *
         * Drink enough water
         */
        cleaned =
                cleaned.replaceAll(
                        "(?m)^\\s*[-+]\\s+",
                        ""
                );


        // =====================================================
        // REMOVE HORIZONTAL RULES
        // =====================================================

        cleaned =
                cleaned.replaceAll(
                        "(?m)^\\s*-{3,}\\s*$",
                        ""
                );


        // =====================================================
        // REMOVE EXCESSIVE BLANK LINES
        // =====================================================

        cleaned =
                cleaned.replaceAll(
                        "\\n{3,}",
                        "\n\n"
                );


        // =====================================================
        // REMOVE EXCESSIVE SPACES AT LINE START
        // =====================================================

        cleaned =
                cleaned.replaceAll(
                        "(?m)^\\s+",
                        ""
                );


        return cleaned.trim();
    }
}