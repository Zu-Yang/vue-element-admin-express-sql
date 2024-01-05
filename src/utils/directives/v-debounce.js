const debounce = {
  // 指令定义对象可以提供的钩子函数
  // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  // 钩子函数参数:
  // el：指令所绑定的元素，可以用来直接操作 DOM。
  // binding：一个对象，包含以下 property：
  // name：指令名，不包括 v- 前缀。
  // value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  // oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  // expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  // arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  // modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
  // vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
  // oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

  // bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  // bind(el, binding) {
  //   let timer
  //   el.clickHandler = () => {
  //     if (timer) {
  //       clearTimeout(timer)
  //     }
  //     timer = setTimeout(() => {
  //       binding.value()
  //     }, 1000)
  //   }
  //   el.addEventListener('click', el.clickHandler())
  // },
  inserted: function (el, binding, vnode, oldVnode) {
    let timer
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
        clearTimeout(timer)
      }, 1000)
    })
  },
  unbind(el) {
    console.log("指令与元素解绑");
  }
}

export default debounce