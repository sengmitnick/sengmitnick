#! https://zhuanlan.zhihu.com/p/410655513
![Image](https://pic4.zhimg.com/80/v2-872930b11cd623f9d65504d32daf106b.jpg)

# 记录一次样式多次被引入的问题解决过程

## 前言

新写的[组件库](https://www.npmjs.com/package/@parallel-line/mobile)有全局样式，引起了一次样式多次被引入的问题。遂，进行了一次详细的分析与解决过程。

通过问题分析，发现导致样式多次被引入的问题有以下：
1. 自建组件库全局样式多次被引入；
2. 第三方组件库（[Antd](https://ant-design.gitee.io/)）不合理的引入方式引起重复样式覆盖；
3. 打包工具（[umi](https://umijs.org/zh-CN/config#dynamicimport)）的按需引入所引起的样式重复引入。

## 自建组件库全局样式多次被引入

通过删除原有默认引入的模式，改为手动引入。

https://gitee.com/pxx-design/pxx-design/commit/2cbf741560cab34ac4724af2fecb1934c659378a

💡 Tips: 后续可以研究antd的全局样式解决方案。

## 第三方组件库不合理的引入方式

通过代码审查，发现组件库和项目中引入antd的样式路径有 `antd/es/*`、`antd/lib/*`。导致antd的样式会加载两次。

项目使用 [umi](https://umijs.org/zh-CN/) 作为打包工具，其中，通过翻阅 [plugin-antd](https://umijs.org/zh-CN/plugins/plugin-antd) 的源码，发现编译后以`antd/es/*`为基准。于是修改组件库的  [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 的配置和项目中的引入方式。

![plugin-antd](https://pic4.zhimg.com/80/v2-27301ea062b19dd029bf836373c9b3a6.png)

💡 Tips: 目前只是在文档里规范了开发人员的规则，后续研究通过编译或`eslint`的方式强行提示。

## 打包工具的按需引入所引起的样式重复引入

该问题待解决，还没学到解决办法～

**END……**

> 原文链接: [记录一次样式多次被引入的问题解决过程](https://sengmitnick.com/blog/336/)
