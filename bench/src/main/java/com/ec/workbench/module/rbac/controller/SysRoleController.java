package com.ec.workbench.module.rbac.controller;
import com.ec.workbench.common.result.Result;
import com.ec.workbench.module.rbac.service.SysRoleService;
import com.ec.workbench.module.rbac.vo.SysRoleVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/sys/roles")
@RequiredArgsConstructor
public class SysRoleController {
    private final SysRoleService sysRoleService;
    @GetMapping
    public Result<List<SysRoleVO>> list(){ return Result.success(sysRoleService.list()); }
}
