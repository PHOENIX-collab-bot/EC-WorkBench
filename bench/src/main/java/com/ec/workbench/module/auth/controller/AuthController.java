package com.ec.workbench.module.auth.controller;

import com.ec.workbench.common.result.Result;
import com.ec.workbench.module.auth.dto.LoginRequest;
import com.ec.workbench.module.auth.dto.RefreshTokenRequest;
import com.ec.workbench.module.auth.service.AuthService;
import com.ec.workbench.module.auth.vo.LoginVO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public Result<LoginVO> login(@RequestBody @Valid LoginRequest request) {
        return Result.success(authService.login(request));
    }

    @PostMapping("/refresh")
    public Result<LoginVO> refresh(@RequestBody @Valid RefreshTokenRequest request) {
        return Result.success(authService.refresh(request.getRefreshToken()));
    }
}
