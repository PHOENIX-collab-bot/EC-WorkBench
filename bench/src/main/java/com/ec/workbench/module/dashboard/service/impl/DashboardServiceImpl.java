package com.ec.workbench.module.dashboard.service.impl;

import com.ec.workbench.module.dashboard.mapper.DashboardMapper;
import com.ec.workbench.module.dashboard.service.DashboardService;
import com.ec.workbench.module.dashboard.vo.DashboardMetricsVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final DashboardMapper dashboardMapper;

    @Override
    public DashboardMetricsVO metrics() {
        DashboardMetricsVO vo = new DashboardMetricsVO();
        vo.setOrderToday(defaultLong(dashboardMapper.countOrderToday()));
        vo.setSalesToday(defaultDecimal(dashboardMapper.sumSalesToday()));
        vo.setProductOnSale(defaultLong(dashboardMapper.countProductOnSale()));
        vo.setStockWarnCount(defaultLong(dashboardMapper.countStockWarn()));
        return vo;
    }

    private Long defaultLong(Long v) {
        return v == null ? 0L : v;
    }

    private BigDecimal defaultDecimal(BigDecimal v) {
        return v == null ? BigDecimal.ZERO : v;
    }
}
