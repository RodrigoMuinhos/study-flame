package com.crmflame.api.service;

import com.crmflame.api.dto.GamificationDTO;
import com.crmflame.api.dto.GamificationDTO.LevelInfo;
import com.crmflame.api.dto.GamificationDTO.BadgeDTO;
import com.crmflame.api.dto.GamificationDTO.Stats;
import com.crmflame.api.model.*;
import com.crmflame.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GamificationService {
    
    @PostConstruct
    public void init() {
        initializeDefaultBadges();
    }
    
    @Autowired
    private StudentProgressRepository progressRepository;
    
    @Autowired
    private BadgeRepository badgeRepository;
    
    @Autowired
    private StudentBadgeRepository studentBadgeRepository;
    
    @Autowired
    private LeadRepository leadRepository;
    
    // XP necessário para cada nível (fórmula: nível * 250)
    private int getXpForLevel(int level) {
        return level * 250;
    }
    
    // Título baseado no nível
    private String getLevelTitle(int level) {
        if (level >= 50) return "Mestre FLAME";
        if (level >= 40) return "Lenda do Código";
        if (level >= 30) return "Expert";
        if (level >= 20) return "Chama Ardente";
        if (level >= 10) return "Chama Crescente";
        if (level >= 5) return "Faísca Brilhante";
        return "Iniciante";
    }
    
    @Transactional
    public GamificationDTO getGamificationData(String cpf) {
        Optional<Lead> leadOpt = leadRepository.findByCpf(cpf);
        if (leadOpt.isEmpty()) {
            return getEmptyGamificationData();
        }
        
        Lead lead = leadOpt.get();
        
        // Buscar ou criar progresso do aluno
        StudentProgress progress = progressRepository.findByLead(lead)
            .orElseGet(() -> createInitialProgress(lead));
        
        // Buscar badges do aluno
        List<StudentBadge> studentBadges = studentBadgeRepository.findByLead(lead);
        
        // Se não tem badges, inicializar com os badges padrão
        if (studentBadges.isEmpty()) {
            initializeStudentBadges(lead);
            studentBadges = studentBadgeRepository.findByLead(lead);
        }
        
        return buildGamificationDTO(progress, studentBadges);
    }
    
    @Transactional
    public GamificationDTO getGamificationDataByLeadId(UUID leadId) {
        Optional<Lead> leadOpt = leadRepository.findById(leadId);
        if (leadOpt.isEmpty()) {
            return getEmptyGamificationData();
        }
        
        Lead lead = leadOpt.get();
        
        StudentProgress progress = progressRepository.findByLead(lead)
            .orElseGet(() -> createInitialProgress(lead));
        
        List<StudentBadge> studentBadges = studentBadgeRepository.findByLead(lead);
        
        if (studentBadges.isEmpty()) {
            initializeStudentBadges(lead);
            studentBadges = studentBadgeRepository.findByLead(lead);
        }
        
        return buildGamificationDTO(progress, studentBadges);
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
        return progressRepository.save(progress);
    }
    
    @Transactional
    public void initializeDefaultBadges() {
        if (badgeRepository.count() > 0) {
            return; // Já existem badges
        }
        
        // Criar badges padrão
        createBadge("FIRST_LESSON", "Primeira Aula", "Complete sua primeira aula", "🎯", Badge.BadgeRarity.COMMON, 1, 50);
        createBadge("MARATHONER", "Maratonista", "Assista 10 horas de aulas em uma semana", "🏃", Badge.BadgeRarity.RARE, 10, 100);
        createBadge("PERFECTIONIST", "Perfeccionista", "Tire 100% em 5 exercícios consecutivos", "💯", Badge.BadgeRarity.EPIC, 5, 200);
        createBadge("CODE_LEGEND", "Lenda do Código", "Complete 50 aulas avançadas", "👑", Badge.BadgeRarity.LEGENDARY, 50, 500);
        createBadge("MENTOR", "Mentor", "Ajude 10 colegas na comunidade", "🎓", Badge.BadgeRarity.RARE, 10, 100);
        createBadge("FIRE_STREAK", "Sequência de Fogo", "Mantenha uma sequência de 30 dias", "🔥", Badge.BadgeRarity.EPIC, 30, 300);
    }
    
    private void createBadge(String code, String name, String description, String icon, Badge.BadgeRarity rarity, int maxProgress, int xpReward) {
        Badge badge = new Badge();
        badge.setCode(code);
        badge.setName(name);
        badge.setDescription(description);
        badge.setIcon(icon);
        badge.setRarity(rarity);
        badge.setMaxProgress(maxProgress);
        badge.setXpReward(xpReward);
        badge.setIsActive(true);
        badgeRepository.save(badge);
    }
    
    private void initializeStudentBadges(Lead lead) {
        List<Badge> allBadges = badgeRepository.findByIsActiveTrue();
        
        for (Badge badge : allBadges) {
            StudentBadge studentBadge = new StudentBadge();
            studentBadge.setLead(lead);
            studentBadge.setBadge(badge);
            studentBadge.setUnlocked(false);
            studentBadge.setProgress(0);
            studentBadgeRepository.save(studentBadge);
        }
    }
    
    private GamificationDTO buildGamificationDTO(StudentProgress progress, List<StudentBadge> studentBadges) {
        GamificationDTO dto = new GamificationDTO();
        
        // Level info
        int xpToNext = getXpForLevel(progress.getLevel() + 1);
        LevelInfo levelInfo = new LevelInfo(
            progress.getLevel(),
            progress.getXpTotal(),
            xpToNext,
            getLevelTitle(progress.getLevel())
        );
        dto.setLevel(levelInfo);
        
        // Badges
        List<BadgeDTO> badgeDTOs = new ArrayList<>();
        for (StudentBadge sb : studentBadges) {
            BadgeDTO badgeDTO = new BadgeDTO();
            badgeDTO.setId(sb.getBadge().getCode());
            badgeDTO.setName(sb.getBadge().getName());
            badgeDTO.setDescription(sb.getBadge().getDescription());
            badgeDTO.setIcon(sb.getBadge().getIcon());
            badgeDTO.setRarity(sb.getBadge().getRarity().name().toLowerCase());
            badgeDTO.setUnlocked(sb.getUnlocked());
            badgeDTO.setProgress(sb.getProgress());
            badgeDTO.setMaxProgress(sb.getBadge().getMaxProgress());
            badgeDTOs.add(badgeDTO);
        }
        dto.setBadges(badgeDTOs);
        
        // Stats
        Stats stats = new Stats();
        stats.setTotalBadges(studentBadges.size());
        stats.setUnlockedBadges((int) studentBadges.stream().filter(StudentBadge::getUnlocked).count());
        stats.setTotalXp(progress.getXpTotal());
        stats.setStreakDays(progress.getStreakDays());
        stats.setLessonsCompleted(progress.getLessonsCompleted());
        stats.setStudyHours(progress.getStudyHours());
        dto.setStats(stats);
        
        return dto;
    }
    
    private GamificationDTO getEmptyGamificationData() {
        GamificationDTO dto = new GamificationDTO();
        dto.setLevel(new LevelInfo(1, 0, 250, "Iniciante"));
        dto.setBadges(new ArrayList<>());
        Stats stats = new Stats();
        stats.setTotalBadges(0);
        stats.setUnlockedBadges(0);
        stats.setTotalXp(0);
        stats.setStreakDays(0);
        stats.setLessonsCompleted(0);
        stats.setStudyHours(0.0);
        dto.setStats(stats);
        return dto;
    }
    
    @Transactional
    public GamificationDTO addXp(String cpf, int xpAmount) {
        Optional<Lead> leadOpt = leadRepository.findByCpf(cpf);
        if (leadOpt.isEmpty()) {
            return getEmptyGamificationData();
        }
        
        Lead lead = leadOpt.get();
        StudentProgress progress = progressRepository.findByLead(lead)
            .orElseGet(() -> createInitialProgress(lead));
        
        progress.setXpTotal(progress.getXpTotal() + xpAmount);
        
        // Check for level up
        while (progress.getXpTotal() >= getXpForLevel(progress.getLevel() + 1)) {
            progress.setLevel(progress.getLevel() + 1);
        }
        
        progress.setLastActivityDate(LocalDateTime.now());
        progressRepository.save(progress);
        
        List<StudentBadge> studentBadges = studentBadgeRepository.findByLead(lead);
        return buildGamificationDTO(progress, studentBadges);
    }
    
    public List<Badge> getAllBadges() {
        return badgeRepository.findByIsActiveTrue();
    }
}
