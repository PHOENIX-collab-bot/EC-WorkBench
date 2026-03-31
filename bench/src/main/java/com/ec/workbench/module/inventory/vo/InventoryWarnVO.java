package com.ec.workbench.module.inventory.vo;

import lombok.Data;

@Data
public class InventoryWarnVO {
    private Long productId;
    private String productNo;
    private String productName;
    private Integer stockQuantity;
    private Integer stockWarnThreshold;
    private Integer status;
}
