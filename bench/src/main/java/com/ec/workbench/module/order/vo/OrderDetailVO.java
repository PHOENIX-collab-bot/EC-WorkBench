package com.ec.workbench.module.order.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDetailVO {
    private Long id;
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
    private List<OrderItemVO> items;
}
