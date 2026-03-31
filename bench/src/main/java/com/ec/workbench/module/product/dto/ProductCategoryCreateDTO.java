package com.ec.workbench.module.product.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductCategoryCreateDTO {
    private Long parentId = 0L;

    @NotBlank(message = "分类名称不能为空")
    private String categoryName;

    @NotBlank(message = "分类编码不能为空")
    private String categoryCode;

    private Integer levelNo = 1;
    private Integer sortNo = 0;
    private Integer status = 1;
    private String remark;
}
