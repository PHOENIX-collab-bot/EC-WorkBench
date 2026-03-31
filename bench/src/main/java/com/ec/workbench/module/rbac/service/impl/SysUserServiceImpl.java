package com.ec.workbench.module.rbac.service.impl;

import com.ec.workbench.common.exception.BusinessException;
import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.module.rbac.dto.SysUserCreateDTO;
import com.ec.workbench.module.rbac.dto.SysUserUpdateDTO;
import com.ec.workbench.module.rbac.entity.SysUser;
import com.ec.workbench.module.rbac.mapper.SysRoleMapper;
import com.ec.workbench.module.rbac.mapper.SysUserMapper;
import com.ec.workbench.module.rbac.service.SysUserService;
import com.ec.workbench.module.rbac.vo.SysUserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SysUserServiceImpl implements SysUserService {
    private final SysUserMapper sysUserMapper;
    private final SysRoleMapper sysRoleMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void create(SysUserCreateDTO dto, Long operatorId) {
        if (sysUserMapper.countByUsername(dto.getUsername()) > 0) {
            throw new BusinessException(4004, "用户名已存在");
        }
        SysUser user = new SysUser();
        user.setUsername(dto.getUsername());
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        user.setNickname(dto.getNickname());
        user.setMobile(dto.getMobile());
        user.setStatus(dto.getStatus());
        user.setCreatedBy(operatorId == null ? 0L : operatorId);
        user.setUpdatedBy(operatorId == null ? 0L : operatorId);
        sysUserMapper.insert(user);

        sysRoleMapper.deleteUserRoles(user.getId());
        for (Long roleId : dto.getRoleIds()) {
            sysRoleMapper.insertUserRole(user.getId(), roleId, operatorId == null ? 0L : operatorId);
        }
    }

    @Override
    public PageResult<SysUserVO> page(long pageNo, long pageSize) {
        long offset = (pageNo - 1) * pageSize;
        List<SysUser> users = sysUserMapper.page(offset, pageSize);
        long total = sysUserMapper.countAll();

        List<SysUserVO> list = users.stream().map(u -> {
            SysUserVO vo = new SysUserVO();
            vo.setId(u.getId());
            vo.setUsername(u.getUsername());
            vo.setNickname(u.getNickname());
            vo.setMobile(u.getMobile());
            vo.setStatus(u.getStatus());
            vo.setCreatedAt(u.getCreatedAt());
            vo.setRoleCodes(List.of());
            return vo;
        }).toList();

        return new PageResult<>(total, pageNo, pageSize, list);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Long id, SysUserUpdateDTO dto, Long operatorId) {
        SysUser old = sysUserMapper.selectById(id);
        if (old == null) {
            throw new BusinessException(404, "用户不存在");
        }
        SysUser user = new SysUser();
        user.setId(id);
        user.setNickname(dto.getNickname());
        user.setMobile(dto.getMobile());
        user.setPasswordHash(dto.getPassword() == null || dto.getPassword().isBlank() ? old.getPasswordHash() : passwordEncoder.encode(dto.getPassword()));
        user.setStatus(dto.getStatus());
        user.setUpdatedBy(operatorId == null ? 0L : operatorId);
        sysUserMapper.updateById(user);

        sysRoleMapper.deleteUserRoles(id);
        for (Long roleId : dto.getRoleIds()) {
            sysRoleMapper.insertUserRole(id, roleId, operatorId == null ? 0L : operatorId);
        }
    }

    @Override
    public void delete(Long id, Long operatorId) {
        SysUser old = sysUserMapper.selectById(id);
        if (old == null) {
            throw new BusinessException(404, "用户不存在");
        }
        sysUserMapper.softDelete(id, operatorId == null ? 0L : operatorId);
        sysRoleMapper.deleteUserRoles(id);
    }
}
