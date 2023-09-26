<!-- 组件 -->
<template>
  <div class="codemirror-wrap">
    <codemirror v-model="code" :options="options" @ready="onReady" @focus="onFocus" @input="onCodeChange">
    </codemirror>
  </div>
</template>
 
<script>
// 文件内引入
import { codemirror } from "vue-codemirror";
// 引入样式、主题、代码风格等配置或样式文件
import "./cm-setting.js";

export default {
  name: "VueCodemirror",
  // 注册使用
  components: {
    codemirror,
  },
  props: ['data', 'theme'],
  data() {
    return {
      code: null,
      options: {
        line: true,
        lint: true, // 开启语法检查
        theme: this.theme, // 主题
        tabSize: 4, // 制表符的宽度
        indentUnit: 2, // 一个块应该缩进多少个空格（无论这在编辑语言中意味着什么）。默认值为 2。
        firstLineNumber: 1, // 从哪个数字开始计算行数。默认值为 1。
        readOnly: false, // 只读
        autorefresh: true,
        smartIndent: true, // 是否使用mode提供的缩进规则（还是说总是如上一行一样缩进）。默认为true。
        lineNumbers: true, // 是否显示行号
        styleActiveLine: true, // 高亮选中行
        viewportMargin: Infinity, //处理高度自适应时搭配使用
        showCursorWhenSelecting: true, // 当选择处于活动状态时是否应绘制游标
        // mode: "javascript", // 语法模式
        mode: 'application/json',
        foldGutter: true, // 启用折叠效果
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'], // 配置折叠参数
      },
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(val) {
        this.code = JSON.stringify(val, null, 4) //val:值,null:序列化所有属性,4:每个级别缩进4个空格
      },
    }
  },
  methods: {
    /* 加载完成触发 */
    onReady(cm) {
      // console.log('the editor is readied!', cm)
    },
    /* 获得光标触发 */
    onFocus(cm) {
      // console.log('the editor is focus!', cm)
    },
    /* 数据改变触发 */
    onCodeChange(newCode) {
      // console.log('this is new code', newCode)
      this.code = newCode
    }
  }
};
</script>

<style lang="scss" scoped></style>