package com.cts.dto.response;

import java.time.LocalDateTime;

public class OrganizerResponseDTO {
    private int organizerId;
    private String organisationName;
    private String contactPerson;
    private String contactPersonPhone;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserResponseDTO user;

    public OrganizerResponseDTO() {}

    public OrganizerResponseDTO(int organizerId, String organisationName, String contactPerson, 
                               String contactPersonPhone, LocalDateTime createdAt, LocalDateTime updatedAt, 
                               UserResponseDTO user) {
        this.organizerId = organizerId;
        this.organisationName = organisationName;
        this.contactPerson = contactPerson;
        this.contactPersonPhone = contactPersonPhone;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
    }

    // Getters and Setters
    public int getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(int organizerId) {
        this.organizerId = organizerId;
    }

    public String getOrganisationName() {
        return organisationName;
    }

    public void setOrganisationName(String organisationName) {
        this.organisationName = organisationName;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactPersonPhone() {
        return contactPersonPhone;
    }

    public void setContactPersonPhone(String contactPersonPhone) {
        this.contactPersonPhone = contactPersonPhone;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UserResponseDTO getUser() {
        return user;
    }

    public void setUser(UserResponseDTO user) {
        this.user = user;
    }
}
