package com.crmflame.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Health Check Controller
 * Endpoint para verificar saúde da aplicação (usado pelo Docker/Kubernetes)
 */
@RestController
@RequestMapping("/health")
@Tag(name = "Health", description = "Endpoints de saúde da aplicação")
public class HealthController {

    @GetMapping
    @Operation(summary = "Health Check", description = "Verifica se a API está funcionando")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API funcionando normalmente")
    })
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "CRM Flame API");
        response.put("version", "1.0.0");
        response.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/ready")
    @Operation(summary = "Readiness Check", description = "Verifica se a aplicação está pronta para receber tráfego")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Aplicação pronta")
    })
    public ResponseEntity<Map<String, String>> ready() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "READY");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/live")
    @Operation(summary = "Liveness Check", description = "Verifica se a aplicação está viva")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Aplicação viva")
    })
    public ResponseEntity<Map<String, String>> live() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "LIVE");
        return ResponseEntity.ok(response);
    }
}
