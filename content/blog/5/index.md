---
title: 超简单的数码相框制作
date: 2014-02-15 09:14:23
categories: [technology]
tags: [嵌入式,龙芯培训,QT,项目]
author: SengMitnick
linktitle: "5"
comments: true
toc: true
---

{{<note type="info">}}
- 项目名称：数码相框（简单）
- 项目分类：嵌入式应用开发
- PC机系统环境：ubuntu10.04
- PC机Qt版本：QMake version 2.01a Using Qt version 4.5.3 Qt Creator 1.2.0 based on Qt 4.5.2
- 开发板：loongson 1B
- 开发板系统环境：嵌入式Linux
- 开发板Qt版本：QMake version 2.01a Using Qt version 4.5.3
{{</note>}}

<!--more-->
## 项目介绍
数码相框： Digital Photo Frame

数码相框是观看和分享数码照片的专用设备。

{{<note type="info">}}
数码相框是展示数码照片而非纸质照片的相框。数码摄影必然推动数码相框的发展，因为全世界打印的数码相片不到35%。数码相框通常直接插上相机的存储卡展示照片，当然更多的数码相框会提供内部存储空间以接外接存储卡功能。数码相框就是一个相框，不过它不再用放进相片的方式来展示，而是通过一个液晶的屏幕显示，它可以通过读卡器的接口从SD卡获取相片，并设置循环显示的方式，比普通的相框更灵活多变，也给现在日益使用的数码相片一个新的展示空间。
{{</note>}}
### 目前实现功能：
- 打开一张图片并显示
- 打开一文件夹下所以的图片并播放
- 播放图片时刻通过点击屏幕进行暂停或继续
- 暂停时可以手动点击下一张、上一张

## 实现过程
在qtcreator下新建一个Qt4GUI应用 项目 — Digital_photo_frame

### 打开并显示一张图片功能
在Qt中,Qt提供给了4个图像类：QImage/QPixmap/QBitmap/Qpicture。

而用Qt程序在嵌入式上显示一幅图片，分别使用QImage/Qpixmap有以下两种方法：

~~~ cpp
//dangerous should not beused, cannot display earth.png,
//but if we changeearth.png to a smaller image e.g. apple.png, apple.png can be displayed
QPixmap pixmap;

pixmap.load(":/pics/\*.png" );

label->;setPixmap(pixmap );
~~~
AND
~~~cpp
//dangerous should not beused, cannot display earth.png,  
//but if we changeearth.png to a smaller image e.g. apple.png, apple.png can be displayed

QPixmap pixmap;
pixmap.load(":/pics/\*.png" );
QPainter painter(this);
painter.drawPixmap(0,0,pixmap);
~~~

而我则同时使用两个类对显示的图片就行了优化,即采用Qimage优化图片尺寸，Qpixmap缓存绘图的方式。

以下的代码实现：

~~~ cpp
void Digital_photo_frame::Show_img(QString fileName,int imgW)
{//打开一张图片并显示，<span style="font-family: Arial, Helvetica, sans-serif;">;fileName为文件路径，imgW为图片宽度</span>;

    if (!fileName.isEmpty()) {
    QImage image;
    //image.scaled(360,176,Qt::KeepAspectRatio);
    image.load(fileName);
    double showwidth= static_cast<double>;(imgW);
    double showheight= static_cast<double>;((static_cast<double>;(image.width())*showwidth)/image.height());
    //double showwidth= static_cast<double>;(width());
    //double showheight= static_cast<double>;(height());

        if (image.isNull()) {
            QMessageBox::information(this, tr("Image Viewer"),
                                      tr("Cannot load %1.").arg(fileName));
    return;
}
    QPixmap _pixmap =QPixmap::fromImage(image.scaled(showwidth, showheight,Qt::KeepAspectRatio));
    ui->;imglabel->;setPixmap(_pixmap);
    ui->;imglabel->;adjustSize();
     }
}
~~~

打开一张图片可以用 **QFileDialog** 类来操作，以下是这个功能的代码实现：

~~~ cpp
void Digital_photo_frame::on_open_file_triggered()
{
    QFileDialog *fileDialog = new QFileDialog(this);
    //fileDialog->;setViewMode(QFileDialog::List);
    //fileDialog->;setGeometry(10,10,200,150);
    qDebug() << "QFileDialogminimumWidth:" << QString::number(fileDialog->;minimumWidth(),10);
    QString fileName = fileDialog->;getOpenFileName(this,tr("Open Image Files"),"/",tr("Images (*.gif *.png *.bmp *.jpg)"));    
    Show_img(fileName,480);
    ui->;actionFull_screen->;setEnabled(true);

}
~~~
### 播放图片功能

**播放功能实现原理：** 使用一个定时器，在每次定时器触发后，调用一次显示图片动作，然后等定时器再次触发后，再显示下一次图片处理动作。以下是代码实现：
~~~ cpp
// 在头文件声明定时器
QTimer *Player_Timer;
~~~

~~~ cpp
//在定义cpp里面的构造函数里面创建定时器
Digital_photo_frame::Digital_photo_frame(QWidget *parent)
    : QMainWindow(parent), ui(new Ui::Digital_photo_frame)
{
    ui->;setupUi(this);

    Player_Timer = new QTimer(this);
    connect( Player_Timer, SIGNAL(timeout()), this, SLOT(Player_img()) );
}</pre>
<pre class="prettyprint linenums bush:cpp" lang="cpp">//与定时器判断的函数
void Digital_photo_frame::Player_img()
{
    Player_img(list,path,i,480);
    if (i>;=0 &amp;&amp; i<(count-1))
    {
        i++;
    }
    else
    {
        i=0;
    }
}
~~~

~~~ cpp
void Digital_photo_frame::Player_img(QFileInfoList list,QString path,int i,int imgW)
{    //打开并显示一个list中的一张图片，list为文件夹下所有图片的列表，i为列表的第（i+1）张图片，imgW为图片显示宽度
    QFileInfo fileInfo = list.at(i);
    path=fileInfo.filePath();
    Show_img(path,imgW);
}
~~~

最终的功能函数：

~~~ cpp
void Digital_photo_frame::on_actionPlayer_triggered()
{
    on_actionFull_screen_triggered();
    QDir picdir("./tupiang");
    QStringList filters;
    filters << "*.bmp" << "*.jpg" << "*.png" << "*.gif";
    picdir.setNameFilters(filters);
    list = picdir.entryInfoList();
    count = list.count();qDebug() << "path:" << path ;
    qDebug() << "picdir:" << picdir  ;
    qDebug() << "count:" << count ;
    Player_Timer->;start(5000);
}
~~~

### 暂停和继续播放功能

点击屏幕触发鼠标事件，进而实现暂停功能，其实现原理是，当点击屏幕使触发鼠标单击事件，在事件里判断定时器状态进而实现暂停和继续播放功能。以下是代码实现功能：开启鼠标事件得在构造函数里添加以下一句：

~~~ cpp
this->;setMouseTracking (true);

~~~

功能实现：

~~~ cpp
void Digital_photo_frame::mousePressEvent ( QMouseEvent * e )//鼠标单击事件响应
{   
    if ( Player_Timer->;isActive() )
    {
        Player_Timer->;stop();
    }
    else{Player_Timer->;start(5000);}
}<
~~~

### 手动上下一张功能

代码实现：

~~~ cpp
void Digital_photo_frame::on_pBtn_next_clicked()//下一张
{
    if(count>;=0){
    if (i>;=0 &amp;&amp; i<(count-1))
    {
        i++;
    }
    else
    {
        i=0;
    }
    Player_img(list,path,i,480);
}
~~~

~~~ cpp
void Digital_photo_frame::on_pBtn_last_clicked()//上一张
{
    if(count>;=0){
    if (i>;0 &amp;&amp; i<=(count-1))
    {
        i--;
    }
    else
    {
        i=(count-1);
    }
    Player_img(list,path,i,480);
}
~~~

## 其他

当程序编译好后放到开发板上播放会发现播放不了jpg、gif等图片格式。
解决方法：

利用Qt的plugins机制解决过程：

** 条件设定：**

在移植Qt在开发板上时，编译参数已开启了对这些图片格式的支持（如何知道？查看你的Qt/E的安装路径，在路径下有一个plugins文件夹，plugins下有imageformats文件夹，该文件夹下若有以下几个库就对了（如下图））

{{<img name="1.jpg" full="true" >}}

### 设置环境变量：
在PC的终端下执行以下两条命令：

~~~ shell
xport LD_LIBRARY_PATH=$QTDIR/plugins/imageformats:$LD_LIBRARY_PATH
export QT_PLUGIN_PATH=$QTDIR/plugins
~~~

### 修改pro文件

在Qt项目的pro文件中增加 `QTPLUGIN += qjpeg  qgif`

### 在开发板运行：

把PC机上的图片插件库复制到开发板上并如同第二步一样设置开发板的环境变量，然后就可以运行了。


**END……**
