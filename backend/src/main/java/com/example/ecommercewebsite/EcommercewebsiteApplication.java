package com.example.ecommercewebsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class EcommercewebsiteApplication {

	public static void main(String[] args) {

		SpringApplication.run(EcommercewebsiteApplication.class, args);
	}

}
