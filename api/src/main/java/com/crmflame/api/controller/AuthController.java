package com.crmflame.api.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crmflame.api.dto.LoginRequest;
import com.crmflame.api.dto.LoginResponse;
import com.crmflame.api.dto.StudentDTO;
import com.crmflame.api.model.Lead;
import com.crmflame.api.model.StudentAccess;
import com.crmflame.api.repository.LeadRepository;
import com.crmflame.api.repository.StudentAccessRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Autenticação e autorização de usuários")
public class AuthController {

    private final LeadRepository leadRepository;
    private final StudentAccessRepository studentAccessRepository;

    private static final DateTimeFormatter ISO = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @PostMapping("/login")
    @Operation(summary = "Login de usuário", description = "Autentica um aluno usando CPF e senha")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "CPF ou senha não informados"),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas ou acesso desativado")
    })
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getCpf() == null || request.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CPF e senha são obrigatórios");
        }

        Optional<Lead> leadOpt = leadRepository.findByCpf(request.getCpf());
        if (leadOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }

        Lead lead = leadOpt.get();
        Optional<StudentAccess> accessOpt = studentAccessRepository.findByLeadId(lead.getId());
        if (accessOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }

        StudentAccess access = accessOpt.get();
        if (!Boolean.TRUE.equals(access.getIsActive())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Acesso desativado");
        }

        if (!access.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }

        // Registrar último login
        access.setLastLoginAt(LocalDateTime.now());
        access.setLoginCount(access.getLoginCount() != null ? access.getLoginCount() + 1 : 1);
        studentAccessRepository.save(access);

        StudentDTO student = toStudentDTO(lead, access.getUpdatedAt());

        LoginResponse response = new LoginResponse(
                UUID.randomUUID().toString(),
                UUID.randomUUID().toString(),
                student
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    @Operation(summary = "Renovar token", description = "Gera um novo access token usando o refresh token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token renovado com sucesso")
    })
    public ResponseEntity<LoginResponse> refresh(@RequestBody LoginResponse current) {
        LoginResponse refreshed = new LoginResponse(
                UUID.randomUUID().toString(),
                current.getRefreshToken() != null ? current.getRefreshToken() : UUID.randomUUID().toString(),
                current.getStudent()
        );
        return ResponseEntity.ok(refreshed);
    }

    @GetMapping("/me")
    @Operation(summary = "Dados do usuário logado", description = "Retorna informações do usuário autenticado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados do usuário"),
            @ApiResponse(responseCode = "401", description = "Não autenticado")
    })
    public ResponseEntity<?> me(
            @Parameter(description = "Token de autenticação") 
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @Parameter(description = "CPF do usuário (fallback)") 
            @RequestParam(value = "cpf", required = false) String cpfParam) {
        String cpf = cpfParam;
        if (cpf == null && authHeader != null && authHeader.startsWith("Bearer ")) {
            cpf = authHeader.substring(7);
        }

        if (cpf == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("CPF não informado");
        }

        Optional<Lead> leadOpt = leadRepository.findByCpf(cpf);
        if (leadOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado");
        }

        Lead lead = leadOpt.get();
        LocalDateTime lastAccess = lead.getCreatedAt();
        StudentDTO student = toStudentDTO(lead, lastAccess);
        return ResponseEntity.ok(student);
    }

    private StudentDTO toStudentDTO(Lead lead, LocalDateTime lastAccess) {
        StudentDTO dto = new StudentDTO();
        dto.setId(lead.getId().toString());
        dto.setName(lead.getName());
        dto.setEmail(lead.getEmail());
        dto.setCpf(lead.getCpf());
        dto.setPhase("Onboarding");
        dto.setProgress(15);
        dto.setStreak(3);
        dto.setXp(1200);
        dto.setModulesCompleted(2);
        dto.setLastAccess(lastAccess != null ? ISO.format(lastAccess) : ISO.format(LocalDateTime.now()));
        dto.setCreatedAt(lead.getCreatedAt() != null ? ISO.format(lead.getCreatedAt()) : ISO.format(LocalDateTime.now()));
        dto.setUpdatedAt(ISO.format(LocalDateTime.now()));
        return dto;
    }
}
