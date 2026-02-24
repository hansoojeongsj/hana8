package com.hana8.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

//@Log4j
@Slf4j
// @RestController RestApi를 만들 수 있는 컨트롤러
@RestController
public class HelloController {

	// private static final Logger log = LoggerFactory.getLogger(HelloController.class);
	// DemoAplication.classs 일 수도

	@RequestMapping("/")
	public String index() {
		return "Hana8 Springboot Demo!";
	}

	@GetMapping("/hello")
	public String hello() {
		return "Hello, World!";
	}

	@GetMapping("hello-servlet")
	public String helloServlet(String name) {
		log.info("name : {} - {}", name, 123);
		log.debug("debug : {} - {}", name, 456);
		log.warn("warn : www");
		log.error("ERROR !!");

		return "Hello, " + name + "!!";
	}
}
