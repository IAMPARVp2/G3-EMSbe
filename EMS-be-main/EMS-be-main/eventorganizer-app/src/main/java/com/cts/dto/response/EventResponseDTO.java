package com.cts.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class EventResponseDTO {
    private int eventId;
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
    private LocalDateTime eventApprovedBy;
    private LocalDateTime eventApprovedAt;
    private LocalDateTime eventCreatedAt;
    private LocalDateTime eventUpdatedAt;
    private OrganizerResponseDTO organizer;

    public EventResponseDTO() {}

    public EventResponseDTO(int eventId, String eventName, String eventDescr, LocalDate eventStartDate, 
                           LocalDate eventEndDate, String eventLocation, String eventCategory, String eventType,
                           String eventStatus, String eventMode, boolean eventRequiresSeat, int eventTicketPrice,
                           int eventTotalSeats, LocalDateTime eventApprovedBy, LocalDateTime eventApprovedAt,
                           LocalDateTime eventCreatedAt, LocalDateTime eventUpdatedAt, OrganizerResponseDTO organizer) {
        this.eventId = eventId;
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
        this.eventApprovedBy = eventApprovedBy;
        this.eventApprovedAt = eventApprovedAt;
        this.eventCreatedAt = eventCreatedAt;
        this.eventUpdatedAt = eventUpdatedAt;
        this.organizer = organizer;
    }

    // Getters and Setters
    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

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

    public LocalDateTime getEventApprovedBy() {
        return eventApprovedBy;
    }

    public void setEventApprovedBy(LocalDateTime eventApprovedBy) {
        this.eventApprovedBy = eventApprovedBy;
    }

    public LocalDateTime getEventApprovedAt() {
        return eventApprovedAt;
    }

    public void setEventApprovedAt(LocalDateTime eventApprovedAt) {
        this.eventApprovedAt = eventApprovedAt;
    }

    public LocalDateTime getEventCreatedAt() {
        return eventCreatedAt;
    }

    public void setEventCreatedAt(LocalDateTime eventCreatedAt) {
        this.eventCreatedAt = eventCreatedAt;
    }

    public LocalDateTime getEventUpdatedAt() {
        return eventUpdatedAt;
    }

    public void setEventUpdatedAt(LocalDateTime eventUpdatedAt) {
        this.eventUpdatedAt = eventUpdatedAt;
    }

    public OrganizerResponseDTO getOrganizer() {
        return organizer;
    }

    public void setOrganizer(OrganizerResponseDTO organizer) {
        this.organizer = organizer;
    }
}
