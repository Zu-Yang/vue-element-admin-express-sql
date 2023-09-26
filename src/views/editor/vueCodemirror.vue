<template>
  <div>
    <div style="text-align: center;overflow: hidden; padding: 20px 0;">
      <KeyframeAnimation text="vue-codemirror" width="100%" height="50px" />
      <el-link href="https://olindk.gitbooks.io/codemirror/content/configuration.html" target="_blank">中文文档</el-link>
      <span>&nbsp;➤&nbsp;</span>
      <el-link href="https://github.surmon.me/vue-codemirror" target="_blank">官方示例</el-link>
    </div>
    <codemirror :data="jsonData" theme="rubyblue" />
  </div>
</template>

<script>
import codemirror from "@/components/VueCodemirror/index";
import KeyframeAnimation from '@/components/Charts/KeyframeAnimation' //关键帧描边动画

const jsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'

export default {
  name: "VueCodemirror",
  data() {
    return {

    }
  },
  components: {
    codemirror,
    KeyframeAnimation
  },
  computed: {
    jsonData() {
      return JSON.parse(jsonData)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .CodeMirror {
  min-height: calc(100vh - 200px);
}

::v-deep .CodeMirror-scroll {
  min-height: calc(100vh - 200px);
}
</style>