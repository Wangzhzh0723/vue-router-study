<template>
  <div>
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于页面</router-link>
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
