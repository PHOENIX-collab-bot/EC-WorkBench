package com.ec.workbench.module.product.service;

import com.ec.workbench.module.product.dto.ProductCategoryCreateDTO;
import com.ec.workbench.module.product.dto.ProductCategoryUpdateDTO;
import com.ec.workbench.module.product.vo.ProductCategoryVO;

import java.util.List;

public interface ProductCategoryService {
    List<ProductCategoryVO> list(Integer status);

    void create(ProductCategoryCreateDTO dto, Long operatorId);

    void update(Long id, ProductCategoryUpdateDTO dto, Long operatorId);
}
