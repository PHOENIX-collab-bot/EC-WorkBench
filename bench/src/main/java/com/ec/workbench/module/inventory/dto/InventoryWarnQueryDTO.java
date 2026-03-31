package com.ec.workbench.module.inventory.dto;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class InventoryWarnQueryDTO {
    @Min(value = 1, message = "pageNo最小为1")
    private long pageNo = 1;

    @Min(value = 1, message = "pageSize最小为1")
    private long pageSize = 10;
}
