---
author: SengMitnick
title: "Vant Openharmony 开发经验分享"
linktitle: "Vant Openharmony 开发经验分享"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2021-10-17T16:21:36+08:00
categories: [technology]
tags: []
comments: true
toc: true
---


## 前言

一个朋友给我推了[链接](https://gitee.com/openharmony-2021/#/)，就是[OpenHarmony组件开发大赛](https://gitee.com/gitee-community/openharmony_components)啦。然后按照[官网](https://gitee.com/openharmony-2021/#/)的参赛流程，加入了大赛的微信群。

## 过程

### 开发环境配置

按照[官网](https://gitee.com/openharmony-2021/#/)提供的 [OpenHarmony JS项目开发流程](https://gitee.com/isrc_ohos/ultimate-harmony-reference/blob/master/OpenHarmony%20JS%E9%A1%B9%E7%9B%AE%E5%BC%80%E5%8F%91%E6%B5%81%E7%A8%8B.md) 逐步配置。在一个天清气朗的周末，把 [open-harmony-js-demos](https://gitee.com/isrc_ohos/open-harmony-js-demos) 仓储运行起来啦。

PS: 还好途中没遇到奇奇怪怪的问题，哈哈:)

### 参赛选型

我看 Openharmony 组件 定位于手机和手表这一块，而在手机端的组件库全面性和活跃度，无疑是 [Vant](https://vant-contrib.gitee.io/vant/#/zh-CN/home) 了，而且最近给公司开发手机端的React&Taro组件库也是参考了 [Vant](https://vant-contrib.gitee.io/vant/#/zh-CN/home) 的源码的，熟悉程度也算可以了。

### 搭建仓储

开发一个组件库的流程，我们完全可以站在巨人的肩膀上，在这个搭建过程中，我参考了以下仓储的源码与其中思路：
- [Vant](https://github.com/youzan/vant)
- [Vant Weapp](https://github.com/youzan/vant-weapp)
- [Ant Design](https://github.com/ant-design/ant-design/)

#### 创建组织和仓储

一个开源组件库的仓储创建，一定不能在个人的名下，这对于后续社区的参与人员与维护都是极其不便利的，所以无论是国外的[github](https://github.com/)还是国内的[gitee](https://gitee.com/)都提供了创建组织的选项。

![创建组织](https://pic4.zhimg.com/80/v2-b3790b7cb1ee66552468605fa00b388c.png)

因为是[gitee](https://gitee.com/)组织的比赛，所以选择了在[gitee](https://gitee.com/)下创建了[Vant Openharmony](https://gitee.com/vant-openharmony)组织，然后在该组织下创建相应的仓储。

我这里创建了两个仓储，一个是组建库的[源仓储](https://gitee.com/vant-openharmony/vant)，另一个是基于 [open-harmony-js-demos](https://gitee.com/isrc_ohos/open-harmony-js-demos) 的 [example](https://gitee.com/vant-openharmony/example) ，主要用来测试和演示组件库的～

![创建仓储](https://pic4.zhimg.com/80/v2-57bd61ef9453fd9e01006d91709b1943.png)

#### 组织文件结构

既然做的是 Vant 的 Openharmony 版本，那么在 官方使用文档 这一块还是保持一致的好，通过阅读 [Vant](https://github.com/youzan/vant/blob/dev/package.json) 的源码发现官方有一个 Vue 组件库构建工具 [Vant Cli](https://github.com/youzan/vant/blob/dev/packages/vant-cli/README.md)。所以在项目初始化可以通过 [Vant Cli](https://github.com/youzan/vant/blob/dev/packages/vant-cli/README.md) 构建我们的项目。

但是呢，[Vant Cli](https://github.com/youzan/vant/blob/dev/packages/vant-cli/README.md) 是 针对 Vue 组件库的构建工具，很明显它自带的文件结构并不符合 Openharmony 组件库的，需要我们对其进行进一步的改造。

我们把 Openharmony 自定义组件所需要的文件放到 `packages` 文件夹下，得到以下的文件结构。

![第一版文件结构](https://pic4.zhimg.com/80/v2-58af8c9f01767715d0364b08405a26e8.png)

但是呢，我自己更喜欢 `typescript` 和 `less` ，所以对其捣鼓一番就得到以下的文件结构。

![第二版文件结构](https://pic4.zhimg.com/80/v2-5195f7745771aa19cc7d8ef7e793a66f.png)

然后为了使用 [Vant Cli](https://github.com/youzan/vant/blob/dev/packages/vant-cli/README.md) 内置的文档功能，还需要加上 相对应地 `README.md`、`index.vue` 和 `demo`文件夹。这里 `README.md` 就是我们组件的使用文档，`index.vue`是 [Vant Cli](https://github.com/youzan/vant/blob/dev/packages/vant-cli/README.md) Vue 组件代码，在这里对我们没用，但是需要存在用来欺骗 [Vant Cli](https://github.com/youzan/vant/blob/dev/packages/vant-cli/README.md) ，`demo`文件夹就是呈现到文档的 simulator 区域的网页。大致关系如下截图。

![关系图](https://pic4.zhimg.com/80/v2-91ed658c6425aec888631ba5c549ed41.png)

这样子最终的组件文件结构就出来啦～

![最终版文件结构](https://pic4.zhimg.com/80/v2-c502cd64946e9aaef69c4fef94f45e8d.png)

好，我们得到了我们想要的组件文件结构了，但是其中使用了一些 Openharmony 自定义组件不识别的文件格式和需要的文件。按理说，最终使用者用到的文件结构应该是我们最初的，所以这里我们就需要使用前端工程化工具进行打包了，在这里我选择了 `gulp` 。通过 `gulp` 我们把 `packages/*` 的组件打包到 `lib/*` 下，然后在文档中指出引入路径即可。最后我们得到了整体的项目文件结构。

``` bash
.
├── build· · · · · · · · 打包脚本文件夹--gulp脚本和shell脚本
├── docs · · · · · · · · Vant Cli 通用文档和自定义文档组件文件夹
├── lib· · · · · · · · · 编译后的组件库文件
├── packages · · · · · · 编译前的组件库源码
├── site · · · · · · · · Vant Cli 编译后的站点文件
├── static · · · · · · · 文档站点用到的静态资源，主要是组件运行截图
├── README.md· · · · · · 展示在仓储首页和npm的介绍文档
├── babel.config.js· · · babel配置文件
├── package.json · · · · package.json
├── postcss.config.js· · postcss配置文件
├── tsconfig.json· · · · typescript 默认配置文件
├── tsconfig.lib.json· · gulp针对ts打包的配置文件
├── vant.config.js · · · Vant Cli 配置文件
└── webpack.config.js· · 扩展 Vant Cli 内 webpack 功能的配置文件
```

### 打包和发布组件库

在项目中有两部分需要打包和发布：
- 组件库
- 组件库的使用文档

通过编写 `gulp` 脚本，输出最终可在 Openharmony 下使用的文件，然后通过 `np` 和 `npm publish` 即可发布组件库到 [npm](https://www.npmjs.com/) 了。在 [npm](https://www.npmjs.com/) 即可看到组件库的介绍啦，传送门：
[https://www.npmjs.com/package/oh-vant](https://www.npmjs.com/package/oh-vant)

通过 [Vant Cli](https://github.com/youzan/vant/blob/dev/packages/vant-cli/README.md) 打包生成站点，然后通过 `gh-pages` 推到 文档站点分支，使用 `Gitee Pages` 即可生成在线官方使用文档站点啦，传送门：[https://vant-openharmony.gitee.io/vant](https://vant-openharmony.gitee.io/vant)

![Gitee Pages](https://pic4.zhimg.com/80/v2-cd0e019060cc1032a2388779410321b6.png)

### 图标库

一个优秀的组件库，必然有自己的图标库，即ICON组件，而目前流行的用法就是用 [iconfont](https://www.iconfont.cn/) 啦。

一开始我是参考 [taro-iconfont-cli](https://github.com/iconfont-cli/taro-iconfont-cli)，打算弄一个不依赖字体，支持多色彩的图标库的，后面无奈发现做出来的效果不尽人意，只能退求其次。

通过查看官方文档--[自定义字体样式](https://developer.harmonyos.com/cn/docs/documentation/doc-references/js-components-common-customizing-font-0000000000628833)，发现其对自定义字体是支持的，于是就打造了不支持多色彩，依赖字体的图标库生成工具：[openharmony-iconfont-cli](https://gitee.com/vant-openharmony/iconfont-cli)。

### 仿微信小程序Component

一开始，组件的代码都是拷贝 [Vant Weapp](https://github.com/youzan/vant-weapp) 的源码，为了尽量贴近其代码，减少js代码的修改，实现了 [VantComponent](https://gitee.com/vant-openharmony/vant/blob/master/packages/common/component.ts#L16) 。其中通过 [typescript](https://www.typescriptlang.org/) 的[泛型](https://www.typescriptlang.org/docs/handbook/2/generics.html) 和 [ThisType](https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype) 实现了代码智能感知机制。

当然了，[VantComponent](https://gitee.com/vant-openharmony/vant/blob/master/packages/common/component.ts#L16) 还有一解耦一说，我们通过 [VantComponent](https://gitee.com/vant-openharmony/vant/blob/master/packages/common/component.ts#L16) 实现了 [微信小程序Component](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/) 的一些功能，如果后续官方也实现了类似的功能，我们只要更新  [VantComponent](https://gitee.com/vant-openharmony/vant/blob/master/packages/common/component.ts#L16) 即可，相当于在组件和官方API中间加了一层类似于系统和软件之间的驱动层。

## 遇到的问题

### hml中的class和style使用限制

一开始，我借鉴了 vant 的 createNamespace 功能，给每个组件提供了 bem 方法，用了快速拼接 class ，后面发现并不能在 class 里面写调用，只能用三元判断。还有 style 也不能直接用data的一个变量全部呈现，导致很多功能无法实现或者提高了实现的复杂度。

### 开发和生产环境下的文档网站差异

在第一次通过 `Gitee Pages` 生成站点后，发现站点的静态资源都丢失了，后面发现是 `PublicPath` 的设置问题，后面设置为 `"/vant/"` 后发现，生产环境是好了，但是本地开发下静态资源却丢失了。后面通过 `webpack` 的 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) 完美解决。

## 结语

在这里大致总结了一下整一个组件库的开发过程，还有一些细节遗忘了，后面想起来再进行补充了。这也是第一次开发非React的组件库了，算是把已有的知识点与经验进行一次梳理了。

最后，无论是造轮子或者看流行的开源库源码，都有它其中的乐趣所在。在你某个时候就有可能会用到你之前看源码，看书所学到的新知识了。

同时，也欢迎你去fork这个充满了私货的UI库，提Issues或者Pull Request都是非常欢迎的~

传送门：[https://gitee.com/vant-openharmony/vant](https://gitee.com/vant-openharmony/vant)

## 后续

哈哈哈，最后获得🥇第一名并且该文章在后续的有奖征文活动中获得二等奖，结果还算不错。

[获奖名单公布](https://gitee.com/gitee-community/openharmony_components/blob/master/%E8%8E%B7%E5%A5%96%E5%90%8D%E5%8D%95%E5%85%AC%E5%B8%83.md#%E8%8E%B7%E5%A5%96%E5%90%8D%E5%8D%95)

## 参考

- [Vant](https://github.com/youzan/vant)
- [Vant Weapp](https://github.com/youzan/vant-weapp)
- [Ant Design](https://github.com/ant-design/ant-design/)
- [OpenHarmony组件开发大赛](https://gitee.com/gitee-community/openharmony_components)
- [taro-iconfont-cli](https://github.com/iconfont-cli/taro-iconfont-cli)
- [harmonyos documentation](https://developer.harmonyos.com/cn/docs/documentation/doc-references/js-apis-overview-0000001056361791)
