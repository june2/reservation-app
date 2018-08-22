package com.reservation;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.reservation.handler.ResponseHandler;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RoomApiTest {

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	public void shouldGetRooms() {
		ResponseEntity<ResponseHandler> response = restTemplate.getForEntity("/api/rooms", ResponseHandler.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

		ResponseHandler handler = response.getBody();
		assertThat(handler.getStatus()).isEqualTo("success");
	}

}
