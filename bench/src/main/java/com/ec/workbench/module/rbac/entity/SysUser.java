package com.ec.workbench.module.rbac.entity;
import lombok.Data;
import java.time.LocalDateTime;
@Data
public class SysUser { private Long id; private Long merchantId; private String username; private String passwordHash; private String nickname; private String realName; private String mobile; private String email; private Integer status; private Integer isDeleted; private LocalDateTime lastLoginAt; private LocalDateTime createdAt; private Long createdBy; private LocalDateTime updatedAt; private Long updatedBy; }
