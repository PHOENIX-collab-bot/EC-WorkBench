package com.ec.workbench.module.product.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductVO {
    private Long id;
    private String productNo;
    private String productName;
    private Long categoryId;
    private String categoryName;
    private BigDecimal salePrice;
    private Integer stockQuantity;
    private Integer stockWarnThreshold;
    private Integer status;
    private LocalDateTime createdAt;
}
