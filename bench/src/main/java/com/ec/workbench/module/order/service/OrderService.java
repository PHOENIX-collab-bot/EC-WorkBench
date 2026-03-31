package com.ec.workbench.module.order.service;

import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.module.order.dto.OrderDeliveryDTO;
import com.ec.workbench.module.order.dto.OrderPageQueryDTO;
import com.ec.workbench.module.order.vo.OrderDetailVO;
import com.ec.workbench.module.order.vo.OrderVO;

public interface OrderService {
    PageResult<OrderVO> page(OrderPageQueryDTO query);

    OrderDetailVO detail(Long id);

    void updateStatus(Long id, Integer orderStatus, Long operatorId);

    void deliver(Long id, OrderDeliveryDTO dto, Long operatorId);
}
