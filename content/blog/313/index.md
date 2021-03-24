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

## 什么是 WSL

> WSL - Windows Subsystem for Linux
> The Windows Subsystem for Linux lets developers run Linux environments -- including most command-line tools, utilities, and applications -- directly on Windows, unmodified, without the overhead of a virtual machine.

Linux 的 Windows 子系统让开发人员无需虚拟机就可以直接在 Windows 上运行 Linux 环境，包括大多数命令行工具、程序和应用。

使用 WSL 的好处是：

与在虚拟机下使用 Linux 相比，WSL 更加流畅；
WSL 可以对 Windows 文件系统下的文件直接进行读写，文件传输更方便；
剪贴板互通，可以直接在 Windows 下其它地方复制文本内容，粘贴到 WSL；

## 开启 WSL

在 **控制面板-->程序和功能** 页面找到 **Windows 功能** ，在 **Windows 功能** 窗口中勾选 **适用于 Linux 的 Windows 子系统** 功能，点击确定，并按照提示重启电脑。

{{<img name="01.jpg" caption="开启 WSL" alt="开启 WSL" normal="true">}}

## 安装 Ubuntu 的 WSL 发行版

> 待编写

## 初始化 WSL

> 待编写

## 启用 root 用户

输入以下命令，为 root 用户设置密码：

```bash
$ sudo passwd root
```

## 更改 WSL 默认登陆账号

> 此处默认子系统为 Ubuntu 20.04，如果你是其他 Linux 子系统可做参考进行类比~

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

PS: 这里我主要设置默认登陆用户为 root 。

Power shell 执行下面命令，可查看 Ubuntu 命令的帮助信息：

```bash
ubuntu2004.exe /?
```

## 安装 nodejs 开发环境

### 配置 Git

```bash
git config --global core.filemode false
git config --global core.autocrlf true
```

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
- [修改 Wsl 为 root 登录，并修改 root 密码](https://blog.csdn.net/zcy_wxy/article/details/103621808)
- [git status shows all files as modified #184](https://github.com/Microsoft/WSL/issues/184)
