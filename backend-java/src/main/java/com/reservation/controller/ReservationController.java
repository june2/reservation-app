package com.reservation.controller;

import com.reservation.exception.ResourceNotFoundException;
import com.reservation.handler.ResponseHandler;
import com.reservation.model.Reservation;
import com.reservation.repository.ReservationRepository;
import com.reservation.repository.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;


import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class ReservationController {

	@Autowired
	ReservationRepository reservationRepository;

	@Autowired
	RoomRepository roomRepository;

	@GetMapping("/reservations")
	public ResponseHandler getAllReservations() {
		return new ResponseHandler("success", reservationRepository.findAll());
	}

	@DeleteMapping("/reservations")
	public ResponseEntity<?> deleteReservations() {
		reservationRepository.deleteAll();
		return ResponseEntity.ok().build();
	}

	@PostMapping("/rooms/{id}/reservations")
	public Reservation createRoomReservation(@PathVariable(value = "id") Long roomId,
			@Valid @RequestBody Reservation reservation) {
		return roomRepository.findById(roomId).map(room -> {
			reservation.setRoom(room);
			return reservationRepository.save(reservation);
		}).orElseThrow(() -> new ResourceNotFoundException("Room", "id", roomId));
	}

	@GetMapping("/rooms/{id}/reservations")
	public ResponseHandler getRoomReservation(@PathVariable(value = "id") Long roomId) {
		if (!roomRepository.existsById(roomId)) {
			throw new ResourceNotFoundException("Room", "id", roomId);
		}
		return new ResponseHandler("success", reservationRepository.findByRoomId(roomId));
	}

	@GetMapping("/rooms/{id}/reservations/check")
	public ResponseHandler checkRoomReservationTime(@PathVariable(value = "id") Long roomId,
			@RequestParam(value = "begin") String begin, @RequestParam(value = "last") String last)
			throws ParseException {
		if (!roomRepository.existsById(roomId)) {
			throw new ResourceNotFoundException("Room", "id", roomId);
		}
		return new ResponseHandler("success",
				reservationRepository.findOneByStartAtBetween(new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(begin),
						new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(last)));
	}
}