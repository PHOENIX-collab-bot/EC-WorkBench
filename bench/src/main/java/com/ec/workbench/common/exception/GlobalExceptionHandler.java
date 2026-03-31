package com.ec.workbench.common.exception;

import com.ec.workbench.common.result.Result;
import jakarta.validation.ConstraintViolationException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public Result<Void> handleBusiness(BusinessException e) {
        return Result.fail(e.getCode(), e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Void> handleValid(MethodArgumentNotValidException e) {
        String msg = e.getBindingResult().getFieldError() != null
                ? e.getBindingResult().getFieldError().getDefaultMessage()
                : "参数校验失败";
        return Result.fail(4001, msg);
    }

    @ExceptionHandler(BindException.class)
    public Result<Void> handleBind(BindException e) {
        String msg = e.getBindingResult().getFieldError() != null
                ? e.getBindingResult().getFieldError().getDefaultMessage()
                : "参数绑定失败";
        return Result.fail(4002, msg);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public Result<Void> handleConstraint(ConstraintViolationException e) {
        return Result.fail(4003, e.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public Result<Void> handleDenied(AccessDeniedException e) {
        return Result.fail(403, "无权限访问");
    }

    @ExceptionHandler(Exception.class)
    public Result<Void> handleEx(Exception e) {
        return Result.fail(500, e.getMessage());
    }
}
