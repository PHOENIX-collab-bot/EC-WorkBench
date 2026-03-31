package com.ec.workbench;

import com.ec.workbench.security.JwtProperties;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@MapperScan(basePackages = "com.ec.workbench.module", annotationClass = Mapper.class)
@EnableConfigurationProperties(JwtProperties.class)
public class WorkbenchApplication {
    public static void main(String[] args) {
        SpringApplication.run(WorkbenchApplication.class, args);
    }
}
