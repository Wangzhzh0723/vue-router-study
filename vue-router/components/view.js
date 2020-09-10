import router from "../../router"

export default {
  name: "router-view",
  functional: true, // 函数式组件  特点是: 性能高, 不用创建组件实例
  render(h, { parent, data }) {
    // 调用render方法  说明他是一个routerView组件
    // 获取当前要渲染的记录
    const route = parent.$route
    console.log(route)
    let depth = 0
    data.routerView = true

    // App.vue 中渲染组件时  默认会调用render函数, 父亲中没有data.routerView属性 渲染第一层,并且标识当前routerView为true

    while (parent) {
      // routeView的父标签
      // $vnode 代表的是占位符 vnode 组件的标签名的虚拟节点
      // _vnode 组件内部渲染的虚拟节点
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      parent = parent.$parent
    }

    // 第一层router-view渲染第一个record 第二个router-view渲染第二个record ...
    // 获取对应层级的记录
    const record = route.matched[depth]
    if (!record) return h()
    return h(record.component, data)
  }
}
