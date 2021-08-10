---
author: SengMitnick
title: "umi.theme 参数剖析"
linktitle: "umi.theme 参数剖析"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2021-08-08T10:24:07+08:00
categories: [technology]
tags: [umi,less,modifyVars]
comments: true
---

其实就是 less的modifyVars功能

如果是通过js引入，会转化成less的格式：

输入：

``` js
module.exports = {
  '@hd': '1px',
  '@primary-color': '#1E78FF',
  '@url': `'https://ant-design.gitee.io/components/upload-cn/'`,
};
```

输出：

``` less
@hd: 1px;
@primary-color: #1E78FF;
@url: 'https://ant-design.gitee.io/components/upload-cn/';
```

PS: 注意声明链接时必须有引号，不然会报错哦～

基于modifyVars功能可以实现类似的CSS In JS 功能哦～
