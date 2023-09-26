<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive> -->
      <router-view :key="key" />
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      /* 标签key属性值改变,可实现重新加载路由视图 */
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import"@/styles/variables.scss";

.app-main {
  /*50 = navbar  */
  /* min-height: calc(100vh - 50px); */
  min-height: $appMainMinHeight;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
