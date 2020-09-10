<template>
  <div>
    <router-link tag="a" to="/">首页</router-link>
    <router-link tag="span" to="/about">关于页面</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {}
  },
  mounted() {
    console.log(this._routerRoot)
  },
  methods: {}
}
</script>
<style lang="scss" scoped></style>
