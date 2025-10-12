package com.cts.controller;


import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.entity.Organizer;
import com.cts.entity.User;
import com.cts.service.OrganizerService;


@RestController
@RequestMapping("/organizer")
public class OrganizerController {

	@Autowired
	OrganizerService oService;
	
	Logger logger = LoggerFactory.getLogger(OrganizerController.class);

	@PostMapping("/signup")
	public ResponseEntity<User> addOrganizer(@RequestBody User orgUser) {
		logger.info("Received request to sign up a new organizer with email: {}", orgUser.getEmail()); 

		orgUser.setRole("Organizer");
		orgUser = oService.addOrganizer(orgUser);
		logger.debug("Organizer successfully added with ID: {}", orgUser.getUserId()); 
		return new ResponseEntity<User>(orgUser, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<User>> getAll() {
		 logger.info("Fetching all organizer users."); 
		List<User> list = oService.getAll();
		
		 logger.debug("Retrieved {} organizer users.", list.size());
		return new ResponseEntity<List<User>>(list, HttpStatus.OK);
	}

	@PostMapping("/organizerProfile/{email}")
	public ResponseEntity<Organizer> addOrgnaizerProfile(@RequestBody Organizer organizerProfile,
			@PathVariable String email) {
		logger.info("Adding organizer profile for email: {}", email);
		organizerProfile = oService.addOrganizerProfile(organizerProfile, email);
		 logger.debug("Organizer profile added for email: {}", email);
		return new ResponseEntity<Organizer>(organizerProfile, HttpStatus.OK);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<User> patchUser(@PathVariable int id, @RequestBody Map<String, String> updates) {
		 logger.info("Patching user with ID: {} with updates: {}", id, updates.keySet());
		User updatedUser = oService.patchUser(id, updates);
		   logger.debug("User with ID: {} successfully patched.", id);
		return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	} 
}
