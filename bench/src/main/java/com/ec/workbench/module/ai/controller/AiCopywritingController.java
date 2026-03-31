package com.ec.workbench.module.ai.controller;

import com.ec.workbench.common.result.Result;
import com.ec.workbench.module.ai.dto.AiAssistantAskDTO;
import com.ec.workbench.module.ai.dto.CopywritingGenerateDTO;
import com.ec.workbench.module.ai.service.AiCopywritingService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Validated
public class AiCopywritingController {

    private final AiCopywritingService aiCopywritingService;

    @PostMapping("/copywriting/generate")
    public Result<String> generateCopywriting(@RequestBody @Validated CopywritingGenerateDTO dto) {
        String content = aiCopywritingService.generateCopywriting(dto);
        return Result.success(content);
    }

    @PostMapping("/assistant/ask")
    public Result<String> askAssistant(@RequestBody @Validated AiAssistantAskDTO dto) {
        String content = aiCopywritingService.askAssistant(dto);
        return Result.success(content);
    }
}
