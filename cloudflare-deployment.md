# Cloudflare Pages 部署配置

## 项目信息
- **项目名称**: Sinowealth Distributor Website
- **部署平台**: Cloudflare Pages
- **框架**: Static Site (纯HTML/CSS/JS)
- **构建命令**: 无 (无需构建步骤)
- **发布目录**: ./

## 部署配置

### 构建设置
```yaml
build:
  command: "echo 'Static site, no build required'"
  output: "."
  root: "."
```

### 环境变量
无需特殊环境变量

### 自定义域设置
- 主域: `sinowealth.elec-distributor.com`
- www子域: `www.sinowealth.elec-distributor.com`

## 性能优化配置

### HTTP头设置
```yaml
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY" 
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "no-referrer-when-downgrade"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, immutable, max-age=31536000"

[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

## 安全设置
- HTTPS强制启用
- DDoS防护
- 安全头设置
- 隐私保护

## 监控和分析
- 页面加载速度监控
- 可用性监控
- 访问统计分析
- SEO排名监控

## CI/CD流程
1. 代码提交到master分支
2. 自动触发构建流程
3. 部署到Cloudflare全球CDN
4. 自动化测试验证
5. 部署完成通知

## 维护任务
- 月度性能审查
- 季度安全审计
- 持续SEO优化
- 内容更新管理