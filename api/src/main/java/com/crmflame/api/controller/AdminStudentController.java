package com.crmflame.api.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crmflame.api.dto.StudentDTO;
import com.crmflame.api.model.Lead;
import com.crmflame.api.model.StudentProgress;
import com.crmflame.api.model.VideoLesson;
import com.crmflame.api.model.VideoWatchProgress;
import com.crmflame.api.repository.LeadRepository;
import com.crmflame.api.repository.StudentProgressRepository;
import com.crmflame.api.repository.VideoLessonRepository;
import com.crmflame.api.repository.VideoWatchProgressRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/students")
@RequiredArgsConstructor
public class AdminStudentController {

    private static final DateTimeFormatter ISO = DateTimeFormatter.ISO_DATE_TIME;

    private final LeadRepository leadRepository;
    private final StudentProgressRepository studentProgressRepository;
    private final VideoLessonRepository videoLessonRepository;
    private final VideoWatchProgressRepository videoWatchProgressRepository;

    @GetMapping
    public ResponseEntity<List<StudentDTO>> listStudentsWithStats() {
        final List<VideoLesson> publishedVideos = videoLessonRepository.findByIsPublishedTrueOrderByModuleNumberAscLessonNumberAsc();
        final int totalPublished = publishedVideos.size();

        List<StudentDTO> students = leadRepository.findAll().stream()
            .sorted(Comparator.comparing(Lead::getCreatedAt, Comparator.nullsLast(Comparator.naturalOrder())).reversed())
            .map(lead -> toStudentDTO(lead, totalPublished))
            .collect(Collectors.toList());

        return ResponseEntity.ok(students);
    }

    private StudentDTO toStudentDTO(Lead lead, int totalPublished) {
        final String cpf = lead.getCpf();

        StudentProgress progress = studentProgressRepository.findByLead(lead)
            .orElseGet(() -> createInitialProgress(lead));

        int lessonsCompleted = safeInt(progress.getLessonsCompleted());
        int progressPercent = totalPublished > 0
            ? Math.min(100, (int) Math.round((lessonsCompleted * 100.0) / totalPublished))
            : 0;

        int streakDays = safeInt(progress.getStreakDays());
        int xpTotal = safeInt(progress.getXpTotal());

        int modulesCompleted = 0;
        if (cpf != null && !cpf.isBlank()) {
            List<VideoWatchProgress> completed = videoWatchProgressRepository.findByStudentCpfAndCompleted(cpf, true);
            modulesCompleted = (int) completed.stream()
                .map(VideoWatchProgress::getVideoLesson)
                .filter(v -> v != null && v.getModuleNumber() != null)
                .map(v -> v.getModuleNumber())
                .distinct()
                .count();
        }

        LocalDateTime lastAccess = progress.getLastActivityDate();
        if (lastAccess == null) lastAccess = lead.getCreatedAt();
        if (lastAccess == null) lastAccess = LocalDateTime.now();

        StudentDTO dto = new StudentDTO();
        dto.setId(lead.getId() != null ? lead.getId().toString() : "");
        dto.setName(lead.getName());
        dto.setEmail(lead.getEmail());
        dto.setCpf(lead.getCpf());

        dto.setProgress(progressPercent);
        dto.setPhase(derivePhase(progressPercent));
        dto.setStreak(streakDays);
        dto.setXp(xpTotal);
        dto.setModulesCompleted(modulesCompleted);

        dto.setLastAccess(ISO.format(lastAccess));
        dto.setCreatedAt(lead.getCreatedAt() != null ? ISO.format(lead.getCreatedAt()) : ISO.format(LocalDateTime.now()));
        dto.setUpdatedAt(ISO.format(LocalDateTime.now()));
        return dto;
    }

    private StudentProgress createInitialProgress(Lead lead) {
        StudentProgress progress = new StudentProgress();
        progress.setLead(lead);
        progress.setXpTotal(0);
        progress.setLevel(1);
        progress.setStreakDays(0);
        progress.setLessonsCompleted(0);
        progress.setExercisesCompleted(0);
        progress.setPerfectScores(0);
        progress.setStudyHours(0.0);
        progress.setLastActivityDate(null);
        return studentProgressRepository.save(progress);
    }

    private static int safeInt(Integer value) {
        return value == null ? 0 : value.intValue();
    }

    private static String derivePhase(int progressPercent) {
        if (progressPercent >= 90) return "Finalização";
        if (progressPercent >= 50) return "Avançado";
        if (progressPercent >= 10) return "Progredindo";
        return "Início";
    }

    @SuppressWarnings("unused")
    private static boolean isSameDay(LocalDateTime a, LocalDateTime b) {
        if (a == null || b == null) return false;
        return a.toLocalDate().equals(b.toLocalDate());
    }

    @SuppressWarnings("unused")
    private static boolean isYesterday(LocalDateTime a, LocalDateTime b) {
        if (a == null || b == null) return false;
        LocalDate da = a.toLocalDate();
        LocalDate db = b.toLocalDate();
        return da.plusDays(1).equals(db);
    }
}
