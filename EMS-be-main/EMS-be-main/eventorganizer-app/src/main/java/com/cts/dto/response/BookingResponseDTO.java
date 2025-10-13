package com.cts.dto.response;

import java.time.LocalDateTime;

public class BookingResponseDTO {
    private int bookingId;
    private int ticketsQuantity;
    private int totalAmount;
    private String bookingStatus;
    private String paymentType;
    private String paymentStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private EventResponseDTO event;
    private CustomerResponseDTO customer;

    public BookingResponseDTO() {}

    public BookingResponseDTO(int bookingId, int ticketsQuantity, int totalAmount, String bookingStatus,
                             String paymentType, String paymentStatus, LocalDateTime createdAt, LocalDateTime updatedAt,
                             EventResponseDTO event, CustomerResponseDTO customer) {
        this.bookingId = bookingId;
        this.ticketsQuantity = ticketsQuantity;
        this.totalAmount = totalAmount;
        this.bookingStatus = bookingStatus;
        this.paymentType = paymentType;
        this.paymentStatus = paymentStatus;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.event = event;
        this.customer = customer;
    }

    // Getters and Setters
    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public int getTicketsQuantity() {
        return ticketsQuantity;
    }

    public void setTicketsQuantity(int ticketsQuantity) {
        this.ticketsQuantity = ticketsQuantity;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
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
