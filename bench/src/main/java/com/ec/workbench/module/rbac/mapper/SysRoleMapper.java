package com.ec.workbench.module.rbac.mapper;

import com.ec.workbench.module.rbac.entity.SysRole;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SysRoleMapper {

    @Select("SELECT r.role_code FROM sys_role r JOIN sys_user_role ur ON ur.role_id = r.id " +
            "WHERE ur.user_id = #{userId} AND r.status = 1 AND r.is_deleted = 0")
    List<String> selectRoleCodesByUserId(@Param("userId") Long userId);

    @Select("SELECT * FROM sys_role WHERE merchant_id = 1 AND is_deleted = 0 ORDER BY id DESC")
    List<SysRole> selectAll();

    @Delete("DELETE FROM sys_user_role WHERE merchant_id = 1 AND user_id = #{userId}")
    int deleteUserRoles(@Param("userId") Long userId);

    @Insert("INSERT INTO sys_user_role (merchant_id, user_id, role_id, created_by) VALUES (1, #{userId}, #{roleId}, #{createdBy})")
    int insertUserRole(@Param("userId") Long userId, @Param("roleId") Long roleId, @Param("createdBy") Long createdBy);
}
