---
title: React Native使用各种坑
categories: [technology]
date: 2016-10-21 13:05:53
tags: [ReactNative]
author: SengMitnick
linktitle: "88"
comments: true
toc: true
---
> 正式开始学习React Native,其中遇到的各种坑将汇总于此~

## 问题反馈

### 1.出现“com.android.ddmlib.InstallException:
   Failed to establish session react-native”，详情如下：<!--more-->

   {{<img name="1.png" caption="图1" alt="图1">}}
   解决方法：
   问题参考了[这里](http://stackoverflow.com/questions/32577761/com-android-ddmlib-installexception-failed-to-establish-session-react-native)当中关于小米设备的解决方法，具体就是，如果是小米设备在开启USB调试后，继续在该界面往下滚动，找到"启用MIUI优化"，将其关闭即可（需重启手机），如下图：
   {{<img name="2.png" caption="图2" alt="图2">}}




### 2.运行安卓虚拟机出现“No accelerator found
    - failed to create HAX VM“，详情如下：

   ~~~ shell
   Failed to create vm ffffffff
   Failed to create HAX VM
   No accelerator found.
   failed to initialize HAX: Invalid argument
   Hax is enabled
   Hax ram_size 0x80000000
   ~~~

   解决方法：

   暂时没有找到真正的解决方法，出现该原因是我在Mac上同时开启了Parallels Desktop这个软件，中止该软件下的系统后即可运行。（参考[No accelerator found - failed to create HAX VM](http://stackoverflow.com/questions/39087532/no-accelerator-found-failed-to-create-hax-vm)）

### 3.服务器端版本过低或者过高
   详情如下两图：
      {{<img name="3.png" caption="图3" alt="图3">}}
      {{<img name="5.png" caption="图5" alt="图5">}}

   解决方法：

   终止现在运行的服务器，在终端重新执行“react-native run-android”或者“react-native run-ios”

### 4.每次重新安装程序在小米系统上都要设置一下以下权限：
   {{<img name="4.png" caption="图4" alt="图4" position="center">}}

   解决方法：
   待解决~~

**END……**