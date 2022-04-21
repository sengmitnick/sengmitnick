---
author: SengMitnick
title: "基于 pnpm 的 monorepo 组件库开发"
linktitle: "基于 pnpm 的 monorepo 组件库开发"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2022-04-21T02:19:18Z
categories: [technology]
tags: [pnpm,monorepo]
comments: true
toc: true
---

> 在上家公司一年的工作时间，给公司开发了一套不完全的[组件库](https://pxx-design.gitee.io/next/#/)。积累了一些经验和思考，在这里进行总结和回顾；并且以此开发一个属于自己的组件库。

## 准备

- [github](https://github.com/) 组件库全程以 GitHub 及其周边功能为主。
- [gitpod](https://gitpod.io/) IDE使用GitPod，只要你身边有一部能上网的电脑即可体验。
- [dumi](https://d.umijs.org/) 组件库文档网站基于dumi开发。
- [Vue3](https://github.com/vuejs/core) 应用pnpm工作区功能主要参考了Vue3的源码。

## 回顾

在入职PXX后，先弄了[v1版本的组件库](https://gitee.com/pxx-design/pxx-design)，基于 `lerna` 的 `monorepo` 代码结构。过程中发现每次 `init` 和 `build` 的速度在代码量上来红都很慢。

于是在[v2版本的组件库](https://gitee.com/pxx-design/next)中，选择了 `lerna+yarn` 的 `monorepo` 代码结构。在 init 上面有了质的提升了。

## 创建

使用 `dumi-template` 仓库进行初始化，访问 https://github.com/orejs/dumi-template 了解更多。
