package com.ec.workbench.module.order.controller;

import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.common.result.Result;
import com.ec.workbench.module.order.dto.OrderDeliveryDTO;
import com.ec.workbench.module.order.dto.OrderPageQueryDTO;
import com.ec.workbench.module.order.dto.OrderStatusUpdateDTO;
import com.ec.workbench.module.order.service.OrderService;
import com.ec.workbench.module.order.vo.OrderDetailVO;
import com.ec.workbench.module.order.vo.OrderVO;
import com.ec.workbench.security.CurrentUserContext;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Validated
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public Result<PageResult<OrderVO>> page(@Valid OrderPageQueryDTO query) {
        return Result.success(orderService.page(query));
    }

    @GetMapping("/{id}")
    public Result<OrderDetailVO> detail(@PathVariable Long id) {
        return Result.success(orderService.detail(id));
    }

    @PutMapping("/{id}/status")
    public Result<Void> updateStatus(@PathVariable Long id, @RequestBody @Valid OrderStatusUpdateDTO dto) {
        orderService.updateStatus(id, dto.getOrderStatus(), CurrentUserContext.getUserId());
        return Result.success();
    }

    @PutMapping("/{id}/delivery")
    public Result<Void> deliver(@PathVariable Long id, @RequestBody @Valid OrderDeliveryDTO dto) {
        orderService.deliver(id, dto, CurrentUserContext.getUserId());
        return Result.success();
    }
}
