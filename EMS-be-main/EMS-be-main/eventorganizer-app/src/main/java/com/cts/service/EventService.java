package com.cts.service;

import java.util.List;
import java.util.Optional;

import com.cts.entity.Event;

public interface EventService {
	
	// Create event
	Event createEvent(Event event);
	
	// Get all events
	List<Event> getAllEvents();
	
	// Get event by ID
	Optional<Event> getEventById(int eventId);
	
	// Update event
	Event updateEvent(int eventId, Event event);
	
	// Delete event
	void deleteEvent(int eventId);
	
}