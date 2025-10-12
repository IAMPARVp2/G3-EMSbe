package com.cts.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Ticket {
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private int ticketId;
	private String seatNumber;
	private LocalDateTime ticketCreatedAt;
	private LocalDateTime ticketUpdatedAt;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="booking_id")
	private Booking booking;
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
	public Booking getBooking() {
		return booking;
	}
	public void setBooking(Booking booking) {
		this.booking = booking;
	}
	
	

}
