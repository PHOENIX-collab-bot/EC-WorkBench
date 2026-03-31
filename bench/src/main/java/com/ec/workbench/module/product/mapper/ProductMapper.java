
package com.ec.workbench.module.product.mapper;

import com.ec.workbench.module.product.dto.ProductPageQueryDTO;
import com.ec.workbench.module.product.entity.Product;
import com.ec.workbench.module.product.vo.ProductDetailVO;
import com.ec.workbench.module.product.vo.ProductVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    long countPage(@Param("q") ProductPageQueryDTO query);

    List<ProductVO> selectPage(@Param("q") ProductPageQueryDTO query,
                               @Param("offset") long offset,
                               @Param("limit") long limit);

    ProductDetailVO selectDetailById(@Param("id") Long id);

    Product selectById(@Param("id") Long id);

    int insert(Product product);

    int updateById(Product product);

    int updateStatus(@Param("id") Long id,
                     @Param("status") Integer status,
                     @Param("updatedBy") Long updatedBy);

    int softDelete(@Param("id") Long id,
                   @Param("updatedBy") Long updatedBy);
}
