package com.ec.workbench.security;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
@Data
@AllArgsConstructor
public class LoginUser implements UserDetails {
    private Long userId; private String username; private String password; private boolean enabled; private Collection<? extends GrantedAuthority> authorities;
    @Override public boolean isAccountNonExpired(){ return true; }
    @Override public boolean isAccountNonLocked(){ return true; }
    @Override public boolean isCredentialsNonExpired(){ return true; }
}
