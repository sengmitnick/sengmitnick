---
mark: reprint
title: WIN2003+IIS6+PHP5.3.8的安装配置
date: 2014-05-28 07:28:52
categories: [technology]
tags: [windows,配置,PHP,IIS]
author: SengMitnick
linktitle: "47"
comments: true
toc: true
---
## 安装好IIS
### 安装Internet信息服务（IIS）
打开“控制面板”，然后单击启动 “添加/删除程序”， 在弹出的对话框中选择 “添加/删除Windows组件”，在Windows组件向导对话框中选中“Internet信息服务（IIS）”，然后单击“下一步”，按向导指示，完成对IIS的安装。
{{<img name="01.jpg" caption="图1—windows组件向导1" alt="图1—windows组件向导1" full="true" >}}
{{<img name="02.jpg" caption="图2—windows组件向导2" alt="图2—windows组件向导2" full="true" >}}
<!--more-->
### 启动Internet信息服务（IIS）

Internet信息服务简称为IIS，单击Windows开始菜单---所有程序---管理工具---Internet信息服务（IIS）管理器，即可启动“Internet信息服务”管理工具（如图3）
{{<img name="03.jpg" caption="图3—Internet信息服务（IIS）管理器" alt="图3—Internet信息服务（IIS）管理器" full="true" >}}

### 配置Internet信息服务（IIS）

IIS安装后，系统自动创建了一个默认的Web站点，该站点的主目录默认为C:\\Inetpub\\www.root。

用鼠标右键单击“默认Web站点”，在弹出的快捷菜单中选择“属性”，此时就可以打开站点属性设置对话框，（如图4）在该对话框中，可完成对站点的全部配置。
{{<img name="04.jpg" caption="图4—默认Web站点属性" alt="图4—默认Web站点属性" full="true" >}}

### 主目录与启用父路径

单击“主目录”标签，切换到主目录设置页面，（如图5）该页面可实现对主目录的更改或设置。注意检查启用父路径选项是否勾选，如未勾选将对以后的程序运行有部分影响。（如图6），主目录—配置---选项。
{{<img name="05.jpg" caption="图5—默认Web站点主目录设置" alt="图5—默认Web站点主目录设置" full="true" >}}
{{<img name="06.jpg" caption="图6—默认Web站点启用父路径设置" alt="图6—默认Web站点启用父路径设置" full="true" >}}

### 设置主页文档

单击“文档”标签，可切换到对主页文档的设置页面，主页文档是在浏览器中键入网站域名，而未制定所要访问的网页文件时，系统默认访问的页面文件。常见的主页文件名有index.htm、index.html、index.asp、index.php、index.jap、default.htm、default.html、default.asp等

IIS默认的主页文档只有default.htm和default.asp，根据需要，利用“添加”和“删除”按钮，可为站点设置所能解析的主页文档。


### 启动与停止Internet信息服务（IIS）

在Internet信息服务的工具栏中提供有启动与停止服务的功能。单击 可启动IIS服务器；单击 则停止IIS服务器。

## 下载并安装IIS FastCGI
下载地址：[http://www.iis.net/download/fastcgi](http://www.iis.net/download/fastcgi)。选择 x86或者download x86，下载下来名称为 fcgisetup_1.5_rtw_x86.msi。安装后会在C:\WINDOWS\system32\inetsrv\目录下多出了5个文件fcgiconfig.js,fcgiext.dll,fcgiext.ini,fcgilicense.rtf,fcgireadme.htm


这个时候在IIS6的”WEB服务扩展”里就多出了一个FastCGI Handler
{{<img name="07.gif" full="true" >}}

## 下载安装IIS下的PHP5.3.8
下载地址[http://windows.php.net/download/](http://windows.php.net/download/)，下载VC9 x86 Non Thread Safe的ZIP版本，解压到所需目录，该目录需要给予user读取运行权限。

## 四、配置和修改内容
### 环境变量修改
我的电脑->属性->高级->环境变量->系统变量，在Path的最后面中加上 `;E:\PHP\`
### FastCGI安装目录内的修改(注册PHP到FastCGI)
打开C:\WINDOWS\system32\inetsrv\fcgiext.ini文件，在文件最后加上下面的语句：
> PS: [Types]是文件原来就有的，在[Types]后面加上下面的语句就可以，要全部哦不然会报错的.

```
[Types]
php=PHP

[PHP]
ExePath=E:\PHP\php-cgi.exe
InstanceMaxRequests=10000

EnvironmentVars=PHP_FCGI_MAX_REQUESTS:10000

ActivityTimeout=3600
RequestTimeout=3600
```
### 添加PHP.ini
PHP.ini的修改PHP5.3.8安装目录下是没有PHP.ini这个文件的，只有php.ini-development和php.ini-production，我们把php.ini-development改为php.ini(当然如果你怕有错可以先备份一下)。
注明：首先建一个文件夹命名为TMP，位置随意，我这里放在E:\PHP\tmp。 (upload_tmp_dir会用到，upload_tmp_dir是用来定义上传文件存放的临时路径，这里可以修改并给它定义一个绝对路径，同时需要有读、写权限)。用搜索(快捷键：Ctrl+F)的方式把下面的关键字改成现在的值：
```
short_open_tag = Off (这个它本来默认就是这样我们就不要改了。)
把;upload_tmp_dir =改为upload_tmp_dir=”E:\PHP\tmp”
把;cgi.force_redirect = 1改为cgi.force_redirect=0
把;fastcgi.impersonate = 1;改为 fastcgi.impersonate=1;
把; extension_dir = “ext”改为extension_dir=”E:\PHP\ext”
把;date.timezone =改为date.timezone =PRC(如果不修改date.timezone，打开网页的时候蛮有可能提示500错误。也有人把值改为Asia/Shanghai，我没试过你们可以试试。)
```
在Windows Extensions中去除扩展前面的分号(;):
```
; extension=php_curl.dll
; extension=php_gd2.dll
; extension=php_ldap.dll
; extension=php_mbstring.dll
; extension=php_exif.dll
; extension=php_mysql.dll
; extension=php_mysqli.dll
; extension=php_sockets.dll
; extension=php_xmlrpc.dll
```

### Internet信息服务（IIS）管理器的修改
#### 网站->属性->主目录->配置->添加
{{<img name="08.gif" full="true" >}}
{{<img name="09.gif" full="true" >}}
{{<img name="10.gif" full="true" >}}
{{<img name="11.gif" full="true" >}}

可执行文件填写C:\WINDOWS\system32\inetsrv\fcgiext.dll
扩展名填写 `.php` 。
动作->限制为GET,HEAD,POST。
#### 网站->属性->文档->添加默认内容 `index.php`
这里全部配置好了，一定要把IIS服务重启一下。

## 测试
用文本写一段测试代码：
~~~ php
<?php
phpinfo();
?>
~~~
保存为index.php，名字随便取，只要后缀是.php就可以。把index.php放到根目录下，我这里是C:\Inetpub\wwwroot，然后在浏览器中输入[http://localhost/index.php](http://localhost/index.php) 就可以得到返回的信息了。

## 问题汇总
若出现如同下面的错误，说明你的电脑没有安装VC9运行库 即VISUAL C++ 2008
```
Microsoft Visual C++ 2008 Redistributable Package (x86)
FastCGI Error
The FastCGI Handler was unable to process the request.
——————————————————————————————————————————————————————
Error Details:
Error Number: 14001 (0x800736b1).
Error Description: ????????????????????????????
HTTP Error 500 - Server Error.
Internet Information Services (IIS)
```
下载地址：[http://www.microsoft.com/downloads/zh-cn/details.aspx?FamilyID=9B2DA534-3E03-4391-8A4D-074B9F2BC1BF&displaylang=zh-cn](http://www.microsoft.com/downloads/zh-cn/details.aspx?FamilyID=9B2DA534-3E03-4391-8A4D-074B9F2BC1BF&displaylang=zh-cn)
下载后安装就可以了。

**END……**