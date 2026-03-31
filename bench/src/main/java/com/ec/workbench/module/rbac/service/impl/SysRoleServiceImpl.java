package com.ec.workbench.module.rbac.service.impl;
import com.ec.workbench.module.rbac.mapper.SysRoleMapper;
import com.ec.workbench.module.rbac.service.SysRoleService;
import com.ec.workbench.module.rbac.vo.SysRoleVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class SysRoleServiceImpl implements SysRoleService {
    private final SysRoleMapper sysRoleMapper;
    @Override
    public List<SysRoleVO> list() { return sysRoleMapper.selectAll().stream().map(r -> { SysRoleVO vo = new SysRoleVO(); vo.setId(r.getId()); vo.setRoleName(r.getRoleName()); vo.setRoleCode(r.getRoleCode()); vo.setStatus(r.getStatus()); return vo; }).toList(); }
}
