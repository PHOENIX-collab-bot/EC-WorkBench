
package com.ec.workbench.module.product.service.impl;

import com.ec.workbench.common.exception.BusinessException;
import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.module.product.dto.ProductCreateDTO;
import com.ec.workbench.module.product.dto.ProductPageQueryDTO;
import com.ec.workbench.module.product.dto.ProductUpdateDTO;
import com.ec.workbench.module.product.entity.Product;
import com.ec.workbench.module.product.mapper.ProductMapper;
import com.ec.workbench.module.product.service.ProductService;
import com.ec.workbench.module.product.vo.ProductDetailVO;
import com.ec.workbench.module.product.vo.ProductVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;

    @Override
    public PageResult<ProductVO> page(ProductPageQueryDTO query) {
        long total = productMapper.countPage(query);
        long offset = (query.getPageNo() - 1) * query.getPageSize();
        List<ProductVO> list = productMapper.selectPage(query, offset, query.getPageSize());
        return new PageResult<>(total, query.getPageNo(), query.getPageSize(), list);
    }

    @Override
    public ProductDetailVO detail(Long id) {
        ProductDetailVO detail = productMapper.selectDetailById(id);
        if (detail == null) {
            throw new BusinessException(404, "商品不存在");
        }
        return detail;
    }

    @Override
    public void create(ProductCreateDTO dto, Long operatorId) {
        Product p = new Product();
        p.setMerchantId(1L);
        p.setProductNo(dto.getProductNo());
        p.setCategoryId(dto.getCategoryId());
        p.setProductName(dto.getProductName());
        p.setSubTitle(dto.getSubTitle());
        p.setBrandName(dto.getBrandName());
        p.setUnitName(dto.getUnitName() == null || dto.getUnitName().isBlank() ? "件" : dto.getUnitName());
        p.setMainImage(dto.getMainImage());
        p.setSalePrice(dto.getSalePrice());
        p.setCostPrice(dto.getCostPrice() == null ? dto.getSalePrice() : dto.getCostPrice());
        p.setMarketPrice(dto.getMarketPrice() == null ? dto.getSalePrice() : dto.getMarketPrice());
        p.setStockQuantity(dto.getStockQuantity());
        p.setStockWarnThreshold(dto.getStockWarnThreshold());
        p.setStockLocked(0);
        p.setSaleCount(0);
        p.setStatus(2);
        p.setAuditStatus(1);
        p.setIsDeleted(0);
        p.setRemark(dto.getRemark());
        p.setCreatedBy(operatorId == null ? 0L : operatorId);
        p.setUpdatedBy(operatorId == null ? 0L : operatorId);
        productMapper.insert(p);
    }

    @Override
    public void update(Long id, ProductUpdateDTO dto, Long operatorId) {
        Product old = productMapper.selectById(id);
        if (old == null || old.getIsDeleted() == 1) {
            throw new BusinessException(404, "商品不存在");
        }
        Product p = new Product();
        p.setId(id);
        p.setCategoryId(dto.getCategoryId());
        p.setProductName(dto.getProductName());
        p.setSubTitle(dto.getSubTitle());
        p.setBrandName(dto.getBrandName());
        p.setUnitName(dto.getUnitName());
        p.setMainImage(dto.getMainImage());
        p.setSalePrice(dto.getSalePrice());
        p.setCostPrice(dto.getCostPrice());
        p.setMarketPrice(dto.getMarketPrice());
        p.setStockQuantity(dto.getStockQuantity());
        p.setStockWarnThreshold(dto.getStockWarnThreshold());
        p.setRemark(dto.getRemark());
        p.setUpdatedBy(operatorId == null ? 0L : operatorId);
        productMapper.updateById(p);
    }

    @Override
    public void updateStatus(Long id, Integer status, Long operatorId) {
        Product old = productMapper.selectById(id);
        if (old == null || old.getIsDeleted() == 1) {
            throw new BusinessException(404, "商品不存在");
        }
        productMapper.updateStatus(id, status, operatorId == null ? 0L : operatorId);
    }

    @Override
    public void delete(Long id, Long operatorId) {
        Product old = productMapper.selectById(id);
        if (old == null || old.getIsDeleted() == 1) {
            throw new BusinessException(404, "商品不存在");
        }
        productMapper.softDelete(id, operatorId == null ? 0L : operatorId);
    }
}
