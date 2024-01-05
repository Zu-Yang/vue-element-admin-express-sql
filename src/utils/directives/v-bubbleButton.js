function handler(el) {
  el.style.position = "relative"
  el.style.overflow = "hidden"
  el.addEventListener('mousedown', function (event) {
    const buttonRect = el.getBoundingClientRect();
    const posX = event.clientX - buttonRect.left;
    const posY = event.clientY - buttonRect.top;
    let _dom = document.createElement("div")
    // _dom.style.display = "block";
    // _dom.style.zIndex = "9";
    // _dom.style.width = "10px";
    // _dom.style.height = "10px";
    // _dom.style.borderRadius = "50%";
    // _dom.style.animation = "v-bubble-effect 0.5s linear forwards"; //全局自定义动画
    // _dom.style.background = "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%)";
    _dom.classList.add("v-bubble-button"); // 已经在main.js注入v-bubbleButton样式
    _dom.style.position = "absolute";
    _dom.style.left = `${posX}px`;
    _dom.style.top = `${posY}px`;
    el.appendChild(_dom);
    const timer = setTimeout(function () {
      el.style.position = ""
      el.style.overflow = ""
      _dom.remove()
      clearTimeout(timer)
    }, 1000); // 在动画时间500ms结束之后清除元素
  });
}
const bubbleButton = {
  bind: function (el, binding, vnode) {
    /* 仅用于标题button标签 */
    // if (vnode.tag === "button") {
    //   handler(el)
    // } else {
    //   console.log("未配置该标签使用词指令");
    // }
    handler(el)
  },
  inserted: function (el, binding, vnode) { },
  update: function (el, binding, vnode, oldVnode) { },
  componentUpdated: function (el, binding, vnode, oldVnode) { },
  unbind: function (el, binding, vnode) {
    el.removeEventListener('mousedown', el.handler)
    console.log("unbind");
  }
}



export default bubbleButton