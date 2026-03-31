package com.ec.workbench.module.order.dto;

import jakarta.validation.constraints.Min;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
public class OrderPageQueryDTO {
    @Min(value = 1, message = "pageNo最小为1")
    private long pageNo = 1;

    @Min(value = 1, message = "pageSize最小为1")
    private long pageSize = 10;

    private String orderNo;
    private Integer orderStatus;
    private String customerKeyword;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;
}
