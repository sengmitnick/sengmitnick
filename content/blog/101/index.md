---
mark: original
title: 微信小程序--通过leancloud做后台发送模板消息
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
categories: [technology]
date: 2017-07-02 16:18:15
tags: [微信小程序, leancloud, 模板消息]
author: SengMitnick
linktitle: "101"
comments: true
toc: true
---
> 利用通过leancloud做后台，接受微信小程序发送过来的form_id，接受并处理后向微信模板信息API发送让用户获取对应模板消息

首先，所有操作根据官方文档[https://mp.weixin.qq.com/debug/wxadoc/dev/api/notice.html](https://mp.weixin.qq.com/debug/wxadoc/dev/api/notice.html)进行，本文章只介绍如何使用leancloud获取 `access_token` 和通过LeanEngine发送模板消息，而如何创建模板及获取模板id请查看官方文档，这里不进行详述。
<!--more-->

## 在小程序中使用LeanCloud
首先按照《[在微信小程序中使用 LeanCloud](https://leancloud.cn/docs/weapp.html)》这遍文章说的给小程序用上LeanCloud；
在这里我用我目前开发的小程序[FightTravel](https://github.com/smk17/FightTravel)进行解说。

## 部署云引擎 LeanEngine
按照《[云引擎快速入门](https://leancloud.cn/docs/leanengine_quickstart.html)》快速部署一个示例Demo。

部署成功后目录大致如下：
{{<img name="1.png" caption="LeanEngine目录" alt="LeanEngine目录">}}

## 设置云函数获取 `access_token`
首先设置自定义环境变量：
{{<img name="2.png" caption="设置自定义环境变量" alt="设置自定义环境变量">}}
创建一个Class，名为Global，新建一个数据 `AccessToken` 。用来存储获取的 `access_token` ：
{{<img name="3.png" caption="存储access_token" alt="存储access_token">}}
创建云函数getAccessToken用来获取 `access_token` 并把获取的 `access_token` 存储在 `AccessToken` 里面;以下是获取 `access_token` 的云函数代码实现:
~~~ js
const https = require('https');
AV.Cloud.define('getAccessToken', function(request) {
  var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+process.env.APPID+"&secret="+process.env.APPSECRET;

  https.get(url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('请求失败。\n' +
        '状态码: ${statusCode}');
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('无效的 content-type.\n' +
        '期望 application/json 但获取的是 ${contentType}');
    }
    if (error) {
      console.error(error.message);
      // 消耗响应数据以释放内存
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
        var token = AV.Object.createWithoutData('Global', '5957121e128fe100582b6461');
        token.fetch().then(function(){
          token.set('value', rawData);
          token.save();
        }, function (e) {
          console.error(e.message);
        });
        } catch (e) {
          console.error(e.message);
        }
    });
  }).on('error', (e) => {
    console.error(`错误: ${e.message}`);
  });
})
~~~
PS： 要使该云函数生效请使用命令 `lean deploy` 进行部署。

## 设置定时器定时更新 `access_token`
我们获取的 `access_token` 是有时间限制的，所以我们需要设置一个定时器定时更新 `access_token` (创建定时器可以参考《[定时任务](https://leancloud.cn/docs/leanengine_cloudfunction_guide-node.html#定时任务)》)，成功后如下：

{{<img name="4.png" caption="定时器" alt="定时器">}}

PS: Cron表达式看不懂的直接用(在线Cron表达式生成器)[http://cron.qqe2.com/]进行生成就好，我这个定时器是2个小时获取一次`access_token`

## 发送模板消息
### 创建云函数postNotification
首先创建一个云函数对微信小程序发送过来的数据进行处理然后再发给微信服务器，代码实现如下：
~~~ js
const requestjson = require('request-json');
AV.Cloud.define('postNotification', function(request) {
  var params = request.params
  const user = request.currentUser;
  if (!user) {
    return {'error' : '用户未登录'};
  }
  const authData = user.get('authData');
  if (!authData || !authData.lc_weapp) {
    return {'error' : '当前用户不是小程序用户'};
  }
  if (params == null) {
    return {'error' : 'no params'};
  }else{
    var contents = {
      "touser": authData.lc_weapp.openid,  
      "template_id": params.template_id,         
      "form_id": params.form_id,
      "page": params.page,
      "data": params.data,
      "emphasis_keyword": params.emphasis_keyword
    };
    console.log(contents)
    var token = AV.Object.createWithoutData('Global', '5957121e128fe100582b6461');
    token.fetch().then(function(){

      try {
        var value = JSON.parse(token.get('value'))
        var url = "/cgi-bin/message/wxopen/template/send?access_token=";
        url += value.access_token;
        var client = requestjson.createClient('https://api.weixin.qq.com');

        client.post(url, contents, function(err, res, body) {
          console.log(res.statusCode,body);
        });

      } catch (e) {
        console.error(e.message);
        return e.message;
      }

    }, function (error) {
      console.error(error.message);
      return error.message;
    });
    };

});
~~~
### 在微信小程序上调用云函数postNotification
按照官方文档做好相应界面后，在表单提交事件formSubmit里做以下处理即可，以下是代码实现：
~~~ js
formSubmit(event){
  var value = event.detail.value
  var formId = event.detail.formId
  var that = this
  var paramsJson = {
    template_id: '9ggg9If6Edsk-xjKw1ek6Nd2XUwMrWKXevYB5QLgRIM',
    form_id: formId,
    page: '',
    data: {
      "keyword1": {//用户名
        "value": app.globalData.user.userInfo.nickName,
        "color": "#173177"
      },
      "keyword2": {//手机号
        "value": value.phone,
        "color": "#173177"
      },
      "keyword3": {
        "value": "绑定手机号成功",
        "color": "#173177"
      },
      "keyword4": {//绑定时间
        "value": new Date().toLocaleString(),
        "color": "#173177"
      }
    },
    emphasis_keyword: ''
  };
  AV.Cloud.run('postNotification', paramsJson).then(function (data) {
    // 调用成功，得到成功的应答 data
    console.log(data)
  }, function (err) {
    console.log(err)
  });
},
~~~

## 后记
目前的代码只实现了当你在小程序里点击表单提交按键后，相应微信号立刻收到服务通知，下一篇将会讲述规定时间发送模板消息~

## 源码
[FightTravel小程序](https://github.com/smk17/FightTravel)

[FightTravel后端](https://github.com/sengmitnick/FightTravel)

## 参考
[node.js post json格式数据到服务器的几种方法](http://yijiebuyi.com/blog/8221eb14c8482e7efd1868946e99ea7c.html)
