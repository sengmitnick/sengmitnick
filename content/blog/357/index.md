---
author: SengMitnick
title: "【HTML5动画与动效】CSS Transition"
linktitle: "【HTML5动画与动效】CSS Transition"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2022-06-07T07:23:25Z
categories: [technology]
tags: [HTML5动画与动效]
comments: true
toc: true
---

动画是一个Web作品中重要的“调味剂”。

在过去十余年中，web页面动画与动效的实现方式发生了巨大变化。最开始的页面动画往往是以GIF图片为主，其呈现内容大都是各类广告banner、站点链接等，浏览者与动画之间几乎没有交互。

随着Flash的出现，页面中出现的动画越来越多，除了各种动画广告外，还出现了各种页面动画组件，甚至是全站点的动画动效，交互性也大大增强。近年来Flash不断衰落，页面动画与动效的呈现载体更多地转移到了HTML5之上，这导致了几个显著的变化：

- 一是动画动效更加聚焦于页面**细节**，如聚焦于某个链接、按钮或图标等，
- 二是动画能够更加紧密地与**页面中其他元素结合**，不再像Flash那样局限于单个SWF范围之内，
- 三是动画制作更加依靠技巧和设计者的独特创意，任何一种动效的实现都可能会存在**多种途径**，需要设计者综合权衡后作出抉择，
- 四是全站点的动画动效的实现难度更大，更加考验设计师多种前端知识和技术的综合运用能力。

本系列文章将着重介绍几种常见的HTML5动画效果，希望能够藉此向大家较为全面地展示各种动画与动效的制作技巧。

> 此外，对于初学者而言，某些HTML5动画效果虽然非常容易上手使用，但在实际开发中也应该避免运用过“滥”，将整个页面弄得过于花里胡哨。

## 动画与动效核心技巧

HTML5技术的发展非常迅猛，近年来，新的页面动画实现方式层出不穷，并仍在不断扩增中。在这些纷繁复杂，令人眼花缭乱的效果中，我们可以梳理出两条主要的脉络，同时也是目前Web动画的两大实现途径：

1. **CSS3动画**。这类动画是当前页面动画的主力军，主要通过transition和animation两种方式来实现。其中，**transition是为页面元素设置某个需要产生动画效果的属性**，如宽度（width）、高度（height）、透明度（opacity），甚至3D旋转等，并使得这些属性的值在发生变化时产生相应的过渡效果。我们常常在制作类似按钮鼠标经过和移出效果时使用transition。而animation则是**关键帧动画**，它可以预先为动画设置多个节点，在每个节点中含有不同的状态属性，通过使用animation我们可以得到更为复杂的动画效果。通俗地说，transition是简化版的CSS3动画，而animation则是强化版的CSS3动画。在日常开发中transition的使用频率更高一些，我们往往只有在遇到transition无法解决的问题时，才会转而使用animation。

2. **JavaScript动画**。这类动画是通过JavaScript来动态地控制并刷新元素的各种属性值，以形成动画效果，其中元素的控制可以针对页面DOM结构中的某个节点，也可以通过深入控制HTML5中的Canvas元素来生成Canvas动画。在JavaScript的实现方式方面，一方面可以通过编写原生代码，另一方面也可以使用jQuery、GASP之类的类库来加以实现。

一般来说，大部分简单的页面动画都可以使用transition实现。JavaScript动画则往往用于更加复杂，或是需要结合各类用户交互操作的动画效果。在运行效率方面，像jQuery这种JavaScript类库的动画效果要低于CSS3动画，应谨慎使用。而在兼容性方面， CSS3动画的兼容性要差于jQuery等类库动画，前者并不支持IE9之前的旧版浏览器。

除以上两者外，我们也可以使用SVG来制作动画，这部分的相关知识将放在后续学习系列中加以介绍。

接下来，我们将通过几个具体的案例来开始本系列的学习。

## 入门案例：按钮元素动画效果

首先让我们来看一个简单的超链接动画案例，HTML代码如下：

```html
<a href="">This is a link</a>
```

接下来为这个链接设置一些样式，使其默认显示为无下划线的白色文字，而当鼠标指针经过时切换为黑色，代码如下：

```css
a {
  color: #fff;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 34px;
}
a:hover {
  color: #000;
}
```

测试页面，鼠标指针滑过链接前和滑过链接后的显示效果分别如下图所示，这一状态的切换是在一瞬间发生的。

{{<embed slug="1I90oV2" h="320" title="BLOG-357-01">}}

现在我们将为这个过程添加一些简单的动画效果，使鼠标指针滑过链接时不会立即变色，而是慢慢从白色过渡到黑色。代码如下：

```css
a {
  -webkit-transition: all 3s;
  transition: all 3s;
}
```

以上代码通过使用transition属性指定了超链接的过渡动画，动画属性为all，即当超链接元素中任何属性发生变化，都以动画形式呈现，动画的时间为3秒。此外，我们还为webkit浏览器加上-webkit-的兼容性前缀。测试页面，现在当鼠标指针移动到超链接上方时，链接将在2秒时间内逐渐从白色过渡到黑色，其中间效果如图所示。

{{<embed slug="QT5y8ZB" h="320" title="BLOG-357-02">}}

上述transition动画仅仅是使超链接的文字颜色在鼠标指针滑入前后发生了改变，我们也可以将“all”修改为“color”，其测试效果将完全相同。代码如下：

```css
a {
  -webkit-transition: color 3s;
  transition: all 3s;
}
```

以上的这种动画效果写法很简单，效果却非常明显。实际上，我们可以将这两行代码添加到网站的CSS文件中，就能够使得整个站点的所有超链接都带有过渡动画效果。

## 添加动画属性

接下来我们再将以上超链接的显示样式稍作修改，使其显示为圆角按钮，并创建transition动画，代码如下：

```css
a {
  color: #fff;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 34px;
  display: block;
  width: 350px;
  height: 60px;
  line-height: 60px;
  border: 1px solid #fff;
  border-radius: 4px;
  text-align: center;
  -webkit-transition: all 3s;
  transition: all 3s;
}
a:hover {
  color: #d53ea4;
  background: #fff;
}
```

在以上代码中，我们将a元素修改为了块级元素，设置了高度和宽度分别为350和60像素，并设置行高与高度相同，以确保文字垂直居中显示。为了使其显示为按钮形状，我们添加了幅度为4像素的圆角，并添加了1像素的白色边框。鼠标指针滑过与否的两个属性差别是背景颜色和文字颜色，在未滑过时我们并未设置背景颜色，文字颜色为白色，在滑过时，我们将背景颜色设置为白色，文字颜色则设置为与页面背景相同的艳红色。测试页面，鼠标指针滑过的渐变动画效果如下图所示。

{{<embed slug="p8n84Hw" h="320" title="BLOG-357-03">}}

## 动画速度曲线

仔细观察按钮的过渡动画，我们可以发现整个过程由慢速开始，然后变快，然后再以慢速结束。这是因为transition中默认的动画速度曲线为“ease”。我们也可以将动画改为匀速进行，代码如下：

```css
a {
  -webkit-transition: all 3s linear;
  transition: all 3s linear;
}
```

在以上代码中，linear代表匀速动画。测试页面，我们将发现按钮颜色的过渡效果将变得平稳和单一。除linear和ease外，还有ease-in、ease-out、ease-in-out等其他速度曲线可供选择，分别代表慢速开始，慢速结束，慢速开始和结束。

在以上动画中，按钮的字体颜色（color）和背景（background）这两种属性发生了改变，因此未添加linear速度曲线前的transition动画又等同于以下代码：

```css
a {
  -webkit-transition: color 3s linear, background 3s linear;
  transition: color 3s linear, background 3s linear;
}
```

由以上代码可知，我们可以在transition中添加多个属性动画，彼此以逗号相分隔。

事实上，我们也可以为文字颜色和背景动画分别配置不同的时间和速度曲线等参数。例如，使文字颜色动画时长为5.5秒，速度曲线为linear，背景动画时长为1秒，速度曲线为ease-in-out，代码如下：

```css
a {
  -webkit-transition: color 5.5s linear, background 1s ease-in-out;
  transition: color 5.5s linear, background 1s ease-in-out;
}
```

{{<embed slug="GLHwaBe" h="320" title="BLOG-357-04">}}

测试以上页面，我们将发现当鼠标指针滑过按钮时，背景很快变色，而文字颜色则将经过一个较为缓慢的变化过程。

我们还能为动画设置延迟时间，如为背景动画设置2秒钟的延迟，代码如下：

```css
a {
  -webkit-transition: color 1s linear, background 3s ease-in-out 2s;
  transition: color 1s linear, background 3s ease-in-out 2s;
}
```

{{<embed slug="34Tmkyf" h="320" title="BLOG-357-05">}}

测试以上页面，我们将发现当文字颜色已经完全改变后，背景颜色还未发生变化，直至1秒后背景颜色才突然变为白色。多种属性的设置组合使我们能够实现一些更加复杂的动画效果。

## 多元素动画效果

我们也可以在同一个按钮中为多个元素创建transition动画。在以上按钮的基础之上，为其设置左侧内边距，使按钮文字靠右显示，同时将按钮的position属性设置为relative，以便于后续步骤中，在其内部添加绝对定位的元素。代码如下：

```css
a {
  /*其他代码*/
  box-sizing: border-box;
  padding-left: 140px;
  position: relative;
}
```

修改后的按钮文字效果如图所示。

{{<embed slug="7JtAqwK" h="320" title="BLOG-357-06">}}

接下来，我们将使用after伪元素为按钮创建一个图标，在此使用了vant的图标字体，字体名为“vant-icon”。我们将图标以绝对定位的方式显示在按钮左侧，同时设置其transition动画。代码如下：

```css
a::after {
  font-family: 'vant-icon';
  content: '\e660';
  position: absolute;
  right: 85%;
  -webkit-transition: all 1s;
  transition: all 1s;
}
```

添加了图标后的按钮效果如图所示。

{{<embed slug="IuP8wn3" h="320" title="BLOG-357-07">}}

接下来，我们为鼠标指针的滑过状态创建相应样式属性，代码如下：

``` css
a:hover {
  padding-left: 20px;
  background: rgba(0, 0, 0, 0.1);
}
a:hover::after {
  right: 5%;
}
```

以上代码设置了当鼠标指针滑过按钮时，按钮左侧内边距减小，使文字从右侧移动到左侧，并将背景颜色更改为带有10%透明度的黑色。同时，也为鼠标指针滑过状态下的after伪元素设置了新的属性状态，使得图标向右移动，停止在与右侧的距离等于整体宽度的5%的位置。测试页面，鼠标指针滑过按钮的效果如图所示。

{{<embed slug="G8e5BAi" h="320" title="BLOG-357-08">}}

> 注意：伪元素的hover状态的写法应为`:hover::after{...}`，而不能为`::after:hover{...}`。

以上就是目前常见的一种按钮元素的动画制作方法。除修改文字颜色、背景颜色、文字和图标位置外，你还可以充分发挥想象，制作带有其他变化形式的动画效果。

**THE END**

- 转载自[【前端入门系列】HTML5动画与动效（之一）](https://zhuanlan.zhihu.com/p/26667369)