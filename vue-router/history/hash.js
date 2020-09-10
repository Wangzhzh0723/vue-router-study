import BaseHistory from "./base"

function ensureSlash() {
  // location.hash是有兼容性问题的
  if (window.location.hash) return
  window.location.hash = "/" // 默认加个 / 路径就行
}

export default class HashHistory extends BaseHistory {
  constructor(router) {
    super(router)
    // 确保hash模式下有一个 /路径
    ensureSlash()
  }
  getCurrentLocation() {
    return location.hash.slice(1)
  }
  setUpListener() {
    window.addEventListener("hashchange", () => {
      // 当hash发生变化, 拿到hash值进行跳转
      this.transitionTo(this.getCurrentLocation())
    })
  }
}
