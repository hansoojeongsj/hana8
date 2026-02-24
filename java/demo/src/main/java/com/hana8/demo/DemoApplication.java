package com.hana8.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	// @SpringBootApplication(@Component + @Bean + @ComponentScan)
	// main이 다 구동되면서, @Component + @Bean 붙은 애들 다 등록했음.
	// @Autowired : 스프링에게 Injection 좀 해줘 ~
}
