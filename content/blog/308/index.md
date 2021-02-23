---
author: SengMitnick
title: "打造专属自己的CloudIDE"
linktitle: "308"
cover: /images/cover/02.jpg
date: 2021-02-22T21:09:48+08:00
categories: [technology]
tags: [vscode, ide]
comments: true
toc: true
---

## 前言

最近带着小白到处玩，发现小白太重了，究其原因，是因为小白的本重+充电器。遂想能否有一台较轻并且续航久的笔记本用来外出使用呢？一开始想通过`iPad`+`code-server`发现效果不是很完美，于是再三选择用`google pixel slate`+`code-server`。于是就有了这篇文章。

## 安装

### 安装code-server

``` shell
curl -fsSL https://code-server.dev/install.sh | sh -s -- --dry-run
```

### 安装zsh和oh-my-zsh

参考[《 Ubuntu下安装zsh和oh-my-zsh 》](/305/)

## 改造

### 获取code-server安装位置

``` shell
which code-server 
cat /usr/bin/code-server
```

输出以下结果

``` shell
#!/usr/bin/env sh

exec /usr/lib/code-server/bin/code-server "$@"
```

可得知`code-server`安装目录位置在`/usr/lib/code-server`下;

### 替换code-server默认图标

> `code-server`默认的图标也太丑了，所以换掉:)

替换 `/usr/lib/code-server/src/browser/media` 下图标：

``` shell
➜  ~ ls /usr/lib/code-server/src/browser/media 
favicon.ico  favicon.svg  manifest.json  pwa-icon-192.png  pwa-icon-512.png  pwa-icon.png
```

PS: 除`manifest.json`其他图片都需要替换。

### 支持Powerline字体

> 因为我的`zsh`用了`agnoster`字体，所以需要支持`Powerline`字体.

创建目录`/usr/lib/code-server/src/browser/media/fonts`,并添加`MesloLGLDZRegular_for_Powerline`字体到该目录下;

编辑`/usr/lib/code-server/src/browser/pages/vscode.html`

``` html
  <!-- Copyright (C) Microsoft Corporation. All rights reserved. -->
  <!DOCTYPE html>
  <html>
    <head>
      <!-- more -->

      <meta id="coder-options" data-settings="{{OPTIONS}}" />

+     <style>
+       @font-face {
+         font-family: Meslo LG L DZ for Powerline;
+         src: url({{CS_STATIC_BASE}}/src/browser/media/fonts/MesloLGLDZRegular_for_Powerline.ttf);
+       }
+     </style>
    </head>
    <!-- more -->
  </html>
```

**……大功告成**
