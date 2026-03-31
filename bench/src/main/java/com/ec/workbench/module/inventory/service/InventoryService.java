package com.ec.workbench.module.inventory.service;

import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.module.inventory.dto.InventoryRecordCreateDTO;
import com.ec.workbench.module.inventory.dto.InventoryRecordPageQueryDTO;
import com.ec.workbench.module.inventory.dto.InventoryWarnQueryDTO;
import com.ec.workbench.module.inventory.vo.InventoryRecordVO;
import com.ec.workbench.module.inventory.vo.InventoryWarnVO;

public interface InventoryService {
    PageResult<InventoryWarnVO> warnPage(InventoryWarnQueryDTO query);

    void addRecord(InventoryRecordCreateDTO dto, Long operatorId);

    PageResult<InventoryRecordVO> recordPage(InventoryRecordPageQueryDTO query);
}
