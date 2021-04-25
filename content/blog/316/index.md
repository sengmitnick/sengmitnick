---
author: SengMitnick
title: "dumi build后，demo中引用的组件样式丢失"
linktitle: "316"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2021-03-25T15:55:56+08:00
categories: [technology]
tags: [dumi]
comments: true
toc: true
---

> 最近在基于 [dumi](https://d.umijs.org/) 封装组件库 [Parallel Line](https://supermoonlmy.gitee.io/parallel-line/)，发布到线上环境后发现样式丢失问题。这里记录一下解决经过与结果~

我的组件库项目是一个 lerna 项目， 和 [#225](https://github.com/umijs/dumi/issues/225) 中描述的问题一致，但是里面说到的方法都解决不了我的问题，最终只能简单粗暴的通过 gulp 处理。

```js
// gulpfile.js
var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var LessNpmImport = require('less-plugin-npm-import');

gulp.task('clean', () => del(['dist/**/*']));

gulp.task('less', () =>
  gulp
    .src('src/components/**/*.less')
    .pipe(
      less({
        plugins: [new LessNpmImport({ prefix: '~' })],
        javascriptEnabled: true,
      }),
    )
    .pipe(gulp.dest('dist/')),
);

gulp.task('default', gulp.series('clean', 'less'));
```

## 参考

- [dumi](https://d.umijs.org/)
- [#225](https://github.com/umijs/dumi/issues/225)

**---END**