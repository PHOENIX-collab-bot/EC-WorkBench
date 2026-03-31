package com.ec.workbench.module.rbac.entity;
import lombok.Data;
import java.time.LocalDateTime;
@Data
public class SysRole { private Long id; private Long merchantId; private String roleName; private String roleCode; private Integer dataScope; private Integer status; private Integer isDeleted; private LocalDateTime createdAt; private Long createdBy; private LocalDateTime updatedAt; private Long updatedBy; }
