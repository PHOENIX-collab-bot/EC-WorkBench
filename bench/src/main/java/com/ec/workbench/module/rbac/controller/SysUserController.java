package com.ec.workbench.module.rbac.controller;

import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.common.result.Result;
import com.ec.workbench.module.rbac.dto.SysUserCreateDTO;
import com.ec.workbench.module.rbac.dto.SysUserUpdateDTO;
import com.ec.workbench.module.rbac.service.SysUserService;
import com.ec.workbench.module.rbac.vo.SysUserVO;
import com.ec.workbench.security.CurrentUserContext;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sys/users")
@RequiredArgsConstructor
@Validated
public class SysUserController {
    private final SysUserService sysUserService;

    @PostMapping
    public Result<Void> create(@RequestBody @Valid SysUserCreateDTO dto) {
        sysUserService.create(dto, CurrentUserContext.getUserId());
        return Result.success();
    }

    @GetMapping
    public Result<PageResult<SysUserVO>> page(@RequestParam(defaultValue = "1") @Min(value = 1, message = "pageNo最小为1") long pageNo,
                                              @RequestParam(defaultValue = "10") @Min(value = 1, message = "pageSize最小为1") long pageSize) {
        return Result.success(sysUserService.page(pageNo, pageSize));
    }

    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody @Valid SysUserUpdateDTO dto) {
        sysUserService.update(id, dto, CurrentUserContext.getUserId());
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        sysUserService.delete(id, CurrentUserContext.getUserId());
        return Result.success();
    }
}
