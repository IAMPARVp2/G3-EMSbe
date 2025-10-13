package com.cts.service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.cts.dto.request.OrganizerRequestDTO;
import com.cts.dto.request.UserRequestDTO;
import com.cts.dto.response.OrganizerResponseDTO;
import com.cts.dto.response.UserResponseDTO;
import com.cts.entity.Organizer;
import com.cts.entity.User;
import com.cts.exceptions.OrganizerException;
import com.cts.mapper.EntityMapper;
import com.cts.repository.UserRepository;
import com.cts.repository.OrganizerRepository;
@Service
public class OrganizerServiceImpl implements OrganizerService {

	@Autowired
	UserRepository uRepo;
	@Autowired
	OrganizerRepository oRepo;
	public UserResponseDTO addOrganizer(UserRequestDTO userRequestDTO) {
		if (uRepo.findByEmail(userRequestDTO.getEmail())!=null) {
			throw new OrganizerException("Email already exist:500");
		}
		if (!userRequestDTO.getRole().equals("Organizer")) {
			throw new OrganizerException("Invalid Role:500");
		}
		
		User user = EntityMapper.toUserEntity(userRequestDTO);
		User savedUser = uRepo.save(user);
		return EntityMapper.toUserResponseDTO(savedUser);
	}

	public List<UserResponseDTO> getAll() {
		 List<User> orgs = uRepo.findByRoleContainingIgnoreCase("Organizer");
	        if (orgs.isEmpty()) throw new OrganizerException("There is no organizer:404");
	        return EntityMapper.toUserResponseDTOList(orgs);
	}
	
	public OrganizerResponseDTO addOrganizerProfile(OrganizerRequestDTO organizerRequestDTO, String email) {
		User user = uRepo.findByEmail(email);
		if(user==null) {
			throw new OrganizerException("Organizer not registered");
		}
		
		Organizer organizer = EntityMapper.toOrganizerEntity(organizerRequestDTO);
		organizer.setUser(user);
		Organizer savedOrganizer = oRepo.save(organizer);
		return EntityMapper.toOrganizerResponseDTO(savedOrganizer);
	}
	
	public UserResponseDTO patchUser(int id, Map<String, String> updates) {
        User user = uRepo.findById(id)
                        .orElseThrow(() -> new OrganizerException("There is no organizer"));

        updates.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(User.class, key);
            if (field != null) {
                field.setAccessible(true);
                ReflectionUtils.setField(field, user, value);
            }
        });

        User updatedUser = uRepo.save(user);
        return EntityMapper.toUserResponseDTO(updatedUser);
    }
}
