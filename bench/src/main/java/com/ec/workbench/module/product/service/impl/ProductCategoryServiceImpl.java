package com.ec.workbench.module.product.service.impl;

import com.ec.workbench.common.exception.BusinessException;
import com.ec.workbench.module.product.dto.ProductCategoryCreateDTO;
import com.ec.workbench.module.product.dto.ProductCategoryUpdateDTO;
import com.ec.workbench.module.product.entity.ProductCategory;
import com.ec.workbench.module.product.mapper.ProductCategoryMapper;
import com.ec.workbench.module.product.service.ProductCategoryService;
import com.ec.workbench.module.product.vo.ProductCategoryVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductCategoryServiceImpl implements ProductCategoryService {

    private final ProductCategoryMapper categoryMapper;

    @Override
    public List<ProductCategoryVO> list(Integer status) {
        return categoryMapper.selectAll(status);
    }

    @Override
    public void create(ProductCategoryCreateDTO dto, Long operatorId) {
        if (categoryMapper.countByCode(dto.getCategoryCode(), null) > 0) {
            throw new BusinessException(4004, "分类编码已存在");
        }
        ProductCategory c = new ProductCategory();
        c.setMerchantId(1L);
        c.setParentId(dto.getParentId());
        c.setCategoryName(dto.getCategoryName());
        c.setCategoryCode(dto.getCategoryCode());
        c.setLevelNo(dto.getLevelNo());
        c.setTreePath("/");
        c.setSortNo(dto.getSortNo());
        c.setStatus(dto.getStatus());
        c.setIsDeleted(0);
        c.setRemark(dto.getRemark());
        c.setCreatedBy(operatorId == null ? 0L : operatorId);
        c.setUpdatedBy(operatorId == null ? 0L : operatorId);
        categoryMapper.insert(c);
    }

    @Override
    public void update(Long id, ProductCategoryUpdateDTO dto, Long operatorId) {
        ProductCategory old = categoryMapper.selectById(id);
        if (old == null || old.getIsDeleted() == 1) {
            throw new BusinessException(404, "分类不存在");
        }
        if (categoryMapper.countByCode(dto.getCategoryCode(), id) > 0) {
            throw new BusinessException(4004, "分类编码已存在");
        }
        ProductCategory c = new ProductCategory();
        c.setId(id);
        c.setParentId(dto.getParentId());
        c.setCategoryName(dto.getCategoryName());
        c.setCategoryCode(dto.getCategoryCode());
        c.setLevelNo(dto.getLevelNo());
        c.setSortNo(dto.getSortNo());
        c.setStatus(dto.getStatus());
        c.setRemark(dto.getRemark());
        c.setUpdatedBy(operatorId == null ? 0L : operatorId);
        categoryMapper.updateById(c);
    }
}
