package com.ec.workbench.module.order.mapper;

import com.ec.workbench.module.order.dto.OrderPageQueryDTO;
import com.ec.workbench.module.order.entity.Orders;
import com.ec.workbench.module.order.vo.OrderDetailVO;
import com.ec.workbench.module.order.vo.OrderItemVO;
import com.ec.workbench.module.order.vo.OrderVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface OrderMapper {
    long countPage(@Param("q") OrderPageQueryDTO query);

    List<OrderVO> selectPage(@Param("q") OrderPageQueryDTO query,
                             @Param("offset") long offset,
                             @Param("limit") long limit);

    Orders selectById(@Param("id") Long id);

    OrderDetailVO selectDetailById(@Param("id") Long id);

    List<OrderItemVO> selectItemsByOrderId(@Param("orderId") Long orderId);

    int updateStatus(@Param("id") Long id,
                     @Param("orderStatus") Integer orderStatus,
                     @Param("updatedBy") Long updatedBy);

    int deliver(@Param("id") Long id,
                @Param("sellerRemark") String sellerRemark,
                @Param("deliveryTime") LocalDateTime deliveryTime,
                @Param("updatedBy") Long updatedBy);
}
