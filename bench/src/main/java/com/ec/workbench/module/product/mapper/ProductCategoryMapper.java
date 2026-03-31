package com.ec.workbench.module.product.mapper;

import com.ec.workbench.module.product.entity.ProductCategory;
import com.ec.workbench.module.product.vo.ProductCategoryVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductCategoryMapper {
    List<ProductCategoryVO> selectAll(@Param("status") Integer status);

    ProductCategory selectById(@Param("id") Long id);

    long countByCode(@Param("categoryCode") String categoryCode,
                     @Param("excludeId") Long excludeId);

    int insert(ProductCategory category);

    int updateById(ProductCategory category);
}
