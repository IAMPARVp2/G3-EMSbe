package com.cts.dto.response;

import java.time.LocalDateTime;

public class TicketResponseDTO {
    private int ticketId;
    private String seatNumber;
    private LocalDateTime ticketCreatedAt;
    private LocalDateTime ticketUpdatedAt;
    private BookingResponseDTO booking;

    public TicketResponseDTO() {}

    public TicketResponseDTO(int ticketId, String seatNumber, LocalDateTime ticketCreatedAt, 
                            LocalDateTime ticketUpdatedAt, BookingResponseDTO booking) {
        this.ticketId = ticketId;
        this.seatNumber = seatNumber;
        this.ticketCreatedAt = ticketCreatedAt;
        this.ticketUpdatedAt = ticketUpdatedAt;
        this.booking = booking;
    }

    // Getters and Setters
    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public LocalDateTime getTicketCreatedAt() {
        return ticketCreatedAt;
    }

    public void setTicketCreatedAt(LocalDateTime ticketCreatedAt) {
        this.ticketCreatedAt = ticketCreatedAt;
    }

    public LocalDateTime getTicketUpdatedAt() {
        return ticketUpdatedAt;
    }

    public void setTicketUpdatedAt(LocalDateTime ticketUpdatedAt) {
        this.ticketUpdatedAt = ticketUpdatedAt;
    }

    public BookingResponseDTO getBooking() {
        return booking;
    }

    public void setBooking(BookingResponseDTO booking) {
        this.booking = booking;
    }
}
