package com.ec.workbench.module.product.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductCategory {
    private Long id;
    private Long merchantId;
    private Long parentId;
    private String categoryName;
    private String categoryCode;
    private Integer levelNo;
    private String treePath;
    private Integer sortNo;
    private Integer status;
    private Integer isDeleted;
    private String remark;
    private LocalDateTime createdAt;
    private Long createdBy;
    private LocalDateTime updatedAt;
    private Long updatedBy;
}
