package com.cts.service;

import java.util.List;
import java.util.Map;

import com.cts.dto.request.OrganizerRequestDTO;
import com.cts.dto.request.UserRequestDTO;
import com.cts.dto.response.OrganizerResponseDTO;
import com.cts.dto.response.UserResponseDTO;

public interface OrganizerService {

	public UserResponseDTO addOrganizer(UserRequestDTO userRequestDTO);
	public List<UserResponseDTO> getAll();
	public OrganizerResponseDTO addOrganizerProfile(OrganizerRequestDTO organizerRequestDTO, String email);
	public UserResponseDTO patchUser(int id, Map<String, String> updates);
}