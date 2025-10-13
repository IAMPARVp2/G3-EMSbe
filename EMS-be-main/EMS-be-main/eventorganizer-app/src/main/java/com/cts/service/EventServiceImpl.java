package com.cts.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cts.dto.request.EventRequestDTO;
import com.cts.dto.response.EventResponseDTO;
import com.cts.entity.Event;
import com.cts.exceptions.EventNotFoundException;
import com.cts.exceptions.EventValidationException;
import com.cts.mapper.EntityMapper;
import com.cts.repository.EventRepository;
import com.cts.repository.OrganizerRepository;

@Service
@Transactional
public class EventServiceImpl implements EventService {

	private static final Logger logger = LoggerFactory.getLogger(EventServiceImpl.class);

	@Autowired
	private EventRepository eventRepository;
	
	@Autowired
	private OrganizerRepository organizerRepository;

	@Override
	public EventResponseDTO createEvent(EventRequestDTO eventRequestDTO) {
		logger.info("Creating new event: {}", eventRequestDTO.getEventName());
		
		// Convert DTO to Entity
		Event event = EntityMapper.toEventEntity(eventRequestDTO);
		
		// Validation
		validateEvent(event);
		
		try {
			// Set organizer from organizerId
			if (eventRequestDTO.getOrganizerId() > 0) {
				event.setOrganizer(organizerRepository.findById(eventRequestDTO.getOrganizerId()).orElse(null));
			}
			
			// Set default status if not provided
			if (event.getEventStatus() == null || event.getEventStatus().isEmpty()) {
				event.setEventStatus("PENDING");
			}
			
			Event savedEvent = eventRepository.save(event);
			logger.info("Event created successfully with ID: {}", savedEvent.getEventId());
			return EntityMapper.toEventResponseDTO(savedEvent);
			
		} catch (Exception e) {
			logger.error("Error creating event: {}", e.getMessage(), e);
			throw new RuntimeException("Failed to create event", e);
		}
	}

	@Override
	public List<EventResponseDTO> getAllEvents() {
		logger.info("Fetching all events");
		try {
			List<Event> events = eventRepository.findAll();
			logger.info("Retrieved {} events", events.size());
			return EntityMapper.toEventResponseDTOList(events);
		} catch (Exception e) {
			logger.error("Error fetching all events: {}", e.getMessage(), e);
			throw new RuntimeException("Failed to fetch events", e);
		}
	}

	@Override
	public Optional<EventResponseDTO> getEventById(int eventId) {
		logger.info("Fetching event by ID: {}", eventId);
		try {
			Optional<Event> event = eventRepository.findById(eventId);
			if (event.isPresent()) {
				logger.info("Event found with ID: {}", eventId);
				return Optional.of(EntityMapper.toEventResponseDTO(event.get()));
			} else {
				logger.info("Event not found with ID: {}", eventId);
				return Optional.empty();
			}
		} catch (Exception e) {
			logger.error("Error fetching event by ID {}: {}", eventId, e.getMessage(), e);
			throw new RuntimeException("Failed to fetch event", e);
		}
	}

	@Override
	public EventResponseDTO updateEvent(int eventId, EventRequestDTO eventRequestDTO) {
		logger.info("Updating event with ID: {}", eventId);
		
		// Convert DTO to Entity for validation
		Event event = EntityMapper.toEventEntity(eventRequestDTO);
		
		// Validation
		validateEvent(event);
		
		try {
			Optional<Event> existingEventOpt = eventRepository.findById(eventId);
			if (!existingEventOpt.isPresent()) {
				logger.info("Event not found for update with ID: {}", eventId);
				throw new EventNotFoundException("Event not found with ID: " + eventId);
			}
			
			Event eventToUpdate = existingEventOpt.get();
			logger.info("Updating event: {} -> {}", eventToUpdate.getEventName(), event.getEventName());
			
			// Update fields
			eventToUpdate.setEventName(event.getEventName());
			eventToUpdate.setEventDescr(event.getEventDescr());
			eventToUpdate.setEventStartDate(event.getEventStartDate());
			eventToUpdate.setEventEndDate(event.getEventEndDate());
			eventToUpdate.setEventLocation(event.getEventLocation());
			eventToUpdate.setEventCategory(event.getEventCategory());
			eventToUpdate.setEventType(event.getEventType());
			eventToUpdate.setEventStatus(event.getEventStatus());
			eventToUpdate.setEventMode(event.getEventMode());
			eventToUpdate.setEventRequiresSeat(event.isEventRequiresSeat());
			eventToUpdate.setEventTicketPrice(event.getEventTicketPrice());
			eventToUpdate.setEventTotalSeats(event.getEventTotalSeats());
			
			// Update organizer if provided
			if (eventRequestDTO.getOrganizerId() > 0) {
				eventToUpdate.setOrganizer(organizerRepository.findById(eventRequestDTO.getOrganizerId()).orElse(null));
			}
			
			// Auditing - Update timestamp
			eventToUpdate.setEventUpdatedAt(LocalDateTime.now());
			
			Event updatedEvent = eventRepository.save(eventToUpdate);
			logger.info("Event updated successfully with ID: {}", updatedEvent.getEventId());
			return EntityMapper.toEventResponseDTO(updatedEvent);
			
		} catch (EventNotFoundException e) {
			throw e;
		} catch (Exception e) {
			logger.error("Error updating event with ID {}: {}", eventId, e.getMessage(), e);
			throw new RuntimeException("Failed to update event", e);
		}
	}

	@Override
	public void deleteEvent(int eventId) {
		logger.info("Deleting event with ID: {}", eventId);
		
		try {
			Optional<Event> eventOpt = eventRepository.findById(eventId);
			if (!eventOpt.isPresent()) {
				logger.info("Event not found for deletion with ID: {}", eventId);
				throw new EventNotFoundException("Event not found with ID: " + eventId);
			}
			
			Event event = eventOpt.get();
			logger.info("Deleting event: {}", event.getEventName());
			
			eventRepository.deleteById(eventId);
			logger.info("Event deleted successfully with ID: {}", eventId);
			
		} catch (EventNotFoundException e) {
			throw e;
		} catch (Exception e) {
			logger.error("Error deleting event with ID {}: {}", eventId, e.getMessage(), e);
			throw new RuntimeException("Failed to delete event", e);
		}
	}
	
	private void validateEvent(Event event) {
		logger.info("Validating event: {}", event.getEventName());
		
		if (event.getEventName() == null || event.getEventName().trim().isEmpty()) {
			throw new EventValidationException("Event name is required");
		}
		
		if (event.getEventDescr() == null || event.getEventDescr().trim().isEmpty()) {
			throw new EventValidationException("Event description is required");
		}
		
		if (event.getEventStartDate() == null) {
			throw new EventValidationException("Event start date is required");
		}
		
		if (event.getEventEndDate() == null) {
			throw new EventValidationException("Event end date is required");
		}
		
		if (event.getEventStartDate().isAfter(event.getEventEndDate())) {
			throw new EventValidationException("Event start date cannot be after end date");
		}
		
		if (event.getEventLocation() == null || event.getEventLocation().trim().isEmpty()) {
			throw new EventValidationException("Event location is required");
		}
		
		if (event.getEventCategory() == null || event.getEventCategory().trim().isEmpty()) {
			throw new EventValidationException("Event category is required");
		}
		
		if (event.getEventTicketPrice() < 0) {
			throw new EventValidationException("Event ticket price cannot be negative");
		}
		
		if (event.getEventTotalSeats() < 0) {
			throw new EventValidationException("Event total seats cannot be negative");
		}
		
		logger.info("Event validation passed for: {}", event.getEventName());
	}
}
