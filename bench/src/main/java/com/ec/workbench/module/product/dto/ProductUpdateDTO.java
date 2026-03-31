package com.ec.workbench.module.product.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductUpdateDTO {
    @NotNull(message = "分类不能为空")
    private Long categoryId;

    @NotBlank(message = "商品名称不能为空")
    private String productName;

    private String subTitle;
    private String brandName;
    private String unitName;
    private String mainImage;

    @NotNull(message = "销售价不能为空")
    @DecimalMin(value = "0.00", message = "销售价不能小于0")
    private BigDecimal salePrice;

    @DecimalMin(value = "0.00", message = "成本价不能小于0")
    private BigDecimal costPrice;

    @DecimalMin(value = "0.00", message = "市场价不能小于0")
    private BigDecimal marketPrice;

    @Min(value = 0, message = "库存不能小于0")
    private Integer stockQuantity;

    @Min(value = 0, message = "库存预警值不能小于0")
    private Integer stockWarnThreshold;

    private String remark;
}
