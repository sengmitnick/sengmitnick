---
author: SengMitnick
title: "umi.define 应用问题"
linktitle: "umi.define 应用问题"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2021-05-10T14:52:35+08:00
categories: [technology]
tags: [umi, define]
comments: true
---

> 这是工作中看到同事的错误写法，特意记录下来～

{{<img name="01.png" alt="错误写法" caption="错误写法" >}}

相关使用文档：https://umijs.org/zh-CN/config#define

{{<img name="02.png" alt="原理分析" caption="原理分析" >}}

原理分析： `define` 中的变量在生产环境会被压缩掉，如果通过 `const {PXX_ENV1, PLATFORM1} = process.env;` 方式取值，会先被编译成以上截图代码，导致在生产环境中并没有被压缩掉～