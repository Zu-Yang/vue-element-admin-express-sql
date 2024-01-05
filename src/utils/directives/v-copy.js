/* 需求：点击复制文本
  思路:
  动态创建 textarea 标签，并设置 readOnly 属性及移出可视区域
  将要复制的值赋给 textarea 标签的 value 属性，并插入到 body
  选中值 textarea 并复制
  将 body 中插入的 textarea 移除
  在第一次调用时绑定事件，在解绑时移除事件
 */

const copy = {
  // bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind(el, {
    value
  }) {
    var timer = null
    el.$value = value
    el.handler = () => {
      el.disabled = true
      if (!el.$value) {
        // 值为空的时候，给出提示。
        console.log("无内容");
        return timer = setTimeout(() => {
          el.disabled = false
          clearTimeout(timer)
        }, 1000);
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // **实现鼠标选中值并复制
      textarea.select()
      const result = document.execCommand('Copy') //paste 粘贴
      if (result) {
        console.log(result);
      }
      // 完成之后移除元素
      document.body.removeChild(textarea)
      return timer = setTimeout(() => {
        el.disabled = false
        clearTimeout(timer)
      }, 1000);
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用,在 componentUpdated 钩子函数中，更新元素的 $value 属性，这样，当需要复制的文本内容发生变化时，指令会自动更新。
  componentUpdated(el, {
    value
  }) {
    el.$value = value
    console.log("节点更新");
  },
  // 在 unbind 钩子函数中，只调用一次，指令与元素解绑时调用。 移除元素的 click 事件监听器， 以避免内存泄漏。
  unbind(el) {
    el.removeEventListener('click', el.handler)
  },
}

export default copy