package com.ec.workbench.module.inventory.mapper;

import com.ec.workbench.module.inventory.dto.InventoryRecordPageQueryDTO;
import com.ec.workbench.module.inventory.entity.InventoryRecord;
import com.ec.workbench.module.inventory.vo.InventoryRecordVO;
import com.ec.workbench.module.inventory.vo.InventoryWarnVO;
import com.ec.workbench.module.product.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface InventoryMapper {
    long countWarn();

    List<InventoryWarnVO> selectWarnPage(@Param("offset") long offset, @Param("limit") long limit);

    long countRecordPage(@Param("q") InventoryRecordPageQueryDTO query);

    List<InventoryRecordVO> selectRecordPage(@Param("q") InventoryRecordPageQueryDTO query,
                                             @Param("offset") long offset,
                                             @Param("limit") long limit);

    Product selectProductById(@Param("productId") Long productId);

    int updateProductStock(@Param("productId") Long productId,
                           @Param("stockQuantity") Integer stockQuantity,
                           @Param("updatedBy") Long updatedBy);

    int insertRecord(InventoryRecord record);
}
