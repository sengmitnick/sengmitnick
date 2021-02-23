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

### nginx 反向代理

使用公网ip访问，非常不优雅，而且无法正常使用 https。因此需要使用反向代理的方式，通过指定的域名，让反向代理服务器将对应的请求Request发送到本地对应的端口上去，这样就实现了可以直接使用域名来访问，不必再加上端口号。

``` shell
upstream wss_code {
    server 127.0.0.1:内网穿透/code-server的端口 weight=1;
}
server {
    listen       80;
    server_name 域名;
    server_tokens off;

	  return       301 https://$server_name$request_uri;
}
server {
    listen 443 ssl;
    ssl_certificate  公钥路径;        # path to your cacert.pem
    ssl_certificate_key  私钥路径;   # path to your privkey.pem
    server_name 域名;

		#配置共享会话缓存大小
    ssl_session_cache   shared:SSL:10m;
    #配置会话超时时间
    ssl_session_timeout 10m;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-CAMELLIA256-SHA:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-SEED-SHA:DHE-RSA-CAMELLIA128-SHA:HIGH:!aNULL:!eNULL:!LOW:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS';
    server_tokens off;

    location / {
        proxy_pass http://wss_code;      # 转发

        proxy_read_timeout  1200s;
        proxy_set_header Host $host;
        proxy_set_header X-Real_IP $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr:$remote_port;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;   # 升级协议头
        proxy_set_header Connection upgrade;
    }

}
```
反向代理配置好之后，就可以直接输入域名来访问 code-server 了。

PS: CDN 配置待续……

### 安装zsh和oh-my-zsh

参考[《 Ubuntu下安装zsh和oh-my-zsh 》](/blog/305/)

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

## 参考

- [为 iPad 部署基于 VS Code 的远程开发环境](https://sspai.com/post/60456)
- [在线代码编写环境——云端的vscode：code-server](https://blog.sumblog.cn/archives/code-server.html)

**……大功告成**
