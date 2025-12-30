package com.crmflame.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoRatingDTO {
    private String studentCpf;
    private Integer contentRating; // 1-5
    private Integer audioRating; // 1-5
    private Integer videoQualityRating; // 1-5
}
