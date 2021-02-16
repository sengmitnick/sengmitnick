---
mark: original
title: 基于SHT3x传感器开发的C51程序
date: 2014-08-29 12:28:29
categories: [technology]
tags: []
author: SengMitnick
linktitle: "56"
comments: true
toc: false
---
其中，在看数据手册时发现一个问题：<!--more-->

{{<img name="1.png">}}

从中可以知道，`ADDR`的地址为`0x44`,但是在写程序的时候一直没有应答，这个问题使我非常疑惑，直到后来才发现，I2C的地址应该使用7位来表示，最后一位为读写位，即若进行写操作地址应该为`0x44<<1 + 0 = 0x88`，进行读操作地址应该为`0x44<<1 + 1 = 0x89`。
