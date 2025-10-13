package com.cts.dto.request;

import java.time.LocalDate;

public class CustomerRequestDTO {
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private LocalDate dob;
    private LocalDate anniversary;
    private String gender;

    public CustomerRequestDTO() {}

    public CustomerRequestDTO(String address, String city, String state, String zipCode, String country,
                             LocalDate dob, LocalDate anniversary, String gender) {
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.country = country;
        this.dob = dob;
        this.anniversary = anniversary;
        this.gender = gender;
    }

    // Getters and Setters
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public LocalDate getAnniversary() {
        return anniversary;
    }

    public void setAnniversary(LocalDate anniversary) {
        this.anniversary = anniversary;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
