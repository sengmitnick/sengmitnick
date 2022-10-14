---
author: SengMitnick
title: "在1024Code上通过Nginx配置C++的CGI程序实例"
linktitle: "在1024Code上通过Nginx配置C++的CGI程序实例"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2022-10-12T06:07:42Z
categories: [technology]
tags: [1024code,C++,Nginx,FastCGI]
comments: true
toc: true
---

> 在[1024Code](https://1024code.com/)搭建`Nginx+FastCGI`环境，通过`C/C++`编写CGI程序实例，在无框架下初步学习做`web`项目，建立对前后端的认知，了解前后端之间如何连接/通信/传参。

## 准备

要开始搭建，可以要先在[1024Code](https://1024code.com/)创建一个C++环境的代码空间啦～

## 安装 Nginx

[1024Code](https://1024code.com/) 安装软件通过 [NixOS](https://nixos.org/) 进行安装，所以第一步最简单就是通过 `pkgs.nginx` 安装了，但是成功安装后，却发现 nginx 的安装路径在 /nix/store/ 下，而当前用户无法修改里面的文件，导致无法修改 nginx 的配置。

于是想到通过源码安装 nginx 。首先需要安装依赖环境，通过修改 app目录 下的 .1024nix 然后 nix-shell .1024nix 即可。以下是 .1024nix 文件部分内容。

```py
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
    # ...
    packages = [
        # env
        pkgs.gcc11
        ### 新增的依赖包
        pkgs.zlib
        pkgs.pcre
        ### end 新增的依赖包
        pkgs.gnumake
        pkgs.openssl
        pkgs.sqlite
        pkgs.mysql57
        pkgs.jsoncpp
        # ...
    ];
}
```

为什么要源码安装 nginx 呢？因为我们可以通过 configure 指定 nginx 的安装路径呀，以下是安装过程的shell命令～

```sh
nix-shell .1024nix
mkdir tmp && cd tmp
wget http://nginx.org/download/nginx-1.23.1.tar.gz
tar -zxvf nginx-1.23.1.tar.gz
cd nginx-1.23.1
./configure \
    --prefix=/home/runner/app/nginx \
    --pid-path=/home/runner/app/run/nginx/nginx.pid \
    --lock-path=/home/runner/app/lock/nginx/nginx.lock \
    --error-log-path=/home/runner/app/log/nginx/error.log \
    --http-log-path=/home/runner/app/log/nginx/access.log \
    --with-http_gzip_static_module \
    --http-client-body-temp-path=/home/runner/tmp/nginx/client \
    --http-proxy-temp-path=/home/runner/tmp/nginx/proxy \
    --http-fastcgi-temp-path=/home/runner/tmp/nginx/fastcgi \
    --http-uwsgi-temp-path=/home/runner/tmp/nginx/uwsgi \
    --http-scgi-temp-path=/home/runner/tmp/nginx/scgi
make && make install
```

安装完成后，即可以通过命令行启动 niginx 啦～

```sh
#启动
/home/runner/app/nginx/sbin/nginx
#停止
/home/runner/app/nginx/sbin/nginx -s stop
#重新加载
/home/runner/app/nginx/sbin/nginx -s reload
```

## 安装 FastCGI 环境

需要我们基于C++写的CGI程序实例可以运行，并通过 niginx 访问，还需要搭建 FastCGI ，这里需要 spawn_fcgi 和 fcgiwrap，都可以通过nix安装啦～

```py
{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
    # ...
    packages = [
        # env
        pkgs.gcc11
        pkgs.zlib
        pkgs.pcre
        ### 新增的依赖包
        pkgs.fcgi
        pkgs.fcgiwrap
        pkgs.spawn_fcgi
        ### end 新增的依赖包
        pkgs.gnumake
        pkgs.openssl
        pkgs.sqlite
        pkgs.mysql57
        pkgs.jsoncpp
        # ...
    ];
}
```

2.然后修改 nginx.conf ，添加对 cgi 的 解析：

```sh
# ...
http {
   # ...
    server {
        # ...
        location ~ \.cgi$ {
            root   html;
            fastcgi_pass  127.0.0.1:9000;
            fastcgi_index index.cgi;
            include       fastcgi.conf;
        }
        # ...
    }
}
```

3.启动 fcgiwrap 即可啦～

```sh
spawn-fcgi -f fcgiwrap -p 9000
```

## 编写基于C++的CGI程序

1.创建一个cpp文件，写上一些内容：

```cpp
// demo.cpp

#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int count = 0;
    printf("Content-type: text/html\r\n"
        "\r\n"
        "<title>CGI Hello!</title>"
        "<h1>CGI Hello!</h1>"
        "Request number %d running on host <i>%s</i>\n",
        ++count, getenv("SERVER_NAME"));
    return 0;
}
```

2.然后通过g++编译成可执行文件发到html下即可。

```sh
g++ demo.cpp -o /home/runner/app/nginx/html/demo.cgi -lfcgi
```

3.访问 <host>/demo.cgi 即可看到我们写的内容啦～

## 优化启动命令

1.目前 fcgiwrap 只有启动命令，如果重启还需要通过 ps 参考对应进程号，在通过 kill 干掉。那么我们是否可以通过shell，弄一个类似 nginx 的这种模式呢？以下是我的实现：

```sh
# fcgi.sh
#! /bin/sh

DESC="spawn-fcgi daemon"
NAME=spawn-fcgi

BIND_HOST=127.0.0.1
BIND_PORT=9000

DAEMON_PIDFILE=/home/runner/app/run/spawn-fcgi.pid

d_start() {
  $NAME -a $BIND_HOST -p $BIND_PORT -f fcgiwrap -P $DAEMON_PIDFILE
}

d_stop() {
  kill -9 $(cat $DAEMON_PIDFILE) > /dev/null 2>&1 || echo -n " not running"
  rm $DAEMON_PIDFILE
}
  
case "$1" in
  start)
        d_start
        echo "."
        ;;
  stop)
        echo -n "Stopping $DESC: $NAME"
        d_stop
        echo "."
        ;;
  restart)
        echo -n "Restarting $DESC: $NAME"
        d_stop
        sleep 1
        d_start
        echo "."
        ;;
  *)
          echo "Usage: $SCRIPTNAME {start|stop|restart}" >&2
          exit 3
        ;;
esac

exit 0
```

2.现在即可通过命令行启动停止 fcgiwrap 啦～

```sh
#启动
sh /home/runner/app/fcgi.sh start
#停止
sh /home/runner/app/fcgi.sh stop
#重新加载
sh /home/runner/app/fcgi.sh restart
```

3.基于pid文件是否存在来判断 fcgiwrap 和 nginx 是否运行，就可以做一个启动命令，绑定到 运行 按钮下

```sh
# main.sh
#!/bin/bash

fcgiPidFile="/home/runner/app/run/spawn-fcgi.pid"
nginxPidFile="/home/runner/app/run/nginx/nginx.pid"

if [ -f "$nginxPidFile" ]; then
  /home/runner/app/nginx/sbin/nginx -s stop
fi
if [ -f "$fcgiPidFile" ]; then
  sh fcgi.sh stop
fi
mkdir -p /home/runner/tmp/nginx && ./nginx/sbin/nginx
sh fcgi.sh start

while true; do
  sleep 1
done
```

4.添加运行命令到.1024

```
run_command: "sh main.sh"
```

## 最后

最后，我基于以上过程搭建了一个简单的博客站点，目前只有首页实现了，感兴趣的可以Fork把剩下的做完～

{{<embed slug="5xM9SO4" h="495" title="用C++基于Nginx+FastCGI搭建一个博客站点">}}

## 参考

- [Nginx + CGI/FastCGI + C/Cpp](https://www.cnblogs.com/skynet/p/4173450.html)
- [Nginx 源码编译安装与运行](https://xie.infoq.cn/article/bf9b7b36f916cc70ecb6b45db)
- [Centos 下的 spawn-fcgi 启动脚本](https://www.programminghunter.com/article/8605501081/)