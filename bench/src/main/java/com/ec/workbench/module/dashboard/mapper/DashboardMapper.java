package com.ec.workbench.module.dashboard.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.math.BigDecimal;

@Mapper
public interface DashboardMapper {
    @Select("SELECT COUNT(1) FROM orders WHERE merchant_id = 1 AND is_deleted = 0 AND DATE(created_at) = CURRENT_DATE()")
    Long countOrderToday();

    @Select("SELECT COALESCE(SUM(paid_amount), 0) FROM orders WHERE merchant_id = 1 AND is_deleted = 0 AND DATE(created_at) = CURRENT_DATE()")
    BigDecimal sumSalesToday();

    @Select("SELECT COUNT(1) FROM product WHERE merchant_id = 1 AND is_deleted = 0 AND status = 1")
    Long countProductOnSale();

    @Select("SELECT COUNT(1) FROM product WHERE merchant_id = 1 AND is_deleted = 0 AND status = 1 AND stock_quantity <= stock_warn_threshold")
    Long countStockWarn();
}
