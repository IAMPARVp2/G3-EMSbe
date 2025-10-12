package com.cts.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.entity.Event;
import com.cts.exceptions.EventNotFoundException;
import com.cts.exceptions.EventValidationException;
import com.cts.service.EventService;

@RestController
@RequestMapping("/api/events")
public class EventController {

	private static final Logger logger = LoggerFactory.getLogger(EventController.class);

	@Autowired
	private EventService eventService;

	// Create event
	@PostMapping
	public ResponseEntity<Event> createEvent(@RequestBody Event event) {
		logger.info("POST /api/events - Creating new event: {}", event.getEventName());
		
		try {
			Event createdEvent = eventService.createEvent(event);
			logger.info("Event created successfully with ID: {}", createdEvent.getEventId());
			return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
		} catch (EventValidationException e) {
			logger.info("Validation failed for event creation: {}", e.getMessage());
			throw e;
		} catch (Exception e) {
			logger.error("Unexpected error creating event: {}", e.getMessage(), e);
			throw e;
		}
	}

	// Get all events
	@GetMapping
	public ResponseEntity<List<Event>> getAllEvents() {
		logger.info("GET /api/events - Fetching all events");
		
		try {
			List<Event> events = eventService.getAllEvents();
			logger.info("Successfully retrieved {} events", events.size());
			return new ResponseEntity<>(events, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Error fetching all events: {}", e.getMessage(), e);
			throw e;
		}
	}

	// Get event by ID
	@GetMapping("/{eventId}")
	public ResponseEntity<Event> getEventById(@PathVariable int eventId) {
		logger.info("GET /api/events/{} - Fetching event by ID", eventId);
		
		try {
			Optional<Event> event = eventService.getEventById(eventId);
			if (event.isPresent()) {
				logger.info("Event found with ID: {}", eventId);
				return new ResponseEntity<>(event.get(), HttpStatus.OK);
			} else {
				logger.info("Event not found with ID: {}", eventId);
				throw new EventNotFoundException("Event not found with ID: " + eventId);
			}
		} catch (EventNotFoundException e) {
			throw e;
		} catch (Exception e) {
			logger.error("Error fetching event by ID {}: {}", eventId, e.getMessage(), e);
			throw e;
		}
	}

	// Update event
	@PutMapping("/{eventId}")
	public ResponseEntity<Event> updateEvent(@PathVariable int eventId, @RequestBody Event event) {
		logger.info("PUT /api/events/{} - Updating event: {}", eventId, event.getEventName());
		
		try {
			Event updatedEvent = eventService.updateEvent(eventId, event);
			logger.info("Event updated successfully with ID: {}", eventId);
			return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
		} catch (EventNotFoundException e) {
			logger.info("Event not found for update with ID: {}", eventId);
			throw e;
		} catch (EventValidationException e) {
			logger.info("Validation failed for event update: {}", e.getMessage());
			throw e;
		} catch (Exception e) {
			logger.error("Error updating event with ID {}: {}", eventId, e.getMessage(), e);
			throw e;
		}
	}

	// Delete event
	@DeleteMapping("/{eventId}")
	public ResponseEntity<Void> deleteEvent(@PathVariable int eventId) {
		logger.info("DELETE /api/events/{} - Deleting event", eventId);
		
		try {
			eventService.deleteEvent(eventId);
			logger.info("Event deleted successfully with ID: {}", eventId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (EventNotFoundException e) {
			logger.info("Event not found for deletion with ID: {}", eventId);
			throw e;
		} catch (Exception e) {
			logger.error("Error deleting event with ID {}: {}", eventId, e.getMessage(), e);
			throw e;
		}
	}
}
