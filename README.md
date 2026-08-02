# Climbing Backend（攀岩线路管理后端）

基于 NestJS + TypeORM + MySQL 的攀岩线路管理后端 API，包含岩馆、岩壁、线路、手点、攀爬记录、难度投票、数据分析、文件上传等模块。

## 技术栈

- **框架**：NestJS 10（Node.js 18）
- **数据库**：MySQL 8.0（TypeORM 0.3）
- **认证**：JWT（Passport）
- **其他**：class-validator、bcrypt、@nestjs/throttler（限流）

## 快速启动（Docker Compose）

### 前提

- 已安装 Docker 和 Docker Compose

### 启动

```bash
docker compose up -d --build
```

启动包含两个服务：

| 服务    | 说明        | 端口映射              |
| ------- | ----------- | --------------------- |
| backend | NestJS API  | `3000 -> 3000`        |
| mysql   | MySQL 8.0   | `3308 -> 3306`（宿主机 3306/3307 常被占用，故映射到 3308） |

### 验证

```bash
curl http://localhost:3000/api
# 输出: Climbing Backend API is running!
```

首次启动时应用会自动完成：

1. **建表**：通过 TypeORM `synchronize` 自动创建数据表（项目未提供迁移文件，因此 compose 中 `NODE_ENV=development` 以开启 synchronize）；
2. **播种**：自动写入种子数据（日志中可见 `种子数据播种完成！`）。

### 种子账号

| 角色           | 邮箱                             | 密码          |
| -------------- | -------------------------------- | ------------- |
| 平台管理员     | `admin@test.com`                 | `admin123456` |
| 岩馆馆长       | `admin@gym1.com`                 | `admin123456` |
| 定线员         | `setter1@test.com` 等            | `test123456`  |
| 认证攀岩者     | `climber1@test.com` 等           | `test123456`  |

登录接口：`POST /api/auth/login`，Body 为 `{"email": "...", "password": "..."}`，返回 JWT，后续请求携带 `Authorization: Bearer <token>`。

### 常用命令

```bash
# 查看日志
docker compose logs -f backend

# 停止
docker compose down

# 停止并清空数据（删除 MySQL 数据卷和上传文件卷）
docker compose down -v
```

## API 概览

所有业务接口前缀为 `/api`：

- `/api/auth` — 注册 / 登录
- `/api/gyms`、`/api/walls`、`/api/routes`、`/api/holds` — 岩馆 / 岩壁 / 线路 / 手点
- `/api/ascents` — 攀爬记录
- `/api/votes` — 难度投票
- `/api/analytics` — 数据分析
- `/api/users` — 用户管理
- `/api/upload/image`、`/api/upload/video` — 文件上传（上传后的文件通过 `/api/files/:token` 或 `/uploads/`、`/static/` 访问）

## 本地开发（不使用 Docker）

```bash
npm ci
# 准备本地 MySQL，并设置环境变量 DB_HOST / DB_PORT / DB_USERNAME / DB_PASSWORD / DB_DATABASE
npm run start:dev
```

## 环境变量

| 变量         | 默认值         | 说明               |
| ------------ | -------------- | ------------------ |
| `PORT`       | `3000`         | 服务端口           |
| `DB_HOST`    | `localhost`    | 数据库主机         |
| `DB_PORT`    | `3306`         | 数据库端口         |
| `DB_USERNAME`| `root`         | 数据库用户         |
| `DB_PASSWORD`| （空）         | 数据库密码         |
| `DB_DATABASE`| `climbing`     | 数据库名           |
| `JWT_SECRET` | —              | JWT 签名密钥       |
| `CORS_ORIGIN`| `*`            | 允许的跨域来源     |
