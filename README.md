# HEICtoPDF.shop - 项目蓝图

## 项目概述

HEICtoPDF.shop 是一个专业的在线HEIC转PDF工具，致力于为用户提供快速、安全、免费的图片格式转换服务。项目采用纯前端技术实现，所有文件处理均在用户浏览器本地完成，确保隐私安全。

## 核心功能

### 主要特性
- **本地处理**：文件完全在浏览器端处理，无需上传到服务器
- **批量转换**：支持同时选择多个HEIC文件进行转换
- **拖拽排序**：用户可以拖拽调整图片在PDF中的顺序
- **即时转换**：点击转换按钮后立即生成PDF文件
- **自动下载**：转换完成后PDF文件自动下载到用户设备

### 用户界面组件
1. **Hero区域** - 主要的文件上传和转换功能区
2. **关于格式** - 介绍HEIC和PDF格式的基础知识
3. **优势展示** - 说明产品的四大核心优势
4. **使用步骤** - 展示三步简单的转换流程

## 技术架构

### 前端技术栈
- **框架**：Next.js 14（App Router）
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **组件库**：shadcn/ui（基于Radix UI）
- **图标**：Lucide React

### 核心依赖库
- **libheif-js**：用于解码HEIC/HEIF格式图片
- **pdf-lib**：用于生成PDF文件
- **next-themes**：主题管理支持

### 项目结构
```
heictopdf.shop/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 主页面
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
├── components/            # React组件
│   ├── hero-section.tsx   # 主功能区域
│   ├── about-section.tsx  # 格式介绍
│   ├── why-choose-us-section.tsx  # 优势展示
│   ├── how-to-convert-section.tsx # 使用步骤
│   ├── footer.tsx         # 页脚
│   └── ui/               # shadcn/ui组件库
├── lib/                  # 工具函数
└── public/              # 静态资源
```

## 现有功能详情

### 文件处理功能
- 支持HEIC、HEIF格式文件
- 拖拽上传和点击选择两种方式
- 文件格式自动检测和过滤
- 支持多文件批量处理

### 转换功能
- ✅ HEIC文件解码为JPEG格式（已实现）
- ✅ 多张图片合并为单个PDF文档（已实现）
- ✅ 图片在PDF中自适应缩放和居中（已实现）
- ✅ 保持原始图片宽高比（已实现）
- ✅ 根据尺寸选择生成对应PDF页面尺寸（A4/Letter为标准纸张，Auto为原图尺寸，所见即所得）
- ✅ 页面边距（无/小/中/大）可以选择；边距在PDF导出和预览中均已应用（所见即所得）

### 调试进展
- **libheif-js集成**：✅ 库正常导入，HeifDecoder工作正常
- **HEIC解码**：✅ 成功解码1440x960像素图片数据
- **Canvas渲染**：✅ ImageData正确写入Canvas
- **JPEG转换**：🔧 正在验证Canvas.toBlob()过程
- **PDF生成**：🔧 正在排查PDF嵌入和绘制问题

### 用户体验
- 响应式设计，支持移动端
- 拖拽排序图片顺序
- 实时转换进度提示
- 错误处理和用户提示

## SEO优化

### 页面元数据
- 标题：Convert HEIC to PDF Online - Fast & Free HEIC to PDF Converter
- 描述：专注于HEIC转PDF的完整描述
- 关键词：heic to pdf, convert heic to pdf, heic pdf converter等
- Open Graph和Twitter Card支持

### 技术SEO
- 语义化HTML结构
- 适当的heading层级
- 图片alt属性
- 结构化数据准备就绪

## 部署环境

### 开发环境
- Node.js 18+
- pnpm包管理器
- TypeScript 5.x

### 生产环境
- 针对Vercel平台优化
- 支持自定义域名heictopdf.shop
- 自动化CI/CD流程

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

## 项目状态

### 当前版本：0.1.0
- ✅ 响应式用户界面
- ✅ 本地文件处理
- ✅ 批量转换支持  
- ✅ SEO基础优化
- ⚠️ 核心HEIC转PDF功能（调试中）

### 功能状态详情
- ✅ **文件上传**：支持HEIC/HEIF格式拖拽和选择上传
- ✅ **HEIC解码**：libheif-js库成功解码HEIC文件
- ✅ **Canvas处理**：图片数据正确渲染到Canvas
- ❌ **PDF生成**：PDF文件能下载但内容为空白页
- ❌ **图片预览**：上传后无缩略图显示

### 当前问题
1. **PDF空白页问题**：HEIC解码成功，但PDF输出为空白
   - 状态：正在排查Canvas到JPEG转换过程
   - 影响：核心功能不可用
   
2. **缺少图片预览**：上传HEIC文件后显示灰色图标
   - 状态：计划在核心功能修复后解决
   - 影响：用户体验不佳

### 技术债务
- layout.tsx中的元数据需要更新为实际项目信息
- 错误处理可以进一步完善  
- 需要实现HEIC文件缩略图预览功能
- 可考虑添加更多文件格式支持

## 使用指南

### 本地开发
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

### 部署说明
项目已优化用于Vercel部署，推送到主分支后自动部署到生产环境。

## 近期核心变更与排查记录

### 2024-06-16
- 完成图片变换（旋转、翻转、滤镜）流程彻底组件化：
  - 新增 transformImageWithCanvas 工具函数，所有图片变换（旋转、翻转、滤镜）统一走该 util。
  - 预览缩略图和导出 PDF 全部调用该工具，彻底消除重复代码。
  - 预览区和导出 PDF 的图片效果100%一致，真正实现“所见即所得”。
  - 代码结构纯英文、组件化，SEO 友好。
- 遗留问题：如有极端图片格式或浏览器兼容性问题，需后续持续观察。

### 2024-06-10
- 实现 HEIC 缩略图预览，解决上传后灰色图标问题。
  - 问题：URL.createObjectURL 不支持 HEIC，导致上传后只显示灰色图标。
  - 方案：集成 libheif-js，将 HEIC 解码为 ImageData，再用 Canvas 渲染生成 dataURL 作为缩略图。
  - 结果：所有上传图片都能实时显示真实预览。

### 2024-06-11
- 编辑栏布局调整，解决“编辑栏始终居中、间距无法精确控制”问题。
  - 问题：父 div 使用 space-y-6，导致编辑栏和图片卡片间距固定，无法自定义。
  - 方案：去除 space-y-6，改为每个区块单独设置 margin，编辑栏与“X HEIC files selected”紧贴，图片卡片紧贴编辑栏下方。
  - 结果：布局精确可控，视觉舒适紧凑。

### 2024-06-12
- 实现图片编辑参数（旋转、调色）实时预览，所见即所得。
  - 问题：用户调整旋转/调色后，缩略图未实时反映。
  - 方案：每次参数变更后用 Canvas 重新渲染缩略图，生成新 dataURL 替换卡片预览。
  - 结果：用户每一步操作都能直观看到效果。

### 2024-06-13
- 统一下拉菜单样式，封装 DropdownMenuItem 组件。
  - 问题：各下拉菜单 hover/selected 效果不一致，部分菜单错误显示 icon。
  - 方案：封装通用 DropdownMenuItem 组件，所有菜单 hover:bg-gray-100，hover 动画 group-hover:translate-x-[2px]，只有旋转菜单有 icon。
  - 结果：所有下拉菜单风格统一，交互一致。

### 2024-06-14
- 排查并记录页面尺寸切换无效问题。
  - 问题：切换 A4/Letter/Auto 时，图片卡片宽高比例无变化。
  - 排查：Tailwind CSS 的 aspect-[x/y] 类动态拼接不会被编译，导致样式无效。
  - 方案建议：A. 在 tailwind.config.ts safelist 显式声明所有可能的 aspect-[x/y] 类；B. 用内联 style={{ aspectRatio: ... }}。
  - 结果：问题已定位，待选定最终修复方案。

### 2024-06-15
- 实现“根据尺寸选择生成对应PDF页面尺寸”功能。
  - 问题：用户选择A4/Letter/Auto时，下载PDF页面尺寸与所选不符。
  - 方案：A4/Letter模式下PDF页面为标准纸张尺寸，图片自适应居中显示，Auto模式下页面尺寸等于图片原始宽高。
  - 结果：三种模式下PDF页面尺寸与预览一致，所见即所得。

### 2024-06-17
- Completed: Page margin (None/Small/Medium/Large) feature. Margin selection is now available in the UI, fully integrated into both PDF export and preview. The effect is WYSIWYG and does not affect other features.

### 其它重要调整
- 所有 UI 文案统一为英文，按钮字体与“X HEIC files selected”一致。
- 图片卡片渲染逻辑优化，支持动态宽高比（为后续尺寸切换做准备）。
- 组件结构持续优化，所有功能均以独立组件实现，便于维护和扩展。
- SEO 相关结构和 alt 属性持续完善。
