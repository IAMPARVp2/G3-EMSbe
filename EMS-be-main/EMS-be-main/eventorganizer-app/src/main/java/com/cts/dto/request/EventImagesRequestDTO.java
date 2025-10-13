package com.cts.dto.request;

public class EventImagesRequestDTO {
    private String imagePath;
    private String imageType;
    private int eventId;

    public EventImagesRequestDTO() {}

    public EventImagesRequestDTO(String imagePath, String imageType, int eventId) {
        this.imagePath = imagePath;
        this.imageType = imageType;
        this.eventId = eventId;
    }

    // Getters and Setters
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

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }
}
