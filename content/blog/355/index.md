---
author: SengMitnick
title: "Mac 电脑使用 ClashX 作为网关旁路由"
linktitle: "Mac 电脑使用 ClashX 作为网关旁路由"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2022-05-11T03:31:55Z
categories: [technology]
tags: []
comments: true
toc: true
---

## 前言
最近入手了 Pixelbook，初始化连接网络就需要访问 google。那就需要Wi-Fi具备科学上网功能了，但是也不想为此特意去购置新的路由器，于是想着是否可以通过现在的MAC电脑作为网关旁路由。

## 教程

### 安装 ClashX
- [ClashX Pro](https://install.appcenter.ms/users/clashx/apps/clashx-pro/distribution_groups/public)

### 准备 ClashX 的配置文件

一般你订阅的服务应该会给 Clash 的订阅链接，如果没有也没关系，你可以通过第三方 [订阅转换](https://bianyuan.xyz/) 生成（推荐用这个，分流会丰富合理很多）:
1. 订阅链接填上你的 v2ray、ss 、trojan 的订阅（非 SSR 的订阅）
2. 客户端选择 Clash
3. 选择生成订阅链接就好了

#### 自建Trojan节点
Trojan单节点示例
trojan://密码@服务器地址:443?peer=#节点别名1

#### 添加配置
打开有 ClashX Pro 后，右上角会有一只小猫咪🐱的图标。右键选择 Config 配置 — Remote 托管配置 — Manage 管理。

{{<img name="01.jpg" alt="添加配置" caption="添加配置" >}}

然后选择 Add 添加，URL 填上你上一步生成的 Clash 订阅地址，Config name 可以给它取一个名字备注，然后选择 OK 确定。

#### 打开系统代理和增强模式
再次右键打开小猫咪选项，应该就能看到你的配置文件规则（你可以通过节点选择来配置默认的上网节点）。

我们还需打开

- Set as system proxy 设置为系统代理
- Enhanced Mode 增强模式（正是这个起到了网关路由器的作用）

{{<img name="02.jpg" alt="打开系统代理和增强模式" caption="打开系统代理和增强模式" >}}

这个时候你这一台电脑应该就能科学上网了。

### 将 Mac 设置为网关旁路由

> 强烈建议使用网线连接到电脑 ，Wi-Fi 其实也是 OK 的不过作为路由器，Wi-Fi 不会稳定。

打开 系统偏好设置 — 网络 — 以太网：

- 配置 IPv4 选择手动
- IP地址填写你局域网段里的一个就行（我的路由器是 192.168.68.1 所以 IP 地址我就填 192.168.68.2，只用修改最后一位在 2-225 之间就行。如果你的路由器是 192.168.31.1 你的 IP 地址就可以填 192.168.31.2，以此类推）
- 路由器就填写你路由器后台 IP 地址 （我的路由器是 192.168.68.1，你的如果是 192.168.31.1 你就填你路由器后台地址）

修改好选择应用。

{{<img name="03.png" alt="将 Mac 设置为网关旁路由" caption="将 Mac 设置为网关旁路由" >}}

### 修改路由器的 DHCP 选项

打开路由器后台，选择 内部网络（LAN）— DHCP 服务器 ，将默认网关由路由器的后台地址改为刚才你设置你 Mac 的 IP 地址。（我的这里默认网关原本是 192.168.68.1 我改为了我 Mac 的 IP地址 192.168.68.2）,DNS 服务器也得同样修改为 Mac 的 IP 地址。

PS: 因为我的路由器不支持修改，所以这里没做尝试。

#### 如果你的路由器不支持修改 DHCP 网关
##### 修改Wi-Fi的DHCP 网关

你可以手动修改 Wi-Fi 里想要科学上网的设备，配置 IP 地址为手动，将路由器即网关改为 Mac 的 IP 地址。（当然还是更建议你选择修改路由器 DHCP 选项会方便很多很多）

{{<img name="04.jpeg" alt="修改Wi-Fi的DHCP 网关" caption="修改Wi-Fi的DHCP 网关" >}}

## FAQ

### 删除退出 ClashX Pro 后如果不能上网得恢复网络设置：

https://jingyan.baidu.com/article/020278113fc2511bcc9ce5e8.html

## 参考
- [Mac 电脑使用 ClashX Pro 作为网关旁路由](https://qust.me/post/clashxProMac/)
- [自建Trojan节点如何转换为Clash托管地址和SSR PLUS/PASSWALL的订阅地址](https://fanqiang.network/425794.html)
