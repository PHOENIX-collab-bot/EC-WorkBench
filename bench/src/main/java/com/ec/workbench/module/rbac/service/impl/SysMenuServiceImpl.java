package com.ec.workbench.module.rbac.service.impl;
import com.ec.workbench.module.rbac.mapper.SysMenuMapper;
import com.ec.workbench.module.rbac.service.SysMenuService;
import com.ec.workbench.module.rbac.vo.SysMenuVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class SysMenuServiceImpl implements SysMenuService {
    private final SysMenuMapper sysMenuMapper;
    @Override
    public List<SysMenuVO> listByCurrentUser(Long userId) { return sysMenuMapper.selectMenusByUserId(userId).stream().map(m -> { SysMenuVO vo = new SysMenuVO(); vo.setId(m.getId()); vo.setParentId(m.getParentId()); vo.setMenuName(m.getMenuName()); vo.setMenuType(m.getMenuType()); vo.setRoutePath(m.getRoutePath()); vo.setPerms(m.getPerms()); vo.setSortNo(m.getSortNo()); vo.setStatus(m.getStatus()); return vo; }).toList(); }
}
