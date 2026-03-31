package com.ec.workbench.module.rbac.mapper;

import com.ec.workbench.module.rbac.entity.SysMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SysMenuMapper {

    @Select("SELECT DISTINCT m.perms FROM sys_menu m " +
            "JOIN sys_role_menu rm ON rm.menu_id = m.id " +
            "JOIN sys_user_role ur ON ur.role_id = rm.role_id " +
            "WHERE ur.user_id = #{userId} AND m.status = 1 AND m.is_deleted = 0 " +
            "AND m.perms IS NOT NULL AND m.perms <> ''")
    List<String> selectPermsByUserId(@Param("userId") Long userId);

    @Select("SELECT DISTINCT m.* FROM sys_menu m " +
            "JOIN sys_role_menu rm ON rm.menu_id = m.id " +
            "JOIN sys_user_role ur ON ur.role_id = rm.role_id " +
            "WHERE ur.user_id = #{userId} AND m.status = 1 AND m.is_deleted = 0 " +
            "ORDER BY m.sort_no ASC, m.id ASC")
    List<SysMenu> selectMenusByUserId(@Param("userId") Long userId);

    @Select("SELECT * FROM sys_menu WHERE merchant_id = 1 AND is_deleted = 0 ORDER BY sort_no ASC, id ASC")
    List<SysMenu> selectAll();
}
