---
author: SengMitnick
title: "dependencies和devDependencies的区别"
linktitle: "312"
cover: /images/cover/03.jpg
images: [/images/cover/03.jpg]
date: 2021-03-10T16:28:36+08:00
categories: [technology]
tags: []
comments: true
toc: false
---

当我们项目需要下载一个模块的时候，我们安装npm包（在项目目录下面npm install module_name）的时候，很多时候我们会在后面加上–save-dev 或 –save。这两个参数代表什么呢？

初识
相信很多人都会回答：

npm install module-name -save 自动把模块和版本号添加到dependencies部分
npm install module-name -save-dev 自动把模块和版本号添加到devdependencies部分

dependencies是什么呢？ 生产环境。
devdependencies是什么呢？ 开发环境。
网上也可以查到很多资料，大概回答意思是，我们搭建一个webpack+react+es6的项目，像webpack babel这种负责打包编译的，我们就应该装在开发环境，像react之类的装在生产环境。
可是为什么呢？
我们不能告诉我们这样做，我们就只这样做，我们要知之其所以然呀。
恩。我试着吧react放进了dependencies，打包出来的文件依然可以运行，并没有什么问题。
why ？？？难道文档只是建议而已吗？？？

实质区别
如果我们只是单纯的做项目，那么我们可简单地认为生产环境和开发环境做为一种友善的提示，实质没有什么区别；但是，如果在发布npm包的时候，两种环境安装方式是有很大区别的！！！

假设有以下两个模块：
模块A
- devDependencies
  模块B
- dependencies
  模块C
模块D
- devDependencies
  模块E
- dependencies
  模块A
npm install D的时候， 下载的模块为：
- D
- A
- C
当我们下载了模块D的源码，并且在根目录下npm install， 下载的模块为：
- A
- C
- E
所以，在发布npm包的时候，本身dependencies下的模块会作为依赖，一起被下载；devDependencies下面的模块就不会自动下载了；但对于项目而言，npm install 会自动下载devDependencies和dependencies下面的模块。

## 参考

- [specifying-dependencies-and-devdependencies-in-a-package-json-file](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file)
- [包应该放在devDependencies还是dependencies](https://guxinyan.github.io/2017/11/02/%E5%8C%85%E5%BA%94%E8%AF%A5%E6%94%BE%E5%9C%A8devDependencies%E8%BF%98%E6%98%AFdependencies/)