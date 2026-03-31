package com.ec.workbench.module.ai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CopywritingGenerateDTO {

    @NotBlank(message = "商品名称不能为空")
    private String productName;

    @NotNull(message = "销售价不能为空")
    @Positive(message = "销售价必须大于0")
    private Double salePrice;

    private String categoryName;

    private String brandName;

    private String productNo;

    @NotBlank(message = "文案风格不能为空")
    private String style;

    @NotBlank(message = "风格描述不能为空")
    private String prompt;
}
