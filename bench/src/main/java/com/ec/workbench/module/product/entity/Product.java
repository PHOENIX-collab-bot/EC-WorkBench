package com.ec.workbench.module.product.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class Product {
    private Long id;
    private Long merchantId;
    private String productNo;
    private Long categoryId;
    private String productName;
    private String subTitle;
    private String brandName;
    private String unitName;
    private String mainImage;
    private BigDecimal salePrice;
    private BigDecimal costPrice;
    private BigDecimal marketPrice;
    private Integer stockQuantity;
    private Integer stockLocked;
    private Integer stockWarnThreshold;
    private Integer saleCount;
    private Integer status;
    private Integer auditStatus;
    private Integer isDeleted;
    private String remark;
    private LocalDateTime createdAt;
    private Long createdBy;
    private LocalDateTime updatedAt;
    private Long updatedBy;
}
