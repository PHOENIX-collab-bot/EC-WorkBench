package com.ec.workbench.module.rbac.vo;

import lombok.Data;

@Data
public class SysMenuVO {
    private Long id;
    private Long parentId;
    private String menuName;
    private Integer menuType;
    private String routePath;
    private String perms;
    private Integer sortNo;
    private Integer status;
}
