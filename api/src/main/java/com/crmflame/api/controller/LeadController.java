package com.crmflame.api.controller;

import com.crmflame.api.dto.ImportResultDTO;
import com.crmflame.api.dto.LeadImportDTO;
import com.crmflame.api.dto.LeadRequestDTO;
import com.crmflame.api.dto.LeadResponseDTO;
import com.crmflame.api.model.LeadStatus;
import com.crmflame.api.service.LeadImportService;
import com.crmflame.api.service.LeadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Leads", description = "Gerenciamento de leads/alunos do bootcamp")
@CrossOrigin(
    origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"},
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
    allowCredentials = "true",
    maxAge = 3600
)
public class LeadController {

    private final LeadService leadService;
    private final LeadImportService leadImportService;

    @GetMapping
    @Operation(summary = "Listar todos os leads", description = "Retorna lista completa de leads cadastrados")
    @ApiResponse(responseCode = "200", description = "Lista de leads retornada com sucesso")
    public ResponseEntity<List<LeadResponseDTO>> getAllLeads() {
        List<LeadResponseDTO> leads = leadService.getAllLeads();
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar lead por ID", description = "Retorna um lead específico pelo UUID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lead encontrado"),
            @ApiResponse(responseCode = "404", description = "Lead não encontrado")
    })
    public ResponseEntity<LeadResponseDTO> getLeadById(
            @Parameter(description = "UUID do lead") @PathVariable UUID id) {
        try {
            LeadResponseDTO lead = leadService.getLeadById(id);
            return ResponseEntity.ok(lead);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Operation(summary = "Criar novo lead", description = "Cadastra um novo lead no sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Lead criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos ou CPF duplicado")
    })
    public ResponseEntity<?> createLead(@Valid @RequestBody LeadRequestDTO dto) {
        try {
            LeadResponseDTO lead = leadService.createLead(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(lead);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar lead", description = "Atualiza dados de um lead existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lead atualizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos"),
            @ApiResponse(responseCode = "404", description = "Lead não encontrado")
    })
    public ResponseEntity<?> updateLead(
            @Parameter(description = "UUID do lead") @PathVariable UUID id,
            @Valid @RequestBody LeadRequestDTO dto) {
        try {
            LeadResponseDTO lead = leadService.updateLead(id, dto);
            return ResponseEntity.ok(lead);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Atualizar status do lead", description = "Altera apenas o status de um lead")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Status atualizado"),
            @ApiResponse(responseCode = "400", description = "Status inválido")
    })
    public ResponseEntity<?> updateLeadStatus(
            @Parameter(description = "UUID do lead") @PathVariable UUID id,
            @Parameter(description = "Novo status") @RequestParam LeadStatus status) {
        try {
            LeadResponseDTO lead = leadService.updateLeadStatus(id, status);
            return ResponseEntity.ok(lead);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir lead", description = "Remove um lead do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Lead excluído"),
            @ApiResponse(responseCode = "404", description = "Lead não encontrado")
    })
    public ResponseEntity<Void> deleteLead(
            @Parameter(description = "UUID do lead") @PathVariable UUID id) {
        try {
            leadService.deleteLead(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Filtrar por status", description = "Retorna leads com um status específico")
    public ResponseEntity<List<LeadResponseDTO>> getLeadsByStatus(
            @Parameter(description = "Status do lead") @PathVariable LeadStatus status) {
        List<LeadResponseDTO> leads = leadService.getLeadsByStatus(status);
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/search")
    @Operation(summary = "Buscar por nome", description = "Pesquisa leads pelo nome (parcial)")
    public ResponseEntity<List<LeadResponseDTO>> searchLeadsByName(
            @Parameter(description = "Termo de busca") @RequestParam String name) {
        List<LeadResponseDTO> leads = leadService.searchLeadsByName(name);
        return ResponseEntity.ok(leads);
    }

    @PostMapping("/import")
    @Operation(summary = "Importar leads em lote", description = "Importa múltiplos leads de uma vez")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Importação realizada"),
            @ApiResponse(responseCode = "400", description = "Erro na importação")
    })
    public ResponseEntity<ImportResultDTO> importLeads(@RequestBody List<LeadImportDTO> leads) {
        try {
            ImportResultDTO result = leadImportService.importLeads(leads);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (Exception e) {
            ImportResultDTO error = new ImportResultDTO();
            error.setErrorCount(1);
            error.setMessage("Erro ao processar importação: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
