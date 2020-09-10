import createRouteMap from "./create-route-map"
import { createRoute } from "./history/base"

export default function createMatcher(routes) {
  // pathMap = {'/': Home, "/about": About}
  // 扁平化配置
  let { pathMap } = createRouteMap(routes)
  function addRoutes(routes) {
    createRouteMap(routes, pathMap)
  }
  function match(location) {
    // 一个路径可能有多个记录
    const record = pathMap[location]
    return createRoute(record, {
      path: location
    })
  }
  return {
    addRoutes, // 添加路由
    match // 用于匹配路径
  }
}
