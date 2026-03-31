package com.ec.workbench.module.rbac.service;

import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.module.rbac.dto.SysUserCreateDTO;
import com.ec.workbench.module.rbac.dto.SysUserUpdateDTO;
import com.ec.workbench.module.rbac.vo.SysUserVO;

public interface SysUserService {
    void create(SysUserCreateDTO dto, Long operatorId);

    PageResult<SysUserVO> page(long pageNo, long pageSize);

    void update(Long id, SysUserUpdateDTO dto, Long operatorId);

    void delete(Long id, Long operatorId);
}
