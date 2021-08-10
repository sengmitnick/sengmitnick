---
author: SengMitnick
title: "TypeScript 使用宝典"
linktitle: "TypeScript 使用宝典"
cover: /images/cover/02.jpg
images: [/images/cover/02.jpg]
date: 2021-08-06T10:27:06+08:00
categories: [technology]
tags: []
comments: true
toc: true
---

## jsDoc

详细资料：https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

{{<code title="jsDoc使用示例" src="https://stackblitz.com/edit/node-y66mjg?embed=1&file=jsdoc.ts&hideNavigation=1&view=editor" >}}

## is & typeof
https://www.typescriptlang.org/docs/handbook/advanced-types.html#typeof-type-guards
https://www.typescriptlang.org/docs/handbook/advanced-types.html#instanceof-type-guards

## 非空断言

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator

``` TypeScript
// Compiled with --strictNullChecks
function validateEntity(e?: Entity) {
  // Throw exception if e is null or invalid entity
}
function processEntity(e?: Entity) {
  validateEntity(e);
  let s = e!.name; // Assert that e is non-null and access name
}
```

## const 断言

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions

应用场景：自定义 hook 可以用得比较多， `React.useState` 就是如此

``` ts
const useFlag = (initialValue = false) => {
  const [flag, setFlag] = React.useState(initialValue);
  const up = React.useCallback(() => setFlag(true), []);
  const down = React.useCallback(() => setFlag(false), []);
  return [flag, up, down] as const;
};

const [modalVisible, showModal, hideModal] = useFlag();
```


## `[number]` 下标
通过 `[number]` 下标可以完成 Union2Tuple 的骚操作：

``` ts
const DRINK_LIST = ['Beer', 'Wine', 'Water'] as const;
// 相当于: type Drink = 'Beer' | 'Wine' | 'Water';
type Drink = DRINK_LIST[number];
```

获取到的Union类型还可以用到 Record 当中。

## Record & Dictionary

业务中，我们经常会写枚举和对应的映射:

``` ts
type AnimalType = 'cat' | 'dog' | 'frog';
const AnimalMap = {
  cat: { name: '猫', icon: ' '},
  dog: { name: '狗', icon: ' ' },
  forg: { name: '蛙', icon: ' ' },
};
```

注意到上面 forg 拼错了吗？
Record 可以保证映射完整:

``` ts
type AnimalType = 'cat' | 'dog' | 'frog';
interface AnimalDescription { name: string, icon: string }
const AnimalMap: Record<AnimalType, AnimalDescription> = {
  cat: { name: '猫', icon: ' '},
  dog: { name: '狗', icon: ' ' },
  forg: { name: '蛙', icon: ' ' }, // Hey!
};
```


建议大家在声明一个 object 时，尽量用 `Record<string, any>` 。

## Required & Partial & Pick

```ts
interface User {
  id: number;
  age: number;
  name: string;
  op?: string;
};

// 相当于: type PickUser = { id: number; age: number;name: string;op: string; }
type PartialUser = Partial<User>

// 相当于: type PartialUser = { id?: number; age?: number; name?: string; }
type PartialUser = Partial<User>

// 相当于: type PickUser = { id: number; age: number; }
type PickUser = Pick<User, "id" | "age">
```

目前我自己用Partial比较多，主要应用在以下场景：

```ts
import * as React from 'react';
import { useSetState } from 'ahooks';

interface State {
  id: number;
  age: number;
  name: string;
}

export const demo: React.FC<{ a: boolean }> = (props) => {
  const [state, setState] = useSetState<State>({ id: 0, age: 0, name: '' });

  return (
    <div
      onClick={() => {
        const newState: Partial<State> = {};
        if (props.a) {
          newState.age = state.age + 1;
        }
        setState(newState);
      }}
    ></div>
  );
};
```

## Omit & Union & Tuple

Omit 是 never、Exclude和Pick的组合，大致效果如下：

```ts
interface User {
  id: number;
  age: number;
  name: string;
};

// 相当于: type PickUser = { age: number; name: string; }
type OmitUser = Omit<User, "id">
```

使用场景：对某些组件进行二次开发是对其Props的重新定义，一般会搭配_.omit使用

```ts
import * as React from 'react';
import { omit } from 'lodash-es';
import RcUpload, { UploadProps as RcUploadProps, } from 'antd/es/upload';

const omitUploadType = ['type', 'listType', 'onChange'] as const;
type OmitUploadType = typeof omitUploadType[number];

interface UploadProps<T = any> extends Omit<RcUploadProps, OmitUploadType> {
  value?: T;
  onChange?: (value: T | OCRResponse) => void;
  }
const Demo: React.FC<{ a: boolean }> = (props) => {
  const rcUploadProps = omit(props,omitUploadType);
  return null
};
```

## 泛型

https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types

### 泛型组件

```ts
// <Demo<string> ... />
const Demo = <T extends {}>(props: DemoProps) => null
```

### 泛型函数

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: identity(0); //ts会根据泛型自动推导出返回类型。
```

合理运用泛型写函数、类和组件，会让你的代码更上一层哦～
小课题：

```ts
// 第一个是组件类型，第二个是组件的Props，怎么写可以实现传入一个组件，
// 自动推导出properties类型呢？
// 提示： 会用到 extends 和 React的内置类型
function identity<C,P>(Component: any, properties: any): any {
  return arg;
}
```

```ts
interface API {
  '/user': { name: string },
  '/menu': { foods: Food[] },
}
// 根据传入的 url 返回 对应url的类型，并且url只能是API接口的key
// 提示： keyof
function identity<URL>get(url: URL): any {
  return arg;
}
```
