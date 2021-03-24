---
title: 什么时候使用 useMemo 和 useCallback
categories: [technology]
tags: [react]
date: 2021-03-21 13:55:43
author: SengMitnick
toc: true
comments: true
---

> 前阵子，在帮同事查看一个 Bug 时，发现用的一个组件里面，在调用事件里面使用值一直不生效，最后发现是 改组件渲染部分用了 useMemo 所致。

## 演示

{{<codesandbox title="useMemo 的错误使用示例" short="usememo-decuowushiyongshili-dqwgp" >}}

<!-- <code src="./demo.tsx" ></code> -->

## 参考

- [【译】什么时候使用 useMemo 和 useCallback](https://jancat.github.io/post/2019/translation-usememo-and-usecallback/)
- [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
