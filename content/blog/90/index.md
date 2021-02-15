---
mark: original
title: 使用leancloud做微信小程序后端
categories: [technology]
date: 2016-11-05 21:04:39
tags: [leancloud, 微信小程序]
author: {name: Seng Mitnick}
linktitle: "90"
comments: true
---
微信小程序公测后，就立刻尝试了，使用APPID的项目，在进行网络请求就有了域名限制了~

具体的使用方法直接看(leancloud官方文档)[https://leancloud.cn/docs/weapp.html]

这里说的，就是微信小程序后端域名设置不当会出现的错误，该错误如下：<!--more-->
{{<img name="1.png" caption="图1" alt="图1">}}

解决方法：
登录[微信公众平台](https://mp.weixin.qq.com)到你的小程序,设置界面->开发设置->服务器配置->修改->扫二维码->填写域名"app-router.leancloud.cn"->提交并修改。如图所示：
{{<img name="2.png" caption="图2" alt="图2">}}
{{<img name="3.png" caption="图3" alt="图3">}}
{{<img name="4.png" caption="图4" alt="图4">}}

**END……**