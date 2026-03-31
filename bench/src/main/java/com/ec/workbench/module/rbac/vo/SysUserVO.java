package com.ec.workbench.module.rbac.vo;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
@Data
public class SysUserVO { private Long id; private String username; private String nickname; private String mobile; private Integer status; private LocalDateTime createdAt; private List<String> roleCodes; }
