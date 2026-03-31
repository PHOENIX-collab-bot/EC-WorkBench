package com.ec.workbench.module.order.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class Orders {
    private Long id;
    private Long merchantId;
    private String orderNo;
    private Integer orderStatus;
    private Integer payStatus;
    private Integer deliveryStatus;
    private String customerName;
    private String customerMobile;
    private String receiverName;
    private String receiverMobile;
    private String addressDetail;
    private BigDecimal totalAmount;
    private BigDecimal payableAmount;
    private BigDecimal paidAmount;
    private String sellerRemark;
    private LocalDateTime deliveryTime;
    private LocalDateTime createdAt;
    private Long updatedBy;
    private Integer isDeleted;
}
