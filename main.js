import Vue from "vue"
import App from "./App"
import router from "./router"
// 没有提供的文件 会采用vue-cli中自带的文件

const vm = new Vue({
  el: "#app",
  name: "root",
  router,
  render: h => {
    return h(App)
  }
})
