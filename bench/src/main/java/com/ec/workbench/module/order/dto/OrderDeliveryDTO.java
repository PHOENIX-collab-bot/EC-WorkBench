package com.ec.workbench.module.order.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OrderDeliveryDTO {
    @NotBlank(message = "物流公司不能为空")
    private String logisticsCompany;

    @NotBlank(message = "物流单号不能为空")
    private String logisticsNo;

    private String sellerRemark;
}
