package com.ec.workbench.module.inventory.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InventoryRecord {
    private Long id;
    private Long merchantId;
    private String recordNo;
    private Long productId;
    private Integer bizType;
    private String bizNo;
    private Integer changeQty;
    private Integer stockBefore;
    private Integer stockAfter;
    private Long operatorId;
    private LocalDateTime operateTime;
    private String remark;
}
