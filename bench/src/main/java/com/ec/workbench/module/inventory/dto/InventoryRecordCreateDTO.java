package com.ec.workbench.module.inventory.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InventoryRecordCreateDTO {
    @NotNull(message = "商品ID不能为空")
    private Long productId;

    @NotNull(message = "业务类型不能为空")
    @Min(value = 1, message = "业务类型非法")
    @Max(value = 9, message = "业务类型非法")
    private Integer bizType;

    private String bizNo;

    @NotNull(message = "变更数量不能为空")
    private Integer changeQty;

    private String remark;
}
