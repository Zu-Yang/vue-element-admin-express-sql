<template>
  <!--  
  v-model="value" // 绑定的JSON数据
  :showBtns="false" // -是否显示按钮
  mode="code" // 模式：tree text form code等
  lang="zh" // 语言
  :expanded-on-start="true" // 初始化时，是否自动展开
  @json-change="onJsonChange" // json改变时，触发的事件
  @json-save="onJsonSave" // json保存事件
  @has-error="onError" // 出现错误时，触发的事件
  -->
  <div class="code-json-editor">
    <vue-json-editor v-model="value" :showBtns="true" mode="code" lang="zh" :expanded-on-start="true"
      @json-change="onJsonChange" @json-save="onJsonSave" @has-error="onError" @check-json="checkJson" />
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'

export default {
  name: 'JsonEditor',
  props: ['jsonData'],
  components: { vueJsonEditor },
  data() {
    return {
      hasJsonFlag: true, // json是否验证通过
      value: this.jsonData
    }
  },

  methods: {
    onJsonChange(value) {
      // this.onJsonSave(value) // 实时保存
    },
    // json保存事件
    onJsonSave(value) {
      this.value = value
      this.hasJsonFlag = true
      this.$message.success('保存成功!')
    },
    // 出现错误时，触发的事件
    onError(value) {
      console.log(value)
      this.hasJsonFlag = false
    },
    // 检查json
    checkJson() {
      if (this.hasJsonFlag === false) {
        this.$message.error('JSON数据有误!')
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .jsoneditor-poweredBy {
  display: none;
}

::v-deep .jsoneditor-vue .ace-jsoneditor,
.jsoneditor-vue .jsoneditor-outer {
  min-height: calc(100vh - 150px);
}
</style>