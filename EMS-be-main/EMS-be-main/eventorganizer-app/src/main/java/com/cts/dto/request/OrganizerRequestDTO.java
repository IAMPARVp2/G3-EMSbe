package com.cts.dto.request;

public class OrganizerRequestDTO {
    private String organisationName;
    private String contactPerson;
    private String contactPersonPhone;

    public OrganizerRequestDTO() {}

    public OrganizerRequestDTO(String organisationName, String contactPerson, String contactPersonPhone) {
        this.organisationName = organisationName;
        this.contactPerson = contactPerson;
        this.contactPersonPhone = contactPersonPhone;
    }

    // Getters and Setters
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
}
