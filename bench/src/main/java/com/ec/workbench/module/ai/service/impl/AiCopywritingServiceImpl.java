package com.ec.workbench.module.ai.service.impl;

import com.ec.workbench.module.ai.dto.AiAssistantAskDTO;
import com.ec.workbench.module.ai.dto.CopywritingGenerateDTO;
import com.ec.workbench.module.ai.service.AiCopywritingService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiCopywritingServiceImpl implements AiCopywritingService {

    @Value("${deepseek.api-key:}")
    private String apiKey;

    @Value("${deepseek.api-url:https://api.deepseek.com/chat/completions}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public String generateCopywriting(CopywritingGenerateDTO dto) {
        log.info("开始生成文案，商品: {}, 风格: {}", dto.getProductName(), dto.getStyle());

        String productInfo = String.format("商品名称：%s\n商品价格：¥%.2f\n%s%s",
                dto.getProductName(),
                dto.getSalePrice(),
                dto.getCategoryName() != null ? "商品分类：" + dto.getCategoryName() + "\n" : "",
                dto.getBrandName() != null ? "品牌：" + dto.getBrandName() + "\n" : "");

        String userMessage = dto.getPrompt() + "\n\n商品信息：\n" + productInfo.trim();

        String systemMessage = "你是一位专业的抖音电商文案专家，擅长写各种风格的带货文案。回复格式只需要包含文案内容，不要有多余的解释。";
        return callDeepSeek(systemMessage, userMessage, 300, 0.8);
    }

    @Override
    public String askAssistant(AiAssistantAskDTO dto) {
        String dashboardInfo = "";
        if (dto.getDashboard() != null && !dto.getDashboard().isEmpty()) {
            try {
                dashboardInfo = objectMapper.writeValueAsString(dto.getDashboard());
            } catch (JsonProcessingException e) {
                dashboardInfo = dto.getDashboard().toString();
            }
        }

        String systemMessage = "你是电商运营AI助手。"
                + "当问题与电商运营、商品、订单、库存、投放、报表相关时，给出专业可执行建议，回答控制在300字以内。"
                + "当问题与电商无关时，仅简短拒答或引导，控制在50字以内。"
                + "如果收到仪表盘数据，请按“问题诊断、改进方向、风险提醒、可执行建议”四段给出。"
                + "输出必须简洁，不要编造无法从数据推导的具体事实。";

        StringBuilder userMessage = new StringBuilder();
        userMessage.append("用户问题：").append(dto.getQuestion());
        if (!dashboardInfo.isBlank()) {
            userMessage.append("\n仪表盘数据：").append(dashboardInfo);
        }

        return callDeepSeek(systemMessage, userMessage.toString(), 520, 0.4);
    }

    private String callDeepSeek(String systemMessage, String userMessage, int maxTokens, double temperature) {

        if (apiKey == null || apiKey.isBlank()) {
            throw new RuntimeException("AI调用失败: 未配置 DEEPSEEK_API_KEY");
        }

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "deepseek-chat");
        requestBody.put("stream", false);
        requestBody.put("temperature", temperature);
        requestBody.put("max_tokens", maxTokens);

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of(
                "role", "system",
                "content", systemMessage));
        messages.add(Map.of(
                "role", "user",
                "content", userMessage));
        requestBody.put("messages", messages);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    entity,
                    Map.class);

            Map<String, Object> body = response.getBody();
            if (body == null) {
                throw new RuntimeException("API返回为空");
            }

            List<?> choices = (List<?>) body.get("choices");
            if (choices == null || choices.isEmpty()) {
                throw new RuntimeException("API返回choices为空");
            }

            Map<?, ?> choice = (Map<?, ?>) choices.get(0);
            Map<?, ?> message = (Map<?, ?>) choice.get("message");
            String content = (String) message.get("content");

            if (content == null || content.isBlank()) {
                throw new RuntimeException("AI返回内容为空");
            }

            log.info("AI生成成功，长度: {}", content.length());
            return content.trim();

        } catch (Exception e) {
            log.error("调用DeepSeek API失败", e);
            throw new RuntimeException("AI调用失败: " + e.getMessage());
        }
    }
}
