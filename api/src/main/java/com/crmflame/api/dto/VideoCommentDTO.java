package com.crmflame.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoCommentDTO {
    private String studentName;
    private String studentCpf;
    private String comment;
}
