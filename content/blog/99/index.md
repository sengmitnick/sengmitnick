---
author: SengMitnick
title: Hostker+Hexo+TravisCI构建自动化博客
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
categories: [technology]
date: 2017-06-12
linktitle: '99'
tags: [ Hostker , Hexo , TravisCI ]
comments: true
---

> 本博客是放在Hostker服务器的（国内访问GitHub的速度实在不敢恭维），Hostker的应用只支持git和ftp，而且他的git有点怪，每次都要clone然后再push上去才不会出现奇怪的东西，所以是用不了Hexo deploy了，所以想到 push 后通过 [travis-ci](https://travis-ci.org/) 来自动git到Hostker上面，接下来就开工了…

<!--more-->
#  Hostker

​	Hostker是[九零创新实验室](https://www.90.cx/)做的服务器，我2012在他们弄了Hostker就开始用了，历经这么多年现在貌似只能是老用户可以用了，反正现在我是找不到注册入口了...

​	所以如果你是Hostker的老用户也可以接下去看...

​	在 `我的应用列表` 新建应用，成功后如下：
{{<img name="1.png" alt="应用详细资料" caption="应用详细资料" >}}

# Travis CI

​	使用 github 帐号登录 [https://travis-ci.org/](https://travis-ci.org/), 将博客项目（**你的博客.github.io**）开启，然后在项目下新建`.travis.yml` 配置文件，当 push 时 travis 自动读取这个配置文件来完成 hexo 的 generate 和 Push到Hostker应用上面，但是在Travis下不能输入任何字符，所以我们需要在Git地址的 `URL` 中包含用户名和密码，不过我们不可能把Git地址的 `URL` 直接放在`.travis.yml` 配置文件里面，那样任何人都可以有权限往你的Hostker应用提交代码，这是不安全的。

​	不过我们可以在Travis下对应我们博客项目的setting界面设置对应的Environment Variables，然后在`.travis.yml` 配置文件使用该参数，那别人就看不到了。

{{<img name="2.png" alt="Travis Setting界面" caption="Travis Setting界面" >}}

完整的.travis.yml 配置:

~~~ YAML
language: node_js
node_js: stable
before_install:
- git config --global user.name "sengmitnick"
- git config --global user.email "sengmitnick@163.com"
install:
- npm install hexo -g
- npm install hexo-deployer-git --save
- npm install
script:
- hexo clean
- git clone ${GH_REF} public
- cd ./public
- rm -fr !(.git)
- cd ../
- hexo g
after_script:
- cd ./public
- git add --all .
- git commit -m "updata website"
- git push -u origin master
branches:
  only:
  - blog-source
~~~

# 参考

[Hexo 博客 travis-ci 自动部署到VPS](https://uedsky.com/2016-06/travis-deploy/)

[hexo＋Travis-ci＋github构建自动化博客](http://blog.csdn.net/u012373815/article/details/53574002)

[用 Travis CI 自動部署網站到 GitHub](https://zespia.tw/blog/2015/01/21/continuous-deployment-to-github-with-travis/)

**---END**
