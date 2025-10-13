package com.cts.mapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.cts.dto.request.*;
import com.cts.dto.response.*;
import com.cts.entity.*;

public class EntityMapper {

    // ========== Entity to Response DTO Conversions ==========

    public static UserResponseDTO toUserResponseDTO(User user) {
        if (user == null) return null;
        
        return new UserResponseDTO(
            user.getUserId(),
            user.getFullName(),
            user.getEmail(),
            user.getPhone(),
            user.getRole(),
            user.getStatus(),
            user.getCreatedAt()
        );
    }

    public static OrganizerResponseDTO toOrganizerResponseDTO(Organizer organizer) {
        if (organizer == null) return null;
        
        return new OrganizerResponseDTO(
            organizer.getOrganizerId(),
            organizer.getOrganisationName(),
            organizer.getContactPerson(),
            organizer.getContactPersonPhone(),
            organizer.getCreatedAt(),
            organizer.getUpdatedAt(),
            toUserResponseDTO(organizer.getUser())
        );
    }

    public static EventResponseDTO toEventResponseDTO(Event event) {
        if (event == null) return null;
        
        return new EventResponseDTO(
            event.getEventId(),
            event.getEventName(),
            event.getEventDescr(),
            event.getEventStartDate(),
            event.getEventEndDate(),
            event.getEventLocation(),
            event.getEventCategory(),
            event.getEventType(),
            event.getEventStatus(),
            event.getEventMode(),
            event.isEventRequiresSeat(),
            event.getEventTicketPrice(),
            event.getEventTotalSeats(),
            event.getEventApprovedBy(),
            event.getEventApprovedAt(),
            event.getEventCreatedAt(),
            event.getEventUpdatedAt(),
            toOrganizerResponseDTO(event.getOrganizer())
        );
    }

    public static CustomerResponseDTO toCustomerResponseDTO(Customer customer) {
        if (customer == null) return null;
        
        return new CustomerResponseDTO(
            customer.getCustomerId(),
            customer.getAddress(),
            customer.getCity(),
            customer.getState(),
            customer.getZipCode(),
            customer.getCountry(),
            customer.getDob(),
            customer.getAnniversary(),
            customer.getGender(),
            customer.getCreatedAt(),
            customer.getUpdatedAt(),
            toUserResponseDTO(customer.getUser())
        );
    }

    public static BookingResponseDTO toBookingResponseDTO(Booking booking) {
        if (booking == null) return null;
        
        return new BookingResponseDTO(
            booking.getBookingId(),
            booking.getTicketsQuantity(),
            booking.getTotalAmount(),
            booking.getBookingStatus(),
            booking.getPaymentType(),
            booking.getPaymentStaus(),
            booking.getCreatedAt(),
            booking.getUpdatedAt(),
            toEventResponseDTO(booking.getEvent()),
            toCustomerResponseDTO(booking.getCustomer())
        );
    }

    public static TicketResponseDTO toTicketResponseDTO(Ticket ticket) {
        if (ticket == null) return null;
        
        return new TicketResponseDTO(
            ticket.getTicketId(),
            ticket.getSeatNumber(),
            ticket.getTicketCreatedAt(),
            ticket.getTicketUpdatedAt(),
            toBookingResponseDTO(ticket.getBooking())
        );
    }

    public static FeedbackResponseDTO toFeedbackResponseDTO(Feedback feedback) {
        if (feedback == null) return null;
        
        return new FeedbackResponseDTO(
            feedback.getFeedbackId(),
            feedback.getRating(),
            feedback.getComment(),
            feedback.getCreatedAt(),
            toEventResponseDTO(feedback.getEvent()),
            toCustomerResponseDTO(feedback.getCustomer())
        );
    }

    public static EventImagesResponseDTO toEventImagesResponseDTO(EventImages eventImages) {
        if (eventImages == null) return null;
        
        return new EventImagesResponseDTO(
            eventImages.getImageId(),
            eventImages.getImagePath(),
            eventImages.getImageType(),
            eventImages.getUpdatedAt(),
            eventImages.getCreatedAt(),
            eventImages.getEvent() != null ? eventImages.getEvent().getEventId() : 0
        );
    }

    // ========== Request DTO to Entity Conversions ==========

    public static User toUserEntity(UserRequestDTO userRequestDTO) {
        if (userRequestDTO == null) return null;
        
        User user = new User();
        user.setFullName(userRequestDTO.getFullName());
        user.setEmail(userRequestDTO.getEmail());
        user.setPassword(userRequestDTO.getPassword());
        user.setPhone(userRequestDTO.getPhone());
        user.setRole(userRequestDTO.getRole());
        user.setStatus(userRequestDTO.getStatus());
        user.setCreatedAt(LocalDateTime.now());
        return user;
    }

    public static Organizer toOrganizerEntity(OrganizerRequestDTO organizerRequestDTO) {
        if (organizerRequestDTO == null) return null;
        
        Organizer organizer = new Organizer();
        organizer.setOrganisationName(organizerRequestDTO.getOrganisationName());
        organizer.setContactPerson(organizerRequestDTO.getContactPerson());
        organizer.setContactPersonPhone(organizerRequestDTO.getContactPersonPhone());
        organizer.setCreatedAt(LocalDateTime.now());
        organizer.setUpdatedAt(LocalDateTime.now());
        return organizer;
    }

    public static Event toEventEntity(EventRequestDTO eventRequestDTO) {
        if (eventRequestDTO == null) return null;
        
        Event event = new Event();
        event.setEventName(eventRequestDTO.getEventName());
        event.setEventDescr(eventRequestDTO.getEventDescr());
        event.setEventStartDate(eventRequestDTO.getEventStartDate());
        event.setEventEndDate(eventRequestDTO.getEventEndDate());
        event.setEventLocation(eventRequestDTO.getEventLocation());
        event.setEventCategory(eventRequestDTO.getEventCategory());
        event.setEventType(eventRequestDTO.getEventType());
        event.setEventStatus(eventRequestDTO.getEventStatus());
        event.setEventMode(eventRequestDTO.getEventMode());
        event.setEventRequiresSeat(eventRequestDTO.isEventRequiresSeat());
        event.setEventTicketPrice(eventRequestDTO.getEventTicketPrice());
        event.setEventTotalSeats(eventRequestDTO.getEventTotalSeats());
        event.setEventCreatedAt(LocalDateTime.now());
        event.setEventUpdatedAt(LocalDateTime.now());
        return event;
    }

    public static Customer toCustomerEntity(CustomerRequestDTO customerRequestDTO) {
        if (customerRequestDTO == null) return null;
        
        Customer customer = new Customer();
        customer.setAddress(customerRequestDTO.getAddress());
        customer.setCity(customerRequestDTO.getCity());
        customer.setState(customerRequestDTO.getState());
        customer.setZipCode(customerRequestDTO.getZipCode());
        customer.setCountry(customerRequestDTO.getCountry());
        customer.setDob(customerRequestDTO.getDob());
        customer.setAnniversary(customerRequestDTO.getAnniversary());
        customer.setGender(customerRequestDTO.getGender());
        customer.setCreatedAt(LocalDateTime.now());
        customer.setUpdatedAt(LocalDateTime.now());
        return customer;
    }

    public static Booking toBookingEntity(BookingRequestDTO bookingRequestDTO) {
        if (bookingRequestDTO == null) return null;
        
        Booking booking = new Booking();
        booking.setTicketsQuantity(bookingRequestDTO.getTicketsQuantity());
        booking.setPaymentType(bookingRequestDTO.getPaymentType());
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());
        return booking;
    }

    public static Ticket toTicketEntity(TicketRequestDTO ticketRequestDTO) {
        if (ticketRequestDTO == null) return null;
        
        Ticket ticket = new Ticket();
        ticket.setSeatNumber(ticketRequestDTO.getSeatNumber());
        ticket.setTicketCreatedAt(LocalDateTime.now());
        ticket.setTicketUpdatedAt(LocalDateTime.now());
        return ticket;
    }

    public static Feedback toFeedbackEntity(FeedbackRequestDTO feedbackRequestDTO) {
        if (feedbackRequestDTO == null) return null;
        
        Feedback feedback = new Feedback();
        feedback.setRating(feedbackRequestDTO.getRating());
        feedback.setComment(feedbackRequestDTO.getComment());
        feedback.setCreatedAt(LocalDateTime.now());
        return feedback;
    }

    public static EventImages toEventImagesEntity(EventImagesRequestDTO eventImagesRequestDTO) {
        if (eventImagesRequestDTO == null) return null;
        
        EventImages eventImages = new EventImages();
        eventImages.setImagePath(eventImagesRequestDTO.getImagePath());
        eventImages.setImageType(eventImagesRequestDTO.getImageType());
        eventImages.setCreatedAt(LocalDateTime.now());
        eventImages.setUpdatedAt(LocalDateTime.now());
        return eventImages;
    }

    // ========== List Conversions ==========

    public static List<UserResponseDTO> toUserResponseDTOList(List<User> users) {
        if (users == null) return null;
        return users.stream()
                .map(EntityMapper::toUserResponseDTO)
                .collect(Collectors.toList());
    }

    public static List<EventResponseDTO> toEventResponseDTOList(List<Event> events) {
        if (events == null) return null;
        return events.stream()
                .map(EntityMapper::toEventResponseDTO)
                .collect(Collectors.toList());
    }

    public static List<OrganizerResponseDTO> toOrganizerResponseDTOList(List<Organizer> organizers) {
        if (organizers == null) return null;
        return organizers.stream()
                .map(EntityMapper::toOrganizerResponseDTO)
                .collect(Collectors.toList());
    }

    public static List<CustomerResponseDTO> toCustomerResponseDTOList(List<Customer> customers) {
        if (customers == null) return null;
        return customers.stream()
                .map(EntityMapper::toCustomerResponseDTO)
                .collect(Collectors.toList());
    }

    public static List<BookingResponseDTO> toBookingResponseDTOList(List<Booking> bookings) {
        if (bookings == null) return null;
        return bookings.stream()
                .map(EntityMapper::toBookingResponseDTO)
                .collect(Collectors.toList());
    }

    public static List<TicketResponseDTO> toTicketResponseDTOList(List<Ticket> tickets) {
        if (tickets == null) return null;
        return tickets.stream()
                .map(EntityMapper::toTicketResponseDTO)
                .collect(Collectors.toList());
    }

    public static List<FeedbackResponseDTO> toFeedbackResponseDTOList(List<Feedback> feedbacks) {
        if (feedbacks == null) return null;
        return feedbacks.stream()
                .map(EntityMapper::toFeedbackResponseDTO)
                .collect(Collectors.toList());
    }

    public static List<EventImagesResponseDTO> toEventImagesResponseDTOList(List<EventImages> eventImages) {
        if (eventImages == null) return null;
        return eventImages.stream()
                .map(EntityMapper::toEventImagesResponseDTO)
                .collect(Collectors.toList());
    }
}
