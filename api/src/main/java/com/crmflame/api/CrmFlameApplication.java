package com.crmflame.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CrmFlameApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrmFlameApplication.class, args);
    }
}
