import Router from "./vue-router/index"
import Vue from "vue"
import Home from "./Home"
import About from "./About"

Vue.use(Router)

const router = new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/about",
      component: About,
      children: [
        {
          path: "a",
          component: {
            render: h => h("a")
          }
        },
        {
          path: "/b",
          component: {
            render: h => h("b")
          }
        }
      ]
    }
  ]
})

router.matcher.addRoutes([
  {
    path: "/c",
    component: {
      render: h => h("c")
    }
  },
  {
    path: "/about",
    component: About,
    children: [
      {
        path: "aa",
        component: {
          render: h => h("aa")
        }
      }
    ]
  }
])

export default router
