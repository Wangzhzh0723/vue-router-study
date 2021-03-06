import install from "./install"
import createMatcher from "./create-matcher"
import HashHistory from "./history/hash"
import BrowserHistory from "./history/history"

// 默认vue-router插件导出一个雷, 用户会new Router({})
export default class VueRouter {
  constructor(options) {
    // 根据用户的配置和当前请求的路径 渲染对应的页面
    // 创建匹配器 用于后续的匹配操作
    // 用户没传低配置 默认传入空数组
    // 1.match通过路由来匹配组件
    // 2.addRoutes 动态添加匹配规则
    const { match, addRoutes } = (this.matcher = createMatcher(
      options.routes || []
    ))
    // 根据不同的路径切换
    // 模式默认使用hash模式
    options.mode = options.mode || "hash"
    switch (options.mode) {
      case "hash":
        this.history = new HashHistory(this)
        break
      case "history":
        this.history = new BrowserHistory(this)
        break
      default:
        break
    }
    this.beforeHooks = []
  }
  match(location) {
    return this.matcher.match(location)
  }
  push(to) {
    this.history.push(to) // 跳转路由
  }
  go() {}
  back() {}
  replace() {}
  // 初始化
  init(app) {
    // 监听hash之变化  默认跳转到对应的路径中
    const history = this.history
    const setUpHashListener = () => {
      history.setUpListener() // 监听路由变化
    }
    history.transitionTo(
      history.getCurrentLocation(), // 获取当前路径
      setUpHashListener
    )

    history.listen(route => {
      app._route = route
    })

    // transitionTo 放到base中 做成公共的方法
    // getCurrentLocation  放到自己家中  window.location.hash/path
    // setUpListener   放到hash中
  }
  beforeEach(fn) {
    this.beforeHooks.push(fn)
  }
}

// 导航被触发。
// 在失活的组件里调用 beforeRouteLeave 守卫。
// 调用全局的 beforeEach 守卫。
// 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
// 在路由配置里调用 beforeEnter。
// 解析异步路由组件。
// 在被激活的组件里调用 beforeRouteEnter。
// 调用全局的 beforeResolve 守卫 (2.5+)。
// 导航被确认。
// 调用全局的 afterEach 钩子。
// 触发 DOM 更新。
// 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

VueRouter.install = install
