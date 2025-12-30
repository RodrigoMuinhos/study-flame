package com.crmflame.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoProgressDTO {
    private String studentCpf;
    private Boolean completed;
    private Integer watchedSeconds;
    private Integer progressPercentage;
}
