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

import com.cts.dto.request.OrganizerRequestDTO;
import com.cts.dto.request.UserRequestDTO;
import com.cts.dto.response.OrganizerResponseDTO;
import com.cts.dto.response.UserResponseDTO;
import com.cts.service.OrganizerService;


@RestController
@RequestMapping("/organizer")
public class OrganizerController {

	@Autowired
	OrganizerService oService;
	
	Logger logger = LoggerFactory.getLogger(OrganizerController.class);

	@PostMapping("/signup")
	public ResponseEntity<UserResponseDTO> addOrganizer(@RequestBody UserRequestDTO userRequestDTO) {
		logger.info("Received request to sign up a new organizer with email: {}", userRequestDTO.getEmail()); 

		userRequestDTO.setRole("Organizer");
		UserResponseDTO userResponseDTO = oService.addOrganizer(userRequestDTO);
		logger.debug("Organizer successfully added with ID: {}", userResponseDTO.getUserId()); 
		return new ResponseEntity<UserResponseDTO>(userResponseDTO, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<UserResponseDTO>> getAll() {
		 logger.info("Fetching all organizer users."); 
		List<UserResponseDTO> list = oService.getAll();
		
		 logger.debug("Retrieved {} organizer users.", list.size());
		return new ResponseEntity<List<UserResponseDTO>>(list, HttpStatus.OK);
	}

	@PostMapping("/organizerProfile/{email}")
	public ResponseEntity<OrganizerResponseDTO> addOrgnaizerProfile(@RequestBody OrganizerRequestDTO organizerRequestDTO,
			@PathVariable String email) {
		logger.info("Adding organizer profile for email: {}", email);
		OrganizerResponseDTO organizerResponseDTO = oService.addOrganizerProfile(organizerRequestDTO, email);
		 logger.debug("Organizer profile added for email: {}", email);
		return new ResponseEntity<OrganizerResponseDTO>(organizerResponseDTO, HttpStatus.OK);
	}

	@PatchMapping("/{id}")
	public ResponseEntity<UserResponseDTO> patchUser(@PathVariable int id, @RequestBody Map<String, String> updates) {
		 logger.info("Patching user with ID: {} with updates: {}", id, updates.keySet());
		UserResponseDTO updatedUser = oService.patchUser(id, updates);
		   logger.debug("User with ID: {} successfully patched.", id);
		return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	} 
}
