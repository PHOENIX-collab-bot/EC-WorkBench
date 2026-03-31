package com.ec.workbench.common.result;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResult<T> {
    private Long total;
    private Long pageNo;
    private Long pageSize;
    private List<T> list;
}
