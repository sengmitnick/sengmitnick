---
author: SengMitnick
title: 在 console 显示业务环境信息
linktitle: 在 console 显示业务环境信息
cover: /images/cover/339.jpg
images: [/images/cover/339.jpg]
date: 2021-09-16T02:57:15.000Z
categories: [technology]
tags: []
comments: true
draft: true
toc: true
---

## 前言

产品随着业务膨胀，产生了多种业务场景，开发人员和测试人员在开发测试过程中，无法显性的知道当前账户的业务场景，导致其复杂度曲线提升。于是有了把业务场景信息显性化的需求，但是开发侧也不想因为这个并不放到生产的小功能占据太多的工作量，于是最后定案在 `console` 显示即可。

## 核心代码实现

```ts
function getTags() {
  // global 是全局变量共享池
  const map = { ...global.PXX_ENV, ...global.PXX_SOLUTION };
  return Object.keys(map)
    .filter((k) => !!k.match(/__.*?__$/g)?.length)
    .filter((k) => {
      const newKey = k.replace(/__/g, '');
      return !!map[newKey];
    })
    .map((k) => {
      return { ...map[k], color: getColor(map[k].color) } as GlobalTagProps;
    });
}
const logColor = (color: string, radius = 6, right = 8) =>
  `display: inline-block;margin-right: ${right}px;border-radius: ${radius}px;padding: 2px 4px;font-size: 12px;color: #FFFFFF;background: ${color};border: 1px solid ${color};`;

const colors: string[] = [];
const msg = getTags().reduce((pre, { name, color }) => {
  colors.push(logColor(color));
  return `${pre} %c${name}`;
}, '');
// web端和 h5端
console.log(msg, ...colors);
// 小程序端
console.log('[system]', msg, ...colors);
```

### 运行截图

![运行截图](https://pic4.zhimg.com/80/v2-b9626928555f066fe70d8fa2b7e9b0a2.png)

### 具体实现代码

-   [全局变量共享池](https://gitee.com/pxx-design/pxx-design/blob/master/packages/utils/src/utils/global/index.ts#L157)
-   [环境信息组件](https://gitee.com/pxx-design/pxx-design/blob/master/packages/common/src/common/env-info/index.tsx)

### 设计思路

目前产品具备三端: `web端`、 `h5端`、 `小程序端` ，然后三端都是基于 react 开发，所以设计了 [EnvInfo组件](https://pxx-design.gitee.io/common/env-info), 然后在多端引入到相应位置即可。

然后在 [global](https://pxx-design.gitee.io/utils/global) 下定义了环境信息的设置规则，后续统一在 [global](https://pxx-design.gitee.io/utils/global) 下更新业务场景环境信息即可。

### 小程序

在常规的web环境，通过 [EventEmitter](https://pxx-design.gitee.io/utils/global/event-emitter) 机制即可实现用户在 `console` 输入相应命令即可查看环境信息。但是在小程序中却无法实现，于是通过 [vConsole-特殊格式](https://github.com/Tencent/vConsole/blob/dev/doc/tutorial_CN.md#%E7%89%B9%E6%AE%8A%E6%A0%BC%E5%BC%8F) 把环境信息固定输出到 `System` 面板。

![小程序](https://pic4.zhimg.com/80/v2-6680b371fad2a28fe7318d208ec716ec.jpg)

## 结语

主要还是在开发过程中，需要考虑多端的统一性问题，减少后面的维护成本。第一版的时候就只是简单的 && 判断，并不具备扩展性和维护成本。

![第一版](https://pic4.zhimg.com/80/v2-78760eba94c9f816b634f370abba42bf.png)

**END......**
