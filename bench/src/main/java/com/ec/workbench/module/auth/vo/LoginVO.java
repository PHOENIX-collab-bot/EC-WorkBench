package com.ec.workbench.module.auth.vo;
import lombok.Data;
import java.util.List;
@Data
public class LoginVO { private String token; private String tokenType; private Long expiresIn; private Long userId; private String username; private List<String> roleCodes; private List<String> permissions; }
