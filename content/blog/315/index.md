---
author: SengMitnick
title: "在taro项目中使用ahook出现 finally is not a function"
linktitle: "315"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2021-03-24T11:48:06+08:00
categories: [technology]
tags: []
comments: true
draft: true
toc: true
---

在taro项目中使用ahook出现this.service.apply(...).then(...).catch(...).finally is not a function

解决方法：
```js
(function () {
  if (typeof Promise.prototype.finally === 'function') {
    return
  }
  Promise.prototype.finally = function (fn) {
    return this
      .then(value => this.constructor.resolve(fn()).then(() => value))
      .catch(reason => this.constructor.resolve(fn()).then(() => { throw reason }))
  }
})()
```

## 参考

-- [https://github.com/alibaba/hooks/issues/474#issuecomment-666948017](https://github.com/alibaba/hooks/issues/474#issuecomment-666948017)