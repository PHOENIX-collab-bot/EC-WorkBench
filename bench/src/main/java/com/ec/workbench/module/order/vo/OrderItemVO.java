package com.ec.workbench.module.order.vo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemVO {
    private Long id;
    private Long productId;
    private String productNo;
    private String productName;
    private String skuAttr;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal lineTotalAmount;
    private Integer itemStatus;
}
