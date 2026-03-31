package com.ec.workbench.module.inventory.dto;

import jakarta.validation.constraints.Min;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
public class InventoryRecordPageQueryDTO {
    @Min(value = 1, message = "pageNo最小为1")
    private long pageNo = 1;

    @Min(value = 1, message = "pageSize最小为1")
    private long pageSize = 10;

    private Long productId;
    private Integer bizType;
    private String bizNo;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;
}
