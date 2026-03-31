package com.ec.workbench.security;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
@Data
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties { private String secret; private Long expireSeconds; private String tokenPrefix; private String headerName; }
