package com.crmflame.api.controller;

import com.crmflame.api.dto.AwsQuestionImportRequest;
import com.crmflame.api.dto.AwsQuestionThemeResponse;
import com.crmflame.api.service.AwsQuestionThemeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aws-questions")
@RequiredArgsConstructor
@Tag(name = "AWS Quest", description = "Banco de questões por tema para AWS Quest")
@CrossOrigin(
        origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS},
        allowCredentials = "true",
        maxAge = 3600
)
public class AwsQuestionController {

    private final AwsQuestionThemeService service;

    @PostMapping("/import")
    @Operation(summary = "Importar/atualizar banco de questões por tema", description = "Salva JSON por tema no Postgres/Neon")
    @ApiResponse(responseCode = "201", description = "Temas importados com sucesso", content = @Content(schema = @Schema(implementation = AwsQuestionThemeResponse.class)))
    public ResponseEntity<List<AwsQuestionThemeResponse>> importQuestions(@Valid @RequestBody AwsQuestionImportRequest request) {
        List<AwsQuestionThemeResponse> responses = service.importThemes(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(responses);
    }

    @GetMapping("/stats")
    @Operation(summary = "Listar contagem por tema", description = "Retorna total de questões por tema armazenado")
    @ApiResponse(responseCode = "200", description = "Estatísticas retornadas")
    public ResponseEntity<List<AwsQuestionThemeResponse>> getStats() {
        List<AwsQuestionThemeResponse> stats = service.listStats();
        return ResponseEntity.ok(stats);
    }
}