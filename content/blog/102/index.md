---
author: SengMitnick
date: 2017-07-02
linktitle: '102'
categories: [technology]
tags: [hexo, leancloud]
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
title: 通过leancloud创建hexo博客并具备后台管理功能
comments: true
toc: true
---

> leancloud的云引擎 `LeanEngine` 可以部署网站，那么通过LeanEngine当然也可以部署hexo了，况且有hexo-admin插件，可以在部署完成后通过后台进行管理，完全适合不会使用命令行的人使用了~

<!--more-->

更新：为防止重新部署导致在线上写的文件丢失，添加hexo-qiniu-sync插件，每次插件文件自动更新到七牛云存储

## 初始化hexo

通过终端初始化hexo

```shell
cd hexo
npm install --save hexo-admin
hexo server -d
open http://localhost:4000/admin/
```

## 初始化LeanEngine

通过终端初始化LeanEngine,关联到你在(leancloud)[https://leancloud.cn]控制台新建的用来部署hexo的应用（我的就是smk17）

```shell
lean switch
```

## 配置package.json

```js
{
  "name": "hexo-site",
  "version": "1.0.0",
  "private": true,
  "main": "server.js",
  "hexo": {
    "version": "3.3.7"
  },
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "hexo": "^3.2.0",
    "hexo-admin": "^2.2.1",
    "hexo-algolia": "^1.1.0",
    "hexo-generator-archive": "^0.1.4",
    "hexo-generator-category": "^0.1.3",
    "hexo-generator-index": "^0.2.0",
    "hexo-generator-search": "^2.1.1",
    "hexo-generator-searchdb": "^1.0.7",
    "hexo-generator-tag": "^0.2.0",
    "hexo-qiniu-sync": "^1.4.7",
    "hexo-renderer-ejs": "^0.2.0",
    "hexo-renderer-marked": "^0.2.10",
    "hexo-renderer-stylus": "^0.3.1",
    "hexo-server": "^0.2.0",
    "leanengine": "^2.0.4"
  },
  "engines": {
    "node": "6.x"
  }
}
```

## 创建server.js文件

```js
'use strict';
var AV = require('leanengine');
const { exec } = require('child_process');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var port = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);
var cli = 'hexo server -p ' + port;
console.log(cli);
var qiniu = {
	"access_key": process.env.AccessKey,
  "secret_key": process.env.SecretKey
}
var exec_qiniu = "echo '"+JSON.stringify(qiniu)+"' 1>qn.json "
exec(exec_qiniu, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
  exec(cli, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});
```

## 设置自定义环境变量

AccessKey和SecretKey从你的七牛那里获取
{{<img name="1.png" caption="设置自定义环境变量" alt="设置自定义环境变量">}}

PS: 目前发现hexo-qiniu-sync插件没起到相应作用，需研究下如何在hexo下部署云函数并创建定时器时刻更新~

**---END**
