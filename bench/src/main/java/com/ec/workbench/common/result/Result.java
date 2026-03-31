package com.ec.workbench.common.result;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {
    private Integer code;
    private String message;
    private T data;

    public static <T> Result<T> success(T data) {
        return new Result<>(0, "OK", data);
    }

    public static Result<Void> success() {
        return new Result<>(0, "OK", null);
    }

    public static <T> Result<T> fail(Integer code, String message) {
        return new Result<>(code, message, null);
    }
}
