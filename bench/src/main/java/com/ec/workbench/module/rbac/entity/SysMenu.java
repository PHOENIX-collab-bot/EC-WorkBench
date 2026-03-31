package com.ec.workbench.module.rbac.entity;
import lombok.Data;
import java.time.LocalDateTime;
@Data
public class SysMenu { private Long id; private Long merchantId; private Long parentId; private String menuName; private Integer menuType; private String routePath; private String componentPath; private String perms; private Integer sortNo; private Integer visible; private Integer status; private Integer isDeleted; private LocalDateTime createdAt; private Long createdBy; private LocalDateTime updatedAt; private Long updatedBy; }
