package com.crmflame.api.controller;

import com.crmflame.api.dto.LeadRequestDTO;
import com.crmflame.api.dto.LeadResponseDTO;
import com.crmflame.api.model.LeadStatus;
import com.crmflame.api.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/leads")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LeadController {

    private final LeadService leadService;

    @GetMapping
    public ResponseEntity<List<LeadResponseDTO>> getAllLeads() {
        List<LeadResponseDTO> leads = leadService.getAllLeads();
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadResponseDTO> getLeadById(@PathVariable UUID id) {
        try {
            LeadResponseDTO lead = leadService.getLeadById(id);
            return ResponseEntity.ok(lead);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createLead(@Valid @RequestBody LeadRequestDTO dto) {
        try {
            LeadResponseDTO lead = leadService.createLead(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(lead);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLead(@PathVariable UUID id, @Valid @RequestBody LeadRequestDTO dto) {
        try {
            LeadResponseDTO lead = leadService.updateLead(id, dto);
            return ResponseEntity.ok(lead);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateLeadStatus(@PathVariable UUID id, @RequestParam LeadStatus status) {
        try {
            LeadResponseDTO lead = leadService.updateLeadStatus(id, status);
            return ResponseEntity.ok(lead);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable UUID id) {
        try {
            leadService.deleteLead(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<LeadResponseDTO>> getLeadsByStatus(@PathVariable LeadStatus status) {
        List<LeadResponseDTO> leads = leadService.getLeadsByStatus(status);
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/search")
    public ResponseEntity<List<LeadResponseDTO>> searchLeadsByName(@RequestParam String name) {
        List<LeadResponseDTO> leads = leadService.searchLeadsByName(name);
        return ResponseEntity.ok(leads);
    }
}
