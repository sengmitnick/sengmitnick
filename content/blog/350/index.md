---
author: SengMitnick
title: "LazyMan的现代化实现"
linktitle: "LazyMan的现代化实现"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2021-10-11T15:51:53+08:00
categories: [technology]
tags: []
comments: true
toc: true
---

```
实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")输出:
Hi! This is Hank!
 
LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
 
LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~
 
LazyMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
 
以此类推。
```

``` js
class LazyManC {
  constructor(name) {
    this.name = name;
    this.tasks = [this.log.bind(this)];
    setTimeout(async () => {
      for (const fn of this.tasks) {
        await fn();
      }
    }, 0);
  }

  log() {
    console.log(`Hi! This is ${this.name}!`);
  }

  sleep(timeout, key = "push") {
    this.tasks[key](() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake uo after ${timeout}`);
          resolve();
        }, timeout * 1000);
      });
    });

    return this;
  }

  sleepFirst(timeout) {
    return this.sleep(timeout, "unshift");
  }

  eat(str) {
    this.tasks.push(() => {
      console.log(`Eat ${str}~`);
    });
    return this;
  }
}

function LazyMan(name) {
  return new LazyManC(name);
}
```

```js
class LazyManC {
  constructor(name) {
    this.name = name;
    setTimeout(() => {
      console.log("Hi! This is " + name);
    }, 0);
  }

  sleep(seconds) {
    const delay = seconds * 1000;
    const time = Date.now();
    while (Date.now() - time < delay) {
      // hu lu lu ~~
    }
    setTimeout(() => {
      console.log("wake up after " + seconds);
    }, 0);
    return this;
  }

  eat(something) {
    setTimeout(() => {
      console.log("eat " + something);
    }, 0);
    return this;
  }

  sleepFirst(seconds) {
    new Promise((resolve) => {
      const delay = seconds * 1000;
      const time = Date.now();
      while (Date.now() - time < delay) {
        // hu lu lu ~~
      }
      resolve();
    }).then(() => {
      console.log("wake up after " + seconds);
    });
    return this;
  }
}

function LazyMan(name) {
  return new LazyManC(name);
}

```