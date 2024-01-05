// 需求：实现一个拖拽指令，可在页面可视区域任意拖拽元素。
// 思路：

// 设置需要拖拽的元素为相对定位，其父元素为绝对定位。
// 鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
// 鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
// 鼠标松开(onmouseup)时完成一次拖拽
// 使用：<div class="el-dialog" v-draggable></div>


const draggable = {
  inserted: function (el) {
    el.style.cursor = 'move'
    el.onmousedown = function (e) {
      // 计算鼠标相对于元素左上角的偏移量。offsetTop元素el相对于视口顶部偏移量,e.pageY鼠标位置相对于视口顶部的偏移量
      let disx = e.pageX - el.offsetLeft
      let disy = e.pageY - el.offsetTop
      document.onmousemove = function (e) {
        // 计算元素的相对于视口左上角坐标。
        let x = e.pageX - disx
        let y = e.pageY - disy
        // 计算元素可移动的最大范围。
        // getComputedStyle() 获取的是最终计算样式，而不是元素内联样式或样式表中定义的样式。
        // 如果要获取元素的内联样式或样式表中定义的样式，可以使用 element.style 或 document.styleSheets 属性。
        let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)
        let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)
        // 检查元素是否超出可移动范围，如果超出则限制在可移动范围内。
        // x < 0 && (x = 0) || x > maxX && (x = maxX)
        // y < 0 && (y = 0) || y > maxY && (y = maxY)
        x = x < 0 ? 0 : (x > maxX ? maxX : x);
        y = y < 0 ? 0 : (y > maxY ? maxY : y);
        // 设置元素的定位方式为绝对定位，并改变元素的 left 和 top 属性来实现拖拽移动效果。
        el.style.userSelect = 'none'
        el.style.position = 'absolute'
        el.style.left = x + 'px'
        el.style.top = y + 'px'

      }
      document.onmouseup = function () {
        // 在鼠标抬起时解绑 mousemove 和 mouseup 事件，结束拖拽效果。
        document.onmousemove = document.onmouseup = null
      }
    }
  },
  unbind() {
    console.log("v-draggable指令被解绑(移除对应dom元素时即可解绑自定义指令)");
  }
}
export default draggable