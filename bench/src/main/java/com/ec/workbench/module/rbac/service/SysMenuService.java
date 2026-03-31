package com.ec.workbench.module.rbac.service;

import com.ec.workbench.module.rbac.vo.SysMenuVO;
import java.util.List;

public interface SysMenuService {
    List<SysMenuVO> listByCurrentUser(Long userId);
}
