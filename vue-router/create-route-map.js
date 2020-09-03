export default function createRouteMap(routes, oldPathMap) {
  // 默认没传创建映射关系
  const pathMap = oldPathMap || Object.create(null)
  routes.forEach(route => {
    addRouteRecord(route, pathMap)
  })
  return {
    pathMap
  }
}

// 先序深度遍历
function addRouteRecord(route, pathMap, parent) {
  // 当访问 / 时 应该渲染组件  / => {Home}
  let path = route.path
  if (parent && !path.startsWith("/")) {
    path = parent.path + "/" + path
  }
  const record = {
    component: route.component,
    path,
    parent
  }
  // 不能定义重复的路由 否则生效第一个
  if (!pathMap[path]) {
    pathMap[path] = record
  }
  const children = route.children
  if (children) {
    children.forEach(child => {
      // 在遍历儿子时 将父亲的记录传入
      addRouteRecord(child, pathMap, record)
    })
  }
}
