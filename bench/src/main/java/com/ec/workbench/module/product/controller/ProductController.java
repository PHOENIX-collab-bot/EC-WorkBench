
package com.ec.workbench.module.product.controller;

import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.common.result.Result;
import com.ec.workbench.module.product.dto.ProductCreateDTO;
import com.ec.workbench.module.product.dto.ProductPageQueryDTO;
import com.ec.workbench.module.product.dto.ProductStatusUpdateDTO;
import com.ec.workbench.module.product.dto.ProductUpdateDTO;
import com.ec.workbench.module.product.service.ProductService;
import com.ec.workbench.module.product.vo.ProductDetailVO;
import com.ec.workbench.module.product.vo.ProductVO;
import com.ec.workbench.security.CurrentUserContext;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Validated
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public Result<PageResult<ProductVO>> page(@Valid ProductPageQueryDTO query) {
        return Result.success(productService.page(query));
    }

    @GetMapping("/{id}")
    public Result<ProductDetailVO> detail(@PathVariable Long id) {
        return Result.success(productService.detail(id));
    }

    @PostMapping
    public Result<Void> create(@RequestBody @Valid ProductCreateDTO dto) {
        productService.create(dto, CurrentUserContext.getUserId());
        return Result.success();
    }

    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody @Valid ProductUpdateDTO dto) {
        productService.update(id, dto, CurrentUserContext.getUserId());
        return Result.success();
    }

    @PutMapping("/{id}/status")
    public Result<Void> updateStatus(@PathVariable Long id, @RequestBody @Valid ProductStatusUpdateDTO dto) {
        productService.updateStatus(id, dto.getStatus(), CurrentUserContext.getUserId());
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        productService.delete(id, CurrentUserContext.getUserId());
        return Result.success();
    }
}
