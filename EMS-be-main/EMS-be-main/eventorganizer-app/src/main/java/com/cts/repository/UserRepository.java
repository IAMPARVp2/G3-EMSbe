package com.cts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.entity.User;

public interface UserRepository extends JpaRepository<User,Integer>{
	List<User> findByRoleContainingIgnoreCase(String role);
	User findByEmail(String email);

}
