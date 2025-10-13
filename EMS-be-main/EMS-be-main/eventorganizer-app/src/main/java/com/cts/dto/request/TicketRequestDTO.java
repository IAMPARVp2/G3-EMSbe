package com.cts.dto.request;

public class TicketRequestDTO {
    private String seatNumber;
    private int bookingId;

    public TicketRequestDTO() {}

    public TicketRequestDTO(String seatNumber, int bookingId) {
        this.seatNumber = seatNumber;
        this.bookingId = bookingId;
    }

    // Getters and Setters
    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }
}
