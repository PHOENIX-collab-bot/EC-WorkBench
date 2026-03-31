
package com.ec.workbench.module.product.service;

import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.module.product.dto.ProductCreateDTO;
import com.ec.workbench.module.product.dto.ProductPageQueryDTO;
import com.ec.workbench.module.product.dto.ProductUpdateDTO;
import com.ec.workbench.module.product.vo.ProductDetailVO;
import com.ec.workbench.module.product.vo.ProductVO;

public interface ProductService {
    PageResult<ProductVO> page(ProductPageQueryDTO query);

    ProductDetailVO detail(Long id);

    void create(ProductCreateDTO dto, Long operatorId);

    void update(Long id, ProductUpdateDTO dto, Long operatorId);

    void updateStatus(Long id, Integer status, Long operatorId);

    void delete(Long id, Long operatorId);
}
