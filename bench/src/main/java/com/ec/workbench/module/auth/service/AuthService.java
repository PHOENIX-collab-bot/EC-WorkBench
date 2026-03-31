package com.ec.workbench.module.auth.service;

import com.ec.workbench.module.auth.dto.LoginRequest;
import com.ec.workbench.module.auth.vo.LoginVO;

public interface AuthService {
    LoginVO login(LoginRequest request);

    LoginVO refresh(String refreshToken);
}
