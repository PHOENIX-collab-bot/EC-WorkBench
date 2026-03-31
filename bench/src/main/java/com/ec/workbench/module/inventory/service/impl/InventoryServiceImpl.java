package com.ec.workbench.module.inventory.service.impl;

import com.ec.workbench.common.exception.BusinessException;
import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.module.inventory.dto.InventoryRecordCreateDTO;
import com.ec.workbench.module.inventory.dto.InventoryRecordPageQueryDTO;
import com.ec.workbench.module.inventory.dto.InventoryWarnQueryDTO;
import com.ec.workbench.module.inventory.entity.InventoryRecord;
import com.ec.workbench.module.inventory.mapper.InventoryMapper;
import com.ec.workbench.module.inventory.service.InventoryService;
import com.ec.workbench.module.inventory.vo.InventoryRecordVO;
import com.ec.workbench.module.inventory.vo.InventoryWarnVO;
import com.ec.workbench.module.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryMapper inventoryMapper;

    @Override
    public PageResult<InventoryWarnVO> warnPage(InventoryWarnQueryDTO query) {
        long total = inventoryMapper.countWarn();
        long offset = (query.getPageNo() - 1) * query.getPageSize();
        List<InventoryWarnVO> list = inventoryMapper.selectWarnPage(offset, query.getPageSize());
        return new PageResult<>(total, query.getPageNo(), query.getPageSize(), list);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addRecord(InventoryRecordCreateDTO dto, Long operatorId) {
        if (dto.getChangeQty() == 0) {
            throw new BusinessException(4004, "变更数量不能为0");
        }

        Product p = inventoryMapper.selectProductById(dto.getProductId());
        if (p == null || p.getIsDeleted() == 1) {
            throw new BusinessException(404, "商品不存在");
        }

        int before = p.getStockQuantity();
        int after = before + dto.getChangeQty();
        if (after < 0) {
            throw new BusinessException(4004, "库存不足");
        }

        inventoryMapper.updateProductStock(p.getId(), after, operatorId == null ? 0L : operatorId);

        InventoryRecord r = new InventoryRecord();
        r.setMerchantId(1L);
        r.setRecordNo("IR" + System.currentTimeMillis() + ThreadLocalRandom.current().nextInt(100, 999));
        r.setProductId(p.getId());
        r.setBizType(dto.getBizType());
        r.setBizNo(dto.getBizNo());
        r.setChangeQty(dto.getChangeQty());
        r.setStockBefore(before);
        r.setStockAfter(after);
        r.setOperatorId(operatorId == null ? 0L : operatorId);
        r.setOperateTime(LocalDateTime.now());
        r.setRemark(dto.getRemark());
        inventoryMapper.insertRecord(r);
    }

    @Override
    public PageResult<InventoryRecordVO> recordPage(InventoryRecordPageQueryDTO query) {
        long total = inventoryMapper.countRecordPage(query);
        long offset = (query.getPageNo() - 1) * query.getPageSize();
        List<InventoryRecordVO> list = inventoryMapper.selectRecordPage(query, offset, query.getPageSize());
        return new PageResult<>(total, query.getPageNo(), query.getPageSize(), list);
    }
}
