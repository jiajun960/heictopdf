# HEICtoPDF.shop

## 项目概述

HEICtoPDF.shop 是一个专业的在线HEIC转PDF工具，采用纯前端技术实现。所有文件处理均在用户浏览器本地完成，确保隐私安全，无需上传到服务器。

## 核心功能

### 主要特性
- **本地处理**：文件完全在浏览器端处理，保护隐私
- **批量转换**：支持同时选择多个HEIC文件进行转换
- **实时编辑**：旋转、翻转、调色等编辑功能，所见即所得
- **拖拽排序**：用户可以拖拽调整图片在PDF中的顺序
- **智能排版**：支持A4/Letter/Auto页面尺寸，可调节边距
- **即时转换**：点击转换按钮后立即生成PDF文件

### 编辑功能
- **旋转**：90°、180°、270°旋转
- **翻转**：水平翻转、垂直翻转
- **调色**：亮度、对比度、饱和度、色相调节
- **滤镜**：黑白、高对比、复古、冷色调、暖色调、褪色

## 技术架构

### 前端技术栈
- **框架**：Next.js 14（App Router）
- **语言**：TypeScript
- **样式**：Tailwind CSS + shadcn/ui
- **图标**：Lucide React

### 核心依赖库
- **libheif-js**：HEIC/HEIF格式解码
- **pdf-lib**：PDF文件生成
- **transformImageWithCanvas**：图片变换处理

## 最新状态

### ✅ SEO优化和重定向修复（2025-01-14）

**SEO优化：**
- 创建robots.txt文件，允许搜索引擎爬虫访问
- 创建sitemap.xml文件，提供网站结构信息
- 修复Open Graph URL配置，统一使用www域名
- 优化第三方脚本加载方式

**重定向问题修复：**
- 统一所有URL配置为`https://www.heictopdf.shop`
- 解决Google Search Console报告的重定向问题
- 优化Google Analytics和Microsoft Clarity脚本

### ✅ 双重渲染系统修复（2025-01-14）

**问题诊断：**
- 原系统存在CSS实时渲染 + Canvas异步渲染冲突
- 用户操作时图片会乱跳、恢复原状、效果不稳定

**解决方案：**
- 只保留CSS实时预览，移除Canvas异步处理
- PDF导出时统一使用Canvas处理所有变换
- 实现"快+稳+所见即所得"的用户体验

**修复效果：**
- ✅ 点击立即响应，无延迟
- ✅ 不会乱跳，不会恢复原状
- ✅ 预览效果 = PDF最终效果

### 功能状态
- ✅ **文件上传**：支持HEIC/HEIF格式拖拽和选择上传
- ✅ **实时编辑**：旋转、翻转、调色功能稳定
- ✅ **智能排版**：页面尺寸和边距选择
- ✅ **PDF导出**：统一Canvas处理，确保效果一致
- ✅ **拖拽排序**：多文件批量处理
- ✅ **SEO优化**：robots.txt、sitemap.xml、URL配置
- ✅ **代码质量**：ESLint配置和依赖版本修复

## 当前状态：完全可用

项目已完成核心功能开发和SEO优化。网站功能正常，可以进行HEIC到PDF的转换操作，搜索引擎友好。

## 项目结构

```
heictopdf.shop/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 主页面
│   ├── layout.tsx         # 根布局
│   └── api/               # API路由
├── components/            # React组件
│   ├── hero-section.tsx   # 主功能区域（核心）
│   ├── edit-toolbar.tsx   # 编辑工具栏
│   ├── footer.tsx         # 页脚组件
│   └── ui/               # shadcn/ui组件库
├── lib/                  # 工具函数
│   └── image-transform.ts # 图片变换处理
└── public/              # 静态资源
    ├── robots.txt        # SEO文件
    ├── sitemap.xml       # 网站地图
    └── logo.png          # 网站Logo
```

## 快速开始

### 本地开发
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

### 部署
项目已优化用于Vercel部署，推送到主分支后自动部署到生产环境。

## 浏览器兼容性

### 支持的浏览器
- Chrome 88+
- Firefox 90+  
- Safari 14+
- Edge 88+

### 核心API依赖
- File API（文件处理）
- Canvas API（图片渲染）
- Blob API（文件下载）
- WebAssembly（libheif-js运行时）

## 部署状态

- ✅ 网站已部署到 https://www.heictopdf.shop/
- ✅ Google Analytics 已集成
- ✅ Microsoft Clarity 已集成
- ✅ 响应式设计，移动端适配良好
- ✅ SEO优化完整（robots.txt、sitemap.xml）
- ✅ URL配置统一，解决重定向问题
- ✅ 页脚邮箱：yiner2396@gmail.com

---

*本文档基于最新代码状态，持续更新中。*
