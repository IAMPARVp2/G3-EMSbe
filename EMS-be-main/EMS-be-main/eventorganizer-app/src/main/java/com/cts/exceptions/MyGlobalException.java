package com.cts.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class MyGlobalException {
	
	private static final Logger logger = LoggerFactory.getLogger(MyGlobalException.class);
	
	 @ExceptionHandler(OrganizerException.class)
	 public ResponseEntity<String> handleGeneral(OrganizerException ex) {
		 logger.error("An OrganizerException occurred: {}", ex.getMessage());
		 String msg[]= ex.getMessage().split(":");
	        //return new ResponseEntity<>(msg[0], Integer.parseInt(msg[1]));
		 return ResponseEntity.status(Integer.parseInt(msg[1])).body(msg[0]);
	 }
}
