package com.cts.dto.response;

import java.time.LocalDateTime;

public class EventImagesResponseDTO {
    private int imageId;
    private String imagePath;
    private String imageType;
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
    private int eventId;

    public EventImagesResponseDTO() {}

    public EventImagesResponseDTO(int imageId, String imagePath, String imageType, LocalDateTime updatedAt,
                                 LocalDateTime createdAt, int eventId) {
        this.imageId = imageId;
        this.imagePath = imagePath;
        this.imageType = imageType;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.eventId = eventId;
    }

    // Getters and Setters
    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }
}
