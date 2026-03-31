package com.ec.workbench.module.order.service.impl;

import com.ec.workbench.common.exception.BusinessException;
import com.ec.workbench.common.result.PageResult;
import com.ec.workbench.module.order.dto.OrderDeliveryDTO;
import com.ec.workbench.module.order.dto.OrderPageQueryDTO;
import com.ec.workbench.module.order.entity.Orders;
import com.ec.workbench.module.order.mapper.OrderMapper;
import com.ec.workbench.module.order.service.OrderService;
import com.ec.workbench.module.order.vo.OrderDetailVO;
import com.ec.workbench.module.order.vo.OrderVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderMapper orderMapper;

    @Override
    public PageResult<OrderVO> page(OrderPageQueryDTO query) {
        long total = orderMapper.countPage(query);
        long offset = (query.getPageNo() - 1) * query.getPageSize();
        List<OrderVO> list = orderMapper.selectPage(query, offset, query.getPageSize());
        return new PageResult<>(total, query.getPageNo(), query.getPageSize(), list);
    }

    @Override
    public OrderDetailVO detail(Long id) {
        OrderDetailVO detail = orderMapper.selectDetailById(id);
        if (detail == null) {
            throw new BusinessException(404, "订单不存在");
        }
        detail.setItems(orderMapper.selectItemsByOrderId(id));
        return detail;
    }

    @Override
    public void updateStatus(Long id, Integer orderStatus, Long operatorId) {
        Orders old = orderMapper.selectById(id);
        if (old == null || old.getIsDeleted() == 1) {
            throw new BusinessException(404, "订单不存在");
        }
        orderMapper.updateStatus(id, orderStatus, operatorId == null ? 0L : operatorId);
    }

    @Override
    public void deliver(Long id, OrderDeliveryDTO dto, Long operatorId) {
        Orders old = orderMapper.selectById(id);
        if (old == null || old.getIsDeleted() == 1) {
            throw new BusinessException(404, "订单不存在");
        }
        String remark = "物流公司:" + dto.getLogisticsCompany() + ", 物流单号:" + dto.getLogisticsNo();
        if (dto.getSellerRemark() != null && !dto.getSellerRemark().isBlank()) {
            remark = remark + "; 备注:" + dto.getSellerRemark();
        }
        orderMapper.deliver(id, remark, LocalDateTime.now(), operatorId == null ? 0L : operatorId);
    }
}
