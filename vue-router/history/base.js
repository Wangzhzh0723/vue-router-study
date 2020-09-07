export default class BaseHistory {
  constructor(router) {
    this.router = router
  }

  transitionTo(location, onComplete) {
    onComplete && onComplete()
    // 根据路径加载不同的组件
    // this.router.matcher.match(location) 拿到组件
    // 渲染组件
    console.log(location, "location")
  }
}
