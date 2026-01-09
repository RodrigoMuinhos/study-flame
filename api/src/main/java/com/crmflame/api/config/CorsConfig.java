package com.crmflame.api.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${cors.allowed-origins:http://localhost:3000}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .toArray(String[]::new);

        boolean hasWildcard = Arrays.stream(origins).anyMatch("*"::equals);

        var registration = registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
            .allowCredentials(false)
                .maxAge(3600);

        if (hasWildcard) {
            registration.allowedOriginPatterns("*");
        } else {
            registration.allowedOrigins(origins);
        }
    }
}
