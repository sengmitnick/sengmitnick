---
author: SengMitnick
title: "利用 gitee pages 提速自己的个人网站"
linktitle: "317"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2021-04-25T16:35:30+08:00
categories: [technology]
tags: [gitee, pages, blog, CDN]
comments: true
toc: true
---

## 前言

前阵子我在服务器上搭建的 **v2Ray** 挂了，无奈之下启动B计划，搭建了 **Trojan** 服务器，但是搭建成功后，虽然可以继续愉快的科学上网，却导致之前基于 **Nginx** 搭建的站点都挂掉了。不过还好，我的Nginx上面只配置了两个站点，一个就是目前的博客，还有就是我的 **Cloud IED** 了。

**Cloud IED** 可以通过修改 **Trojan** 服务器-伪装站点的 **root** 位置继续使用。而本来的博客站点，则可以考虑通过 GiteePages + dcnd 进行解决。

## 开启 Gitee Pages 服务

之前我的源码是放在**GitHub**上面，通过 **Gitee** 的导入仓库功能就可以导入我的源码到其上了。然后就是通过 **gh-pages** 进行作业啦～

{{<img name="1.jpg" caption="开启 Gitee Pages 服务" alt="开启 Gitee Pages 服务" normal="true">}}

就是每次更新站点有点繁琐，需要先同步GitHub，然后到 **Gitee Pages** 的页面进行更新。

## 通过阿里的 DCDN 进行全球加速

如果使用的是 GitHub Pages 功能的话，通过其中的自定义域名即可把自己的域名绑定并且可以自动更新**HTTPS证书**了。但是 **Gitee Pages** 并没有开放该功能（之前貌似有的，不过好像因为国内政策问题就关掉了），而我的站点评论使用的是 **disqus**，如果直接用 **Gitee** 提供的域名的话，评论数据就比较麻烦了。

所以我在想是否可以通过CDN的方式来曲线实现原有的自定义功能呢？一开始我是使用**七牛**的CDN进行的，因为一开始我就打算通过**七牛**的 **Kodo** + **CDN** 进行网站的迁移+提升，但是发现**Kodo**的站点功能有点缺陷，最后才选择了 **Gitee Pages** 。后面单纯的使用**七牛**的CDN也不行，一直卡在测试不通过。最后通过了阿里云的全站加速**DCDN**实现了，至于后面有什么坑再说啦～

**---END**