package com.cts.service;

import java.util.List;
import java.util.Optional;

import com.cts.dto.request.EventRequestDTO;
import com.cts.dto.response.EventResponseDTO;

public interface EventService {
	
	// Create event
	EventResponseDTO createEvent(EventRequestDTO eventRequestDTO);
	
	// Get all events
	List<EventResponseDTO> getAllEvents();
	
	// Get event by ID
	Optional<EventResponseDTO> getEventById(int eventId);
	
	// Update event
	EventResponseDTO updateEvent(int eventId, EventRequestDTO eventRequestDTO);
	
	// Delete event
	void deleteEvent(int eventId);
	
}