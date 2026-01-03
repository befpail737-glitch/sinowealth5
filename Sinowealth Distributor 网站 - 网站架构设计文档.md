# Sinowealth Distributor 网站 - 网站架构设计文档

## 1. 项目概述

### 1.1 项目目标
建设一个专业的Sinowealth（中颖电子）授权代理商网站，为全球客户提供产品信息、技术支持和分销服务，重点优化SEO表现以提高在搜索引擎中的排名。

### 1.2 网站定位
- 面向全球电子元器件采购商和工程师
- 专业分销商平台
- 技术支持中心
- 产品选型指南

## 2. 网站信息架构

### 2.1 导航结构
```
首页 (Home)
├── 产品中心 (Products)
│   ├── 8-bit MCU (8位单片机)
│   ├── 32-bit MCU (32位单片机)
│   ├── 电池管理 (Battery Management - BMS)
│   └── 显示驱动 (Display Drivers)
├── 解决方案 (Solutions)
│   ├── 电动两轮车BMS方案 (E-bike BMS Solution)
│   ├── 变频冰箱控制方案 (Inverter Refrigerator Control)
│   ├── 智能小家电方案 (Smart Home Appliances)
│   ├── AMOLED手机屏方案 (AMOLED Phone Screen Solution)
│   └── 手持吸尘器电机控制 (Handheld Vacuum Motor Control)
├── 技术支持 (Support)
│   ├── 选型指南 (Selection Guides)
│   ├── 应用笔记 (Application Notes)
│   └── 开发环境搭建 (IDE Setup)
├── 新闻中心 (News)
│   ├── 公司新闻 (Company News)
│   └── 行业动态 (Industry Trends)
├── FAQ (常见问题)
├── 关于我们 (About Us)
└── 联系我们 (Contact Us)
```

### 2.2 URL结构设计
```
https://sinowealth.elec-distributor.com/
├── /
├── /products/
│   ├── /mcu-8bit/
│   ├── /mcu-32bit/
│   ├── /bms/
│   └── /display-drivers/
├── /solutions/
│   ├── /ebike-bms/
│   ├── /refrigerator-control/
│   ├── /smart-appliances/
│   ├── /amoled-screen/
│   └── /vacuum-motor-control/
├── /support/
│   ├── /selection-guides/
│   ├── /application-notes/
│   └── /ide-setup/
├── /news/
│   ├── /company-news/
│   └── /industry-trends/
├── /faq/
├── /about/
└── /contact/
```

## 3. 页面层级结构

### 3.1 首页 (Home)
- **页面路径**: `/`
- **核心功能**:
  - 品牌形象展示
  - 核心产品导航
  - 技术优势说明
  - 最新资讯展示
- **标题**: "Sinowealth Distributor - Authorized Sinowealth Agent | Litong"
- **关键词**: "Sinowealth distributor", "中颖代理商", "SH36700 distributor"

### 3.2 产品中心 (Products) - 主分类页
- **页面路径**: `/products/`
- **核心功能**:
  - 产品分类概览
  - 快速产品导航
  - 产品搜索功能
- **内容元素**:
  - 产品分类卡片
  - 热门产品推荐
  - 新品发布信息

### 3.3 产品分类详情页
- **页面路径**: `/products/{category}/`
- **示例路径**:
  - `/products/mcu-8bit/`
  - `/products/mcu-32bit/`
  - `/products/bms/`
  - `/products/display-drivers/`
- **核心功能**:
  - 详细产品介绍
  - 技术规格说明
  - 型号对比表格
  - 选型指南链接
- **内容元素**:
  - 产品概述描述
  - 技术参数表格
  - 应用场景图示
  - 下载资源链接

### 3.4 产品型号列表页
- **页面路径**: `/products/{category}/{subcategory}/`
- **示例路径**: `/products/mcu-8bit/sh79f-series/`
- **核心功能**:
  - 具体型号展示
  - 参数筛选功能
  - 技术文档下载
- **内容元素**:
  - 可筛选的产品表格
  - 详细技术规格
  - 应用笔记链接
  - 替代方案建议

### 3.5 产品详情页
- **页面路径**: `/products/{category}/{model}/`
- **示例路径**: `/products/mcu-8bit/sh79f166a/`
- **核心功能**:
  - 详细技术规格
  - 应用案例展示
  - 相关产品推荐
- **内容元素**:
  - 产品规格表
  - 内部框图
  - 应用电路图
  - 相关文档下载
  - 询价表单

### 3.6 解决方案页
- **页面路径**: `/solutions/{solution-name}/`
- **示例路径**: `/solutions/ebike-bms-solution/`
- **核心功能**:
  - 解决方案介绍
  - 技术实现方案
  - BOM清单展示
- **内容元素**:
  - 方案框图
  - 核心优势
  - 推荐器件
  - 应用实例

### 3.7 技术支持页
- **页面路径**: `/support/`
- **核心功能**:
  - 技术文档分类
  - 选型工具
  - 开发资源
- **内容元素**:
  - 文档分类导航
  - 搜索功能
  - 标签系统

### 3.8 技术文章页
- **页面路径**: `/support/{article-category}/{article-name}/`
- **示例路径**: `/support/application-notes/sh79f-series-guide/`
- **核心功能**:
  - 技术指南
  - 应用笔记
  - 开发教程
- **内容元素**:
  - 技术内容
  - 相关代码
  - 下载资源
  - 作者信息

### 3.9 新闻中心页
- **页面路径**: `/news/`
- **核心功能**:
  - 公司动态发布
  - 行业资讯分享
  - 技术趋势分析
- **内容元素**:
  - 新闻分类
  - 发布时间
  - 标签分类

### 3.10 关于我们页
- **页面路径**: `/about/`
- **核心功能**:
  - 公司介绍
  - 团队实力
  - 合作资质
- **内容元素**:
  - 公司历史
  - 技术团队
  - 业务能力

### 3.11 联系我们页
- **页面路径**: `/contact/`
- **核心功能**:
  - 联系方式展示
  - 在线询价表单
  - 技术支持申请
- **内容元素**:
  - 联系信息
  - 联系表单
  - 地理位置

## 4. 网站组件架构

### 4.1 全局组件
- **头部导航 (Header)**
  - Logo区域
  - 主导航菜单
  - 语言切换
  - 搜索框
- **面包屑导航 (Breadcrumb)**
  - 显示当前位置
  - 快速路径导航
- **页脚 (Footer)**
  - 网站地图
  - 联系信息
  - 社交媒体
  - 版权声明

### 4.2 内容区域组件
- **英雄区域 (Hero Banner)**
  - 主标题
  - 副标题
  - 行动号召按钮
- **产品卡片 (Product Card)**
  - 产品图片
  - 产品名称
  - 简要描述
  - 快速链接
- **内容卡片 (Content Card)**
  - 标题
  - 摘要
  - 发布日期
  - 分类标签

### 4.3 交互组件
- **搜索功能 (Search)**
  - 搜索框
  - 搜索结果
  - 高级筛选
- **表格组件 (Table)**
  - 可排序列
  - 可筛选行
  - 分页功能
- **模态框 (Modal)**
  - 询价表单
  - 文档下载
  - 技术支持申请

## 5. 内容管理系统架构

### 5.1 内容类型分类
- **产品信息**: 技术规格、应用说明、文档
- **解决方案**: 技术方案、框图、BOM清单
- **技术文章**: 应用笔记、选型指南、开发教程
- **新闻动态**: 公司新闻、行业资讯

### 5.2 内容关联关系
- 产品→解决方案 (技术方案基于特定产品)
- 技术文章→产品 (应用笔记关联具体产品)
- 解决方案→应用领域 (方案适用于特定应用)

## 6. 数据库结构设计

### 6.1 产品表 (Products)
- 产品ID
- 产品型号
- 产品分类
- 技术参数(JSON)
- 描述信息
- 应用领域
- 文档链接
- 发布日期

### 6.2 解决方案表 (Solutions)
- 方案ID
- 方案标题
- 方案描述
- 技术框图
- 推荐产品
- 应用场景
- 发布日期

### 6.3 技术文档表 (TechDocs)
- 文档ID
- 文档标题
- 文档类型
- 关联产品
- 作者信息
- 发布日期

## 7. SEO架构设计

### 7.1 URL层级设计
- 层级深度控制在3层以内
- URL使用英文关键词
- 语义化URL路径

### 7.2 内容层级设计
- 首页→分类页→详情页的清晰层级
- 适当的内容聚合页面
- 合理的内链结构

### 7.3 导航架构
- 面包屑导航清晰
- 多维度导航系统
- 搜索功能完善

## 8. 移动端适配架构

### 8.1 响应式设计
- 移动端优先设计策略
- 灵活的网格系统
- 触摸友好的交互元素

### 8.2 移动端特殊组件
- 移动端导航菜单
- 简化的表单
- 优化的图片加载

## 9. 性能优化架构

### 9.1 资源优化
- CSS/JS压缩合并
- 图片格式优化
- 静态资源缓存

### 9.2 加载策略
- 关键资源优先加载
- 非关键资源延迟加载
- 图片懒加载

---

**文档版本**: 1.0  
**创建日期**: 2025年11月29日  
**项目**: Sinowealth Distributor Website