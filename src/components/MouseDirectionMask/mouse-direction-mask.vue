<template>
  <div class="mask-wrap">
    <div class="mask-css">
      <!-- css实现 简易版 -->
      <h1>css实现四个方向四个mask</h1>
      <div class="mask-container">
        <div class="mask-item">
          <div class="mask top">
            <slot name="mask-top">mask-top</slot>
          </div>
          <div class="mask right">
            <slot name="mask-right">mask-right</slot>
          </div>
          <div class="mask bottom">
            <slot name="mask-bottomt">mask-bottomt</slot>
          </div>
          <div class="mask left">
            <slot name="mask-left">mask-left</slot>
          </div>
          <div class="content">
            <slot name="content">content</slot>
          </div>
        </div>
      </div>
    </div>
    <h1>jq实现四个方向一个mask</h1>
    <div class="mask-js">
      <!-- js实现 完整版-->
      <div id="mask-item" class="mask-item">
        <div class="main-content">content</div>
        <div class="mask-content">mask</div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "MouseDirectionMask",
  data() {
    return {

    }
  },
  methods: {
    // 划入效果
    mouseenter(maskNode, direction) {
      if (maskNode && direction) {
        switch (direction) {
          case "top": $(maskNode).css({ top: "-100%", left: 0 }); break;
          case "right": $(maskNode).css({ left: "100%", top: 0 }); break;
          case "bottom": $(maskNode).css({ top: "100%", left: 0 }); break;
          case "left": $(maskNode).css({ left: "-100%", top: 0 }); break;
        }
        // 停止所有在指定元素上正在运行的动画，确保动画的流畅性。
        $(maskNode).stop().animate({ top: 0, left: 0 });
      }
    },
    // 划出效果
    mouseleave(maskNode, direction) {
      if (maskNode && direction) {
        switch (direction) {
          case "top": $(maskNode).stop().animate({ top: "-100%", left: 0 }); break;
          case "right": $(maskNode).stop().animate({ left: "100%", top: 0 }); break;
          case "bottom": $(maskNode).stop().animate({ top: "100%", left: 0 }); break;
          case "left": $(maskNode).stop().animate({ left: "-100%", top: 0 }); break;
        }
      }
    },
    // 获取鼠标划入/划出方向
    getMouseDirection(option = {}) {
      /* 方式一:边界距离计算(不精确) */
      // const { width, height, xAxis, yAxis, mouseX, mouseY } = option
      // const top = mouseX > xAxis && mouseX < xAxis + width && mouseY < yAxis + 10
      // const bottom = mouseX > xAxis && mouseX < xAxis + width && mouseY > yAxis + height - 10
      // const left = mouseY > yAxis && mouseY < yAxis + height && mouseX < xAxis + 10
      // const right = mouseY > yAxis && mouseY < yAxis + height && mouseX > xAxis + width - 10
      // const parmas = { top, bottom, left, right }
      // const keyArr = Object.keys(parmas)
      // const key = keyArr.filter(key => { if (parmas[key]) return key })
      // return key[0]

      /* 方式二:边界距离计算(精确) */
      const { width, height, xAxis, yAxis, mouseX, mouseY } = option
      const x = (mouseX - xAxis - (width / 2)) * (width > height ? (height / width) : 1);
      const y = (mouseY - yAxis - (height / 2)) * (height > width ? (width / height) : 1);
      // val的取值为0、1、2、3，分别代表四个方向：top、right、bottom、left。
      const val = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
      const dirArr = ["top", "right", "bottom", "left"]
      return dirArr[val]
    },
    // 添事件监听
    addEventListener(elArr = [], event = null) {
      elArr.forEach(el => {
        el.addEventListener(event, (e) => {
          const { width, height, left, top } = el.getBoundingClientRect() // 获取指定元素的大小及其相对于视口的位置
          const mouseX = e.x || e.clientX || e.pageX
          const mouseY = e.y || e.clientY || e.pageY
          const option = { width, height, xAxis: left, yAxis: top, mouseX, mouseY }
          const direction = this.getMouseDirection(option)
          const maskNode = el.querySelector(".mask-content")
          if (e.type === "mouseenter") {
            this.mouseenter(maskNode, direction)
          } else {
            this.mouseleave(maskNode, direction)
          }
        })
      })
    }
  },
  mounted() {
    const elArr = document.querySelectorAll('#mask-item')
    this.addEventListener(elArr, "mouseenter")
    this.addEventListener(elArr, "mouseleave")
  }
}

</script>

<style lang="scss" scoped>
.mask-css {
  .mask-container {
    height: 200px;
    padding: 20px;
    overflow: hidden;
    box-sizing: content-box;
  }

  .mask-item {
    display: inline-block;
    position: relative;
    width: 200px;
    height: 200px;
    line-height: 200px;
    margin-right: 20px;
    overflow: hidden;

    .mask {
      position: absolute;
      width: inherit;
      height: inherit;
      text-align: center;
      line-height: inherit;
      transition: transform .5s;
      background-color: #00000058;
      color: #fff;

      &.top {
        transform: translateY(-100%);
      }

      &.top::before {
        top: 100%;
        right: 0;
        transform-origin: 100% 0;
      }

      &.right {
        transform: translateX(100%);
      }

      &.right::before {
        right: 100%;
        bottom: 0;
        transform-origin: 100% 100%;

      }

      &.bottom {
        transform: translateY(100%);
      }

      &.bottom::before {
        bottom: 100%;
        left: 0;
        transform-origin: 0 100%;

      }

      &.left {
        transform: translateX(-100%);
      }

      &.left::before {
        left: 100%;
        transform-origin: 0 0;

      }

      &.top::before,
      &.right::before,
      &.bottom::before,
      &.left::before {
        content: '';
        z-index: 0;
        position: absolute;
        /*
       * Calculation:
       *      ____a____
       *    /|\        |
       *   b | \       |
       *  /  a  \      |
       *  \  |  /      |
       *   \ | /       |
       *    \|/________|
       *
       *  a^2 = b^2+b^2
       *
       *  solve to b:
       *
       *  a^2         = 2b^2 | /2
       *  a^2 / 2     =  b^2 | sqrt
       *  a / sqrt(2) =  b
       *
       * Percentage:
       * a = 100%
       * 100 / sqrt(2) = 70.71%
       *                 ------
       */
        width: 70.71%;
        height: 70.71%;
        transform: rotate(45deg);
      }

      // 提高层级，防止误触其余遮罩的hover
      &.right:hover,
      &.left:hover,
      &.top:hover,
      &.bottom:hover {
        z-index: 1;
        transform: none;

        /* filter: blur(0px) 默认0px值越大越模糊,不允许负值,高斯模糊 */
        &~.content {
          filter: blur(2px);
        }
      }

      // 修改before，防止误触其余遮罩的hover
      &.right:hover:before,
      &.left:hover:before,
      &.top:hover:before,
      &.bottom:hover:before {
        width: 100%;
        height: 100%;
        transform: none;
      }
    }

    .content {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: coral;
      z-index: -1;
      transition: all .5s;
      text-align: center;
    }
  }
}

.mask-js {
  padding: 20px;
  overflow: hidden;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;


  .mask-item {
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 200px;
    height: 200px;
    line-height: 200px;
    margin-right: 20px;
    text-align: center;

    .main-content {
      width: 200px;
      height: 200px;
      position: absolute;
      right: 0px;
      top: 0px;
      left: 0px;
      bottom: 0px;
      background-color: rgb(94, 176, 239);
      transition: filter 0.3s;
    }

    .mask-content {
      width: 200px;
      height: 200px;
      position: absolute;
      right: 0px;
      top: 100%;
      left: 0px;
      bottom: 0px;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
    }

    &:hover .main-content {
      filter: blur(1px);
    }
  }
}
</style>