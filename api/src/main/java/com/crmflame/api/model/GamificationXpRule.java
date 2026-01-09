package com.crmflame.api.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "gamification_xp_rules")
public class GamificationXpRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "action_code", nullable = false, unique = true, length = 60)
    private String actionCode;

    @Column(name = "xp_amount", nullable = false)
    private Integer xpAmount;

    @Column(length = 255)
    private String description;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getActionCode() { return actionCode; }
    public void setActionCode(String actionCode) { this.actionCode = actionCode; }

    public Integer getXpAmount() { return xpAmount; }
    public void setXpAmount(Integer xpAmount) { this.xpAmount = xpAmount; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
