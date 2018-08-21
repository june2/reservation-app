package com.reservation.repository;

import com.reservation.model.Reservation;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	List<Reservation> findByRoomId(Long roomId);	
	Reservation findOneByStartAtBetween(Date begin, Date last);
}
