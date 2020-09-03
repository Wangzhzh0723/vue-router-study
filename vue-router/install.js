// 插件安装入口
// 插件一般用于定义全局组件 全局指令  过滤器  原型方法... 拓展(增强)模块功能

// 为什么要传入Vue? 要保证Vue构造函数的一致性, 防止强依赖关系
export let _Vue
export default function install(Vue, options) {
  // 挂一些组件
  _Vue = Vue // 这样别的文件都可以使用Vue变量

  // 给所有组件注入router的实例

  Vue.mixin({
    beforeCreate() {
      // 将父亲传入的router实例共享给所有的子组件
      if (this.$options.router) {
        this._routerRoot = this // 给当前根组件增加一个属性 _routerRoot 代表自己
        this._router = this.$options.router
        this._router.init(this) // 这里的this是跟实例
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }

      // 无论是父组件还是子组件 都可以通过 this._routerRoot._router 获取共同的实例
    }
  })

  Vue.component("router-link", {
    render: h => h("div", {}, "link")
  })

  Vue.component("router-view", {
    render: h => h("div", {}, "view")
  })

  Vue.prototype.$route = {}
  Vue.prototype.$router = {}
}
