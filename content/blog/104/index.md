---
author: {name: Seng Mitnick}
title: "基于disqus-php-api在Hexo博客中使用Disqus"
linktitle: '104'
date: 2017-07-16
categories: [technology]
tags: [hexo, disqus]
comments: true
weight: 10
---

> 不多说废话，这里基于 [fooleap](https://fooleap.org) 的 [disqus-php-api](https://github.com/fooleap/disqus-php-api) 对Hexo中的NexT主题进行兼容。

<!--more-->

# 更新

## 修复 `同一篇文章url不同都需要创建Thread` 的 bug
问题描述： 就用我这篇文章的链接做例子吧～ 对于链接 `http://smk17.cn/posts/104/` 、 `http://smk17.cn/posts/104/index.html` 、`http://smk17.cn/posts/104/?xxx` 、 `http://smk17.cn/posts/104/index.html?xxx` ,如果在 `http://smk17.cn/posts/104/` 创建了Thread在打开其他四个依然要你创建Thread的。

修复方案：
如果你已经阅读了本文，那么应该知道 `disqusapi.swig` 这个文件，修复方法就是修改改文件：
定位到该文件创建实例的位置，添加url参数：

``` js
var disq = new iDisqus('comments', {
    forum: '{{ theme.disqusapi.forum }}',
    site: '{{ theme.disqusapi.site }}',
    api: '{{ theme.disqusapi.api }}',
    mode: {{ theme.disqusapi.mode }},
    badge: '{{ theme.disqusapi.badge }}',
    timeout: {{ theme.disqusapi.timeout }},
    init: true,
    url: location.pathname.replace('index.html',''),
    emoji_list: emojiList
});
```
PS： url参数是比较新版本才有的，如果你添加了改参数后bug没修复，那你需要更新一下了。

## 修复 `No 'Access-Control-Allow-Origin' header is present on the requested resource.`
问题描述： 在使用smk17.cn这个域名访问时，disqus的加载完全没问题，但是当我用www.smk17.cn或者类似于cdn.smk17.cn的域名访问时就不行了，会一直加载（如图）：

{{<img name="2.gif" alt="bug界面效果" caption="bug界面效果" >}}

在浏览器打开调试窗口的 Console 可以看到是因为 请求资源上不存在“Access-Control-Allow-Origin”标头(如图)：

{{<img name="1.png" alt="原因" caption="原因" >}}


修复方案：

在这里，我们就需要修改服务端的代码，要修改的文件路径为：`your-disqus-php-path/init.php`

找到 `init.php` 文件中设置 `Access-Control-Allow-Origin` 部分：

``` php
namespace Emojione;
require_once('config.php');
require_once('emojione/autoload.php');
header('Content-type:text/json');
$origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '';  
if(preg_match('(localhost|127\.0\.0\.1|'.DISQUS_WEBSITE.')', $origin)){
    header('Access-Control-Allow-Origin: '.$origin);
}
$client = new Client(new Ruleset());
```

删除原本设置 `Access-Control-Allow-Origin` 的代码，替换以下的代码：
(其中，变量 `allow_origin` 是你要允许可以调用你后端的域名网址)

``` php
namespace Emojione;
require_once('config.php');
require_once('emojione/autoload.php');
header('Content-type:text/json');
//跨域访问的时候才会存在此字段  
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';    
     
$allow_origin = array(    
    'http://smk17.cn',
    'http://www.smk17.cn'
);    
     
if(in_array($origin, $allow_origin)){    
    header('Access-Control-Allow-Origin:'.$origin);     
}
$client = new Client(new Ruleset());
```

# 搭建评论系统后端

在这里我使用 `Hostker` 作为后端服务器，并且为了省钱，是跟本博客放在一起的,如果看过 [Hostker+Hexo+TravisCI构建自动化](/blog/99) `博客就知道我的博客搭建过程，Hostker` 是只支持 `php` 和静态网站，并且`PHP`是只能通过 `git` 上传才可以使用的，不过他价格非常便宜，在没什么流量的情况下只需要一天3分钱。（以下基于 `Hostker` 操作）

## 获取 `disqus-php-api`

输入以下命令行获取 `disqus-php-api` ：

``` sh
git clone https://github.com/fooleap/disqus-php-api
```

## 移动并重命名

然后把`disqus-php`文件夹移动到`smk17`(你在本地的网站目录)下并重命名为`disqus`

``` sh
mv disqus-php /path/to/smk17/disqus
```

## 修改 config.php

修改 `config.php` 的 `Disqus` 设置 那一块（以下是我网站的配置）；

``` php
define('DISQUS_PUBKEY', 'E8Uh5l5fHZ6gD8U3KycjAIAk46f68Zw7C6eW8WSjZvCLXebZ7p0r1yrYDrLilk2F');
define('DISQUS_USERNAME', 'your-blog');
define('DISQUS_EMAIL', 'your-email@163.com');
define('DISQUS_PASSWORD', 'your-password');
define('DISQUS_WEBSITE', 'http://your-website.cn');
define('DISQUS_SHORTNAME', 'your-shortname');
define('DISQUS_APPROVED', true);
```
PS: 注意 `DISQUS_WEBSITE` 是你的网站域名，如：`http://smk17.cn`，之前我填写为`http://smk17.cn/`,就是因为多了个 `/`, 导致一直处于 创建 Thread 的情况。

## 上传到服务器

修改完成后就可以上传到服务器了：

``` sh
git add --all .
git commit -m "updata website"
git push -u origin master
```

# 前端，兼容nexT主题

## 修改 Next 配置文件
首先需要在 Next 的配置文件中添加 disqus 的相关参数，配置文件路径为：`your-blog-path/themes/next/_config.yml`

找到配置文件中评论模块部分：

``` yml
# Swiftype Search API Key
#swiftype_key:
# Baidu Analytics ID
#baidu_analytics:
# Duoshuo ShortName
#duoshuo_shortname:
# Disqus
disqus:
  enable: false
  shortname: smk17
  count: true
```

在后面添加下面的代码

``` yml
disqusapi:
  enable: true
  forum: 'smk17'
  site: 'http://smk17.cn'
  api: 'http://smk17.cn/disqus/api'
  mode: 2
  badge: '博主'
  timeout: 3000
```

现在就可以通过修改配置文件轻松的打开关闭

## 添加 disqusapi 模块

Next 中的评论模块都存在下面的路径中： `your-blog-path/themes/next/layout/_third-party/comments/`

在其中新建名为 `disqusapi.swig` 的文件，内容为：

``` swig
{% if theme.disqusapi.enable %}
    <link rel="stylesheet" href="/disqus/dist/iDisqus.min.css" />
    <script src="/disqus/dist/iDisqus.min.js"></script>
    <script>
        var emojiList = [{
            code:'smile',
            title:'笑脸',
            unicode:'1f604'
        },{
            code:'mask',
            title:'生病',
            unicode:'1f637'
        },{
            code:'joy',
            title:'破涕为笑',
            unicode:'1f602'
        },{
            code:'stuck_out_tongue_closed_eyes',
            title:'吐舌',
            unicode:'1f61d'
        },{
            code:'flushed',
            title:'脸红',
            unicode:'1f633'
        },{
            code:'scream',
            title:'恐惧',
            unicode:'1f631'
        },{
            code:'pensive',
            title:'失望',
            unicode:'1f614'
        },{
            code:'unamused',
            title:'无语',
            unicode:'1f612'
        },{
            code:'grin',
            title:'露齿笑',
            unicode:'1f601'
        },{
            code:'heart_eyes',
            title:'色',
            unicode:'1f60d'
        },{
            code:'sweat',
            title:'汗',
            unicode:'1f613'
        },{
            code:'smirk',
            title:'得意',
            unicode:'1f60f'
        }]; 
        var disq = new iDisqus('comments', {
            forum: '{{ theme.disqusapi.forum }}',
            site: '{{ theme.disqusapi.site }}',
            api: '{{ theme.disqusapi.api }}',
            mode: {{ theme.disqusapi.mode }},
            badge: '{{ theme.disqusapi.badge }}',
            timeout: {{ theme.disqusapi.timeout }},
            init: true,
            emoji_list: emojiList
        });
        disq.count();
    </script>
{% endif %}
```

添加引用
在同一目录下的 `index.swig` 中添加：

``` swig
{% include 'disqusapi.swig' %}
```

现在，重新生成发布博客， `Disqus` 评论插件就出现在文章后面了。
不过每篇文章你可能需要创建 `Thread` 。不过如果你可以科学上网的话，`mode`选择1在加载原生`Disqus`评论系统就会为你自动创建了。

**---END**