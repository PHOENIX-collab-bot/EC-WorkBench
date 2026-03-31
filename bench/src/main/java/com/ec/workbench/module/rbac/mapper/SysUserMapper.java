package com.ec.workbench.module.rbac.mapper;

import com.ec.workbench.module.rbac.entity.SysUser;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface SysUserMapper {

    @Select("SELECT * FROM sys_user WHERE merchant_id = 1 AND username = #{username} AND is_deleted = 0 LIMIT 1")
    SysUser selectByUsername(@Param("username") String username);

    @Select("SELECT * FROM sys_user WHERE merchant_id = 1 AND id = #{id} AND is_deleted = 0 LIMIT 1")
    SysUser selectById(@Param("id") Long id);

    @Select("SELECT COUNT(1) FROM sys_user WHERE merchant_id = 1 AND username = #{username} AND is_deleted = 0")
    long countByUsername(@Param("username") String username);

    @Insert("INSERT INTO sys_user (merchant_id, username, password_hash, nickname, mobile, status, is_deleted, created_by, updated_by) " +
            "VALUES (1, #{username}, #{passwordHash}, #{nickname}, #{mobile}, #{status}, 0, #{createdBy}, #{updatedBy})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(SysUser user);

    @Update("UPDATE sys_user SET nickname = #{nickname}, mobile = #{mobile}, password_hash = #{passwordHash}, status = #{status}, updated_by = #{updatedBy} WHERE merchant_id = 1 AND id = #{id} AND is_deleted = 0")
    int updateById(SysUser user);

    @Update("UPDATE sys_user SET is_deleted = 1, updated_by = #{updatedBy} WHERE merchant_id = 1 AND id = #{id} AND is_deleted = 0")
    int softDelete(@Param("id") Long id, @Param("updatedBy") Long updatedBy);

    @Select("SELECT * FROM sys_user WHERE merchant_id = 1 AND is_deleted = 0 ORDER BY id DESC LIMIT #{offset}, #{pageSize}")
    List<SysUser> page(@Param("offset") long offset, @Param("pageSize") long pageSize);

    @Select("SELECT COUNT(1) FROM sys_user WHERE merchant_id = 1 AND is_deleted = 0")
    long countAll();
}
