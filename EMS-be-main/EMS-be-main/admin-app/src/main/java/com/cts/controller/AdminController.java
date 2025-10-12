package com.cts.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.entity.User;
import com.cts.entity.Event;
import com.cts.service.AdminServiceImp;



@RestController
@RequestMapping("/user")
public class AdminController {
    @Autowired
    private AdminServiceImp aService;
    
    //Add Admin
    @PostMapping
    public ResponseEntity<User> addAdmin(@RequestBody User admin){
        admin = aService.addAdmin(admin);
        return new ResponseEntity<User>(admin, HttpStatus.CREATED);
    }
    
    //Get Admin
    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        List<User> list = aService.getAll();
        return new ResponseEntity<List<User>>(list, HttpStatus.OK);
    }

    // Approve event
    @PutMapping("/events/{id}/approve")
    public ResponseEntity<Event> approveEvent(@PathVariable("id") int id) {
        Event ev = aService.approveEvent(id);
        return new ResponseEntity<>(ev, HttpStatus.OK);
    }

    // Reject event 
    @PutMapping("/events/{id}/reject")
    public ResponseEntity<Event> rejectEvent(@PathVariable("id") int id, @RequestBody(required = false) String reason) {
        Event ev = aService.rejectEvent(id, reason);
        return new ResponseEntity<>(ev, HttpStatus.OK);
    }
    

	@PatchMapping("/{id}/status")
	public ResponseEntity<User> updateAdminStatus(@PathVariable int id, @RequestBody Map<String, String> updates) {
	    if (!updates.containsKey("status")) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
	
	    User updatedUser = aService.patchUser(id, Map.of("status", updates.get("status")));
	    return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	}
	

	

}