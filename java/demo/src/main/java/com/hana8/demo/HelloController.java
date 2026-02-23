package com.hana8.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// @RestController RestApi를 만들 수 있는 컨트롤러
@RestController
public class HelloController {
	@GetMapping("/")
	public String index() {
		return "Hana8 Demo";
	}

	@GetMapping("/hello")
	public String hello() {
		return "Hello, World!";
	}

	@GetMapping("hello-servlet")
	public String helloServlet(String name) {
		return "Hello, " + name + "!!";
	}
}
