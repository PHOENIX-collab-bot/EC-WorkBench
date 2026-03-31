package com.ec.workbench.module.order.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class OrderVO {
    private Long id;
    private String orderNo;
    private Integer orderStatus;
    private Integer payStatus;
    private Integer deliveryStatus;
    private String customerName;
    private String customerMobile;
    private BigDecimal payableAmount;
    private BigDecimal paidAmount;
    private LocalDateTime createdAt;
}
