package com.ec.workbench.security;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
public final class CurrentUserContext {
    private CurrentUserContext(){}
    public static LoginUser getLoginUser(){ Authentication auth=SecurityContextHolder.getContext().getAuthentication(); if(auth==null || !(auth.getPrincipal() instanceof LoginUser u)){ return null;} return u; }
    public static Long getUserId(){ LoginUser u=getLoginUser(); return u==null?null:u.getUserId(); }
    public static String getUsername(){ LoginUser u=getLoginUser(); return u==null?null:u.getUsername(); }
}
