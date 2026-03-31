package com.ec.workbench.module.inventory.controller;

import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.common.result.Result;
import com.ec.workbench.module.inventory.dto.InventoryRecordCreateDTO;
import com.ec.workbench.module.inventory.dto.InventoryRecordPageQueryDTO;
import com.ec.workbench.module.inventory.dto.InventoryWarnQueryDTO;
import com.ec.workbench.module.inventory.service.InventoryService;
import com.ec.workbench.module.inventory.vo.InventoryRecordVO;
import com.ec.workbench.module.inventory.vo.InventoryWarnVO;
import com.ec.workbench.security.CurrentUserContext;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@Validated
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/warn")
    public Result<PageResult<InventoryWarnVO>> warnPage(@Valid InventoryWarnQueryDTO query) {
        return Result.success(inventoryService.warnPage(query));
    }

    @PostMapping("/records")
    public Result<Void> addRecord(@RequestBody @Valid InventoryRecordCreateDTO dto) {
        inventoryService.addRecord(dto, CurrentUserContext.getUserId());
        return Result.success();
    }

    @GetMapping("/records")
    public Result<PageResult<InventoryRecordVO>> recordPage(@Valid InventoryRecordPageQueryDTO query) {
        return Result.success(inventoryService.recordPage(query));
    }
}
