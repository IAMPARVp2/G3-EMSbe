package com.cts.dto.response;

import java.time.LocalDateTime;

public class FeedbackResponseDTO {
    private int feedbackId;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
    private EventResponseDTO event;
    private CustomerResponseDTO customer;

    public FeedbackResponseDTO() {}

    public FeedbackResponseDTO(int feedbackId, int rating, String comment, LocalDateTime createdAt,
                              EventResponseDTO event, CustomerResponseDTO customer) {
        this.feedbackId = feedbackId;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
        this.event = event;
        this.customer = customer;
    }

    // Getters and Setters
    public int getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(int feedbackId) {
        this.feedbackId = feedbackId;
    }

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public EventResponseDTO getEvent() {
        return event;
    }

    public void setEvent(EventResponseDTO event) {
        this.event = event;
    }

    public CustomerResponseDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerResponseDTO customer) {
        this.customer = customer;
    }
}
