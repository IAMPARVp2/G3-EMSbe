package com.cts.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.entity.Organizer;
import com.cts.entity.User;
import com.cts.exceptions.OrganizerException;
import com.cts.repository.UserRepository;
import com.cts.repository.OrganizerRepository;
@Service
public interface OrganizerService {

	@Autowired
	public User addOrganizer(User user) ;
	public List<User> getAll() ;
	public Organizer addOrganizerProfile(Organizer organizer,String email) ;
	public User patchUser(int id, Map<String, String> updates);
}