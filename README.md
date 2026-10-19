<p align="center">
  <img alt="SCP-MH" src="/public/logo-scp-mh.png" width="96" />
</p>
<br>
<span style="font-size:24px">SCP基金会Miraheze中文导航站</span>
<br>
导航站为一个纯静态的 <b>Vite + Vue 3 (Composition API) + Naive UI</b> 单页应用（SPA），包括对 Miraheze 站的简单介绍和指向Wikidot SCP维基的超链接，目前计划部署到 <b>Cloudflare Pages</b>。
</p>

## 本地开发

```bash
npm install
npm run dev        # http://localhost:5173
```

## 生产构建

```bash
npm run build      # 产出纯静态的 dist/ 目录
npm run preview    # 本地预览 dist/（http://localhost:4173）
```

## 部署

- **构建命令**：`npm run build`
- **输出目录**：`dist`
- 无需任何服务端配置，`dist` 中的文件全部为静态资源，可直接拖拽或连接 GitHub 仓库自动部署。

## 授权协议

MIT


