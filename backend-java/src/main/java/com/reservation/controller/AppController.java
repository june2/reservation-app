package com.reservation.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservation.handler.ResponseHandler;

@RestController
public class AppController {

	@RequestMapping("/api")
	public ResponseHandler getApiInfo() {
		Map<String, String> apiInfo = new HashMap<>();
		apiInfo.put("name", "reservation-app");
		apiInfo.put("version", "1.0.0");
		apiInfo.put("description", "reservation app");
		apiInfo.put("author", "june");
		return new ResponseHandler("success", apiInfo);
	}
}
