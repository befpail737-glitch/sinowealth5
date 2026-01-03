# Sinowealth Distributor 网站 - 需求分析报告

## 1. 项目概述

### 1.1 项目名称
Sinowealth Distributor (中颖代理) 专业分销商网站

### 1.2 项目目标
- 打造专业的中颖电子（Sinowealth）授权一级代理商网站
- 域名: sinowealth.elec-distributor.com
- 针对全球市场，特别是 USA, India, Korea, Germany, Vietnam 等地区
- 提供原装正品、技术支持、BOM配单及优势价格

### 1.3 业务背景
力通（Litong）是中颖电子官方授权一级代理商，供应中颖8-bit/32-bit MCU、锂电池管理芯片（BMS）、OLED显示驱动芯片等全系列产品。网站旨在为全球客户提供专业的技术支持和分销服务。

## 2. 核心需求

### 2.1 SEO优化需求
- 深度百度及谷歌SEO优化
- URL结构清晰、静态化，包含面包屑导航
- 生成sitemap.xml用于SEO
- 定制所有页面Meta标签
- 图片添加包含关键词的alt属性
- 标题: "Sinowealth Distributor_Authorized Sinowealth Agent_Litong (中颖代理商_授权一级中颖电子代理_力通)"
- 描述: "力通 (Litong) 是中颖电子 (Sinowealth) 官方授权一级代理商，供应中颖 8-bit/32-bit MCU、锂电池管理芯片 (BMS)、OLED显示驱动芯片等全系列产品。提供原装正品、技术支持、BOM配单及优势价格。"
- 关键词: "Sinowealth distributor", "中颖代理", "Sinowealth MCU", "中颖代理商", "SH36700 distributor"

### 2.2 技术需求
- 框架: HTML + CSS (原生开发，无框架依赖)
- 部署: Cloudflare Pages
- 响应式设计，移动优先
- 加载速度快，用户体验佳
- 符合WCAG AA无障碍标准

### 2.3 内容需求
- 专业、内容丰富的B2B内容
- 面向工程师的技术文档
- 产品详细规格和应用场景
- 解决方案案例展示

## 3. 功能需求

### 3.1 首页功能需求
- 英雄横幅：强调"Sinowealth Authorized Distributor - Empowering Smart Home & Battery Management"
- 核心优势展示：原厂技术支持、现货库存、极具竞争力的价格、快速交付
- 核心产品领域：家电MCU、锂电池管理(BMS)、电机控制、显示驱动
- 解决方案与应用：小家电、电动两轮车、电动工具、智能穿戴
- 最新动态展示
- 行动号召：获取报价或联系工程师

### 3.2 产品中心功能需求
- 按产品分类：8-bit MCU, 32-bit MCU, 锂电池管理芯片(BMS), 显示驱动
- 每个分类包含详尽的中英文介绍、关键参数、典型型号、优势对比
- 型号表格（支持筛选）：Model, Core, Flash Size, RAM, Package, Application
- Schema.org Product Schema JSON-LD标记
- 选型指南入口
- 代理商技术点评
- 替代/配套产品建议
- FAQ模块
- 多样化CTA按钮

### 3.3 技术支持功能需求
- 分类管理：选型指南、应用笔记、开发环境搭建
- 标签系统：8051, ARM Cortex-M0, BMS, SH36700, SH79F, Keil C51
- 上下文链接系统
- 相关文章推荐
- FAE作者简介页面

### 3.4 解决方案功能需求
- 5个独立解决方案页面：
  - 电动两轮车BMS保护板方案（基于SH36700系列）
  - 变频冰箱控制板方案（基于32-bit MCU + 电机驱动）
  - 智能小家电/空气炸锅方案（基于SH79F系列）
  - AMOLED手机屏维修/替换方案（基于中颖显示驱动芯片）
  - 手持吸尘器电机控制方案
- 每页包含：方案框图、核心优势、推荐BOM清单、应用场景

### 3.5 新闻中心功能需求
- 区分"公司新闻"和"行业动态"
- 每篇内容不少于800字
- 使用NewsArticle Schema标记
- 专业性内容，解决工程师实际痛点

### 3.6 其他功能需求
- 关于我们：公司历史、FAE团队、库存能力
- 联系我们：网格布局，包含contact.txt内容
- WhatsApp: +86 15013702378
- WeChat: +86 18612518271
- FAQ页面

## 4. 设计需求

### 4.1 视觉设计
- 现代极简主义风格
- 主色调科技蓝(#0072ce)，辅助色中性灰(#f8f9fa)，CTA按钮橙色
- 生成SVG图标包：MCU、BMS、Display、Home Appliance等
- 抽象电路板线条、芯片晶圆纹理背景
- 基于"Sinowealth Distributor"或"Litong"的SVG Logo

### 4.2 交互设计
- 按钮悬停变色/上浮
- 卡片悬停阴影加深
- 导航栏滚动固定
- 触摸区域>44px
- 光滑过渡效果

## 5. 用户体验需求

### 5.1 导航需求
- 清晰的面包屑导航
- 逻辑清晰的菜单结构
- 快速搜索功能
- 内部链接策略

### 5.2 内容体验
- 专业性内容，面向工程师
- 详细的技术规格
- 应用案例和解决方案
- 易于理解的产品说明

### 5.3 交互体验
- 响应式布局，适配所有设备
- 简洁的表单设计
- 明确的行动号召按钮
- 快速的页面加载速度

## 6. 技术实现需求

### 6.1 前端技术
- HTML5语义化标签
- CSS3原生开发，无框架依赖
- 响应式设计(CSS Grid + Flexbox)
- WebP图片格式，降级支持
- CSS变量管理颜色

### 6.2 性能需求
- 页面加载速度快
- 优化图片和资源大小
- 减少HTTP请求数量
- 字体加载优化

### 6.3 可访问性需求
- 符合WCAG AA对比度标准
- 语义化HTML结构
- ARIA标签支持
- 键盘导航支持

## 7. 内容策略需求

### 7.1 内容深度
- 新闻、解决方案、技术支持各发布5篇，每篇不少于800字
- 专业性内容，解决用户实际痛点
- 技术文档详实准确

### 7.2 关键词布局
- 首页：Sinowealth distributor, 中颖代理商
- 产品列表页：Sinowealth MCU, Sinowealth BMS + Distributor
- 产品详情页：具体型号 + Price/Distributor
- 解决方案页：应用方案 + Sinowealth
- 技术文章：Sinowealth programming guide, SH79F series compilation

### 7.3 内容类型
- 产品规格说明
- 技术应用笔记
- 解决方案案例
- 行业趋势分析

## 8. 预期成果

### 8.1 SEO成果
- 在搜索引擎中获得"Sinowealth distributor"和"中颖代理商"关键词的良好排名
- 提高网站自然流量
- 增强品牌在目标市场的知名度

### 8.2 业务成果
- 提高潜在客户转化率
- 增加技术咨询和询价请求
- 建立专业技术形象
- 扩大国际市场份额

### 8.3 用户成果
- 工程师能够快速找到合适的技术方案
- 客户能够方便地获取技术资料和产品信息
- 简化从选型到采购的流程

---

**文档版本**: 1.0  
**创建日期**: 2025年11月29日  
**项目**: Sinowealth Distributor Website