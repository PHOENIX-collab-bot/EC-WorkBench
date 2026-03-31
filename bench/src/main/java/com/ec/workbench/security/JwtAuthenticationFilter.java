package com.ec.workbench.security;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil; private final JwtProperties jwtProperties; private final CustomUserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String header=request.getHeader(jwtProperties.getHeaderName());
        if(header==null || !header.startsWith(jwtProperties.getTokenPrefix())){ chain.doFilter(request,response); return; }
        String token=header.substring(jwtProperties.getTokenPrefix().length()).trim();
        try{
            String username=jwtUtil.getUsername(token);
            if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null){
                UserDetails ud=userDetailsService.loadUserByUsername(username);
                if(jwtUtil.isTokenValid(token, ud.getUsername())){
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(ud,null,ud.getAuthorities());
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        } catch (JwtException ex){ SecurityContextHolder.clearContext(); }
        chain.doFilter(request,response);
    }
}
