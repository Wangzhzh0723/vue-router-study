## 安装环境

```
npm install -g @vue/cli
npm install -g @vue/cli-service-global
vue serve [name]
```

## 路由模式

(mpa 多页应用中跳转逻辑都是由后端处理)

hash 模式和 history 模式

前后端分离 前端需要根据路径的不同进行跳转(根据 hash 值和 H5 API history)
hash 上线时不采用这种方式比较丑陋, 采用 history(需要服务端支持,否则一刷新页面就 404 了, history pushState 方法不能触发 popstate 监听事件--页面的前进后退会触发该事件)

属性在 this.$route
方法在this.$router
