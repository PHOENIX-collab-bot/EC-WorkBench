package com.ec.workbench.module.product.dto;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class ProductPageQueryDTO {
    @Min(value = 1, message = "pageNo最小为1")
    private long pageNo = 1;

    @Min(value = 1, message = "pageSize最小为1")
    private long pageSize = 10;

    private String productNo;
    private String productName;
    private Long categoryId;
    private Integer status;
}
