package com.ec.workbench.module.product.controller;

import com.ec.workbench.common.result.Result;
import com.ec.workbench.module.product.dto.ProductCategoryCreateDTO;
import com.ec.workbench.module.product.dto.ProductCategoryUpdateDTO;
import com.ec.workbench.module.product.service.ProductCategoryService;
import com.ec.workbench.module.product.vo.ProductCategoryVO;
import com.ec.workbench.security.CurrentUserContext;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-categories")
@RequiredArgsConstructor
public class ProductCategoryController {

    private final ProductCategoryService categoryService;

    @GetMapping
    public Result<List<ProductCategoryVO>> list(@RequestParam(required = false) Integer status) {
        return Result.success(categoryService.list(status));
    }

    @PostMapping
    public Result<Void> create(@RequestBody @Valid ProductCategoryCreateDTO dto) {
        categoryService.create(dto, CurrentUserContext.getUserId());
        return Result.success();
    }

    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody @Valid ProductCategoryUpdateDTO dto) {
        categoryService.update(id, dto, CurrentUserContext.getUserId());
        return Result.success();
    }
}
