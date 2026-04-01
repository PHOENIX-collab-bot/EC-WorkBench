<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">EC Workbench（电商工作台）</h1>
<h4 align="center">一个面向中后台运营场景的电商管理系统，覆盖商品、订单、库存、RBAC 权限、经营看板、AI 文案生成与 AI 运营问答助手。</h4>

<p align="center">
  <a href="README.md">English</a> | 简体中文
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-18-blue" />
  <img src="https://img.shields.io/badge/vite-5-purple" />
  <img src="https://img.shields.io/badge/typescript-5-blue" />
  <img src="https://img.shields.io/badge/ant--design-ui-blue" />
  <img src="https://img.shields.io/badge/springboot-3.x-green" />
  <img src="https://img.shields.io/badge/security-spring--security-green" />
  <img src="https://img.shields.io/badge/mybatis-orm-lightgrey" />
  <img src="https://img.shields.io/badge/mysql-8.0-orange" />
</p>

## ✨ 功能概览

- **登录鉴权**：JWT 登录、刷新 Token、统一请求拦截
- **权限模型**：用户 / 角色 / 菜单 / 权限点（RBAC）
- **商品中心**：分类、列表、编辑、上下架
- **订单中心**：订单列表、订单详情、发货与状态流转
- **库存管理**：库存流水与库存预警
- **经营看板**：核心经营指标聚合展示
- **AI 工具**：
  - 商品文案生成（营销风格化文案）
  - 运营助手问答（支持结合看板数据进行诊断建议）

## 🧱 技术栈

### 前端（`bench/frontend/`）
- React 18
- Vite 5
- TypeScript 5
- Ant Design 5
- Axios + Zustand

### 后端（`bench/`）
- Spring Boot 3.2.5
- Spring Security
- MyBatis 3.0.3
- MySQL 8
- JJWT 0.11.5

### AI 集成
- DeepSeek Chat Completions API（由后端代理调用）

## 📁 项目结构

```text
bench/
├─ db/                        # 数据库脚本（建表 + 初始化）
├─ frontend/                  # React 前端
│  └─ src/
│     ├─ api/                 # API 封装
│     ├─ pages/               # 页面模块
│     ├─ router/              # 路由配置
│     ├─ store/               # 状态管理
│     └─ utils/request.ts     # Axios 拦截器
├─ src/main/java/com/ec/workbench/
│  ├─ module/auth             # 登录与 Token 刷新
│  ├─ module/rbac             # 用户 / 角色 / 菜单
│  ├─ module/product          # 商品与分类
│  ├─ module/order            # 订单管理
│  ├─ module/inventory        # 库存流水与预警
│  ├─ module/dashboard        # 经营看板
│  └─ module/ai               # AI 文案与 AI 助手
└─ src/main/resources/
   ├─ application.yml         # 后端配置
   └─ mapper/**/*.xml         # MyBatis SQL 映射
```

## 🚀 快速开始

### 1）环境要求

- JDK **21**（最低 17）
- Maven **3.9+**（或使用项目内置 `mvnw`）
- Node.js **18+**
- MySQL **8+**

### 2）初始化数据库

在 `bench` 目录执行：

```bash
mysql -uroot -p123456 < db/schema.sql
mysql -uroot -p123456 < db/data.sql
```

默认库名：`ec_workbench`

### 3）启动后端

```powershell
.\mvnw.cmd spring-boot:run
```

后端地址：`http://localhost:8090`

### 4）启动前端

```bash
cd frontend
npm install
npm run dev
```

前端地址：`http://localhost:5173`

Vite 代理已预置：`/api -> http://localhost:8090`

## 🤖 AI 功能说明

### AI 商品文案
- 接口：`POST /api/ai/copywriting/generate`
- 输入：商品名、价格、风格、提示词等
- 输出：可直接使用或二次编辑的文案文本

### AI 运营助手
- 接口：`POST /api/ai/assistant/ask`
- 输入：问题 + 可选看板数据
- 输出：围绕诊断、方向、风险、行动建议的运营回答

> 建议将 `deepseek.api-key` 通过环境变量或私密配置注入，不要在公开仓库暴露真实密钥。

## 🔑 默认测试数据说明

在 `bench/db/data.sql` 中，示例账号使用的是占位 `password_hash`，请替换为真实 BCrypt 哈希后再登录。

- `admin`
- `operator`

## ❓ 常见问题

1. **后端启动失败**：请确认 MySQL 已启动，且 `application.yml` 数据源配置正确。
2. **401 未认证**：请检查请求头 `Authorization: Bearer <token>`。
3. **登录失败**：请确认 `sys_user.password_hash` 是有效的 BCrypt 哈希。
4. **AI 接口报错**：请检查 DeepSeek Key、网络连通性与接口配额。

## 📚 文档导航

- 构建指南：[bench/BUILD_GUIDE.md](bench/BUILD_GUIDE.md)
