//package com.reservation.service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import com.reservation.model.Reservation;
//import com.reservation.model.Room;
//
//public class Roomservice {
//
//	private static List<Room> rooms = new ArrayList<>();
//
//	public Room retrieveStudent(String roomId) {
//		for (Room room : rooms) {
//			if (room.getId().equals(roomId)) {
//				return room;
//			}
//		}
//		return null;
//	}
//
//	public Reservation addReservaition(String roomId, Reservation reservation) {
//		Student student = retrieveStudent(roomId);
//
//		if (student == null) {
//			return null;
//		}
//
//		String randomId = new BigInteger(130, random).toString(32);
//		course.setId(randomId);
//
//		student.getCourses().add(course);
//
//		return course;
//	}
//}
