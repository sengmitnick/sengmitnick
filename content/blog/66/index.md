---
mark: original
title: Windows利用vnc viewer远程连接MacOS
categories: [technology]
date: 2016-10-31 18:00:56
tags: [Windows, MacOS]
author: SengMitnick
linktitle: "66"
comments: true
toc: true
---
> 作为一个喜欢一个屏幕一部电脑就可以干所有事情的童孩，在使用了大半年Mac OS后又因各种原因逼迫用会windows并且最后导致经常在两个系统之间不停切换，这期间在Mac OS使用Parallels Desktop 来使用windows或者在windows使用vmware来使用Mac OS都不能让我满意，最后就想到使用远程桌面来使用，以下是教程。

<!--more-->

## 在MacOS开启屏幕共享
系统偏好设置-共享-勾选“屏幕共享”，然后在电脑设置—VNC显示程序可以使用密码控制屏幕输入8位密码，并输入登录使用的密码允许设置，这样就可以通过其它PC或Mac上的VNC Viewer来连接这台Msc进行远程控制了。（具体操作如下图）
{{<img name="1.jpg" caption="图1" alt="图1">}}
{{<img name="2.jpg" caption="图2" alt="图2">}}
记住控制密码，下面会用到~
## 安装VNC Viewer
推荐在[RealVNC 5.1注册码+官方原版下载（含VNC Viewer和VNC Server）](http://www.ihacksoft.com/vnc-realvnc-5.html)这篇文章里面下载RealVNC 5.0.5并安装，
或者直接在[这里](http://downloads.sengmitnick.com/RealVNC.Enterprise_iHackSoft.com_5.0.5.rar)下载
## 使用VNC Viewer连接Mac OS
### 输入要连接Mac OS的ip地址（即图1下的ip）
{{<img name="3.jpg" caption="输入ip地址" alt="输入ip地址">}}
### 输入在Mac中设置的密码
{{<img name="4.jpg" caption="输入密码" alt="输入密码">}}
然后就会进行连接了~~下面是连接成功的效果图：
{{<img name="5.jpg" caption="连接成功效果图" alt="连接成功效果图">}}
