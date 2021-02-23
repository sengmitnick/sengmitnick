---
author: SengMitnick
title: "根据 swagger 文档生成 typescript 客户端调用代码"
linktitle: "306"
cover: /images/cover/03.jpg
date: 2020-12-16T15:59:47+08:00
categories: [technology]
tags: [swagger,typescript]
comments: true
---

> 新公司后端API文档基于`swagger`打造，于是在项目开发过程中萌生了`通过nodejs生成typescript接口函数`的想法。

在GitHub、npm和gitee找了一下，发现[nswag-ts](https://gitee.com/smk17/nswag-ts)基本满足需求。

## 安装

``` shell
yarn add -D nswagger-ts
```

在 package.json 的 scripts 节点增加 2 个执行命令

``` json
{
  "scripts": {
    "nswag:init": "nswag init",
    "nswag:run": "nswag run",
  }
}
```

1. 执行：`yarn nswag-init` 初始化项目
2. 初始化完成后会在项目根目录创建文件夹 nswag,里面放置了配置文件及代码模板

以下是我的配置文件,支持多个模块生成。

``` js
var _ = require('lodash');

const SwaggerUrlBase = 'https://demo.com/api/%s/v2/api-docs';

const Apis = ['contents', 'material', 'customer', 'community', 'push', 'user', 'platform']
  .map(tagName => {
    return {
      SwaggerUrl: SwaggerUrlBase.replace('%s', tagName),
      ApiName: tagName.charAt(0).toUpperCase() + tagName.slice(1),
    };
  })
  .map(({ SwaggerUrl, ApiName }) => ({
    SwaggerUrl, // 接口文档地址（必填）
    ApiBase: '/api', // 接口根节点（必填）
    ApiName, // 接口名称（必填）
    //   // OutPath: '', // 输出目录（默认：项目根/src/api/{ApiName}）
    //   // TplPath: '', // 模板路径（默认：内部默认模板，也可以copy 到项目中进行修改，然后指定用项目中模板）
    //   // Mock: false, // 是否启用模拟数据 （默认：false）
    //   // FormatMock: null, // 接管模拟数据格式化
    FormatControllerName: function(name) {
      // 格式化模块名称（默认：接口名称+Api）
      return name
        .toUpperCase()
        .replace(/[«»\(\).,\-\/\[\]]/g, '')
        .replace(/\s*/g, '');
    },
    FormatMethodName: function(name) {
      // 格式化接口名称（默认：小驼峰命名）
      if (name === '/' || name === '') {
        return '';
      }
      const fnName = name.substring(name.lastIndexOf('/'));
      return _.camelCase(fnName);
    },
    FormatModelName: function(name) {
      // 格式化dto对象、枚举名称（默认：只会去除特殊字符）
      // if (name.indexOf('«') >= 0) {
      //   name = name.split('«')[1];
      // }

      name = name.replace(/[«»\(\).,\-\/\[\]]/g, '').replace(/\s*/g, '');
      if (name !== 'BaseResponse') {
        name = name.replace('BaseResponse', 'Response');
      }
      return name;
    },
  }));

module.exports = {
  Name: 'nswag-ts',
  Description: '根据swagger文档生成typescript客户端调用代码',
  Apis,
};

```

**END……**