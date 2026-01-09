package com.crmflame.api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crmflame.api.dto.StudentNotificationDTO;
import com.crmflame.api.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/students/me/notifications")
@RequiredArgsConstructor
public class StudentNotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<StudentNotificationDTO>> list(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam(value = "cpf", required = false) String cpfParam,
            @RequestParam(value = "limit", required = false) Integer limit) {
        String cpf = resolveCpf(authHeader, cpfParam);
        return ResponseEntity.ok(notificationService.listForStudent(cpf, limit));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Long>> unreadCount(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam(value = "cpf", required = false) String cpfParam) {
        String cpf = resolveCpf(authHeader, cpfParam);
        return ResponseEntity.ok(Map.of("count", notificationService.unreadCount(cpf)));
    }

    @PatchMapping("/{notificationId}/read")
    public ResponseEntity<Void> markRead(
            @PathVariable Long notificationId,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam(value = "cpf", required = false) String cpfParam) {
        String cpf = resolveCpf(authHeader, cpfParam);
        notificationService.markRead(cpf, notificationId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/read-all")
    public ResponseEntity<Void> markAllRead(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam(value = "cpf", required = false) String cpfParam) {
        String cpf = resolveCpf(authHeader, cpfParam);
        notificationService.markAllRead(cpf);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> dismiss(
            @PathVariable Long notificationId,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam(value = "cpf", required = false) String cpfParam) {
        String cpf = resolveCpf(authHeader, cpfParam);
        notificationService.dismiss(cpf, notificationId);
        return ResponseEntity.noContent().build();
    }

    private String resolveCpf(String authHeader, String cpfParam) {
        String cpf = cpfParam;
        if ((cpf == null || cpf.isBlank()) && authHeader != null && authHeader.startsWith("Bearer ")) {
            cpf = authHeader.substring(7);
        }
        if (cpf == null || cpf.isBlank()) {
            throw new RuntimeException("CPF não informado");
        }
        return cpf;
    }
}
