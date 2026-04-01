<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">EC Workbench</h1>
<h4 align="center">An e-commerce operations platform for back-office workflows, covering products, orders, inventory, RBAC, business dashboard, AI copywriting, and AI operations assistant.</h4>

<p align="center">
    English | <a href="README.zh-CN.md">简体中文</a>
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

## ✨ Overview

- **Authentication**: JWT login, token refresh, unified request interception
- **Authorization Model**: User / Role / Menu / Permission points (RBAC)
- **Product Center**: Categories, list, edit, publish/unpublish
- **Order Center**: Order list, order detail, shipping and status transitions
- **Inventory**: Inventory records and stock warnings
- **Dashboard**: Aggregated key business metrics
- **AI Tools**:
    - Product copywriting generation (marketing-styled content)
    - Operations assistant Q&A (dashboard-aware diagnostic suggestions)

## 🧱 Tech Stack

### Frontend (`bench/frontend/`)
- React 18
- Vite 5
- TypeScript 5
- Ant Design 5
- Axios + Zustand

### Backend (`bench/`)
- Spring Boot 3.2.5
- Spring Security
- MyBatis 3.0.3
- MySQL 8
- JJWT 0.11.5

### AI Integration
- DeepSeek Chat Completions API (proxied by backend)

## 📁 Project Structure

```text
bench/
├─ db/                        # Database scripts (schema + seed)
├─ frontend/                  # React frontend
│  └─ src/
│     ├─ api/                 # API wrappers
│     ├─ pages/               # Page modules
│     ├─ router/              # Route config
│     ├─ store/               # State management
│     └─ utils/request.ts     # Axios interceptor
├─ src/main/java/com/ec/workbench/
│  ├─ module/auth             # Login and token refresh
│  ├─ module/rbac             # User/role/menu
│  ├─ module/product          # Products and categories
│  ├─ module/order            # Order management
│  ├─ module/inventory        # Inventory records and warnings
│  ├─ module/dashboard        # Business dashboard
│  └─ module/ai               # AI copywriting and assistant
└─ src/main/resources/
     ├─ application.yml         # Backend configuration
     └─ mapper/**/*.xml         # MyBatis SQL mappings
```

## 🚀 Quick Start

### 1) Requirements

- JDK **21** (minimum 17)
- Maven **3.9+** (or use bundled `mvnw`)
- Node.js **18+**
- MySQL **8+**

### 2) Initialize Database

Run under `bench` directory:

```bash
mysql -uroot -p123456 < db/schema.sql
mysql -uroot -p123456 < db/data.sql
```

Default database name: `ec_workbench`

### 3) Start Backend

```powershell
.\mvnw.cmd spring-boot:run
```

Backend URL: `http://localhost:8090`

### 4) Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

Vite proxy is preconfigured: `/api -> http://localhost:8090`

## 🤖 AI Features

### AI Product Copywriting
- API: `POST /api/ai/copywriting/generate`
- Input: product name, price, style, prompt, etc.
- Output: editable marketing copy text

### AI Operations Assistant
- API: `POST /api/ai/assistant/ask`
- Input: question + optional dashboard data
- Output: operational suggestions around diagnosis, direction, risks, and actions

> Recommendation: inject `deepseek.api-key` through environment variables or private configuration. Do not expose real keys in public repositories.

## 🔑 Default Test Data

In `bench/db/data.sql`, sample accounts use placeholder `password_hash`. Replace with valid BCrypt hashes before login.

- `admin`
- `operator`

## ❓ FAQ

1. **Backend fails to start**: ensure MySQL is running and datasource settings in `application.yml` are correct.
2. **401 Unauthorized**: verify `Authorization: Bearer <token>` header.
3. **Login failed**: confirm `sys_user.password_hash` is a valid BCrypt hash.
4. **AI API errors**: check DeepSeek key, network connectivity, and API quota.

## 📚 Documentation

- Build guide: [bench/BUILD_GUIDE.md](bench/BUILD_GUIDE.md)

