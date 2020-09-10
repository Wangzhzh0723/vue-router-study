export function createRoute(record, location) {
  let res = []

  while (record) {
    res.unshift(record)
    record = record.parent
  }

  return {
    ...location,
    matched: res
  }
}

function runQueue(queue, iterator, cb) {
  // 异步迭代
  function step(index) {
    if (index >= queue.length) return cb()
    const hook = queue[index]
    iterator(hook, () => step(++index))
  }
  step(0)
}

export default class BaseHistory {
  constructor(router) {
    this.router = router

    // 创建完路由后, 有一个默认值   路径 和匹配到的记录做一个映射表
    // 一个路径匹配多个结果
    // {"/": Record, "/about": Record, "/about/a": Record}
    // /about/a  => matches: [Record(about), Record(a)]
    // 默认当默认创建history时 路径应该是 / 并且匹配到的记录是 []
    this.current = createRoute(null, {
      path: "/"
    })
  }

  transitionTo(location, onComplete) {
    // 跳转时都会调用此方法 from  to
    // 路径变化 视图需要更新(响应式数据原理)
    const route = this.router.match(location)

    // 防止重复跳转
    if (
      location == this.current.path &&
      route.matched.length == this.current.matched.length
    )
      return

    // 在更新之前先调用注册好的导航守卫

    const queue = [...this.router.beforeHooks] // 拿到注册的方法
    const iterator = (hook, next) => {
      hook(this.current, route, next)
    }
    runQueue(queue, iterator, () => {
      // 更新current 路由发生改变
      this.updateRoute(route)

      onComplete && onComplete()
      // 根据路径加载不同的组件
      // this.router.matcher.match(location) 拿到组件
      // 渲染组件
    })
  }
  updateRoute(route) {
    this.current = route // 每次路由切换 都会更改current的值
    // 视图更新渲染要求 1. 模板中渲染中要使用  2. current要是响应式的
    this.cb && this.cb(route)
  }

  listen(cb) {
    this.cb = cb
  }
}
