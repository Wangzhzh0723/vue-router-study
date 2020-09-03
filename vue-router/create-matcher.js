import createRouteMap from "./create-route-map"

export default function createMatcher(routes) {
  // pathMap = {'/': Home, "/about": About}
  // 扁平化配置
  let { pathMap } = createRouteMap(routes)
  console.log(pathMap)
  function addRoutes(routes) {
    createRouteMap(routes, pathMap)
    console.log(pathMap)
  }
  function match() {}
  return {
    addRoutes, // 添加路由
    match // 用于匹配路径
  }
}
