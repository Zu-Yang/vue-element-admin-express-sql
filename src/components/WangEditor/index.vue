<template>
  <div style="padding: 20px;">
    <div style="border: 1px solid #ccc;">
      <!-- 工具栏 -->
      <Toolbar style=" border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" />
      <!-- 编辑器 -->
      <Editor style="height: 400px; overflow-y: hidden" :defaultConfig="editorConfig" v-model="html" @onChange="onChange"
        @onCreated="onCreated" />
    </div>
    <div style="margin-top: 10px">
      <textarea v-model="html" readonly
        style="width: 100%;outline: none;border: 1px solid #ccc;resize: vertical;"></textarea>
    </div>
  </div>
</template>

<script>
// const { Editor, Toolbar } = require("@wangeditor/editor-for-vue");
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  name: "WangEditor",
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null, //editor实例
      html: "<p>hello&nbsp;world</p>",
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
        placeholder: "请输入内容...",
        autoFocus: true,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          codeSelectLang: {
            // codeLangs 配置代码语言
            codeLangs: [
              { text: 'CSS', value: 'css' },
              { text: 'HTML', value: 'html' },
              { text: 'XML', value: 'xml' },
              // 其他
            ]
          },
          uploadImage: {
            // 小于该值就插入 base64 格式（而不上传），默认为 0
            base64LimitSize: 10 * 1024 * 1024 // 10M 以下插入 base64
          },
          uploadVideo: {
            // 自定义插入视频
            customInsert(res, insertFn) { // JS 语法
              console.log(res);
              // res 即服务端的返回结果
              // 从 res 中找到 url poster ，然后插入视频
              // insertFn(url, poster)
            },
            // 自定义上传
            customUpload(file, insertFn) {    // JS 语法
              console.log(file);
              // file 即选中的文件
              // 自己实现上传，并得到视频 url poster
              // 最后插入视频
              // insertFn(url, poster)
            }
          },
        },
      },
    };
  },
  methods: {
    /* 编辑器创建完毕时的回调函数 */
    onCreated(editor) {
      /* 注：【注意】一定要用 Object.seal() 密封editor否则会报错，Object.seal()方法用于密封一个对象，即将对象设置为不可扩展，同时将对象的所有自有属性都设置为不可配置（包括Symbol值的属性）。也就是说，不能给对象添加新的属性和方法，也不能删除现有的属性和方法、不能修改现有属性和方法的配置。但如果对象的属性和方法是可写的，那该属性和方法仍然可以修改。 */
      this.editor = Object.seal(editor);
    },
    /* 编辑器内容、选区变化时的回调函数 */
    onChange(editor) {
      // console.log("onChange", editor.getHtml()); // onChange 时获取编辑器最新内容
    },
  },
  mounted() {

  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
