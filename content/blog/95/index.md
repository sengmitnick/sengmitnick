---
mark: original
title: ReactNative项目名称修改
categories: [technology]
date: 2017-01-05 09:59:32
tags: [ ReactNative ]
author: {name: Seng Mitnick}
linktitle: "95"
comments: true
toc: true
---
> react-init 初始化项目耗时太长，可以在已经初始化完成的项目基础上复制一份进行修改。

首先初始化一个项目
~~~ shell
react-native init AwesomeProject
~~~
初始化完成的项目为 **AwesomeProject** 将之修改为 **FightTravel**	<!--more-->

## ReactNative部分
修改项目根目录下package.json、index.android.js和index.ios.js文件，把项目名 **AwesomeProject** 改为 **FightTravel**，修改后截图如下：

{{<img name="2.png" caption="package.json" alt="package.json">}}
{{<img name="3.png" caption="index.ios.js" alt="index.ios.js">}}
{{<img name="4.png" caption="index.android.js" alt="index.android.js">}}

## android部分
{{<img name="1.png" caption="android项目结构" alt="android项目结构">}}
以上为 **AwesomeProject** 中 **android** 部分的项目结构，需要修改的文件为 build.gradle ,AndroidManifest.xml,string.xml,MainActivity.java,MainApplication.java
，需要重命名 **awesomeproject** 文件夹为 **fighttravel**, 修改后截图如下：

{{<img name="5.png" caption="MainActivity.java" alt="MainActivity.java">}}
{{<img name="6.png" caption="MainApplication.java" alt="MainApplication.java">}}
{{<img name="8.png" caption="string.xml" alt="string.xml">}}
{{<img name="9.png" caption="AndroidManifest.xml" alt="AndroidManifest.xml">}}
{{<img name="10.png" caption="build.gradle" alt="build.gradle">}}

{{<img name="7.png" caption="重命名文件夹" alt="重命名文件夹">}}


## ios部分

1)  打开项目：

{{<img name="11.png" caption="目录结构" alt="目录结构">}}

以上为 **AwesomeProject** 中 **ios** 部分的项目结构。

2)  选中项目设置并按下回车，输入新的项目名字：

{{<img name="12.png" caption="重命名项目名称" alt="重命名项目名称">}}

3)  输入完后按回车，弹出改名前和改名后的文件对名，这时点击“Rename”：

{{<img name="13.png" caption="rename" alt="rename">}}

4）这时你会发现，还有很多的“旧”项目名字的文件/文件夹： 

{{<img name="14.png" caption="enable" alt="enable">}}

不要紧，继续往下看，一起把这些“旧”名字消灭掉。

5)  我们先把这两个文件夹改一下名字：

改前：{{<img name="15.png" caption="改前" alt="改前">}}

改后：{{<img name="16.png" caption="改后" alt="改后">}}

这里的**FightTravelTests**，原先为**AwesomeProjectTests**，我们改名字时需要注意，只需要把旧名字（**AwesomeProject**）替换成新名字（**FightTravel**）即可，不要把其它字符（**Tests**）删除！

6)  选中这个类文件，更改类名字时不能直接重命名，需要使用Xcode内置的更改类名功能：

{{<img name="17.png" caption="重命名类" alt="重命名类">}}

点击@interface后面的类名：

{{<img name="18.png" caption="interface" alt="interface">}}

按照下图步骤操作（Edit->Refactor->Rename）：

{{<img name="19.png" caption="rename" alt="rename">}}

输入新的类名字：

{{<img name="20.png" caption="new类" alt="new类">}}

点击Save：

{{<img name="21.png" caption="save" alt="save">}}

7)  我们再次看一下我们的目录结构，已经全部都改过来了:

{{<img name="22.png" caption="目录结构" alt="目录结构">}}

8）全局搜索之前的项目名字并替换成新项目名字：

{{<img name="23.png" caption="搜索" alt="搜索">}}

9）全局搜索旧项目名字出来的界面，我们点击进去更改名字：

点击之后会自动跳转到这个界面，双击值进行更改（下面改名的步骤也一样）：

{{<img name="24.png" caption="更改名字" alt="更改名字">}}

更改完之后，还得再改一些东西。

注意：继续全局搜索替换，直到全局搜索不到旧名字为止！

10）打开项目文件夹，继续更名：

{{<img name="25.png" caption="更名前" alt="更名前">}}

更名后：

{{<img name="26.png" caption="更名后" alt="更名后">}}

回到项目看一下，文件全发“红”了。不要紧，正常的：

{{<img name="27.png" caption="红" alt="红">}}

11）更改相对应文件夹的资源文件夹路径：

11.1）选中FightTravel文件夹：

{{<img name="28.png" caption="FightTravel" alt="FightTravel">}}

11.2）点击文件夹小图标，更改路径：

{{<img name="29.png" caption="更改路径" alt="更改路径">}}

找到刚才改好名字的文件夹，点击choose。下个文件夹（testTests）步骤重复以上的。

PS：如果文件夹路径更改了，里面的文件还是红色需每个文件更改路径。

12)  修改Schemes:

到了上面一步基本就完成了，但是，如果不直接在Xcode调试运行而是在命令行则会出现以下错误：

{{<img name="31.png" caption="err" alt="err">}}

这里，我们需要修改Schemes。

12.1)  打开Manage Schemes ：

{{<img name="30.png" caption="Schemes" alt="Schemes">}}


12.2)  添加一个Schemes ：

{{<img name="32.png" caption="add" alt="add">}}

12.3)  命名新Schemes为FightTravel ：

{{<img name="33.png" caption="FightTravel" alt="FightTravel">}}

12.4)   设置新Schemes为Shared：

{{<img name="34.png" caption="Shared" alt="Shared">}}

12.5)   删除旧项目名的Schemes：

{{<img name="35.png" caption="Schemes" alt="Schemes">}}

小结：通过以上步骤，成功修改项目名了。

本文参考了以下文章，并集成。

[iOS项目的完整重命名方法图文教程](http://www.cocoachina.com/cms/wap.php?action=article&id=10824)

[ReactNative项目名称修改](http://www.jianshu.com/p/d0cf1c63a41a)

**END……**