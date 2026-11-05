# 墨记

一个 Hexo + 自写主题的极简博客，用来每天记录想法。

## 每天写一篇

双击 **写新文章.bat**，输入标题，回车。会自动生成当天的 Markdown 文件并用编辑器打开。
写完保存，回到这个文件夹双击 **本地预览.bat** 就能在浏览器里看到效果。

不想用 bat 的话，命令行等价操作：

```bash
node tools/new-post.js          # 新建文章
node tools/preview.js           # 本地预览 http://localhost:4000
```

## 文章格式

```markdown
---
title: 标题
date: 2026-11-05 10:00:00
tags: [随笔, 想法]
---

正文从这里开始，普通 Markdown 语法都支持。
```

图片：在 `source/_posts/` 下会有一个和文章同名的文件夹，把图片丢进去，正文里写
`![说明](图片文件名.jpg)` 即可。

想只让前几段出现在首页列表里，在要截断的地方加一行 `<!-- more -->`。

## 改站点信息

打开 `_config.yml`：

- `title` 站点名字
- `author` 你的名字
- `description` 一句话介绍
- `url` 部署后的真实网址（绑定域名或 GitHub Pages 后要改）

主题里的一句话和菜单在 `themes/ink/_config.yml`，配色在 `themes/ink/source/css/style.styl` 顶部的 `:root` 变量里。

## 发布到网上

### 方式一：GitHub Pages（免费，推荐）

1. 在 GitHub 新建仓库，名字必须是 `你的用户名.github.io`
2. 在本目录执行：

```bash
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git branch -M main
git push -u origin main
```

3. 仓库 Settings → Pages，Source 选 **GitHub Actions**，Hexo 会走 `.github/workflows/` 里的配置自动构建部署
4. 等一两分钟，访问 `https://你的用户名.github.io`

之后每次写完文章，只要：

```bash
git add -A
git commit -m "add post"
git push
```

站点会自动更新。

### 方式二：Vercel / Cloudflare Pages

把仓库导入进去，构建命令填 `npx hexo generate`，输出目录填 `public`，其余默认即可。

### 自己的域名

在域名服务商处添加一条 CNAME 记录指向 `你的用户名.github.io`，然后在仓库
Settings → Pages → Custom domain 里填上域名。国内服务器访问需要备案，GitHub Pages 不需要。
