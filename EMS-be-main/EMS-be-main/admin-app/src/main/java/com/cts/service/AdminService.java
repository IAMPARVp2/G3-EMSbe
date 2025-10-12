package com.cts.service;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.cts.entity.User;
import com.cts.exception.EventNotFoundException;
import com.cts.exception.AdminNotFoundException;
import com.cts.entity.Event;
import com.cts.repository.UserRepository;
import com.cts.repository.EventRepository;

@Service
public class AdminService implements AdminServiceImp {
    @Autowired
    private UserRepository aRepo;

    @Autowired
    private EventRepository eRepo;
    
    //Add Admin
    @Override
    public User addAdmin(User user){
        if(!"Admin".equals(user.getRole()))
            throw new IllegalArgumentException("Role should be ADMIN");
        return aRepo.save(user);
    }
    
    //Get Admin
    @Override
    public List<User> getAll(){
        return aRepo.findAll();
    }
    
    // approve event
    @Override
    public Event approveEvent(int eventId) {
        Optional<Event> opt = eRepo.findById(eventId);
        Event ev = opt.orElseThrow(() -> new EventNotFoundException("Event not found: " + eventId));
        ev.setEventStatus("APPROVED");
        return eRepo.save(ev);
    }

    // reject event 
    @Override
    public Event rejectEvent(int eventId, String reason) {
        Optional<Event> opt = eRepo.findById(eventId);
        Event ev = opt.orElseThrow(() -> new EventNotFoundException("Event not found: " + eventId));
        ev.setEventStatus("REJECTED" + (reason != null && !reason.isBlank() ? (": " + reason) : ""));
        return eRepo.save(ev);
    }
    
    //patch to update
	@Override
	public User patchUser(int id, Map<String, String> updates) {
	    User event = aRepo.findById(id)
	                     .orElseThrow(() -> new AdminNotFoundException("No user found"));
	
	    updates.forEach((key, value) -> {
	        Field field = ReflectionUtils.findField(User.class, key);
	        if (field != null) {
	            field.setAccessible(true);
	            ReflectionUtils.setField(field, event, value);
	        }
	    });
	
	    return aRepo.save(event);
	}
	




    
}