package com.ec.workbench.module.auth.service.impl;

import com.ec.workbench.common.exception.BusinessException;
import com.ec.workbench.module.auth.dto.LoginRequest;
import com.ec.workbench.module.auth.service.AuthService;
import com.ec.workbench.module.auth.vo.LoginVO;
import com.ec.workbench.module.rbac.mapper.SysMenuMapper;
import com.ec.workbench.module.rbac.mapper.SysRoleMapper;
import com.ec.workbench.security.JwtProperties;
import com.ec.workbench.security.JwtUtil;
import com.ec.workbench.security.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final JwtProperties jwtProperties;
    private final SysRoleMapper sysRoleMapper;
    private final SysMenuMapper sysMenuMapper;

    @Override
    public LoginVO login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        return buildLoginVo(loginUser.getUserId(), loginUser.getUsername());
    }

    @Override
    public LoginVO refresh(String refreshToken) {
        String username;
        Long userId;
        try {
            username = jwtUtil.getUsername(refreshToken);
            userId = jwtUtil.getUserId(refreshToken);
        } catch (Exception ex) {
            throw new BusinessException(401, "refreshToken无效");
        }
        if (username == null || userId == null) {
            throw new BusinessException(401, "refreshToken无效");
        }
        return buildLoginVo(userId, username);
    }

    private LoginVO buildLoginVo(Long userId, String username) {
        String token = jwtUtil.generateToken(userId, username);
        List<String> roleCodes = sysRoleMapper.selectRoleCodesByUserId(userId);
        List<String> permissions = sysMenuMapper.selectPermsByUserId(userId);

        LoginVO vo = new LoginVO();
        vo.setToken(token);
        vo.setTokenType(jwtProperties.getTokenPrefix().trim());
        vo.setExpiresIn(jwtProperties.getExpireSeconds());
        vo.setUserId(userId);
        vo.setUsername(username);
        vo.setRoleCodes(roleCodes);
        vo.setPermissions(permissions);
        return vo;
    }
}
