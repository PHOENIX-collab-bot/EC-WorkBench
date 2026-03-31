# EC Workbench（电商工作台）

一个面向中后台运营场景的电商管理系统，覆盖 **商品、订单、库存、RBAC 权限、数据看板**，并提供 **AI 文案生成 + AI 运营问答助手**。

> 前端：React + Vite + TypeScript + Ant Design  
> 后端：Spring Boot 3 + Spring Security + MyBatis + MySQL 8

---

## ✨ 功能概览

- **登录鉴权**：JWT 登录、刷新 Token、统一请求拦截
- **权限模型**：用户/角色/菜单/权限点（RBAC）
- **商品中心**：分类、列表、编辑、上下架
- **订单中心**：订单列表、订单详情、发货/状态流转
- **库存管理**：库存流水、库存预警
- **经营看板**：核心经营指标聚合展示
- **AI 工具**：
	- 商品文案生成（营销风格化文案）
	- 运营助手问答（可携带看板数据做诊断建议）

---

## 🧱 技术栈

### 前端（`frontend/`）
- React 18
- Vite 5
- TypeScript 5
- Ant Design 5
- Axios + Zustand

### 后端（项目根目录）
- Spring Boot 3.2.5
- Spring Security
- MyBatis 3.0.3
- MySQL 8
- JJWT 0.11.5

### AI 集成
- DeepSeek Chat Completions API（后端代理调用）

---

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
│     └─ utils/request.ts     # Axios拦截器
├─ src/main/java/com/ec/workbench/
│  ├─ module/auth             # 登录与Token刷新
│  ├─ module/rbac             # 用户/角色/菜单
│  ├─ module/product          # 商品与分类
│  ├─ module/order            # 订单管理
│  ├─ module/inventory        # 库存流水与预警
│  ├─ module/dashboard        # 经营看板
│  └─ module/ai               # AI文案与AI助手
└─ src/main/resources/
   ├─ application.yml         # 后端配置
   └─ mapper/**/*.xml         # MyBatis SQL
```

---

## 🚀 快速开始

### 1) 环境要求

- JDK **21**（最低 17）
- Maven **3.9+**（或使用项目内 `mvnw`）
- Node.js **18+**
- MySQL **8+**

### 2) 初始化数据库

```bash
# 在 bench 目录下执行（示例）
mysql -uroot -p123456 < db/schema.sql
mysql -uroot -p123456 < db/data.sql
```

> 默认库名：`ec_workbench`

### 3) 启动后端

```bash
./mvnw spring-boot:run
```

Windows PowerShell：

```powershell
.\mvnw.cmd spring-boot:run
```

后端地址：`http://localhost:8090`

### 4) 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端地址：`http://localhost:5173`

> 前端已通过 Vite 代理 `/api -> http://localhost:8090`

---

## 🛠️ 本地部署流程（新手版）

下面按“**数据库 -> 后端 -> 前端 -> 验证**”顺序执行，首次建议严格照做。

### 第 0 步：准备软件

确保以下软件已安装并可在终端执行：

- `java -version`（建议 JDK 21）
- `node -v`、`npm -v`（Node.js 18+）
- `mysql --version`（MySQL 8+）

如果任一命令无法识别，请先安装并配置环境变量，再继续。

### 第 1 步：创建并初始化数据库

在项目根目录 `bench` 执行：

```bash
mysql -uroot -p123456 < db/schema.sql
mysql -uroot -p123456 < db/data.sql
```

说明：
- 默认库名：`ec_workbench`
- 如果你的 MySQL 密码不是 `123456`，请替换命令中的密码

### 第 2 步：确认后端数据库配置

打开 `src/main/resources/application.yml`，重点确认：

- `spring.datasource.url`
- `spring.datasource.username`
- `spring.datasource.password`

需要与你本地 MySQL 保持一致。

### 第 3 步：启动后端

在 `bench` 目录执行：

```powershell
.\mvnw.cmd spring-boot:run
```

看到类似 “Tomcat started on port(s): 8090” 即表示后端成功。

### 第 4 步：启动前端

新开一个终端，在 `bench/frontend` 执行：

```bash
npm install
npm run dev
```

看到 `Local: http://localhost:5173` 即表示前端成功。

### 第 5 步：访问系统并验证

1. 浏览器打开：`http://localhost:5173`
2. 登录后进入 Dashboard
3. 打开商品、订单、库存页面，确认接口可正常返回

> 注意：`db/data.sql` 中示例账号密码哈希是占位值。若登录失败，请先替换为真实 BCrypt 密码。

### 常见报错（新手高频）

- **后端启动失败，端口占用**：检查 `8090` 是否被其他程序占用
- **数据库连接失败**：核对 MySQL 是否启动、账号密码是否正确
- **前端请求 401**：先重新登录，确认 Token 已写入
- **前端白屏**：先执行 `npm install` 后再 `npm run dev`

---

## 🤖 AI 功能说明

### AI 商品文案
- 接口：`POST /api/ai/copywriting/generate`
- 输入：商品名、价格、风格、提示词等
- 输出：可直接使用或二次编辑的文案文本

### AI 运营助手
- 接口：`POST /api/ai/assistant/ask`
- 输入：问题 + 可选看板数据
- 输出：围绕诊断、方向、风险、建议的运营回答

> 建议将 `deepseek.api-key` 通过环境变量或私密配置注入，不要在公开仓库暴露真实密钥。

---

## 🔑 默认测试数据说明

`db/data.sql` 中示例账号的 `password_hash` 为占位字符串，请替换为真实 BCrypt 值后再登录。

- `admin`
- `operator`

---

##  常见问题

1. **后端启动失败**：请确认 MySQL 已启动且 `application.yml` 数据源正确。  
2. **401 未认证**：检查请求头 `Authorization: Bearer <token>`。  
3. **登录失败**：确认 `sys_user.password_hash` 为有效 BCrypt。  
4. **AI 接口报错**：检查 DeepSeek Key、网络连通性与接口配额。

---

## 📚 文档导航

- 详细构建流程文档：见同级 [BUILD_GUIDE.md](BUILD_GUIDE.md)

---

## 📝 License

仅用于学习与内部演示，可按你的业务场景继续扩展。
