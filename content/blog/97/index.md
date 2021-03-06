---
mark: original
title: hexo本地环境的迁移与备份
categories: [technology]
date: 2017-06-09 15:20:12
tags: [hexo,备份]
author: SengMitnick
linktitle: "97"
comments: true
toc: true
---
> 这里记录本博客本地环境的迁移过程，有时候系统换了，hexo配置出问题解决不了肿么办？就如同Windows出问题又不知道怎么解决平时都是重装系统一样，重新init一个hexo就好了。

这里我推荐使用微软的OneDrive进行对hexo本地环境的时刻备份。。。<!--more-->

## 初始化
首先重新初始化一个新的hexo
~~~ shell
hexo init blog
cd blog
npm install
~~~

## 文件迁移
把原hexo文件夹里的scaffolds、source、themes文件夹和_config.yml配置文件复制到刚刚初始化的blog文件夹下。

{{<img name="97.png" caption="资料迁移" alt="资料迁移">}}

## 恢复以前安装的插件
### 文章置顶
该设置参考给Hexo添加文章置顶功能

### 无痛使用本地图片
首先确认 _config.yml 中有 post_asset_folder:true 。

在 hexo 目录，执行
~~~ shell
npm install https://github.com/CodeFalling/hexo-asset-image --save
~~~

### sitemap & rss插件

在 hexo 目录，执行

```shell
npm install hexo-generator-feed --save
npm install hexo-generator-sitemap --save
```

### 本地搜索

在 hexo 目录，执行

```shell
npm install hexo-generator-search --save
```

至此，完成。