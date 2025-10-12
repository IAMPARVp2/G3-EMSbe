package com.cts.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private int userId;
	private String fullName;
	@Column(name="email",unique = true)
	private String email;
	private String password;
	private String phone;
	private String role;
	private String status;
	private LocalDateTime createdAt;
	
	
	
}
