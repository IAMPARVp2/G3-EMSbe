package com.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.entity.Ticket;


public interface TicketRepository extends JpaRepository<Ticket,Integer> {

}
