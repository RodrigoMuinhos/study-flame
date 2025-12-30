package com.crmflame.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crmflame.api.dto.VideoLessonDTO;
import com.crmflame.api.dto.VideoLessonRequestDTO;
import com.crmflame.api.service.VideoLessonService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/videos")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
@Tag(name = "Video Lessons", description = "Gerenciamento de vídeos e aulas do bootcamp")
public class VideoLessonController {

    private final VideoLessonService videoLessonService;

    @GetMapping
    @Operation(summary = "Listar todos os vídeos", description = "Lista todos os vídeos (admin)")
    public ResponseEntity<List<VideoLessonDTO>> findAll() {
        return ResponseEntity.ok(videoLessonService.findAll());
    }

    @GetMapping("/published")
    @Operation(summary = "Listar vídeos publicados", description = "Lista apenas vídeos publicados (alunos)")
    public ResponseEntity<List<VideoLessonDTO>> findPublished() {
        return ResponseEntity.ok(videoLessonService.findPublished());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar vídeo por ID", description = "Retorna detalhes de um vídeo específico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vídeo encontrado"),
            @ApiResponse(responseCode = "404", description = "Vídeo não encontrado")
    })
    public ResponseEntity<VideoLessonDTO> findById(
            @Parameter(description = "ID do vídeo") @PathVariable Long id) {
        return ResponseEntity.ok(videoLessonService.findById(id));
    }

    @GetMapping("/module/{moduleNumber}/lesson/{lessonNumber}")
    @Operation(summary = "Buscar vídeo por módulo e aula", 
               description = "Retorna vídeo específico de um módulo e aula (apenas publicados)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vídeo encontrado"),
            @ApiResponse(responseCode = "404", description = "Vídeo não encontrado ou não publicado")
    })
    public ResponseEntity<VideoLessonDTO> findByModuleAndLesson(
            @Parameter(description = "Número do módulo") @PathVariable Integer moduleNumber,
            @Parameter(description = "Número da aula") @PathVariable Integer lessonNumber) {
        return ResponseEntity.ok(videoLessonService.findByModuleAndLesson(moduleNumber, lessonNumber));
    }

    @PostMapping
    @Operation(summary = "Criar novo vídeo", description = "Adiciona um novo vídeo ao sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Vídeo criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos ou vídeo já existe")
    })
    public ResponseEntity<VideoLessonDTO> create(@Valid @RequestBody VideoLessonRequestDTO request) {
        VideoLessonDTO created = videoLessonService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar vídeo", description = "Atualiza dados de um vídeo existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vídeo atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Vídeo não encontrado")
    })
    public ResponseEntity<VideoLessonDTO> update(
            @Parameter(description = "ID do vídeo") @PathVariable Long id,
            @Valid @RequestBody VideoLessonRequestDTO request) {
        return ResponseEntity.ok(videoLessonService.update(id, request));
    }

    @PatchMapping("/{id}/publish")
    @Operation(summary = "Publicar/Despublicar vídeo", description = "Alterna o status de publicação do vídeo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Status atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Vídeo não encontrado")
    })
    public ResponseEntity<VideoLessonDTO> togglePublish(
            @Parameter(description = "ID do vídeo") @PathVariable Long id) {
        return ResponseEntity.ok(videoLessonService.togglePublish(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar vídeo", description = "Remove um vídeo do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Vídeo deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Vídeo não encontrado")
    })
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID do vídeo") @PathVariable Long id) {
        videoLessonService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
