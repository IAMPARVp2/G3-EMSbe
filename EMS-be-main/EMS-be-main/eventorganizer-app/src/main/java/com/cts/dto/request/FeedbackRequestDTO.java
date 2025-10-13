package com.cts.dto.request;

public class FeedbackRequestDTO {
    private int rating;
    private String comment;
    private int eventId;
    private int customerId;

    public FeedbackRequestDTO() {}

    public FeedbackRequestDTO(int rating, String comment, int eventId, int customerId) {
        this.rating = rating;
        this.comment = comment;
        this.eventId = eventId;
        this.customerId = customerId;
    }

    // Getters and Setters
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }
}
