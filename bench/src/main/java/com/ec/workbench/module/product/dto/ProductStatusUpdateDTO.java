package com.ec.workbench.module.product.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductStatusUpdateDTO {
    @NotNull(message = "状态不能为空")
    @Min(value = 0, message = "状态非法")
    @Max(value = 3, message = "状态非法")
    private Integer status;
}
