package com.ec.workbench.module.product.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductDetailVO {
    private Long id;
    private String productNo;
    private Long categoryId;
    private String categoryName;
    private String productName;
    private String subTitle;
    private String brandName;
    private String unitName;
    private String mainImage;
    private BigDecimal salePrice;
    private BigDecimal costPrice;
    private BigDecimal marketPrice;
    private Integer stockQuantity;
    private Integer stockWarnThreshold;
    private Integer status;
    private Integer auditStatus;
    private String remark;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
