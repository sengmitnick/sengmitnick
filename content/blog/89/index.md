---
mark: reprint
title: 给Hexo添加文章置顶功能
categories: [technology]
date: 2016-10-21 16:25:37
tags: [Hexo,置顶]
author: SengMitnick
linktitle: "89"
comments: true
---
> 博客里面总改有些文章要置顶的~~

文章参考了[这里](http://www.yuedongxu.cn/wod/)

用以下代码替换掉你Hexo博客目录下 `node_modules/hexo-generator-index/lib/generator.js` 里的代码:<!--more-->
``` js
'use strict';

var pagination = require('hexo-pagination');

module.exports = function(locals){
  var config = this.config;
  var posts = locals.posts;

    posts.data = posts.data.sort(function(a, b) {
        if(a.top && b.top) { // 两篇文章top都有定义
            if(a.top == b.top) return b.date - a.date; // 若top值一样则按照文章日期降序排
            else return b.top - a.top; // 否则按照top值降序排
        }
        else if(a.top && !b.top) { // 以下是只有一篇文章top有定义，那么将有top的排在前面（这里用异或操作居然不行233）
            return -1;
        }
        else if(!a.top && b.top) {
            return 1;
        }
        else return b.date - a.date; // 都没定义按照文章日期降序排

    });

  var paginationDir = config.pagination_dir || 'page';

  return pagination('', posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
```

使用方法如下：
  {{<img name="1.jpg" caption="图1" alt="图1">}}

类型是数字，代表优先级哈~

**END……**