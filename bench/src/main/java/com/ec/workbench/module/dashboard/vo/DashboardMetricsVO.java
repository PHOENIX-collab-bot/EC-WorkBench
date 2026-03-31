package com.ec.workbench.module.dashboard.vo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DashboardMetricsVO {
    private Long orderToday;
    private BigDecimal salesToday;
    private Long productOnSale;
    private Long stockWarnCount;
}
