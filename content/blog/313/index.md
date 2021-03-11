---
author: SengMitnick
title: "WSL 使用指北"
linktitle: "313"
cover: /images/cover/313.jpg
images: [/images/cover/313.jpg]
date: 2021-03-11T11:26:49+08:00
categories: [technology]
tags: []
comments: true
toc: true
---

## 什么是WSL

> WSL - Windows Subsystem for Linux
The Windows Subsystem for Linux lets developers run Linux environments -- including most command-line tools, utilities, and applications -- directly on Windows, unmodified, without the overhead of a virtual machine.

## 开启 WSL

> 待编写

## 安装Ubuntu的 WSL 发行版

> 待编写

## 初始化 WSL

> 待编写

## 启用 root 用户

输入以下命令，为 root 用户设置密码：

```bash
$ sudo passwd root
```

## 更改 WSL 默认登陆账号

> 此处默认子系统为 Ubuntu 20.04，如果你是其他 Linux 子系统可做参考~

在开始按钮右键，在弹出菜单中打开 Power shell，执行下面命令，查看已安装的 Linux 子系统：

```bash
wslconfig /list
```

Power shell 执行 bash 命令默认运行 Ubuntu：

```bash
wslconfig /setdefault Ubuntu-20.04
```

Power shell 设置 WSL Ubuntu 默认登陆用户，下面命令中 username 替换成你需要设为默认登陆的用户：

```bash
ubuntu2004.exe config --default-user username
```

Power shell 执行下面命令，可查看 Ubuntu 命令的帮助信息：

```bash
ubuntu2004.exe /?
```

## 安装 nodejs 开发环境

### 安装 NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

### 配置环境变量

#### bash

编辑`.bashrc`文件，底部添加以下代码：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
export PATH=$PATH:$NVM_BIN
```

## 参考

- [WSL 使用指南](https://zhuanlan.zhihu.com/p/36482795)
- [修改Wsl为root登录，并修改root密码](https://blog.csdn.net/zcy_wxy/article/details/103621808)