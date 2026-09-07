package com.nurture.backend.ai;

public class AiChatRequest {

    private Long userId;
    private String message;

    public AiChatRequest() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}