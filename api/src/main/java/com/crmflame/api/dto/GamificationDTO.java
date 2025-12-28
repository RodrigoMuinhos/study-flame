package com.crmflame.api.dto;

import java.util.List;

public class GamificationDTO {
    
    private LevelInfo level;
    private List<BadgeDTO> badges;
    private Stats stats;
    
    public static class LevelInfo {
        private Integer current;
        private Integer xp;
        private Integer xpToNext;
        private String title;
        
        public LevelInfo() {}
        
        public LevelInfo(Integer current, Integer xp, Integer xpToNext, String title) {
            this.current = current;
            this.xp = xp;
            this.xpToNext = xpToNext;
            this.title = title;
        }
        
        public Integer getCurrent() { return current; }
        public void setCurrent(Integer current) { this.current = current; }
        
        public Integer getXp() { return xp; }
        public void setXp(Integer xp) { this.xp = xp; }
        
        public Integer getXpToNext() { return xpToNext; }
        public void setXpToNext(Integer xpToNext) { this.xpToNext = xpToNext; }
        
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
    }
    
    public static class BadgeDTO {
        private String id;
        private String name;
        private String description;
        private String icon;
        private String rarity;
        private Boolean unlocked;
        private Integer progress;
        private Integer maxProgress;
        
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
        
        public String getRarity() { return rarity; }
        public void setRarity(String rarity) { this.rarity = rarity; }
        
        public Boolean getUnlocked() { return unlocked; }
        public void setUnlocked(Boolean unlocked) { this.unlocked = unlocked; }
        
        public Integer getProgress() { return progress; }
        public void setProgress(Integer progress) { this.progress = progress; }
        
        public Integer getMaxProgress() { return maxProgress; }
        public void setMaxProgress(Integer maxProgress) { this.maxProgress = maxProgress; }
    }
    
    public static class Stats {
        private Integer totalBadges;
        private Integer unlockedBadges;
        private Integer totalXp;
        private Integer streakDays;
        private Integer lessonsCompleted;
        private Double studyHours;
        
        public Integer getTotalBadges() { return totalBadges; }
        public void setTotalBadges(Integer totalBadges) { this.totalBadges = totalBadges; }
        
        public Integer getUnlockedBadges() { return unlockedBadges; }
        public void setUnlockedBadges(Integer unlockedBadges) { this.unlockedBadges = unlockedBadges; }
        
        public Integer getTotalXp() { return totalXp; }
        public void setTotalXp(Integer totalXp) { this.totalXp = totalXp; }
        
        public Integer getStreakDays() { return streakDays; }
        public void setStreakDays(Integer streakDays) { this.streakDays = streakDays; }
        
        public Integer getLessonsCompleted() { return lessonsCompleted; }
        public void setLessonsCompleted(Integer lessonsCompleted) { this.lessonsCompleted = lessonsCompleted; }
        
        public Double getStudyHours() { return studyHours; }
        public void setStudyHours(Double studyHours) { this.studyHours = studyHours; }
    }
    
    public LevelInfo getLevel() { return level; }
    public void setLevel(LevelInfo level) { this.level = level; }
    
    public List<BadgeDTO> getBadges() { return badges; }
    public void setBadges(List<BadgeDTO> badges) { this.badges = badges; }
    
    public Stats getStats() { return stats; }
    public void setStats(Stats stats) { this.stats = stats; }
}
