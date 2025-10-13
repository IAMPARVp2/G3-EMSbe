package com.cts.dto.request;

public class BookingRequestDTO {
    private int ticketsQuantity;
    private int eventId;
    private int customerId;
    private String paymentType;

    public BookingRequestDTO() {}

    public BookingRequestDTO(int ticketsQuantity, int eventId, int customerId, String paymentType) {
        this.ticketsQuantity = ticketsQuantity;
        this.eventId = eventId;
        this.customerId = customerId;
        this.paymentType = paymentType;
    }

    // Getters and Setters
    public int getTicketsQuantity() {
        return ticketsQuantity;
    }

    public void setTicketsQuantity(int ticketsQuantity) {
        this.ticketsQuantity = ticketsQuantity;
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

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }
}
