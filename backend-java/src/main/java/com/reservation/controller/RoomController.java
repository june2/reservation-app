package com.reservation.controller;

import com.reservation.exception.ResourceNotFoundException;
import com.reservation.handler.ResponseHandler;
import com.reservation.model.Room;
import com.reservation.repository.RoomRepository;
import com.reservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class RoomController {

	@Autowired
	RoomRepository roomRepository;
	
	@Autowired
	ReservationRepository reservationRepository;

	@GetMapping("/rooms")
	public ResponseHandler getAllRooms() {
		return new ResponseHandler("success", roomRepository.findAll());		
	}

	@PostMapping("/rooms")
	public ResponseHandler createRoom(@Valid @RequestBody Room room) {
		return new ResponseHandler("success", roomRepository.save(room));
	}

	@GetMapping("/rooms/{id}")
	public Room getRoomById(@PathVariable(value = "id") Long roomId) {
		return roomRepository.findById(roomId).orElseThrow(() -> new ResourceNotFoundException("Room", "id", roomId));
	}	
}