package com.crmflame.api.dto;

import lombok.Data;

@Data
public class StudentDTO {
    private String id;
    private String name;
    private String email;
    private String cpf;
    private String phase;
    private Integer progress;
    private Integer streak;
    private Integer xp;
    private Integer modulesCompleted;
    private String lastAccess;
    private String createdAt;
    private String updatedAt;
}
