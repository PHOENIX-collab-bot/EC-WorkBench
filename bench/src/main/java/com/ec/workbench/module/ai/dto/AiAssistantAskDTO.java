package main.java.com.ec.workbench.module.ai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Map;

@Data
public class AiAssistantAskDTO {

    @NotBlank(message = "问题不能为空")
    private String question;

    private Map<String, Object> dashboard;
}
