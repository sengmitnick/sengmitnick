---
mark: original
title: 温湿度测试软件
categories: [作品]
date: 2016-10-20 16:55:51
tags: [DoNet]
author: SengMitnick
linktitle: "87"
comments: true
toc: true
---
> 之前公司要求的温湿度模块终于出来了，但是一个个测试太麻烦，于是和另一个同事一起做了这个“温湿度测试软件”，他负责开发终端我负责数据显示与处理。

## 介绍
目前最终版效果如下：<!--more-->
{{<img name="2.jpg" caption="效果图" alt="效果图">}}

之前有10*5的版本，这是应客户要求改额度，代码配置有，可以直接修改的。源代码已经git到[这里](https://github.com/smk17/TempAndHumiTest)！

## 功能
* 测试参数设置：可以设置测试环境及误差
* 串口参数设置：设置对应串口参数以接受终端数据
* 调试：接受数据并保存
* 数据查看：查看目前所有数据，需搜索
* 数据分析：根据数据生成对应的折线图

## 问题反馈
客户机安装时出现以下报错：
{{<img name="1.png" caption="报错" alt="报错">}}

解决方法：

从[这里](https://www.microsoft.com/en-us/download/details.aspx?id=5555)现在环境依赖包安装即可。

**END……**