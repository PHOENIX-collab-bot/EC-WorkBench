package com.ec.workbench.module.ai.service;

public interface AiCopywritingService {
    String generateCopywriting(com.ec.workbench.module.ai.dto.CopywritingGenerateDTO dto);

    String askAssistant(com.ec.workbench.module.ai.dto.AiAssistantAskDTO dto);
}
