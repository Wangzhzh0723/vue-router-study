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
  }
  match(location) {
    return this.matcher.match(location)
  }
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
}

VueRouter.install = install
