#! https://zhuanlan.zhihu.com/p/422451470
![Image](https://pic4.zhimg.com/80/v2-5f9d6360f8deeeb9f98fc91488fd7fec.png)

# YARN--选择性依赖解决方案

## 前言

才过了一晚，代码没怎么改过，用 `jenkins` 打包就报错了，截图如下：

![报错截图](https://pic4.zhimg.com/80/v2-ba6e767eaddfbe4306328f382731848a.png)

## 思考

其实看截图意思还是很明了的，明显是某个依赖包最近更新版本了，然后新版本有Bug。

直接去npm看看，果不其然。

![async-validator](https://pic4.zhimg.com/80/v2-128505370d18af02a41bc4a7744f876a.png)

## 解决

但是这个依赖包并不在当前项目 `dependencies` 里面，很显然是某个子包下的 `dependencies` 了 (其实熟悉 Antd 的童鞋就知道这个包是在 `antd` => `rc-field-form` => `async-validator`)。这种情况我们也不可能去社区让人家改 `async-validator` 的版本呀！

那么怎么解决呢？

如果你使用 `yarn` 进行 `install` ，那么你这个时候就可以用 `resolutions` 了。

最终通过在 `package.json` 添加如下配置即可解决啦。

![package.json](https://pic4.zhimg.com/80/v2-0d3143732392e9c419c438909822c587.png)

## 参考

- [Selective dependency resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/)