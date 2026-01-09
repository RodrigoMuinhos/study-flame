package com.crmflame.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import com.crmflame.api.dto.GamificationDTO;
import com.crmflame.api.dto.GamificationDTO.BadgeDTO;
import com.crmflame.api.dto.GamificationDTO.LevelInfo;
import com.crmflame.api.dto.GamificationDTO.Stats;
import com.crmflame.api.model.Badge;
import com.crmflame.api.model.GamificationLevel;
import com.crmflame.api.model.GamificationXpRule;
import com.crmflame.api.model.Lead;
import com.crmflame.api.model.StudentBadge;
import com.crmflame.api.model.StudentProgress;
import com.crmflame.api.repository.BadgeRepository;
import com.crmflame.api.repository.GamificationLevelRepository;
import com.crmflame.api.repository.GamificationXpRuleRepository;
import com.crmflame.api.repository.LeadRepository;
import com.crmflame.api.repository.StudentBadgeRepository;
import com.crmflame.api.repository.StudentProgressRepository;

@Service
public class GamificationService {
    
    @Autowired
    private StudentProgressRepository progressRepository;
    
    @Autowired
    private BadgeRepository badgeRepository;
    
    @Autowired
    private StudentBadgeRepository studentBadgeRepository;
    
    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private GamificationLevelRepository levelRepository;

    @Autowired
    private GamificationXpRuleRepository xpRuleRepository;
    
    private List<GamificationLevel> getLevelsOrdered() {
        return levelRepository.findAllByOrderByLevelNumberAsc();
    }

    private GamificationLevel getLevelForXp(int xpTotal) {
        List<GamificationLevel> levels = getLevelsOrdered();
        if (levels.isEmpty()) {
            GamificationLevel fallback = new GamificationLevel();
            fallback.setLevelNumber(1);
            fallback.setTitle("Nível 1");
            fallback.setMinXp(0);
            fallback.setMaxXp(Integer.MAX_VALUE);
            return fallback;
        }

        for (GamificationLevel level : levels) {
            int min = safeInt(level.getMinXp());
            int max = safeInt(level.getMaxXp());
            if (xpTotal >= min && xpTotal < max) {
                return level;
            }
        }

        // acima do maior, assume último
        return levels.get(levels.size() - 1);
    }

    private GamificationLevel getNextLevel(GamificationLevel current) {
        if (current == null || current.getLevelNumber() == null) return null;
        return levelRepository.findByLevelNumber(current.getLevelNumber() + 1).orElse(null);
    }

    private int safeInt(Integer v) {
        return v == null ? 0 : v;
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
        // nível é derivado do DB (gamification_levels)
        progress.setLevel(1);
        progress.setStreakDays(0);
        progress.setLessonsCompleted(0);
        progress.setExercisesCompleted(0);
        progress.setPerfectScores(0);
        progress.setStudyHours(0.0);
        return progressRepository.save(progress);
    }
    
    /**
     * Badges padrão são provisionados via Flyway (DB), evitando hardcode em código.
     * Este método fica por compatibilidade, mas não cria dados em runtime.
     */
    @Transactional
    public void initializeDefaultBadges() {
        // no-op
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
        int xpTotal = safeInt(progress.getXpTotal());
        GamificationLevel currentLevel = getLevelForXp(xpTotal);
        GamificationLevel nextLevel = getNextLevel(currentLevel);

        int xpToNext = nextLevel != null ? safeInt(nextLevel.getMinXp()) : safeInt(currentLevel.getMaxXp());
        String title = currentLevel.getTitle() != null ? currentLevel.getTitle() : ("Nível " + safeInt(currentLevel.getLevelNumber()));

        int currentMinXp = safeInt(currentLevel.getMinXp());
        int currentMaxXp = safeInt(currentLevel.getMaxXp());

        // sincroniza nível persistido (coluna), mas derivado 100% do DB
        if (progress.getLevel() == null || !progress.getLevel().equals(currentLevel.getLevelNumber())) {
            progress.setLevel(currentLevel.getLevelNumber());
            progressRepository.save(progress);
        }

        LevelInfo levelInfo = new LevelInfo(
            safeInt(currentLevel.getLevelNumber()),
            xpTotal,
            xpToNext,
            currentMinXp,
            currentMaxXp,
            title
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
        // fallback mínimo (quando não existe Lead). Níveis oficiais vêm do DB.
        dto.setLevel(new LevelInfo(1, 0, 0, "Nível 1"));
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
        
        int currentXp = safeInt(progress.getXpTotal());
        progress.setXpTotal(currentXp + xpAmount);

        // nível é recalculado a partir das faixas no DB
        GamificationLevel newLevel = getLevelForXp(safeInt(progress.getXpTotal()));
        progress.setLevel(safeInt(newLevel.getLevelNumber()));
        
        progress.setLastActivityDate(LocalDateTime.now());
        progressRepository.save(progress);
        
        List<StudentBadge> studentBadges = studentBadgeRepository.findByLead(lead);
        return buildGamificationDTO(progress, studentBadges);
    }

    @Transactional
    public GamificationDTO addXpByAction(String cpf, String actionCode, int count) {
        if (count <= 0) count = 1;

        Optional<GamificationXpRule> ruleOpt = xpRuleRepository.findByActionCodeIgnoreCase(actionCode);
        if (ruleOpt.isEmpty()) {
            // Regra não existe: como a economia é 100% DB-driven, falhar ajuda a detectar config faltante
            throw new ResponseStatusException(BAD_REQUEST, "XP rule not found for action_code=" + actionCode);
        }

        GamificationXpRule rule = ruleOpt.get();
        if (rule.getIsActive() != null && !rule.getIsActive()) {
            return getGamificationData(cpf);
        }

        int xpAmount = safeInt(rule.getXpAmount()) * count;
        return addXp(cpf, xpAmount);
    }
    
    public List<Badge> getAllBadges() {
        return badgeRepository.findByIsActiveTrue();
    }
}
