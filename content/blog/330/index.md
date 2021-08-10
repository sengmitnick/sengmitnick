---
author: SengMitnick
title: "Prettier 使用宝典"
linktitle: "Prettier 使用宝典"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2021-05-25T13:47:05+08:00
categories: [technology]
tags: [prettier]
comments: true
toc: true
---

## VSCODE

安装 `Prettier` 的官方扩展：[https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

配置 `resolveGlobalModules` ，使 `Prettier` 使用项目本地依赖项中 `Prettier`。

``` json
{
	"prettier.resolveGlobalModules": true,
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## NPM

安装 prettier lint-staged pre-commit

以下是 `package.json` 配置：

``` json
{
  "pre-commit": [
    "lint-staged"
  ],
  "lint-staged": {
    "*.{js,jsx,less,md,json}": [
      "prettier --write"
    ],
    "*.ts?(x)": [
      "prettier --parser=typescript --write"
    ]
  },
}
```

## 参考
- https://github.com/prettier/prettier-vscode#prettier-resolution
- https://prettier.io/docs/en/configuration.html