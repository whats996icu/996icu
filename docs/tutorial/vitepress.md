# 基于 VitePress 构建静态站点

## 创建 GitHub 仓库

新建仓库 `996icu`

## 克隆 GitHub 仓库到本地

`git clone https://github.com/whats996icu/996icu.git`

## 在本地仓库构建 VitePress 应用

### 前置准备

-   `Node.js` v20.12.0，使用 [nvm-windows](https://github.com/coreybutler/nvm-windows) 管理 `Node.js` 版本；
-   终端，使用 `Windows Terminal`；

```bash
npm add -D vitepress
```

### 安装向导

```shell
npx vitepress init
```

```shell
T  Welcome to VitePress!
|
o  Where should VitePress initialize the config?
|  ./docs
|
o  Site title:
|  My Awesome Project
|
o  Site description:
|  A VitePress Site
|
o  Theme:
|  Default Theme
|
o  Use TypeScript for config and theme files?
|  No
|
o  Add VitePress npm scripts to package.json?
|  Yes
|
—  Done! Now run npm run docs:dev and start writing.
```

### 文件结构

```shell
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.mjs
│  ├─ api-examples.md
│  ├─ index.md
│  └─ markdown-examples.md
│─ node_modules
│─ package.json
└─ package-lock.json
```

### 启动并运行

```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

```shell
npm run docs:dev
```

### 本地构建与测试

```shell
npm run docs:build
```

```sh
npm run docs:preview
```

## 部署

### 添加 .gitignore 文件

```
node_modules
docs/.vitepress/cache
docs/.vitepress/dist
.idea
```

### 设定 public 根目录

使用 Github Pages 并部署到 `whats996icu.github.io/996icu/`，需要将 `./vitepress/config.mjs` 的 `base` 设置为 `/996icu/`。

```js
...

export default defineConfig({
    base: '/996icu/',
    ...
});
```

### GitHub Pages

在项目的 `.github/workflows` 目录中创建一个名为 `deploy.yml` 的文件。

```
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消注释
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: npm run docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 推送到 GitHub 仓库

```shell
git status
git add -A
git commit -m 'feat: init'
git branch -M main
git push -u origin main
```

