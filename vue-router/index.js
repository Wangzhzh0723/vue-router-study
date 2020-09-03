import install from "./install"
import createMatcher from "./create-matcher"

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
  }
  init(app) {
    console.log(app.$options.name)
  }
}

VueRouter.install = install
