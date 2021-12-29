---
author: SengMitnick
title: "Vue Apollo/GraphQL使⽤⼿册"
linktitle: "337"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2021-09-15T16:24:42+08:00
categories: [technology]
tags: [vue, apollp, GraphQL使⽤⼿册]
comments: true
draft: true
toc: true
---

## GraphQL

### GraphQL 是什么？

`GraphQL` 是⼀个⽤于 `API` 的查询语⾔(API规范) 传统的 `API` 拿到的是前后端约定好的数据格式，`GraphQL` 对 `API` 中的数据提供了⼀套易于 理解的完整描述，客户端能够准确地获得它需要的数据，没有任何冗余，也可以利⽤⼀次请求获取复杂的数据结构。

如需了解更多内容请移步到[GraphQL](https://graphql.org/)

### GraphQL数据类型

GraphQL ⾃带⼀组默认标量类型:
- `Int`    : 有符号 32 位整数
- `Float`  : 有符号双精度浮点值
- `String` : `UTF‐8` 字符序列
- `Boolean`: `true` 或者 `false`
- `ID`     : `ID` 标量类型表⽰⼀个唯⼀标识符

### GraphQL基础概念

1. `query` 查询       : 获取数据
1. `mutation` 变更    : 对数据进⾏变更，⽐如增加、删除、修改 
1. `substription` 订阅: 当数据发⽣更改，进⾏消息推送

lg: 
```gql
query { 
  user { id }
}
```
上例是⼀个获取⽤户id的查询

## Vue Apollo

### 什么是 Apollo？ 

Apollo是⼀款可以帮助你在客户端使⽤GraphQL同服务端进⾏通信的⼯具。

详细内容可移步到 [Vue Apollo](https://v4.apollo.vuejs.org/)