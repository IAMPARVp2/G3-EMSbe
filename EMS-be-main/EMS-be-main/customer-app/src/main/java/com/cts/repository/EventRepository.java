package com.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.entity.Event;


public interface EventRepository extends JpaRepository<Event,Integer>{

}
