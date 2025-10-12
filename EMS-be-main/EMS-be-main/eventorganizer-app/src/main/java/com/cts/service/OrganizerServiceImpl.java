package com.cts.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.cts.entity.Organizer;
import com.cts.entity.User;
import com.cts.exceptions.OrganizerException;
import com.cts.repository.UserRepository;
import com.cts.repository.OrganizerRepository;
@Service
public class OrganizerServiceImpl implements OrganizerService {

	@Autowired
	UserRepository uRepo;
	@Autowired
	OrganizerRepository oRepo;
	public User addOrganizer(User user) {
		if (uRepo.findByEmail(user.getEmail())!=null) {
			throw new OrganizerException("Email already exist:500");
		}
		if (!user.getRole().equals("Organizer")) {
			throw new OrganizerException("Invalid Role:500");
		}
		return uRepo.save(user);
	}

	public List<User> getAll() {
		 List<User> orgs = uRepo.findByRoleContainingIgnoreCase("Organizer");
	        if (orgs.isEmpty()) throw new OrganizerException("There is no organizer:404");
	        return orgs;
	}
	
	public Organizer addOrganizerProfile(Organizer organizer,String email) {
		User user = uRepo.findByEmail(email);
		if(user==null) {
			throw new OrganizerException("Organizer not registered");
		}
		organizer.setUser(user);
		return oRepo.save(organizer);
	}
	
	public User patchUser(int id, Map<String, String> updates) {
        User user = uRepo.findById(id)
                        .orElseThrow(() -> new OrganizerException("There is no organizer"));

        updates.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(User.class, key);
            if (field != null) {
                field.setAccessible(true);
                ReflectionUtils.setField(field, user, value);
            }
        });

        return uRepo.save(user);
    }
}
