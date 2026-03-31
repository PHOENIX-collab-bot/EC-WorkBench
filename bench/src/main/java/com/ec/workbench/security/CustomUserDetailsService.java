package com.ec.workbench.security;
import com.ec.workbench.module.rbac.entity.SysUser;
import com.ec.workbench.module.rbac.mapper.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import java.util.*;
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final SysUserMapper sysUserMapper; private final SysRoleMapper sysRoleMapper; private final SysMenuMapper sysMenuMapper;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SysUser user = sysUserMapper.selectByUsername(username);
        if(user==null || user.getIsDeleted()==1){ throw new UsernameNotFoundException("用户不存在"); }
        if(user.getStatus()==0 || user.getStatus()==2){ throw new DisabledException("用户被禁用或锁定"); }
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for(String roleCode: sysRoleMapper.selectRoleCodesByUserId(user.getId())){ authorities.add(new SimpleGrantedAuthority("ROLE_"+roleCode)); }
        for(String perm: sysMenuMapper.selectPermsByUserId(user.getId())){ if(perm!=null && !perm.isBlank()){ authorities.add(new SimpleGrantedAuthority(perm)); } }
        return new LoginUser(user.getId(), user.getUsername(), user.getPasswordHash(), true, authorities);
    }
}
