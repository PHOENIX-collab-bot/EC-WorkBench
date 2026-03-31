package com.ec.workbench.module.rbac.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class SysUserUpdateDTO {
    @NotBlank(message = "昵称不能为空")
    private String nickname;

    @Pattern(regexp = "^1\\d{10}$", message = "手机号格式不正确")
    private String mobile;

    @Size(min = 6, max = 32, message = "密码长度6-32")
    private String password;

    @Min(value = 0, message = "状态非法")
    @Max(value = 2, message = "状态非法")
    private Integer status = 1;

    @NotEmpty(message = "角色不能为空")
    private List<Long> roleIds;
}
