package com.ec.workbench.module.order.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderStatusUpdateDTO {
    @NotNull(message = "状态不能为空")
    @Min(value = 0, message = "状态非法")
    @Max(value = 5, message = "状态非法")
    private Integer orderStatus;
}
