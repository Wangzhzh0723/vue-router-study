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
            render: h => <h1>a</h1>
          }
        },
        {
          path: "/b",
          component: {
            render: h => <h1>b</h1>
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
      render: h => <h1>c</h1>
    }
  },
  {
    path: "/about",
    component: About,
    children: [
      {
        path: "aa",
        component: {
          render: h => <h1>aa</h1>
        }
      }
    ]
  }
])

router.beforeEach((from, to, next) => {
  console.log(1)
  next()
})

router.beforeEach((from, to, next) => {
  console.log(2)
  next()
})

export default router
