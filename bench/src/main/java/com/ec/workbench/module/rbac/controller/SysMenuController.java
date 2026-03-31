package com.ec.workbench.module.rbac.controller;
import com.ec.workbench.common.result.Result;
import com.ec.workbench.module.rbac.service.SysMenuService;
import com.ec.workbench.module.rbac.vo.SysMenuVO;
import com.ec.workbench.security.CurrentUserContext;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/sys/menus")
@RequiredArgsConstructor
public class SysMenuController {
    private final SysMenuService sysMenuService;
    @GetMapping("/my")
    public Result<List<SysMenuVO>> myMenus(){ return Result.success(sysMenuService.listByCurrentUser(CurrentUserContext.getUserId())); }
}
