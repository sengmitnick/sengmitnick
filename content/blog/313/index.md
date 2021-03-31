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

## 升级到WSL2

> 下面的所有命令均需在有管理员权限的 PowerShell 中执行

### 安装WSL2功能模块

1. 如果之前没有用过 WSL，那么首先需要安装 Windows 10 的 WSL 功能：

```bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

2. 安装 WSL2 功能模块：

```bash
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

3. 上面的命令执行完毕后，重启电脑完成 WSL2 的安装。

### 安装Linux内核

至此为止我们只是开启了 WSL2 的功能，但是还需要安装对应的 Linux 系统内核。 请按照官方文档中的说明下载并安装对应软件包。
在 PowerShell 中，将 WSL 默认版本设置为2，这样之后安装的 Linux 发行版才会都安装在 WSL2 中。若没有安装上一步中的内核，此时系统会提醒你到对应的网址下载内核并安装。

```bash
wsl --set-default-version 2
```

## 安装喜欢的 WSL 发行版

在 Windows 应用商店搜索 WSL ，然后搜索栏会提示“在 Windows 上运行 Linux”，点进去，选择自己喜欢的 Linux 发行版，安装即可。这里我选择的是 Ubuntu，之后的所有内容也是基于 WSL Ubuntu 编写。

{{<img name="02.png" caption="安装 WSL 发行版" alt="安装 WSL 发行版" normal="true">}}

## 初始化 WSL

安装完成后可在开始菜单里找到 Ubuntu 的快捷方式，打开 Ubuntu 的快捷方式，第一次打开需要等待一段时间让它完成初始化。

{{<img name="03.jpg" caption="初始化 WSL" alt="初始化 WSL" normal="true">}}

初始化完成后，按照提示输入用户名和密码。（PS：在 Linux 命令行中输入密码时，密码不会出现*号占位符）。

在输入用户名时，你所输入的用户是打开命令行时默认登陆的用户，建议不要使用 root 作为默认登陆用户。如果使用了 root 作为默认登陆用户也没有什么大碍，可以再创建一个普通管理员用户并设置成 WSL 默认登陆用户，具体步骤会在下文中讲解。

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

### 设置代理

> 该设置基于 宿主Windows 使用 V2Ray 进行代理上网。

1. 设置Windows防火墙

直接把防火墙关掉乃最快方式。

2. 把宿主的代理软件设置成可以局域网共享：

{{<img name="10.png" caption="局域网共享" alt="局域网共享" normal="true">}}

3. 然后设置相应的环境变量即可。

#### bash

编辑`.bashrc`文件，底部添加以下代码：（参考[WSL 2 中配置终端走主机代理](https://wiki.imalan.cn/archives/WSL%202%20%E4%B8%AD%E9%85%8D%E7%BD%AE%E7%BB%88%E7%AB%AF%E8%B5%B0%E4%B8%BB%E6%9C%BA%E4%BB%A3%E7%90%86/)）

```bash
export hostip=$(cat /etc/resolv.conf |grep -oP '(?<=nameserver\ ).*');
export https_proxy="http://${hostip}:9999";
export http_proxy="http://${hostip}:9999";
export all_proxy="socks5://${hostip}:1081";
```

### 配置 Git

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com

# git status shows all files as modified #184
git config --global core.filemode false
git config --global core.autocrlf true
```

如果你 **git clone** 代码基于ssh，还需要执行以下命令：

```bash
# Load key "/root/.ssh/id_rsa": bad permissions
cd ~/.ssh
chmod 600 *
```

### 安装 NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

```bash
wget https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh
sh ./install.sh
```

### 配置环境变量

#### bash

编辑`.bashrc`文件，底部添加以下代码：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
export PATH=$PATH:$NVM_BIN
```

### 安装 npm 和 yarn

```bash
nvm install --lts
npm i -g yarn
```

## 参考

- [WSL 使用指南](https://zhuanlan.zhihu.com/p/36482795)
- [WSL2来了！但是能正常使用并不简单](https://zhuanlan.zhihu.com/p/144583887)
- [修改 Wsl 为 root 登录，并修改 root 密码](https://blog.csdn.net/zcy_wxy/article/details/103621808)
- [git status shows all files as modified #184](https://github.com/Microsoft/WSL/issues/184)
- [WSL 2 中配置终端走主机代理](https://wiki.imalan.cn/archives/WSL%202%20%E4%B8%AD%E9%85%8D%E7%BD%AE%E7%BB%88%E7%AB%AF%E8%B5%B0%E4%B8%BB%E6%9C%BA%E4%BB%A3%E7%90%86/)
- [WSL能否直接使用win10代理 ＃740](https://github.com/v2ray/discussion/issues/740)
- [使用git时ssh提示“Load key "/home/devid/.ssh/id_rsa": bad permissions”的解决办法](https://blog.csdn.net/qq_19004627/article/details/103417673)
