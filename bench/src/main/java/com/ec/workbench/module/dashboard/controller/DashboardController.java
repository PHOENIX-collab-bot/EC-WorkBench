package com.ec.workbench.module.dashboard.controller;

import com.ec.workbench.common.result.Result;
import com.ec.workbench.module.dashboard.service.DashboardService;
import com.ec.workbench.module.dashboard.vo.DashboardMetricsVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/metrics")
    public Result<DashboardMetricsVO> metrics() {
        return Result.success(dashboardService.metrics());
    }
}
