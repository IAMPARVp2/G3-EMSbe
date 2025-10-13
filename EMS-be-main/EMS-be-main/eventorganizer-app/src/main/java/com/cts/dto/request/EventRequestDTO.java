package com.cts.dto.request;

import java.time.LocalDate;

public class EventRequestDTO {
    private String eventName;
    private String eventDescr;
    private LocalDate eventStartDate;
    private LocalDate eventEndDate;
    private String eventLocation;
    private String eventCategory;
    private String eventType;
    private String eventStatus;
    private String eventMode;
    private boolean eventRequiresSeat;
    private int eventTicketPrice;
    private int eventTotalSeats;
    private int organizerId;

    public EventRequestDTO() {}

    public EventRequestDTO(String eventName, String eventDescr, LocalDate eventStartDate, LocalDate eventEndDate,
                          String eventLocation, String eventCategory, String eventType, String eventStatus,
                          String eventMode, boolean eventRequiresSeat, int eventTicketPrice, int eventTotalSeats,
                          int organizerId) {
        this.eventName = eventName;
        this.eventDescr = eventDescr;
        this.eventStartDate = eventStartDate;
        this.eventEndDate = eventEndDate;
        this.eventLocation = eventLocation;
        this.eventCategory = eventCategory;
        this.eventType = eventType;
        this.eventStatus = eventStatus;
        this.eventMode = eventMode;
        this.eventRequiresSeat = eventRequiresSeat;
        this.eventTicketPrice = eventTicketPrice;
        this.eventTotalSeats = eventTotalSeats;
        this.organizerId = organizerId;
    }

    // Getters and Setters
    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventDescr() {
        return eventDescr;
    }

    public void setEventDescr(String eventDescr) {
        this.eventDescr = eventDescr;
    }

    public LocalDate getEventStartDate() {
        return eventStartDate;
    }

    public void setEventStartDate(LocalDate eventStartDate) {
        this.eventStartDate = eventStartDate;
    }

    public LocalDate getEventEndDate() {
        return eventEndDate;
    }

    public void setEventEndDate(LocalDate eventEndDate) {
        this.eventEndDate = eventEndDate;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public String getEventCategory() {
        return eventCategory;
    }

    public void setEventCategory(String eventCategory) {
        this.eventCategory = eventCategory;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEventStatus() {
        return eventStatus;
    }

    public void setEventStatus(String eventStatus) {
        this.eventStatus = eventStatus;
    }

    public String getEventMode() {
        return eventMode;
    }

    public void setEventMode(String eventMode) {
        this.eventMode = eventMode;
    }

    public boolean isEventRequiresSeat() {
        return eventRequiresSeat;
    }

    public void setEventRequiresSeat(boolean eventRequiresSeat) {
        this.eventRequiresSeat = eventRequiresSeat;
    }

    public int getEventTicketPrice() {
        return eventTicketPrice;
    }

    public void setEventTicketPrice(int eventTicketPrice) {
        this.eventTicketPrice = eventTicketPrice;
    }

    public int getEventTotalSeats() {
        return eventTotalSeats;
    }

    public void setEventTotalSeats(int eventTotalSeats) {
        this.eventTotalSeats = eventTotalSeats;
    }

    public int getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(int organizerId) {
        this.organizerId = organizerId;
    }
}
