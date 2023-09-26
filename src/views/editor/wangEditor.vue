
<template>
  <div class="editor-container">
    <div style="text-align: center;overflow: hidden; padding-top: 20px;">
      <KeyframeAnimation text="wangEditor 5" width="100%" height="50px" />
      <el-link href="https://www.wangeditor.com" target="_blank">中文文档</el-link>
      <span>&nbsp;➤&nbsp;</span>
      <el-link href="https://www.wangeditor.com/demo/index.html" target="_blank">Demo</el-link>
    </div>
    <wang-editor />
  </div>
</template>

<script>
import WangEditor from '@/components/WangEditor/index.vue'   //引入组件
import KeyframeAnimation from '@/components/Charts/KeyframeAnimation' //关键帧描边动画

export default {
  components: {
    WangEditor,
    KeyframeAnimation
  },
  data() {
    return {}
  }
}
</script>

<style></style>