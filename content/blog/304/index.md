---
author: SengMitnick
title: "Hugo下添加 Back Top 功能"
linktitle: "304"
date: 2021-02-10T12:28:23+08:00
categories: [technology]
tags: [Hugo]
comments: true
toc: false
---

> 在给文章设置了`Hugo`默认的`TOC`功能后，发现如果文章过长，每次返回顶部抵达段落的过程太麻烦，虽然在我的`Google Pixel Slate`下通过`gg`即可快速回到顶部，但是我还是觉得有必要给我站点添加 `Back Top` 的功能

<!-- more -->

在动手之前，也可考虑其必要性，在[这里](https://www.zhihu.com/question/19921483)大家有过一定程度的讨论，也是看了这里我才知道还可以通过`gg`可快速回到顶部:)

目前功能实现的代码可直接参考：[9e6ba0c](https://github.com/sengmitnick/hugo-theme-hello-friend-ng/commit/9e6ba0cc1940ffa200fdf21787e7e808d2f126d0)

虽然还不是很完美，但也可基本使用了。后续慢慢迭代吧:)

## 参考资料
- [添加一键返回顶部功能](https://chowray.netlify.app/posts/it%E5%B0%8F%E8%AE%B0/2021-01-06-%E4%B8%80%E9%94%AE%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8/)
- [5种回到顶部的写法从实现到增强](https://www.cnblogs.com/xiaohuochai/p/5836179.html)