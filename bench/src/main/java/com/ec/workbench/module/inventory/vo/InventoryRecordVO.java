package com.ec.workbench.module.inventory.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InventoryRecordVO {
    private Long id;
    private String recordNo;
    private Long productId;
    private String productNo;
    private String productName;
    private Integer bizType;
    private String bizNo;
    private Integer changeQty;
    private Integer stockBefore;
    private Integer stockAfter;
    private Long operatorId;
    private LocalDateTime operateTime;
    private String remark;
}
