package com.ec.workbench.module.product.vo;

import lombok.Data;

@Data
public class ProductCategoryVO {
    private Long id;
    private Long parentId;
    private String categoryName;
    private String categoryCode;
    private Integer levelNo;
    private Integer sortNo;
    private Integer status;
}
