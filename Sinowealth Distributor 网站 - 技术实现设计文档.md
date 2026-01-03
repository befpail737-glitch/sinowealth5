# Sinowealth Distributor 网站 - 技术实现设计文档

## 1. 技术架构概述

### 1.1 技术栈选择
- **前端**: 原生HTML5 + CSS3 + JavaScript (ES6+)
- **构建**: 无构建工具 (保持纯静态)
- **部署**: Cloudflare Pages
- **图片格式**: WebP (带JPEG/PNG降级)
- **字体**: 系统字体优先，必要时加载网络字体

### 1.2 开发原则
- **轻量化**: 最小化HTTP请求和资源体积
- **兼容性**: 支持主流现代浏览器 (Chrome, Firefox, Safari, Edge)
- **性能**: 快速加载和响应
- **可维护性**: 清晰的代码结构和注释
- **可访问性**: 符合WCAG 2.1 AA标准

## 2. 文件结构设计

### 2.1 项目目录结构
```
sinowealth-distributor/
├── index.html (首页)
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── manifest.json (PWA配置)
├── css/
│   ├── main.css (主样式)
│   ├── components.css (组件样式)
│   ├── responsive.css (响应式样式)
│   └── utilities.css (工具类)
├── js/
│   ├── main.js (主脚本)
│   ├── components.js (组件脚本)
│   └── utils.js (工具函数)
├── images/
│   ├── svg/ (SVG矢量图标)
│   ├── webp/ (WebP格式图片)
│   ├── logos/ (品牌标志)
│   └── products/ (产品图片)
├── products/
│   ├── index.html (产品中心首页)
│   ├── mcu-8bit/
│   │   ├── index.html
│   │   └── sh79f-series.html
│   ├── mcu-32bit/
│   │   ├── index.html
│   │   └── sh32f-series.html
│   ├── bms/
│   │   ├── index.html
│   │   └── sh36700-series.html
│   └── display-drivers/
│       ├── index.html
│       └── oled-series.html
├── solutions/
│   ├── index.html
│   ├── ebike-bms.html
│   ├── refrigerator-control.html
│   ├── smart-appliance.html
│   ├── oled-repair.html
│   └── vacuum-motor-control.html
├── support/
│   ├── index.html
│   ├── selection-guides.html
│   ├── app-notes.html
│   └── ide-setup.html
├── news/
│   ├── index.html
│   ├── company-news.html
│   └── industry-trends.html
├── faq.html
├── about.html
└── contact.html
```

### 2.2 命名约定
- **CSS类名**: 使用BEM方法论 (block__element--modifier)
- **文件名**: 使用kebab-case格式
- **JavaScript变量**: 使用camelCase格式
- **ID**: 使用kebab-case格式

## 3. HTML结构规范

### 3.1 通用页面模板
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>Page Title - Sinowealth Distributor | Litong</title>
    <meta name="description" content="Page-specific description">
    <meta name="keywords" content="sinowealth,mcu,distributor,bms">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Page description">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://sinowealth.elec-distributor.com/page-url">
    <meta property="og:image" content="https://sinowealth.elec-distributor.com/images/og-image.jpg">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Page description">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://sinowealth.elec-distributor.com/page-url">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/components.css">
    <link rel="stylesheet" href="/css/responsive.css">
    <link rel="stylesheet" href="/css/utilities.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/css/main.css" as="style">
</head>
<body>
    <!-- Skip to main content for accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Header -->
    <header class="header" role="banner">
        <!-- Header content -->
    </header>
    
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb" aria-label="Breadcrumb">
        <!-- Breadcrumb links -->
    </nav>
    
    <!-- Main Content -->
    <main id="main-content" class="main-content" role="main">
        <!-- Page-specific content -->
    </main>
    
    <!-- Sidebar -->
    <aside class="sidebar" role="complementary">
        <!-- Sidebar content -->
    </aside>
    
    <!-- Footer -->
    <footer class="footer" role="contentinfo">
        <!-- Footer content -->
    </footer>
    
    <!-- Scripts -->
    <script src="/js/utils.js"></script>
    <script src="/js/components.js"></script>
    <script src="/js/main.js"></script>
</body>
</html>
```

### 3.2 语义化HTML结构
使用HTML5语义化标签，确保内容结构清晰：
- `<header>` - 页面头部
- `<nav>` - 导航区域
- `<main>` - 主要内容
- `<article>` - 独立文章
- `<section>` - 内容分区
- `<aside>` - 侧边栏内容
- `<footer>` - 页面底部

## 4. CSS架构设计

### 4.1 CSS架构 (ITCSS方法论)
```
|--- Settings
|    |--- _variables.css          # CSS变量定义
|--- Tools
|    |--- _mixins.css            # CSS混入函数
|    |--- _functions.css         # CSS函数
|--- Generic
|    |--- _reset.css             # 样式重置
|    |--- _box-sizing.css        # 盒模型设置
|--- Elements
|    |--- _typography.css        # 基础排版
|    |--- _links.css             # 链接样式
|    |--- _headings.css          # 标题样式
|--- Objects
|    |--- _layout.css            # 布局对象
|    |--- _grid.css              # 网格系统
|    |--- _lists.css             # 列表样式
|--- Components
|    |--- _header.css            # 头部组件
|    |--- _navigation.css        # 导航组件
|    |--- _buttons.css           # 按钮组件
|    |--- _cards.css             # 卡片组件
|    |--- _tables.css            # 表格组件
|    |--- _forms.css             # 表单组件
|    |--- _modals.css            # 模态框组件
|    |--- _hero.css              # 英雄区域组件
|--- Trumps
|    |--- _utilities.css         # 工具类
|    |--- _helpers.css           # 辅助样式
|    |--- _overrides.css         # 临时覆盖样式
```

### 4.2 CSS变量定义
```css
:root {
  /* 颜色变量 */
  --primary-color: #0072ce;        /* 科技蓝 */
  --primary-color-dark: #0056b3;   /* 深色科技蓝 */
  --primary-color-light: #4a90e2;  /* 浅色科技蓝 */
  --secondary-color: #f8f9fa;      /* 中性灰背景 */
  --accent-color: #ff6b35;         /* CTA橙色 */
  --accent-color-dark: #d85a29;    /* 深色橙色 */
  --text-color: #333333;           /* 主要文字色 */
  --text-color-light: #666666;     /* 次要文字色 */
  --text-color-lighter: #999999;   /* 辅助文字色 */
  --border-color: #e0e0e0;         /* 边框色 */
  --border-color-light: #f0f0f0;   /* 浅边框色 */
  --success-color: #28a745;        /* 成功状态 */
  --warning-color: #ffc107;        /* 警告状态 */
  --danger-color: #dc3545;         /* 危险状态 */
  --white: #ffffff;                /* 白色 */
  --black: #000000;                /* 黑色 */
  
  /* 间距变量 */
  --spacing-xs: 0.25rem;           /* 4px */
  --spacing-sm: 0.5rem;            /* 8px */
  --spacing-md: 1rem;              /* 16px */
  --spacing-lg: 1.5rem;            /* 24px */
  --spacing-xl: 2rem;              /* 32px */
  --spacing-xxl: 3rem;             /* 48px */
  --spacing-xxxl: 4rem;            /* 64px */
  
  /* 字体大小 */
  --font-size-xs: 0.75rem;         /* 12px */
  --font-size-sm: 0.875rem;        /* 14px */
  --font-size-base: 1rem;          /* 16px */
  --font-size-lg: 1.125rem;        /* 18px */
  --font-size-xl: 1.25rem;         /* 20px */
  --font-size-xxl: 1.5rem;         /* 24px */
  --font-size-xxxl: 2rem;          /* 32px */
  --font-size-xxxxl: 2.5rem;       /* 40px */
  
  /* 字体行高 */
  --line-height-base: 1.5;
  --line-height-heading: 1.25;
  
  /* 断点变量 */
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;
  
  /* 阴影变量 */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.16);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.19);
  --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.25);
  
  /* 边框半径变量 */
  --border-radius-xs: 0.125rem;
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-xl: 1rem;
  --border-radius-full: 9999px;
  
  /* 转换时间 */
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
  --transition-fast: 0.1s ease;
  
  /* 层级变量 */
  --z-index-dropdown: 1000;
  --z-index-sticky: 1020;
  --z-index-fixed: 1030;
  --z-index-modal-backdrop: 1040;
  --z-index-modal: 1050;
  --z-index-popover: 1060;
  --z-index-tooltip: 1070;
}
```

### 4.3 响应式网格系统 (CSS Grid + Flexbox)
```css
/* 容器类 */
.container {
  width: 100%;
  padding-right: var(--spacing-md);
  padding-left: var(--spacing-md);
  margin-right: auto;
  margin-left: auto;
}

.container-fluid {
  width: 100%;
  padding-right: var(--spacing-md);
  padding-left: var(--spacing-md);
  margin-right: auto;
  margin-left: auto;
}

/* 12列网格系统 */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: var(--spacing-md);
}

/* 响应式列类 */
.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-5 { grid-column: span 5; }
.col-6 { grid-column: span 6; }
.col-7 { grid-column: span 7; }
.col-8 { grid-column: span 8; }
.col-9 { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

/* 响应式前缀 */
@media (min-width: var(--breakpoint-sm)) {
  .col-sm-1 { grid-column: span 1; }
  .col-sm-2 { grid-column: span 2; }
  /* ... 其他列类 */
}

@media (min-width: var(--breakpoint-md)) {
  .container {
    max-width: 720px;
  }
  
  .col-md-1 { grid-column: span 1; }
  .col-md-2 { grid-column: span 2; }
  /* ... 其他列类 */
}

@media (min-width: var(--breakpoint-lg)) {
  .container {
    max-width: 960px;
  }
  
  .col-lg-1 { grid-column: span 1; }
  .col-lg-2 { grid-column: span 2; }
  /* ... 其他列类 */
}

@media (min-width: var(--breakpoint-xl)) {
  .container {
    max-width: 1140px;
  }
  
  .col-xl-1 { grid-column: span 1; }
  .col-xl-2 { grid-column: span 2; }
  /* ... 其他列类 */
}

/* Flexbox布局 */
.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.flex-column {
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}
```

### 4.4 组件样式实现

#### 4.4.1 按钮组件
```css
/* 基础按钮样式 */
.btn {
  display: inline-block;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-base);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.btn:hover,
.btn:focus {
  text-decoration: none;
  outline: 0;
  box-shadow: var(--shadow-md);
}

/* 主要按钮 */
.btn-primary {
  color: var(--white);
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover,
.btn-primary:focus {
  color: var(--white);
  background-color: var(--primary-color-dark);
  border-color: var(--primary-color-dark);
}

/* 强调按钮 */
.btn-accent {
  color: var(--white);
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}

.btn-accent:hover,
.btn-accent:focus {
  color: var(--white);
  background-color: var(--accent-color-dark);
  border-color: var(--accent-color-dark);
}

/* 轮廓按钮 */
.btn-outline-primary {
  color: var(--primary-color);
  background-color: transparent;
  background-image: none;
  border-color: var(--primary-color);
}

.btn-outline-primary:hover,
.btn-outline-primary:focus {
  color: var(--white);
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

/* 禁用状态 */
.btn:disabled,
.btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 大小变体 */
.btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-base);
  border-radius: var(--border-radius-lg);
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
  border-radius: var(--border-radius-sm);
}

/* 全宽按钮 */
.btn-block {
  display: block;
  width: 100%;
}
```

#### 4.4.2 卡片组件
```css
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: var(--white);
  background-clip: border-box;
  border: 1px solid var(--border-color-light);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-5px);
}

.card-img-top {
  width: 100%;
  border-top-left-radius: calc(var(--border-radius-lg) - 1px);
  border-top-right-radius: calc(var(--border-radius-lg) - 1px);
}

.card-body {
  flex: 1 1 auto;
  padding: var(--spacing-xl);
}

.card-title {
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-xl);
  font-weight: 600;
}

.card-text {
  margin-bottom: 0;
  color: var(--text-color-light);
  line-height: var(--line-height-base);
}

.card-link {
  color: var(--primary-color);
  text-decoration: none;
  transition: color var(--transition-base);
}

.card-link:hover {
  color: var(--primary-color-dark);
  text-decoration: underline;
}
```

#### 4.4.3 表格组件
```css
.table {
  width: 100%;
  margin-bottom: var(--spacing-xl);
  color: var(--text-color);
  background-color: transparent;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: var(--spacing-md) var(--spacing-lg);
  vertical-align: top;
  border-top: 1px solid var(--border-color);
  text-align: left;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid var(--border-color);
  background-color: var(--secondary-color);
  font-weight: 600;
  text-transform: uppercase;
  font-size: var(--font-size-sm);
  letter-spacing: 0.5px;
}

.table tbody + tbody {
  border-top: 2px solid var(--border-color);
}

.table-hover tbody tr {
  transition: background-color var(--transition-base);
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 114, 206, 0.075);
}

/* 响应式表格 */
.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* 可筛选表格 */
.filterable-table {
  position: relative;
}

.filter-input {
  width: 100%;
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
}
```

## 5. JavaScript功能实现

### 5.1 主脚本结构
```javascript
// js/main.js
(function(window, document) {
  'use strict';
  
  // 命名空间
  const Sinowealth = {
    init: function() {
      this.initComponents();
      this.initEvents();
      this.initAccessibility();
      this.initPerformance();
    },
    
    // 初始化UI组件
    initComponents: function() {
      this.initNavigation();
      this.initSearch();
      this.initTooltips();
      this.initModals();
      this.initAccordions();
    },
    
    // 绑定事件监听器
    initEvents: function() {
      this.bindScrollEvents();
      this.bindFormEvents();
      this.bindMobileEvents();
    },
    
    // 无障碍功能
    initAccessibility: function() {
      this.initSkipLinks();
      this.initFocusManagement();
    },
    
    // 性能优化
    initPerformance: function() {
      this.initLazyLoading();
      this.initImageOptimization();
    }
  };
  
  // DOM加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      Sinowealth.init();
    });
  } else {
    Sinowealth.init();
  }
  
  // 导出到全局
  window.Sinowealth = Sinowealth;
  
})(window, document);
```

### 5.2 导航和菜单功能
```javascript
// js/components.js
(function(window, document) {
  'use strict';
  
  const Components = {
    initNavigation: function() {
      // 移动端菜单切换
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      const navMenu = document.querySelector('.nav-menu');
      
      if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
          navMenu.classList.toggle('active');
          mobileToggle.classList.toggle('active');
          mobileToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
      }
      
      // 悬停菜单
      const menuItems = document.querySelectorAll('.nav-item.has-submenu');
      
      menuItems.forEach(item => {
        const submenu = item.querySelector('.submenu');
        if (!submenu) return;
        
        // 桌面端悬停显示
        if (window.innerWidth >= 768) {
          item.addEventListener('mouseenter', () => {
            submenu.style.display = 'block';
            submenu.classList.add('show');
          });
          
          item.addEventListener('mouseleave', () => {
            submenu.style.display = 'none';
            submenu.classList.remove('show');
          });
        }
        
        // 移动端点击切换
        if (window.innerWidth < 768) {
          item.addEventListener('click', (e) => {
            // 仅在点击菜单项时才展开，不拦截子菜单链接
            if (e.target.closest('.nav-link')) return;
            
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
          });
        }
      });
      
      // 滚动时固定头部
      let lastScrollTop = 0;
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // 向下滚动，隐藏头部
          header.style.transform = 'translateY(-100%)';
        } else {
          // 向上滚动，显示头部
          header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
      });
    },
    
    // 搜索功能
    initSearch: function() {
      const searchInputs = document.querySelectorAll('.search-input');
      const searchResults = document.querySelectorAll('.search-results');
      
      searchInputs.forEach(input => {
        input.addEventListener('input', this.debounce((e) => {
          const query = e.target.value.trim().toLowerCase();
          if (query.length < 2) {
            searchResults.forEach(result => result.style.display = 'none');
            return;
          }
          
          // 简单的客户端搜索（生产环境应使用服务端搜索）
          this.performSearch(query);
        }, 300));
      });
    },
    
    performSearch: function(query) {
      // 这里实现搜索逻辑
      // 可以是本地JSON数据搜索或API调用
      console.log(`Searching for: ${query}`);
    },
    
    // 表格筛选功能
    initTableFiltering: function() {
      const filterInputs = document.querySelectorAll('.filter-input');
      
      filterInputs.forEach(input => {
        const table = input.closest('.table-container').querySelector('.filterable-table');
        const rows = table.querySelectorAll('tbody tr');
        
        input.addEventListener('input', function() {
          const filterValue = this.value.toLowerCase();
          
          rows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            
            if (rowText.includes(filterValue)) {
              row.style.display = '';
            } else {
              row.style.display = 'none';
            }
          });
        });
      });
    },
    
    // 懒加载
    initLazyLoading: function() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              
              // 加载WebP格式，降级到JPEG/PNG
              if (img.dataset.webpSrc && this.supportsWebP()) {
                img.src = img.dataset.webpSrc;
              } else if (img.dataset.src) {
                img.src = img.dataset.src;
              }
              
              img.classList.remove('lazy');
              img.classList.add('loaded');
              
              imageObserver.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px'
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    },
    
    // 检测WebP支持
    supportsWebP: function() {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('webp') > -1;
    },
    
    // 防抖函数
    debounce: function(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  };
  
  // 导出组件功能
  window.Components = Components;
  
})(window, document);
```

### 5.3 表单验证和交互
```javascript
// js/utils.js
(function(window, document) {
  'use strict';
  
  const Utils = {
    // 表单验证
    initFormValidation: function() {
      const forms = document.querySelectorAll('form[data-validate]');
      
      forms.forEach(form => {
        // 防止重复绑定
        if (form.dataset.validated) return;
        form.dataset.validated = true;
        
        form.addEventListener('submit', function(e) {
          if (!Utils.validateForm(this)) {
            e.preventDefault();
          }
        });
        
        // 实时验证
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
          input.addEventListener('blur', function() {
            Utils.validateField(this);
          });
          
          input.addEventListener('input', function() {
            // 移除错误状态，当用户开始输入时
            this.classList.remove('error');
            const errorElement = this.parentNode.querySelector('.field-error');
            if (errorElement) errorElement.style.display = 'none';
          });
        });
      });
    },
    
    validateForm: function(form) {
      let isValid = true;
      const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      fields.forEach(field => {
        if (!this.validateField(field)) {
          isValid = false;
        }
      });
      
      return isValid;
    },
    
    validateField: function(field) {
      let isValid = true;
      let errorMessage = '';
      
      // 检查必填字段
      if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
      }
      // 检查邮箱格式
      else if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
      // 检查手机号格式
      else if (field.type === 'tel' && field.value && !this.isValidPhone(field.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
      
      // 显示/隐藏错误信息
      field.classList.toggle('error', !isValid);
      this.showFieldError(field, errorMessage);
      
      return isValid;
    },
    
    isValidEmail: function(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    
    isValidPhone: function(phone) {
      // 简单的手机号验证（中国号码格式）
      const regex = /^(\+86)?(1[3-9]\d{9})$/;
      return regex.test(phone.replace(/\s/g, ''));
    },
    
    showFieldError: function(field, message) {
      let errorElement = field.parentNode.querySelector('.field-error');
      
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = 'var(--danger-color)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--spacing-xs)';
        field.parentNode.appendChild(errorElement);
      }
      
      errorElement.textContent = message;
      errorElement.style.display = message ? 'block' : 'none';
    },
    
    // 加载状态指示器
    showLoading: function(element, show = true) {
      if (show) {
        element.innerHTML = '<div class="loader">Loading...</div>';
      } else {
        element.innerHTML = element.dataset.originalContent || '';
      }
    },
    
    // 通知提示
    showNotification: function(message, type = 'info', duration = 5000) {
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      notification.textContent = message;
      
      // 设置样式
      Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem',
        backgroundColor: type === 'error' ? 'var(--danger-color)' : 
                         type === 'success' ? 'var(--success-color)' : 
                         type === 'warning' ? 'var(--warning-color)' : 'var(--primary-color)',
        color: 'white',
        borderRadius: 'var(--border-radius-md)',
        zIndex: 'var(--z-index-tooltip)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '300px',
        wordWrap: 'break-word'
      });
      
      document.body.appendChild(notification);
      
      // 自动移除
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, duration);
    }
  };
  
  window.Utils = Utils;
  
})(window, document);
```

## 6. 响应式设计实现

### 6.1 移动端优先策略
```css
/* 移动端样式 */
.header {
  padding: var(--spacing-md);
  background-color: var(--white);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
  transition: transform var(--transition-base);
}

.nav-menu {
  display: none; /* 默认隐藏 */
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--white);
  box-shadow: var(--shadow-md);
  flex-direction: column;
  padding: var(--spacing-md) 0;
}

.nav-menu.active {
  display: flex; /* 激活时显示 */
}

.mobile-menu-toggle {
  display: block; /* 移动端显示按钮 */
  background: none;
  border: 1px solid var(--border-color);
  padding: var(--spacing-xs);
  border-radius: var(--border-radius-md);
  cursor: pointer;
}

.desktop-menu {
  display: none; /* 移动端隐藏桌面菜单 */
}

/* 平板及以上设备 */
@media (min-width: 768px) {
  .mobile-menu-toggle {
    display: none; /* 平板以上隐藏移动菜单按钮 */
  }
  
  .nav-menu {
    display: flex !important; /* 强制显示桌面菜单 */
    position: static;
    box-shadow: none;
    flex-direction: row;
    padding: 0;
  }
  
  .desktop-menu {
    display: flex;
  }
  
  .hero-section {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

/* 桌面端 */
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
  
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
```

### 6.2 触摸友好的交互
```css
/* 增大触摸目标 */
.btn,
.nav-link,
.product-card,
.form-input,
.table th,
.table td {
  min-height: 44px; /* 符合Apple和Google指南的最小触摸目标 */
  min-width: 44px;
}

/* 触摸反馈 */
.btn:active,
.nav-link:active,
.product-card:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

/* 移动端表单优化 */
.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-input {
  padding: var(--spacing-md);
  font-size: var(--font-size-lg); /* 增大字体便于操作 */
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  width: 100%;
}
```

## 7. 性能优化策略

### 7.1 图片优化
```html
<!-- 响应式图片 -->
<picture>
  <source media="(min-width: 992px)" srcset="/images/products/product-lg.webp" type="image/webp">
  <source media="(min-width: 768px)" srcset="/images/products/product-md.webp" type="image/webp">
  <source srcset="/images/products/product-sm.webp" type="image/webp">
  <source media="(min-width: 992px)" srcset="/images/products/product-lg.jpg" type="image/jpeg">
  <source media="(min-width: 768px)" srcset="/images/products/product-md.jpg" type="image/jpeg">
  <img src="/images/products/product-sm.jpg" 
       alt="Product Description" 
       loading="lazy"
       width="300" 
       height="200">
</picture>

<!-- 懒加载图片 -->
<img class="lazy" 
     data-webp-src="/images/products/product.webp" 
     data-src="/images/products/product.jpg" 
     alt="Product Description"
     width="300" 
     height="200">
```

### 7.2 代码分割和加载优化
```html
<!-- 预加载关键资源 -->
<link rel="preload" href="/css/main.css" as="style">
<link rel="preload" href="/js/main.js" as="script">
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>

<!-- 异步加载非关键CSS -->
<link rel="preload" href="/css/components.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/components.css"></noscript>
```

## 8. 可访问性实现

### 8.1 ARIA标签和语义化
```html
<!-- 导航地标 -->
<nav role="navigation" aria-label="Main navigation">
  <ul class="nav-menu">
    <li class="nav-item">
      <a href="/" class="nav-link" aria-current="page">Home</a>
    </li>
    <!-- 其他菜单项 -->
  </ul>
</nav>

<!-- 主要内容地标 -->
<main id="main-content" role="main">
  <!-- 页面主要内容 -->
</main>

<!-- 隐藏内容供屏幕阅读器使用 -->
<div class="sr-only" aria-live="polite" id="status-updates"></div>

<!-- 表单标签 -->
<form>
  <div class="form-group">
    <label for="email-input" class="form-label">Email Address</label>
    <input type="email" id="email-input" name="email" required aria-describedby="email-help">
    <div id="email-help" class="form-help">Please enter a valid email address</div>
  </div>
</form>

<!-- 跳转链接 -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### 8.2 CSS可访问性
```css
/* 屏幕阅读器专用样式 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 焦点指示器 */
.focusable:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .btn-primary {
    border: 2px solid var(--primary-color);
  }
  
  .text-color {
    color: var(--text-color) !important;
  }
}
```

## 9. SEO技术实现

### 9.1 结构化数据
```html
<!-- 产品页面Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Sinowealth SH79F166A",
  "description": "Enhanced 8051 MCU for home appliance control",
  "brand": {
    "@type": "Brand",
    "name": "Sinowealth"
  },
  "offers": {
    "@type": "Offer",
    "price": "Contact for pricing",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Litong"
    }
  },
  "model": "SH79F166A",
  "manufacturer": {
    "@type": "Organization",
    "name": "Sinowealth"
  },
  "category": "Microcontroller Unit"
}
</script>

<!-- 公司信息Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Litong",
  "description": "Authorized Sinowealth Distributor",
  "url": "https://sinowealth.elec-distributor.com",
  "logo": "https://sinowealth.elec-distributor.com/images/logo.png",
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+86-xxx-xxxx-xxxx",
    "contactType": "customer service",
    "areaServed": "Worldwide",
    "availableLanguage": ["English", "Chinese"]
  }],
  "sameAs": [
    "https://www.linkedin.com/company/litong",
    "https://twitter.com/litong"
  ]
}
</script>
```

### 9.2 PWA功能
```html
<!-- manifest.json -->
{
  "name": "Sinowealth Distributor",
  "short_name": "Sinowealth",
  "description": "Authorized Sinowealth Distributor - Litong",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0072ce",
  "icons": [{
    "src": "/images/icons/icon-192x192.png",
    "sizes": "192x192",
    "type": "image/png"
  }, {
    "src": "/images/icons/icon-512x512.png",
    "sizes": "512x512",
    "type": "image/png"
  }]
}
```

## 10. 部署和维护

### 10.1 Cloudflare Pages配置
```yaml
# cloudflare pages配置文件
build:
  command: "echo 'Pure static site, no build required'"
  output: "."
  root: "."

compatibility_date: "2023-01-01"

# 自定义头信息
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

# 缓存头信息
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 10.2 性能监控
```javascript
// 性能监控脚本
(function() {
  // 页面加载时间监控
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
    }, 0);
  });
  
  // 资源加载监控
  if ('performance' in window) {
    performance.getEntries().forEach(function(item) {
      if (item.duration > 500) { // 超过500ms的资源
        console.warn('Slow loading resource:', item.name, item.duration + 'ms');
      }
    });
  }
})();
```

---

**文档版本**: 1.0  
**创建日期**: 2025年11月29日  
**项目**: Sinowealth Distributor Website